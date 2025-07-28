"""
Script principal pour générer automatiquement des cartes SquadField avec l'IA.
"""

import os
import json
import argparse
import sys
from datetime import datetime
from dotenv import load_dotenv
import openai
import requests

# Import des modules locaux
from rules import apply_squadfield_rules, validate_player_data
from prompt_builder import build_dalle_prompt, validate_prompt_data
from firebase_uploader import upload_image_from_url, check_firebase_config

# Chargement des variables d'environnement
load_dotenv()


def setup_openai():
    """
    Configure l'API OpenAI.
    
    Returns:
        bool: True si la configuration réussit
    """
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("❌ OPENAI_API_KEY manquante dans .env")
        return False
    
    openai.api_key = api_key
    print("✅ OpenAI configuré avec succès")
    return True


def load_player_data(player_name):
    """
    Charge les données d'un joueur depuis test_players.json.
    
    Args:
        player_name (str): Nom du joueur à charger
        
    Returns:
        dict: Données du joueur, None si introuvable
    """
    try:
        with open('test_players.json', 'r', encoding='utf-8') as f:
            players = json.load(f)
        
        for player in players:
            if player['prenom'].lower() == player_name.lower():
                print(f"✅ Joueur trouvé: {player['prenom']}")
                return player
        
        print(f"❌ Joueur '{player_name}' introuvable")
        print("Joueurs disponibles:", [p['prenom'] for p in players])
        return None
        
    except FileNotFoundError:
        print("❌ Fichier test_players.json introuvable")
        return None
    except json.JSONDecodeError:
        print("❌ Erreur de format JSON dans test_players.json")
        return None


def generate_dalle_image(prompt, photo_url=None):
    """
    Génère une image avec DALL·E 3.
    
    Args:
        prompt (str): Prompt pour DALL·E
        photo_url (str, optional): URL de la photo du joueur
        
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
    """
    Sauvegarde un log de la génération.
    
    Args:
        player_data (dict): Données du joueur
        prompt (str): Prompt utilisé
        image_url (str): URL de l'image DALL·E
        firebase_url (str): URL Firebase finale
        success (bool): Succès de l'opération
    """
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


def generate_card_for_player(player_name):
    """
    Génère une carte complète pour un joueur.
    
    Args:
        player_name (str): Nom du joueur
        
    Returns:
        dict: Résultat de la génération
    """
    print(f"\n🏃‍♂️ === Génération de carte pour {player_name} ===\n")
    
    # 1. Chargement des données du joueur
    player_data = load_player_data(player_name)
    if not player_data:
        return {"success": False, "error": "Joueur introuvable"}
    
    # 2. Validation des données
    is_valid, error_msg = validate_player_data(player_data)
    if not is_valid:
        print(f"❌ Données invalides: {error_msg}")
        return {"success": False, "error": error_msg}
    
    # 3. Application des règles SquadField
    print("⚽ Application des règles SquadField...")
    enriched_data = apply_squadfield_rules(player_data)
    
    print(f"📊 Score global: {enriched_data['overall_score']}")
    print(f"👥 Catégorie: {enriched_data['age_category']}")
    print(f"🎨 Couleur de carte: {enriched_data['card_color']}")
    
    # 4. Validation des données pour le prompt
    is_valid, error_msg = validate_prompt_data(enriched_data)
    if not is_valid:
        print(f"❌ Données prompt invalides: {error_msg}")
        return {"success": False, "error": error_msg}
    
    # 5. Construction du prompt DALL·E
    print("🤖 Construction du prompt DALL·E...")
    prompt = build_dalle_prompt(enriched_data)
    
    print("\n" + "="*80)
    print("📝 PROMPT GÉNÉRÉ:")
    print("="*80)
    print(prompt)
    print("="*80 + "\n")
    
    # 6. Génération de l'image avec DALL·E
    image_url = generate_dalle_image(prompt, enriched_data.get('photo_url'))
    if not image_url:
        return {"success": False, "error": "Erreur de génération DALL·E"}
    
    # 7. Upload sur Firebase Storage
    print("☁️ Upload sur Firebase Storage...")
    firebase_url = upload_image_from_url(
        image_url,
        enriched_data['prenom'],
        enriched_data['card_color']
    )
    
    if not firebase_url:
        print("⚠️ Erreur d'upload Firebase, mais image DALL·E disponible")
        firebase_url = None
    
    # 8. Sauvegarde du log
    save_generation_log(enriched_data, prompt, image_url, firebase_url)
    
    # 9. Résultat final
    result = {
        "success": True,
        "player": enriched_data['prenom'],
        "age_category": enriched_data['age_category'],
        "overall_score": enriched_data['overall_score'],
        "card_color": enriched_data['card_color'],
        "dalle_url": image_url,
        "firebase_url": firebase_url,
        "prompt": prompt
    }
    
    print("\n🎉 === GÉNÉRATION TERMINÉE AVEC SUCCÈS ===")
    print(f"🏃‍♂️ Joueur: {result['player']}")
    print(f"📊 Score: {result['overall_score']} ({result['card_color']})")
    print(f"👥 Catégorie: {result['age_category']}")
    print(f"🔗 URL DALL·E: {result['dalle_url']}")
    if result['firebase_url']:
        print(f"☁️ URL Firebase: {result['firebase_url']}")
    print("="*50 + "\n")
    
    return result


def main():
    """
    Fonction principale avec interface en ligne de commande.
    """
    parser = argparse.ArgumentParser(
        description="Générateur automatique de cartes SquadField avec IA"
    )
    parser.add_argument(
        '--player',
        type=str,
        required=True,
        help="Nom du joueur à traiter"
    )
    parser.add_argument(
        '--check-config',
        action='store_true',
        help="Vérifier la configuration avant génération"
    )
    
    args = parser.parse_args()
    
    print("🚀 === GÉNÉRATEUR DE CARTES IA SQUADFIELD ===\n")
    
    # Vérification de la configuration
    print("🔧 Vérification de la configuration...")
    
    if not setup_openai():
        sys.exit(1)
    
    if args.check_config:
        if check_firebase_config():
            print("✅ Configuration Firebase OK")
        else:
            print("⚠️ Configuration Firebase incomplète")
            print("ℹ️ L'upload Firebase sera désactivé")
    
    # Génération de la carte
    try:
        result = generate_card_for_player(args.player)
        
        if result['success']:
            print("✨ Génération réussie !")
            sys.exit(0)
        else:
            print(f"❌ Erreur: {result['error']}")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n⏹️ Génération interrompue par l'utilisateur")
        sys.exit(1)
    except Exception as e:
        print(f"💥 Erreur inattendue: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
