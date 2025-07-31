# ⚡ SOLUTION RAPIDE VERCEL - SQUADFIELD

## 🚨 **PROBLÈME :** Projet `squadfield-front` non connecté à Git

---

## 🎯 **SOLUTION IMMÉDIATE (5 minutes)**

### **OPTION 1 : Reconnecter le projet existant**

1. **Aller sur :** https://vercel.com/dashboard
2. **Cliquer sur :** `squadfield-front`
3. **Settings → Git Repository**
4. **Cliquer :** "Connect Git Repository"
5. **Sélectionner :** GitHub → `Coop2t/squadfield-app`
6. **Root Directory :** `front` ⚠️
7. **Save**

### **OPTION 2 : Nouveau projet (recommandé)**

1. **Dashboard Vercel → "New Project"**
2. **Import :** `Coop2t/squadfield-app`
3. **Configuration :**
   ```
   Project Name: squadfield-front
   Root Directory: front
   Build Command: npm run build
   Output Directory: .next
   ```
4. **Deploy**

---

## 🔧 **AJOUTER VARIABLES FIREBASE IMMÉDIATEMENT**

**Settings → Environment Variables → Add New :**

```
NEXT_PUBLIC_FIREBASE_API_KEY
AIzaSyCP3GU7WC26cGlrEL5H9YwJqC1KXD-Mo-M

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN  
squadfield-f1f49.firebaseapp.com

NEXT_PUBLIC_FIREBASE_PROJECT_ID
squadfield-f1f49

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
squadfield-f1f49.appspot.com

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
937099986505

NEXT_PUBLIC_FIREBASE_APP_ID
1:937099986505:web:6e4e908aa604e76d4aa198
```

**Environment :** `Production` ✅

---

## 🚀 **DÉCLENCHER DÉPLOIEMENT**

### **Méthode A : Git Push**
```bash
cd front
git add .
git commit -m "🔥 Fix Vercel deployment"
git push origin main
```

### **Méthode B : Manuel**
- Vercel → Deployments → "Redeploy"
- Décocher "Use existing build cache"

---

## ✅ **VALIDATION**

1. **URL fonctionnelle :** https://squadfield-front.vercel.app
2. **Console propre :** Pas d'erreur Firebase
3. **Auth test :** Créer compte → Dashboard OK

---

**⏱️ Temps : 5 minutes**  
**🎯 Résultat : Firebase opérationnel sur Vercel**
