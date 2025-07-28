# 🎨 CHARTE GRAPHIQUE SQUADFIELD
**Version 1.0 - Janvier 2025**

---

## 🎯 IDENTITÉ VISUELLE

### Concept
SquadField adopte un style **Gaming Premium** fusionnant l'univers des jeux de football (FIFA, FC) avec des codes visuels **cyber-sportifs** modernes. L'identité se veut **accessible mais premium**, avec une approche **mobile-first**.

### Mots-clés
- **Gaming** • **Premium** • **Digital** • **Sportif** • **Accessible**

---

## 🎨 PALETTE DE COULEURS

### Couleurs Principales

#### **Bleu SQUADFIELD Digital** (Primary)
```css
#1890FF /* Couleur signature */
#096DD9 /* Variante sombre */
#BAE7FF /* Variante claire */
```
**Usage :** Boutons principaux, liens, éléments interactifs

#### **Or SQUADFIELD Premium** (Secondary)
```css
#FAAD14 /* Or principal */
#D48806 /* Or sombre */
#FFF1B8 /* Or clair */
```
**Usage :** Highlights, éléments premium, call-to-actions

#### **Bleu Cyber** (Accent)
```css
#13C2C2 /* Cyber principal */
#08979C /* Cyber sombre */
#B5F5EC /* Cyber clair */
```
**Usage :** Accents, détails tech, loading states

### Système de Rareté (Cartes)

| Rareté | Couleur | Code | Usage |
|--------|---------|------|-------|
| **Common** | Gris argent | `#9CA3AF` | Cartes débutant |
| **Uncommon** | Bleu cyber | `#13C2C2` | Cartes confirmé |
| **Rare** | Bleu SQUADFIELD | `#1890FF` | Cartes avancé |
| **Epic** | Violet premium | `#722ED1` | Cartes expert |
| **Legendary** | Or SQUADFIELD | `#FAAD14` | Cartes légendaire |
| **Mythic** | Rouge mythique | `#FF4D4F` | Cartes exceptionnelle |

### Couleurs Fonctionnelles

```css
/* Backgrounds */
Dark Primary: #0F1419
Dark Secondary: #1A1D23
Light Surface: #FAFBFC
Card Background: #FFFFFF

/* Grays */
Gray 100: #F1F3F4 (Très clair)
Gray 400: #BDC1C6 (Moyen)
Gray 700: #5F6368 (Sombre)
Gray 900: #202124 (Très sombre)
```

---

## ✍️ TYPOGRAPHIE

### Familles de Polices

#### **Orbitron** - Display/Gaming
```css
font-family: 'Orbitron', 'Inter', monospace;
font-weight: 700-900;
letter-spacing: 0.05em;
```
**Usage :** Titres principaux, logos, éléments gaming

#### **Inter** - Texte Principal
```css
font-family: 'Inter', system-ui, sans-serif;
font-weight: 400-800;
```
**Usage :** Corps de texte, navigation, interface

#### **Rajdhani** - Sport
```css
font-family: 'Rajdhani', 'Inter', sans-serif;
font-weight: 600;
letter-spacing: 0.02em;
```
**Usage :** Statistiques, données sportives, cartes

### Hiérarchie Typographique

```css
/* Titre Principal (Hero) */
font-size: 3.75rem (60px)
font-family: Orbitron
font-weight: 900
line-height: 1

/* Titre Secondaire */
font-size: 1.875rem (30px)
font-family: Inter
font-weight: 700
line-height: 1.2

/* Corps de texte */
font-size: 1rem (16px)
font-family: Inter
font-weight: 400
line-height: 1.5

/* Texte petit */
font-size: 0.875rem (14px)
font-family: Inter
font-weight: 500
line-height: 1.25
```

---

## 🎭 EFFETS VISUELS

### Dégradés Signature

#### **Gradient Primary** (Bleu SQUADFIELD)
```css
background: linear-gradient(135deg, #1890FF 0%, #096DD9 100%);
```

#### **Gradient Secondary** (Or SQUADFIELD)
```css
background: linear-gradient(135deg, #FAAD14 0%, #D48806 100%);
```

#### **Gradient Text** (Signature)
```css
background: linear-gradient(to right, #8B5CF6, #FAAD14);
background-clip: text;
color: transparent;
```

### Ombres et Glows

#### **Ombres Standards**
```css
/* Carte standard */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

/* Carte hover */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);

/* Glow SQUADFIELD */
box-shadow: 0 0 20px rgba(24, 144, 255, 0.4);

/* Glow Premium */
box-shadow: 0 0 20px rgba(250, 173, 20, 0.5);
```

### Animations Signature

#### **Pulse Glow** (Premium)
```css
@keyframes pulse-glow-gold {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(250, 173, 20, 0.5);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 35px rgba(250, 173, 20, 0.7);
    transform: scale(1.02);
  }
}
```

#### **Shine Effect** (Cartes)
```css
@keyframes shine {
  0% { transform: translateX(-200%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}
```

---

## 🃏 COMPOSANTS UI

### Boutons

#### **Bouton Primary** (Action principale)
```css
background: linear-gradient(135deg, #8B5CF6, #1890FF);
color: white;
padding: 12px 24px;
border-radius: 12px;
font-weight: 700;
transition: all 0.2s;
box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);

/* Hover */
transform: scale(1.05);
box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
```

#### **Bouton Secondary** (Action secondaire)
```css
background: linear-gradient(135deg, #FAAD14, #D48806);
color: white;
/* Mêmes propriétés que primary */
```

#### **Bouton Outline** (Action tertiaire)
```css
border: 2px solid #8B5CF6;
color: #8B5CF6;
background: transparent;
/* Hover: background: rgba(139, 92, 246, 0.1) */
```

### Cartes

#### **Carte Standard**
```css
background: white;
border-radius: 24px;
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
border: 1px solid #E8EAED;
transition: all 0.3s;

/* Hover */
transform: scale(1.02);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
```

#### **Carte Premium** (Rareté)
```css
/* Bordure dorée */
background: linear-gradient(135deg, #FAAD14, #D48806);
padding: 2px;
border-radius: 24px;

/* Contenu interne */
background: white;
border-radius: 22px;
```

### Navigation

#### **Menu Principal**
```css
background: rgba(0, 0, 0, 0.2);
backdrop-filter: blur(16px);
border-bottom: 1px solid rgba(255, 255, 255, 0.1);
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
```css
xs: 375px   /* Mobile small */
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1440px /* Extra large */
```

### Approach Mobile-First
1. **Mobile** (320-640px) : 1 colonne, navigation simplifiée
2. **Tablet** (640-1024px) : 2 colonnes, interface adaptée
3. **Desktop** (1024px+) : 3-4 colonnes, interface complète

---

## 🎮 STYLE GAMING

### Éléments Caractéristiques

#### **Particules Animées**
```css
/* Petites particules colorées */
width: 2px; height: 2px;
background: #13C2C2;
border-radius: 50%;
animation: ping 2s infinite;
```

#### **Grid Pattern** (Arrière-plan)
```css
background-image: radial-gradient(
  circle, 
  rgba(255,255,255,0.1) 1px, 
  transparent 1px
);
background-size: 20px 20px;
```

#### **Cyber Glow**
```css
text-shadow: 0 0 10px currentColor;
filter: drop-shadow(0 0 10px currentColor);
```

---

## 🏆 USAGE DES COULEURS PAR CONTEXTE

### Page d'Accueil
- **Background :** Dark gradient (#0F1419 → #1A1D23)
- **Texte principal :** Gradient SQUADFIELD
- **CTA :** Bouton primary avec glow

### Dashboard
- **Cards :** Background blanc avec bordures colorées selon rareté
- **Navigation :** Dark translucide avec blur
- **Stats :** Couleurs fonctionnelles selon progression

### Cartes de Joueurs
- **Bordures :** Selon rareté (common → mythic)
- **Background :** Gradient radial de la couleur de rareté
- **Texte :** Blanc avec ombres pour lisibilité

---

## ✅ BONNES PRATIQUES

### Accessibilité
- **Contraste minimum :** 4.5:1 pour le texte
- **Focus visible :** Outline personnalisé
- **États hover :** Toujours définis

### Performance
- **Images :** WebP/AVIF avec fallback
- **Animations :** `will-change` et `transform`
- **Couleurs :** Variables CSS pour cohérence

### Cohérence
- **Spacings :** Multiples de 4px (4, 8, 12, 16, 24, 32...)
- **Radius :** Progression logique (8px, 12px, 16px, 24px)
- **Transitions :** Durées standardisées (0.2s, 0.3s, 0.5s)

---

## 📋 CHECKLIST DESIGN

- [ ] **Couleurs** : Respect de la palette SQUADFIELD
- [ ] **Typographie** : Hiérarchie claire et lisible
- [ ] **Espacement** : Multiples de 4px
- [ ] **Contraste** : Minimum 4.5:1
- [ ] **Mobile** : Design mobile-first
- [ ] **Animation** : Fluide et performante
- [ ] **Cohérence** : Éléments uniformisés

---

**🎯 Cette charte garantit une identité visuelle forte et cohérente pour SquadField, alliant gaming premium et accessibilité.**
