"""
Serveur Flask pour la génération de cartes SquadField avec IA.
"""

import os
import json
import tempfile
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import openai

# Import des modules locaux
from rules import apply_squadfield_rules, validate_player_data
from prompt_builder import build_dalle_prompt, validate_prompt_data
from firebase_uploader import upload_image_from_url, check_firebase_config

# Chargement des variables d'environnement
load_dotenv()

app = Flask(__name__)
CORS(app)  # Permet les requêtes depuis Next.js

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max
UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'mov'}

def allowed_file(filename, allowed_extensions):
    """Vérifie si l'extension du fichier est autorisée."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions

def setup_openai():
    """Configure l'API OpenAI."""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("❌ OPENAI_API_KEY manquante dans .env")
        return False
    
    openai.api_key = api_key
    print("✅ OpenAI configuré avec succès")
    return True

def generate_dalle_image(prompt, photo_path=None):
    """
    Génère une image avec DALL·E 3.
    
    Args:
        prompt (str): Prompt pour DALL·E
        photo_path (str, optional): Chemin vers la photo du joueur
        
    Returns:
        str: URL de l'image générée, None si erreur
    """
    try:
        print("🎨 Génération de l'image avec DALL·E 3...")
        print(f"📝 Prompt: {prompt[:100]}...")
        
        # Configuration DALL·E
        model = os.getenv('DALLE_MODEL', 'dall-e-3')
        size = os.getenv('DALLE_SIZE', '1024x1024')
        quality = os.getenv('DALLE_QUALITY', 'standard')
        
        # Appel à l'API OpenAI
        response = openai.Image.create(
            model=model,
            prompt=prompt,
            size=size,
            quality=quality,
            n=1
        )
        
        if response.data and len(response.data) > 0:
            image_url = response.data[0].url
            print(f"✅ Image générée avec succès: {image_url}")
            return image_url
        else:
            print("❌ Aucune image générée par DALL·E")
            return None
            
    except openai.OpenAIError as e:
        print(f"❌ Erreur OpenAI: {e}")
        return None
    except Exception as e:
        print(f"❌ Erreur inattendue: {e}")
        return None

def save_generation_log(player_data, prompt, image_url, firebase_url, success=True):
    """Sauvegarde un log de la génération."""
    try:
        log_data = {
            "timestamp": datetime.now().isoformat(),
            "player": player_data['prenom'],
            "age_category": player_data.get('age_category'),
            "overall_score": player_data.get('overall_score'),
            "card_color": player_data.get('card_color'),
            "prompt": prompt,
            "dalle_url": image_url,
            "firebase_url": firebase_url,
            "success": success
        }
        
        # Créer le dossier logs s'il n'existe pas
        os.makedirs('logs', exist_ok=True)
        
        # Nom du fichier log
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        log_filename = f"logs/generation_{timestamp}.json"
        
        with open(log_filename, 'w', encoding='utf-8') as f:
            json.dump(log_data, f, indent=2, ensure_ascii=False)
        
        print(f"📄 Log sauvegardé: {log_filename}")
        
    except Exception as e:
        print(f"⚠️ Erreur de sauvegarde du log: {e}")

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint de vérification de santé."""
    return jsonify({
        "status": "healthy",
        "service": "squadfield-card-generator",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/generate', methods=['POST'])
def generate_card():
    """
    Endpoint principal pour générer une carte SquadField.
    Accepte les form-data avec photo, vidéo, prénom, âge et sport.
    """
    try:
        print("\n🚀 === NOUVELLE DEMANDE DE GÉNÉRATION ===")
        
        # Validation des champs requis
        prenom = request.form.get('prenom')
        age = request.form.get('age')
        sport = request.form.get('sport')
        
        if not all([prenom, age, sport]):
            return jsonify({
                "error": "Champs requis manquants: prénom, âge et sport sont obligatoires"
            }), 400
        
        # Validation des fichiers
        if 'photo' not in request.files or 'video' not in request.files:
            return jsonify({
                "error": "Fichiers requis manquants: photo et vidéo sont obligatoires"
            }), 400
        
        photo_file = request.files['photo']
        video_file = request.files['video']
        
        if photo_file.filename == '' or video_file.filename == '':
            return jsonify({
                "error": "Fichiers vides: veuillez sélectionner une photo et une vidéo"
            }), 400
        
        # Validation des extensions
        if not allowed_file(photo_file.filename, ALLOWED_IMAGE_EXTENSIONS):
            return jsonify({
                "error": "Format de photo invalide. Formats acceptés: JPG, PNG"
            }), 400
        
        if not allowed_file(video_file.filename, ALLOWED_VIDEO_EXTENSIONS):
            return jsonify({
                "error": "Format de vidéo invalide. Formats acceptés: MP4, MOV"
            }), 400
        
        print(f"📝 Données reçues: {prenom}, {age} ans, sport: {sport}")
        print(f"📸 Photo: {photo_file.filename}")
        print(f"🎥 Vidéo: {video_file.filename}")
        
        # Sauvegarde temporaire des fichiers
        photo_filename = secure_filename(photo_file.filename)
        video_filename = secure_filename(video_file.filename)
        
        photo_path = os.path.join(UPLOAD_FOLDER, f"{prenom}_{photo_filename}")
        video_path = os.path.join(UPLOAD_FOLDER, f"{prenom}_{video_filename}")
        
        photo_file.save(photo_path)
        video_file.save(video_path)
        
        # Construction des données joueur
        player_data = {
            'prenom': prenom,
            'age': int(age),
            'sport': sport,
            'photo_path': photo_path,
            'video_path': video_path,
            # Données par défaut pour les tests
            'position': 'Attaquant',
            'club': 'SquadField Academy',
            'stats': {
                'technique': 85,
                'physique': 80,
                'mental': 90,
                'vitesse': 88,
                'tir': 82
            }
        }
        
        print("⚽ Application des règles SquadField...")
        
        # Validation des données
        is_valid, error_msg = validate_player_data(player_data)
        if not is_valid:
            return jsonify({"error": f"Données invalides: {error_msg}"}), 400
        
        # Application des règles SquadField
        enriched_data = apply_squadfield_rules(player_data)
        
        print(f"📊 Score global: {enriched_data['overall_score']}")
        print(f"👥 Catégorie: {enriched_data['age_category']}")
        print(f"🎨 Couleur de carte: {enriched_data['card_color']}")
        
        # Validation des données pour le prompt
        is_valid, error_msg = validate_prompt_data(enriched_data)
        if not is_valid:
            return jsonify({"error": f"Données prompt invalides: {error_msg}"}), 400
        
        # Construction du prompt DALL·E
        print("🤖 Construction du prompt DALL·E...")
        prompt = build_dalle_prompt(enriched_data)
        
        print("\n" + "="*80)
        print("📝 PROMPT GÉNÉRÉ:")
        print("="*80)
        print(prompt)
        print("="*80 + "\n")
        
        # Génération de l'image avec DALL·E
        image_url = generate_dalle_image(prompt, photo_path)
        if not image_url:
            return jsonify({"error": "Erreur de génération DALL·E"}), 500
        
        # Upload sur Firebase Storage
        print("☁️ Upload sur Firebase Storage...")
        firebase_url = upload_image_from_url(
            image_url,
            enriched_data['prenom'],
            enriched_data['card_color']
        )
        
        if not firebase_url:
            print("⚠️ Erreur d'upload Firebase, mais image DALL·E disponible")
            firebase_url = None
        
        # Sauvegarde du log
        save_generation_log(enriched_data, prompt, image_url, firebase_url)
        
        # Nettoyage des fichiers temporaires
        try:
            os.unlink(photo_path)
            os.unlink(video_path)
        except Exception as e:
            print(f"⚠️ Erreur de nettoyage: {e}")
        
        # Résultat final
        result = {
            "success": True,
            "player": enriched_data['prenom'],
            "age_category": enriched_data['age_category'],
            "overall_score": enriched_data['overall_score'],
            "card_color": enriched_data['card_color'],
            "dalle_url": image_url,
            "firebase_url": firebase_url,
            "prompt": prompt,
            "message": "Carte générée avec succès"
        }
        
        print("\n🎉 === GÉNÉRATION TERMINÉE AVEC SUCCÈS ===")
        print(f"🏃‍♂️ Joueur: {result['player']}")
        print(f"📊 Score: {result['overall_score']} ({result['card_color']})")
        print(f"👥 Catégorie: {result['age_category']}")
        print(f"🔗 URL DALL·E: {result['dalle_url']}")
        if result['firebase_url']:
            print(f"☁️ URL Firebase: {result['firebase_url']}")
        print("="*50 + "\n")
        
        return jsonify(result)
        
    except Exception as e:
        print(f"💥 Erreur serveur: {e}")
        
        # Nettoyage en cas d'erreur
        try:
            if 'photo_path' in locals() and os.path.exists(photo_path):
                os.unlink(photo_path)
            if 'video_path' in locals() and os.path.exists(video_path):
                os.unlink(video_path)
        except Exception:
            pass
        
        return jsonify({
            "error": f"Erreur interne du serveur: {str(e)}"
        }), 500

@app.errorhandler(413)
def too_large(e):
    """Gestion des fichiers trop volumineux."""
    return jsonify({
        "error": "Fichier trop volumineux. Taille maximale: 50MB"
    }), 413

if __name__ == '__main__':
    print("🚀 === SERVEUR SQUADFIELD CARD GENERATOR ===\n")
    
    # Vérification de la configuration
    print("🔧 Vérification de la configuration...")
    
    if not setup_openai():
        print("❌ Configuration OpenAI échouée")
        exit(1)
    
    if check_firebase_config():
        print("✅ Configuration Firebase OK")
    else:
        print("⚠️ Configuration Firebase incomplète")
        print("ℹ️ L'upload Firebase sera désactivé")
    
    print("\n🌐 Serveur démarré sur http://localhost:5000")
    print("📍 Endpoints disponibles:")
    print("  GET  /health  - Vérification de santé")
    print("  POST /generate - Génération de carte")
    print("="*50 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
