"""
Script de validation pour vérifier la configuration complète du système.
"""

import os
import sys
import json
import requests
from datetime import datetime
from dotenv import load_dotenv

# Import des modules locaux
from rules import apply_squadfield_rules, validate_player_data
from prompt_builder import build_dalle_prompt, validate_prompt_data
from firebase_uploader import check_firebase_config

# Chargement des variables d'environnement
load_dotenv()

def check_environment():
    """Vérifie les variables d'environnement nécessaires."""
    print("🔧 === VÉRIFICATION ENVIRONNEMENT ===")
    
    required_vars = ['OPENAI_API_KEY']
    optional_vars = ['FIREBASE_PROJECT_ID', 'BACKEND_URL']
    
    all_good = True
    
    for var in required_vars:
        if os.getenv(var):
            print(f"✅ {var}: Configuré")
        else:
            print(f"❌ {var}: MANQUANT (REQUIS)")
            all_good = False
    
    for var in optional_vars:
        if os.getenv(var):
            print(f"✅ {var}: Configuré")
        else:
            print(f"⚠️ {var}: Non configuré (optionnel)")
    
    return all_good

def check_dependencies():
    """Vérifie que toutes les dépendances sont installées."""
    print("\n📦 === VÉRIFICATION DÉPENDANCES ===")
    
    required_modules = [
        'openai', 'flask', 'flask_cors', 'requests', 
        'firebase_admin', 'python_dotenv', 'werkzeug'
    ]
    
    all_good = True
    
    for module in required_modules:
        try:
            __import__(module)
            print(f"✅ {module}: Installé")
        except ImportError:
            print(f"❌ {module}: MANQUANT")
            all_good = False
    
    return all_good

def check_files_structure():
    """Vérifie la structure des fichiers."""
    print("\n📁 === VÉRIFICATION STRUCTURE FICHIERS ===")
    
    required_files = [
        'rules.py',
        'prompt_builder.py', 
        'firebase_uploader.py',
        'app.py',
        'requirements.txt',
        '.env'
    ]
    
    all_good = True
    
    for file in required_files:
        if os.path.exists(file):
            print(f"✅ {file}: Présent")
        else:
            print(f"❌ {file}: MANQUANT")
            all_good = False
    
    return all_good

def test_rules_system():
    """Teste le système de règles SquadField."""
    print("\n⚽ === TEST SYSTÈME DE RÈGLES ===")
    
    try:
        # Données de test
        test_player = {
            'prenom': 'Test',
            'age': 16,
            'sport': 'Football',
            'position': 'Attaquant',
            'club': 'Test Club',
            'stats': {
                'technique': 85,
                'physique': 80,
                'mental': 90,
                'vitesse': 88,
                'tir': 82
            }
        }
        
        # Validation des données
        is_valid, error_msg = validate_player_data(test_player)
        if not is_valid:
            print(f"❌ Validation données: {error_msg}")
            return False
        
        print("✅ Validation données: OK")
        
        # Application des règles
        enriched_data = apply_squadfield_rules(test_player)
        
        required_fields = ['overall_score', 'age_category', 'card_color']
        for field in required_fields:
            if field in enriched_data:
                print(f"✅ Règle {field}: {enriched_data[field]}")
            else:
                print(f"❌ Règle {field}: MANQUANT")
                return False
        
        return True
        
    except Exception as e:
        print(f"❌ Erreur système de règles: {e}")
        return False

def test_prompt_system():
    """Teste le système de génération de prompts."""
    print("\n🤖 === TEST SYSTÈME DE PROMPTS ===")
    
    try:
        # Données enrichies de test
        test_data = {
            'prenom': 'Test',
            'age': 16,
            'sport': 'Football',
            'position': 'Attaquant',
            'club': 'Test Club',
            'overall_score': 85,
            'age_category': 'Junior',
            'card_color': 'bronze',
            'stats': {
                'technique': 85,
                'physique': 80,
                'mental': 90,
                'vitesse': 88,
                'tir': 82
            }
        }
        
        # Validation des données pour prompt
        is_valid, error_msg = validate_prompt_data(test_data)
        if not is_valid:
            print(f"❌ Validation prompt: {error_msg}")
            return False
        
        print("✅ Validation prompt: OK")
        
        # Génération du prompt
        prompt = build_dalle_prompt(test_data)
        
        if prompt and len(prompt) > 50:
            print(f"✅ Génération prompt: OK ({len(prompt)} caractères)")
            print(f"📝 Aperçu: {prompt[:100]}...")
            return True
        else:
            print("❌ Génération prompt: Prompt trop court ou vide")
            return False
        
    except Exception as e:
        print(f"❌ Erreur système de prompts: {e}")
        return False

def test_firebase_config():
    """Teste la configuration Firebase."""
    print("\n☁️ === TEST CONFIGURATION FIREBASE ===")
    
    try:
        if check_firebase_config():
            print("✅ Configuration Firebase: OK")
            return True
        else:
            print("⚠️ Configuration Firebase: Incomplète (optionnel)")
            return True  # Firebase est optionnel
        
    except Exception as e:
        print(f"❌ Erreur Firebase: {e}")
        return True  # Firebase est optionnel

def test_flask_server():
    """Teste si le serveur Flask peut démarrer."""
    print("\n🌐 === TEST SERVEUR FLASK ===")
    
    try:
        # Test d'import de l'app Flask
        from app import app
        print("✅ Import Flask app: OK")
        
        # Test de configuration
        if app.config.get('MAX_CONTENT_LENGTH'):
            print(f"✅ Configuration Flask: OK (Max: {app.config['MAX_CONTENT_LENGTH']/1024/1024:.0f}MB)")
        else:
            print("⚠️ Configuration Flask: Partielle")
        
        return True
        
    except Exception as e:
        print(f"❌ Erreur serveur Flask: {e}")
        return False

def generate_validation_report():
    """Génère un rapport de validation."""
    print("\n📊 === GÉNÉRATION DU RAPPORT ===")
    
    results = {
        'timestamp': datetime.now().isoformat(),
        'environment': check_environment(),
        'dependencies': check_dependencies(),
        'files_structure': check_files_structure(),
        'rules_system': test_rules_system(),
        'prompt_system': test_prompt_system(),
        'firebase_config': test_firebase_config(),
        'flask_server': test_flask_server()
    }
    
    # Calcul du score global
    passed_tests = sum(1 for result in results.values() if result is True)
    total_tests = len([k for k in results.keys() if k != 'timestamp'])
    score = (passed_tests / total_tests) * 100
    
    results['score'] = score
    results['status'] = 'READY' if score >= 85 else 'NEEDS_ATTENTION'
    
    # Sauvegarde du rapport
    report_file = f"validation_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"📄 Rapport sauvegardé: {report_file}")
    
    return results

def main():
    """Fonction principale de validation."""
    print("🚀 === VALIDATION SYSTÈME SQUADFIELD ===\n")
    
    try:
        # Exécution de tous les tests
        report = generate_validation_report()
        
        # Affichage du résumé
        print(f"\n🎯 === RÉSUMÉ VALIDATION ===")
        print(f"📊 Score global: {report['score']:.1f}%")
        print(f"🚦 Statut: {report['status']}")
        
        if report['status'] == 'READY':
            print("\n✅ === SYSTÈME PRÊT POUR PRODUCTION ===")
            print("🚀 Vous pouvez démarrer le serveur avec: python app.py")
            print("🌐 L'interface sera accessible via: http://localhost:3000/generate-card")
        else:
            print("\n⚠️ === ACTIONS REQUISES ===")
            failed_tests = [k for k, v in report.items() 
                          if k not in ['timestamp', 'score', 'status'] and v is False]
            for test in failed_tests:
                print(f"❌ Corriger: {test}")
        
        print("\n📋 === ÉTAPES SUIVANTES ===")
        print("1. Démarrer le backend: cd ai_card_generator && python app.py")
        print("2. Démarrer le frontend: cd front && npm run dev")
        print("3. Tester l'interface: http://localhost:3000/generate-card")
        
        return report['status'] == 'READY'
        
    except Exception as e:
        print(f"💥 Erreur validation: {e}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
