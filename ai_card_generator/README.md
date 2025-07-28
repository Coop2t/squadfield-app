# Générateur de Cartes IA SquadField 🎯

Système automatisé de génération de cartes SquadField utilisant GPT-4 + DALL·E pour créer des cartes de collection personnalisées.

## 🎯 Fonctionnalités

- **Analyse automatique** des données joueur (âge, stats, photo)
- **Application des règles SquadField** (catégories d'âge, couleurs de carte)
- **Génération de prompt dynamique** pour DALL·E optimisé
- **Génération d'image IA** via OpenAI DALL·E 3
- **Upload automatique** sur Firebase Storage
- **Logging complet** de toutes les générations

## 🏗️ Architecture

```
ai_card_generator/
├── generate_card.py         # 🚀 Script principal
├── rules.py                 # ⚽ Règles SquadField (âge, score, couleur)
├── prompt_builder.py        # 🤖 Générateur de prompt dynamique
├── firebase_uploader.py     # ☁️ Upload Firebase Storage
├── test_players.json        # 👥 Données de test
├── .env                     # 🔐 Variables d'environnement
├── requirements.txt         # 📦 Dépendances Python
└── logs/                    # 📄 Logs de génération
```

## ⚽ Règles SquadField Intégrées

### Catégories d'Âge
- **< 20 ans** → U8, U10, U12, U15, U17, U20
- **20-29 ans** → Elite
- **30-39 ans** → Senior  
- **40+ ans** → Master

### Couleurs de Carte (selon score)
- **< 65** → Gris
- **65-74** → Bronze
- **75-79** → Jaune
- **80-84** → Vert
- **85-89** → Violet
- **90-94** → Doré
- **95-98** → Platine
- **99-100** → Star

## 🚀 Installation

### 1. Prérequis
```bash
# Python 3.8+
python --version

# Dépendances
pip install -r requirements.txt
```

### 2. Configuration
```bash
# Copier le fichier .env et configurer
cp .env .env.local

# Éditer .env.local avec vos clés
OPENAI_API_KEY=sk-your-openai-key-here
FIREBASE_SERVICE_ACCOUNT_PATH=path/to/firebase-credentials.json
FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
```

### 3. Fichiers Firebase
- Télécharger le fichier de credentials Firebase
- Le placer dans le dossier et mettre à jour le chemin dans `.env`

## 🎮 Utilisation

### Génération Basique
```bash
python generate_card.py --player Auguste
```

### Avec Vérification Config
```bash
python generate_card.py --player Auguste --check-config
```

### Exemple de Sortie
```
🚀 === GÉNÉRATEUR DE CARTES IA SQUADFIELD ===

🔧 Vérification de la configuration...
✅ OpenAI configuré avec succès
✅ Configuration Firebase valide

🏃‍♂️ === Génération de carte pour Auguste ===

✅ Joueur trouvé: Auguste
⚽ Application des règles SquadField...
📊 Score global: 76
👥 Catégorie: Senior
🎨 Couleur de carte: jaune

🤖 Construction du prompt DALL·E...

================================================================================
📝 PROMPT GÉNÉRÉ:
================================================================================
Génère une carte réaliste SquadField de collection avec fond jaune doré éclatant...
================================================================================

🎨 Génération de l'image avec DALL·E 3...
✅ Image générée avec succès: https://oaidalleapiprodscus.blob.core.windows.net/...

☁️ Upload sur Firebase Storage...
✅ Image uploadée avec succès: cards_ai/Auguste_jaune_20250728_111234_a1b2c3d4.png
🔗 URL publique: https://storage.googleapis.com/your-bucket/cards_ai/Auguste_jaune...

📄 Log sauvegardé: logs/generation_20250728_111234.json

🎉 === GÉNÉRATION TERMINÉE AVEC SUCCÈS ===
🏃‍♂️ Joueur: Auguste
📊 Score: 76 (jaune)
👥 Catégorie: Senior
🔗 URL DALL·E: https://oaidalleapiprodscus.blob.core.windows.net/...
☁️ URL Firebase: https://storage.googleapis.com/your-bucket/cards_ai/Auguste_jaune...
```

## 👥 Joueurs de Test Disponibles

Le fichier `test_players.json` contient :
- **Auguste** (37 ans, Senior, score 76) → Carte Jaune
- **Marie** (22 ans, Elite, score 85) → Carte Violet  
- **Lucas** (16 ans, U17, score 69) → Carte Bronze

## 🔧 Personnalisation

### Ajouter un Nouveau Joueur
```json
{
  "prenom": "NouveauJoueur",
  "age": 25,
  "photo_url": "https://storage.googleapis.com/squadfield/player.jpg",
  "sport": "Foot",
  "stats": {
    "technique": 85,
    "vitesse": 78,
    "physique": 82,
    "tirs": 80,
    "defense": 75,
    "passe": 88
  }
}
```

### Modifier les Paramètres DALL·E
```bash
# Dans .env
DALLE_MODEL=dall-e-3
DALLE_SIZE=1024x1024
DALLE_QUALITY=hd    # standard ou hd
```

### Personnaliser les Prompts
Éditer `prompt_builder.py` → fonction `build_dalle_prompt()`

## 📊 Monitoring

### Logs de Génération
Chaque génération crée un log détaillé dans `logs/generation_TIMESTAMP.json` :
```json
{
  "timestamp": "2025-07-28T11:17:34",
  "player": "Auguste",
  "age_category": "Senior",
  "overall_score": 76,
  "card_color": "jaune",
  "prompt": "Génère une carte réaliste SquadField...",
  "dalle_url": "https://oaidalleapiprodscus.blob...",
  "firebase_url": "https://storage.googleapis.com...",
  "success": true
}
```

### Vérification Config
```bash
python generate_card.py --player Auguste --check-config
```

## 🔐 Sécurité

- ✅ Variables d'environnement pour les clés API
- ✅ Validation des données d'entrée
- ✅ Gestion d'erreurs robuste
- ✅ Logs sécurisés (pas de clés API)

## 🛠️ Dépannage

### Erreur "OPENAI_API_KEY manquante"
```bash
# Vérifier le fichier .env
cat .env
# Ajouter votre clé OpenAI
echo "OPENAI_API_KEY=sk-your-key-here" >> .env
```

### Erreur Firebase
```bash
# Vérifier le fichier de credentials
ls -la path/to/firebase-credentials.json
# Vérifier les permissions
python -c "from firebase_uploader import check_firebase_config; check_firebase_config()"
```

### Erreur DALL·E
- Vérifier le quota OpenAI
- Vérifier la validité de la clé API
- Réduire la complexité du prompt si nécessaire

## 🚀 Évolutions Futures

- [ ] Support vidéo pour analyse automatique des stats
- [ ] Templates de carte personnalisés
- [ ] Génération en batch pour plusieurs joueurs
- [ ] Interface web pour visualisation
- [ ] Intégration API SquadField complète

## 📞 Support

En cas de problème :
1. Vérifier la configuration avec `--check-config`
2. Consulter les logs dans `logs/`
3. Vérifier les quotas OpenAI
4. Tester avec un joueur simple (Auguste)

---

**🎯 SquadField - Génération IA de Cartes Premium** ⚽
