# 🚀 Guide de Déploiement SquadField - Production

## ✅ Étapes Réalisées

### 1. Configuration Git ✅
- [x] Dépôt Git initialisé
- [x] Fichiers committes (122 fichiers, 24,787 lignes)
- [x] Configuration `.gitignore` optimisée
- [x] Configuration `vercel.json` prête

### 2. Structure du Projet ✅
- [x] Frontend Next.js dans `/front`
- [x] Configuration Firebase complète
- [x] Variables d'environnement configurées
- [x] Assets et templates prêts

---

## 🔄 Prochaines Étapes à Suivre

### ÉTAPE 1: Créer le Dépôt GitHub

```bash
# Depuis votre terminal, exécuter ces commandes :
gh repo create squadfield-app --public --description "SquadField - Générateur de Cartes Football IA"
git remote add origin https://github.com/[VOTRE_USERNAME]/squadfield-app.git
git branch -M main
git push -u origin main
```

**Alternative manuelle :**
1. Aller sur [GitHub.com](https://github.com/new)
2. Nom du dépôt : `squadfield-app`
3. Public ✅
4. Description : "SquadField - Générateur de Cartes Football IA"
5. Puis exécuter :
```bash
git remote add origin https://github.com/[VOTRE_USERNAME]/squadfield-app.git
git branch -M main
git push -u origin main
```

### ÉTAPE 2: Connecter Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Se connecter avec GitHub**
3. **Import Project > GitHub**
4. **Sélectionner `squadfield-app`**
5. **Configuration Build :**
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `front`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### ÉTAPE 3: Variables d'Environnement Vercel

Dans Vercel Dashboard > Settings > Environment Variables :

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyDXVgqWyGkJGYw5fCXG-Vg8IiAcQ-lNp0M
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = squadfield-f1f49.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = squadfield-f1f49
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = squadfield-f1f49.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 937099986505
NEXT_PUBLIC_FIREBASE_APP_ID = 1:937099986505:web:6e4e900aa604e76d4aa198

# Features Configuration
NEXT_PUBLIC_ENABLE_DALLE = true
NEXT_PUBLIC_DEBUG_MODE = false
NEXT_PUBLIC_MAX_FILE_SIZE = 50MB
NEXT_PUBLIC_SUPPORTED_VIDEO_FORMATS = mp4,mov,avi
NEXT_PUBLIC_SUPPORTED_IMAGE_FORMATS = jpg,jpeg,png,webp
```

### ÉTAPE 4: Configuration Domaine OVH

#### A. Dans Vercel Dashboard
1. **Settings > Domains**
2. **Add Domain**: `squadfield.fr`
3. **Add Domain**: `www.squadfield.fr`

#### B. Dans OVH Manager - Zone DNS
Ajouter ces entrées DNS :

```dns
# Entrée principale
Type: A
Nom: @
Cible: 76.76.19.61
TTL: 3600

# Sous-domaine www
Type: CNAME  
Nom: www
Cible: cname.vercel-dns.com
TTL: 3600

# Vérification Vercel (si demandée)
Type: TXT
Nom: _vercel
Cible: [Valeur fournie par Vercel]
TTL: 3600
```

**⚠️ Important :** La propagation DNS peut prendre 24-48h

---

## 🔧 Configuration Avancée

### Preview Deployments
- ✅ **Automatique** : Chaque push sur branche = preview
- ✅ **URL Format** : `https://squadfield-app-git-[branch]-[user].vercel.app`

### Production Settings
- **Branch de Production** : `main`
- **Auto-Deploy** : ✅ Activé
- **Framework** : Next.js
- **Node.js Version** : 18.x (recommended)

### Performance Optimizations
```json
// vercel.json (déjà configuré)
{
  "framework": "nextjs",
  "buildCommand": "cd front && npm run build",
  "outputDirectory": "front/.next"
}
```

---

## 📊 URLs Finales

Après configuration complète :

- **🌐 Production** : `https://squadfield.fr`
- **🌐 WWW** : `https://www.squadfield.fr` 
- **⚡ Vercel URL** : `https://squadfield-app.vercel.app`
- **📱 Preview** : `https://squadfield-app-git-[branch].vercel.app`

---

## ✅ Checklist Final

### GitHub
- [ ] Dépôt `squadfield-app` créé
- [ ] Code pushé sur `main`
- [ ] Accès public configuré

### Vercel
- [ ] Projet importé depuis GitHub
- [ ] Build settings configurées (`front` directory)
- [ ] Variables d'environnement ajoutées
- [ ] Deploy réussi

### Domaine
- [ ] `squadfield.fr` ajouté dans Vercel
- [ ] Entrées DNS configurées dans OVH
- [ ] Certificat SSL automatique activé
- [ ] Redirection www → apex configurée

### Tests
- [ ] Site accessible sur `squadfield.fr`
- [ ] Firebase fonctionne en production
- [ ] Upload d'images/vidéos opérationnel
- [ ] Génération de cartes IA active

---

## 🎯 Commandes de Vérification

```bash
# Vérifier la configuration
curl -I https://squadfield.fr

# Tester la vitesse
npx @vercel/speed-insights

# Logs Vercel
vercel logs https://squadfield.fr
```

---

## 🔄 Workflow de Mise à Jour

1. **Développement** : Créer une branche `feature/nom`
2. **Push** : `git push origin feature/nom`
3. **Preview** : URL automatique générée
4. **Merge** : Pull Request vers `main`
5. **Deploy** : Automatique sur `squadfield.fr`

---

**🚀 Projet prêt pour la production !**
