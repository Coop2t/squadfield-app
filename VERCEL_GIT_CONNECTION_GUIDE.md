# 🔗 GUIDE CONNEXION GIT VERCEL - SQUADFIELD

## 🚨 **PROBLÈME IDENTIFIÉ**
Le projet Vercel `squadfield-front` n'est pas connecté au repository Git
→ **Résultat :** "Aucun déploiement de production"

---

## 🎯 **SOLUTION : CONNECTER LE PROJET AU GIT**

### **📋 ÉTAPE 1 : Vérifier le Repository Git**

**1. Vérifier l'URL du repository :**
```bash
cd c:/dev/squadfield
git remote -v
```
**Résultat attendu :** `origin: https://github.com/Coop2t/squadfield-app.git`

**2. Vérifier la branche principale :**
```bash
git branch
```
**Résultat attendu :** `* main` (ou `master`)

---

## 🔧 **ÉTAPE 2 : Configuration Vercel**

### **Option A : Reconnecter le projet existant**

**1. Aller sur https://vercel.com/dashboard**

**2. Cliquer sur le projet `squadfield-front`**

**3. Settings → Git**
- Si "Git Repository" est vide ou incorrect
- Cliquer **"Connect Git Repository"**
- Sélectionner **"GitHub"**
- Chercher : `Coop2t/squadfield-app`
- Connecter le repository

**4. Configuration du Build :**
- **Root Directory :** `front` ✅
- **Build Command :** `npm run build` (auto-détecté)
- **Output Directory :** `.next` (auto-détecté)
- **Install Command :** `npm install` (auto-détecté)

### **Option B : Créer un nouveau projet (si problème)**

**1. Dashboard Vercel → "New Project"**

**2. Import Git Repository :**
- Chercher : `Coop2t/squadfield-app`
- Cliquer **"Import"**

**3. Configure Project :**
- **Project Name :** `squadfield-front`
- **Root Directory :** `front` ⚠️ **IMPORTANT**
- **Build Settings :** Laisser par défaut
- Cliquer **"Deploy"**

---

## 🔧 **ÉTAPE 3 : Variables d'Environnement**

**Après connexion Git, ajouter les variables :**

### **Settings → Environment Variables → Add New**

```env
# 1. FIREBASE CONFIG
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCP3GU7WC26cGlrEL5H9YwJqC1KXD-Mo-M
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=squadfield-f1f49.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=squadfield-f1f49
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=squadfield-f1f49.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=937099986505
NEXT_PUBLIC_FIREBASE_APP_ID=1:937099986505:web:6e4e908aa604e76d4aa198

# 2. BACKEND CONFIG
NEXT_PUBLIC_API_URL=https://votre-backend.herokuapp.com
# OU votre URL backend de production
```

**Environment :** `Production`, `Preview`, `Development`

---

## 🚀 **ÉTAPE 4 : Premier Déploiement**

### **Option A : Push Git (Automatique)**
```bash
cd front
git add .
git commit -m "🚀 Setup Vercel deployment"
git push origin main
```
→ **Résultat :** Déploiement automatique sur Vercel

### **Option B : Déploiement Manuel**
1. Vercel Dashboard → Deployments
2. Cliquer **"Create Deployment"**
3. Sélectionner la branche `main`
4. **"Deploy"**

---

## 📁 **ÉTAPE 5 : Vérification Structure**

**Votre structure doit être :**
```
squadfield-app/          ← Repository Git
├── front/               ← Root Directory Vercel ✅
│   ├── package.json
│   ├── next.config.js
│   ├── src/
│   └── public/
├── back/
├── ai_card_generator/
└── README.md
```

**⚠️ IMPORTANT :** Le Root Directory Vercel doit pointer sur `front/`

---

## 🧪 **TESTS DE VALIDATION**

### **1. Vérification connexion Git**
- **Vercel → Settings → Git** : Repository connecté ✅
- **Deployments** : Au moins 1 déploiement visible ✅

### **2. Test du site**
- URL générée : `https://squadfield-front.vercel.app`
- Page charge sans erreur 500/404 ✅
- Console : Pas d'erreur Firebase ✅

### **3. Test fonctionnel**
- `/login` → Création compte ✅
- Redirection dashboard ✅
- Authentication Firebase opérationnelle ✅

---

## 🆘 **DÉPANNAGE**

### **Erreur : "Repository not found"**
- Vérifier que `Coop2t` a accès au repository
- Repository public ou permissions Vercel configurées

### **Erreur : "Build failed"**
- Vérifier Root Directory = `front`
- Vérifier `package.json` dans le dossier `front/`
- Logs build → chercher erreur spécifique

### **Erreur : "Environment variables"**
- S'assurer que toutes les variables sont en `Production`
- Pas de typos dans les noms de variables
- Redéployer après ajout variables

---

## 📊 **CHECKLIST FINALE**

- [ ] Repository Git connecté à Vercel
- [ ] Root Directory = `front`
- [ ] Variables Firebase ajoutées (Production)
- [ ] Premier déploiement réussi
- [ ] URL production accessible
- [ ] Tests authentication OK
- [ ] Ancien projet `squadfield-mvp` supprimé/ignoré

---

**🎯 Résultat :** Projet `squadfield-front` correctement déployé avec Firebase fonctionnel !
