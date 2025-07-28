"""
Script de test pour vérifier le système de génération de cartes IA.
"""

import sys
import os
from dotenv import load_dotenv

# Chargement des variables d'environnement
load_dotenv()

def test_imports():
    """Test l'importation de tous les modules."""
    try:
        from rules import apply_squadfield_rules, validate_player_data
        from prompt_builder import build_dalle_prompt, validate_prompt_data
        from firebase_uploader import check_firebase_config
        print("✅ Tous les modules importés avec succès")
        return True
    except ImportError as e:
        print(f"❌ Erreur d'import: {e}")
        return False

def test_player_rules():
    """Test les règles SquadField avec des données test."""
    try:
        from rules import apply_squadfield_rules, get_age_category, get_card_color, calculate_overall_score
        
        # Test des catégories d'âge
        assert get_age_category(16) == "U17"
        assert get_age_category(25) == "Elite"
        assert get_age_category(35) == "Senior"
        assert get_age_category(45) == "Master"
        print("✅ Catégories d'âge correctes")
        
        # Test des couleurs de carte
        assert get_card_color(60) == "gris"
        assert get_card_color(70) == "bronze"
        assert get_card_color(76) == "jaune"
        assert get_card_color(82) == "vert"
        assert get_card_color(87) == "violet"
        assert get_card_color(92) == "doré"
        assert get_card_color(96) == "platine"
        assert get_card_color(99) == "star"
        print("✅ Couleurs de carte correctes")
        
        # Test du calcul de score
        stats = {"technique": 78, "vitesse": 75, "physique": 76, "tirs": 72, "defense": 77, "passe": 79}
        score = calculate_overall_score(stats)
        assert 70 <= score <= 80  # Moyenne attendue autour de 76
        print(f"✅ Calcul de score correct: {score}")
        
        return True
    except Exception as e:
        print(f"❌ Erreur de test des règles: {e}")
        return False

def test_prompt_generation():
    """Test la génération de prompt."""
    try:
        from prompt_builder import build_dalle_prompt
        from rules import apply_squadfield_rules
        
        # Données test
        player_data = {
            "prenom": "TestPlayer",
            "age": 25,
            "photo_url": "https://example.com/photo.jpg",
            "sport": "Foot",
            "stats": {"technique": 80, "vitesse": 75, "physique": 78, "tirs": 77, "defense": 79, "passe": 82}
        }
        
        # Application des règles
        enriched_data = apply_squadfield_rules(player_data)
        
        # Génération du prompt
        prompt = build_dalle_prompt(enriched_data)
        
        # Vérifications
        assert "TestPlayer" in prompt
        assert "Elite" in prompt  # Catégorie pour âge 25
        assert "vert" in prompt   # Couleur pour score ~78
        assert "DALL·E" not in prompt  # Pas de mention technique
        
        print("✅ Génération de prompt réussie")
        print(f"📝 Prompt généré: {len(prompt)} caractères")
        
        return True
    except Exception as e:
        print(f"❌ Erreur de génération de prompt: {e}")
        return False

def test_config():
    """Test la configuration du système."""
    try:
        # Test des variables d'environnement
        openai_key = os.getenv('OPENAI_API_KEY')
        firebase_path = os.getenv('FIREBASE_SERVICE_ACCOUNT_PATH')
        firebase_bucket = os.getenv('FIREBASE_STORAGE_BUCKET')
        
        if openai_key and openai_key != 'your_openai_api_key_here':
            print("✅ Clé OpenAI configurée")
        else:
            print("⚠️ Clé OpenAI non configurée (normal pour les tests)")
        
        if firebase_path and firebase_path != 'path/to/your/firebase-service-account.json':
            print("✅ Chemin Firebase configuré")
        else:
            print("⚠️ Firebase non configuré (normal pour les tests)")
        
        # Test de l'existence des fichiers
        if os.path.exists('test_players.json'):
            print("✅ Fichier test_players.json trouvé")
        else:
            print("❌ Fichier test_players.json manquant")
            return False
        
        if os.path.exists('logs'):
            print("✅ Dossier logs créé")
        else:
            print("❌ Dossier logs manquant")
            return False
        
        return True
    except Exception as e:
        print(f"❌ Erreur de configuration: {e}")
        return False

def main():
    """Fonction principale de test."""
    print("🧪 === TEST DU SYSTÈME DE GÉNÉRATION IA ===\n")
    
    tests = [
        ("Import des modules", test_imports),
        ("Règles SquadField", test_player_rules),
        ("Génération de prompt", test_prompt_generation),
        ("Configuration", test_config),
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"🔍 Test: {test_name}")
        try:
            result = test_func()
            results.append(result)
            print(f"{'✅' if result else '❌'} {test_name}: {'PASS' if result else 'FAIL'}\n")
        except Exception as e:
            print(f"💥 Erreur inattendue dans {test_name}: {e}\n")
            results.append(False)
    
    # Résumé
    passed = sum(results)
    total = len(results)
    
    print("=" * 50)
    print(f"📊 RÉSUMÉ: {passed}/{total} tests réussis")
    
    if passed == total:
        print("🎉 Système prêt pour la génération !")
        print("\n💡 Pour tester la génération complète:")
        print("python generate_card.py --player Auguste --check-config")
    else:
        print("⚠️ Certains tests ont échoué, vérifier la configuration")
    
    print("=" * 50)
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
