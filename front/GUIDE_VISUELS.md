# 📁 Guide d'Intégration des Visuels - SquadField MVP

## Structure des Dossiers Créée

```
public/
├── assets/
│   ├── cards/           ← Images des cartes finales (LUCIA, etc.)
│   ├── players/         ← Photos des joueurs/sportifs
│   ├── backgrounds/     ← Arrière-plans de cartes
│   ├── logos/          ← Logos d'équipes/clubs existants
│   └── ui/             ← Éléments d'interface (icônes, etc.)
├── images/             ← Images générales du site
└── logos/              ← Logos principaux (déjà existant)
```

## 🎯 Où Déposer Vos Visuels

### 1. **Images de Cartes Complètes** (comme LUCIA)
**Dossier :** `public/assets/cards/`
**Nommage :** `lucia-card.png`, `player-name-card.png`
**Format :** PNG avec transparence
**Taille recommandée :** 400x600px (ratio 2:3)

### 2. **Photos de Joueurs/Sportifs**
**Dossier :** `public/assets/players/`
**Nommage :** `lucia-portrait.jpg`, `player-name.jpg`
**Format :** JPG ou PNG
**Taille recommandée :** 800x800px minimum (carré pour flexibilité)

### 3. **Logos d'Équipes/Clubs**
**Dossier :** `public/assets/logos/`
**Nommage :** `club-name-logo.png`, `team-logo.svg`
**Format :** PNG (avec transparence) ou SVG
**Taille recommandée :** 200x200px minimum

### 4. **Arrière-plans de Cartes**
**Dossier :** `public/assets/backgrounds/`
**Nommage :** `gold-background.png`, `legendary-bg.png`
**Format :** PNG ou JPG
**Taille recommandée :** 400x600px

## 📱 Optimisations Mobile-First

### Tailles d'Images Recommandées

```javascript
// Images responsive avec Next.js
<Image
  src="/assets/cards/lucia-card.png"
  alt="Carte LUCIA"
  width={400}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  className="object-cover"
/>
```

### Breakpoints Mobile-First
- **Mobile :** 320px - 640px (1 colonne)
- **Tablet :** 640px - 1024px (2 colonnes)
- **Desktop :** 1024px+ (3-4 colonnes)

## 🎨 Integration dans le Code

### Exemple d'Utilisation

```jsx
// Dans votre composant
import Image from 'next/image';

const CardDisplay = ({ cardData }) => (
  <div className="aspect-[2/3] relative">
    <Image
      src={`/assets/cards/${cardData.imageName}`}
      alt={cardData.playerName}
      fill
      className="object-cover rounded-xl"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
  </div>
);
```

## 🔧 Formats et Qualités

### Pour les Cartes Principales
- **Format :** PNG (transparence supportée)
- **Qualité :** Haute définition pour l'affichage détaillé
- **Compression :** Optimisée pour le web

### Pour les Photos de Joueurs
- **Format :** JPG (pour les photos) ou PNG (si transparence nécessaire)
- **Qualité :** 85-90% de compression
- **Taille :** Minimum 800x800px pour la flexibilité

## 📋 Liste de Contrôle

- [ ] Déposer les images dans les bons dossiers
- [ ] Nommer les fichiers de manière cohérente
- [ ] Optimiser la taille des images (< 500KB par image)
- [ ] Tester l'affichage sur mobile
- [ ] Vérifier la qualité sur tous les écrans
- [ ] S'assurer que les images sont responsive

## 🚀 Prochaines Étapes

1. **Déposez vos visuels** dans les dossiers correspondants
2. **Testez l'affichage** avec le composant ResponsiveCardGrid
3. **Ajustez les tailles** si nécessaire
4. **Optimisez** pour les performances mobile

---

**Questions ?** N'hésitez pas à demander des ajustements spécifiques !
