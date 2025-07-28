# 📁 Restructuration du Projet SquadField

## 🎯 Objectif
Réorganisation complète du projet pour une structure claire et maintenable.

## 📊 Avant vs Après

### ❌ Structure Précédente (Problématique)
```
📁 squadfield/
├── 📁 mvp-squadfield/           # Frontend + backend mélangés
│   ├── 📁 src/                  # Code frontend Next.js  
│   ├── 📁 backend/              # Backend Python dupliqué
│   └── 📁 public/               # Assets frontend
├── 📁 squadfield-backend/       # Backend Python (2ème copie)
└── 📁 venv/                     # Environnement virtuel
```

**Problèmes identifiés :**
- ❌ Duplication backend (`mvp-squadfield/backend/` + `squadfield-backend/`)
- ❌ Structure confuse Frontend/Backend mélangés  
- ❌ Erreurs imports Pylance (visibles dans VSCode)
- ❌ Chemins de référencement complexes
- ❌ Maintenance difficile

### ✅ Structure Actuelle (Optimisée)
```
📁 squadfield/
├── 📁 front/                    # Frontend Next.js pur
│   ├── 📁 src/                  # Code React/Next.js
│   ├── 📁 public/               # Assets (images, templates)
│   ├── package.json             # Dépendances Node.js
│   └── *.config.js              # Configuration Next.js
├── 📁 back/                     # Backend Python unifié
│   ├── 📁 auto_generator/       # Système génération cartes
│   ├── 📁 templates/            # Templates cartes
│   ├── 📁 output/               # Cartes générées
│   ├── app.py                   # API Flask
│   ├── dalle_service.py         # Service IA DALL-E
│   └── requirements.txt         # Dépendances Python
├── 📁 venv/                     # Environnement virtuel Python
└── 📁 docs/                     # Documentation projet
```

## 🎨 Coordonnées Figma Intégrées 

### 📐 Template SquadField (1826×2441px)
```python
emplacements_figma = {
    "prenom":       {"x": 255,  "y": 124,  "font_size": 110},
    "age":          {"x": 1391, "y": 724,  "font_size": 80},
    "note_globale": {"x": 1327, "y": 1119, "font_size": 150},
    "technique":    {"x": 750,  "y": 1563, "font_size": 80},
    "vitesse":      {"x": 1522, "y": 1760, "font_size": 80},
    "physique":     {"x": 750,  "y": 1760, "font_size": 80},
    "tirs":         {"x": 1522, "y": 1760, "font_size": 80},
    "defense":      {"x": 750,  "y": 1954, "font_size": 80},
    "passe":        {"x": 1522, "y": 1954, "font_size": 80}
}
```

### 🎨 Style Appliqué
- **Police**: Bebas Neue (fallback: Arial)
- **Couleur**: Noir #000000 (uniforme)
- **Centrage**: `anchor="mm"` pour texte centré
- **Format**: Uniquement chiffres, labels supprimés

## 🔧 Fichiers Clés Mis à Jour

### Backend (`back/`)
- `auto_generator/batch_processor.py` → Coordonnées Figma appliquées
- `auto_generator/font_manager.py` → Police Bebas Neue configurée  
- `README_GENERATION_AUTO.md` → Documentation technique

### Frontend (`front/`)
- Structure Next.js préservée
- Assets transférés vers `public/`
- Configuration inchangée

## 🚀 Commandes de Test

### Lancer le Backend
```bash
cd back
python app.py
```

### Tester la Génération
```bash
cd back  
python test_figma_coordinates.py
```

### Lancer le Frontend
```bash
cd front
npm run dev
```

## ✅ Résolutions

### 🐛 Erreurs Pylance Corrigées
- ✅ Imports `auto_generator.*` résolus
- ✅ Modules `dalle_service`, `card_composer` trouvés
- ✅ Structure Python cohérente

### 🎯 Coordonnées Précises
- ✅ Template Figma 1826×2441px respecté
- ✅ Positionnement exact des textes
- ✅ Carte test `Lucas_80.png` générée avec succès

### 🏗️ Architecture Claire  
- ✅ Séparation front/back nette
- ✅ Un seul backend unifié
- ✅ Documentation centralisée

## 📈 Prochaines Étapes

1. **Tests Complets** → Vérifier fonctionnement front + back
2. **Déploiement** → Configuration production
3. **IA Portraits** → Intégration DALL-E pour images joueurs
4. **Optimisations** → Performance et qualité cartes

---
*Restructuration effectuée le 28/07/2025 - Structure finale optimisée*
