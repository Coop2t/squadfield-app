# 🚀 GUIDE CORRECTION FIREBASE VERCEL - SQUADFIELD

## 🎯 **OBJECTIF**
Résoudre l'erreur "Configuration Firebase incomplète – Variables manquantes" sur Vercel

---

## 📋 **ÉTAPES DE CONFIGURATION VERCEL**

### **1. Connexion Vercel**
1. Aller sur : https://vercel.com/dashboard
2. Sélectionner le projet : **`squadfield-front`**

### **2. Configuration Variables d'Environnement**
1. Cliquer sur **"Settings"** (onglet en haut)
2. Dans le menu latéral → **"Environment Variables"**
3. Supprimer toutes les anciennes variables Firebase si elles existent
4. Ajouter les 6 nouvelles variables suivantes :

---

## 🔑 **VARIABLES À AJOUTER** (Environment: **Production**)

```env
# 1. API Key
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: AIzaSyCP3GU7WC26cGlrEL5H9YwJqC1KXD-Mo-M

# 2. Auth Domain  
Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: squadfield-f1f49.firebaseapp.com

# 3. Project ID
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: squadfield-f1f49

# 4. Storage Bucket ⚠️ VÉRIFIER LA VALEUR CORRECTE
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: squadfield-f1f49.firebasestorage.app
# OU Value: squadfield-f1f49.appspot.com (selon console Firebase)

# 5. Messaging Sender ID
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 937099986505

# 6. App ID
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: 1:937099986505:web:6e4e908aa604e76d4aa198
```

### **3. Procédure d'ajout pour chaque variable :**
1. Cliquer **"Add New"**
2. **Name** : copier le nom exact (ex: `NEXT_PUBLIC_FIREBASE_API_KEY`)
3. **Value** : copier la valeur correspondante
4. **Environment** : Sélectionner **"Production"** 
5. Cliquer **"Save"**
6. Répéter pour les 6 variables

---

## 🔄 **DÉPLOIEMENT FORCÉ**

### **Option A : Via Dashboard Vercel**
1. Aller dans l'onglet **"Deployments"**
2. Cliquer sur les 3 points **"..."** du dernier déploiement
3. Sélectionner **"Redeploy"**
4. Cocher **"Use existing Build Cache"** = **NON** (décocher)
5. Cliquer **"Redeploy"**

### **Option B : Via Git Push** (recommandé)
```bash
# Dans votre terminal local
cd front
git add .
git commit -m "🔥 Fix Firebase config for production"
git push origin main
```

---

## ⚠️ **POINTS D'ATTENTION**

### **A. Storage Bucket - Valeur à vérifier**
**2 options possibles selon votre console Firebase :**
- `squadfield-f1f49.firebasestorage.app` (URL moderne Firebase v9+)
- `squadfield-f1f49.appspot.com` (URL legacy)

**➡️ VÉRIFIER dans Firebase Console > Project Settings :**
1. Section "Your apps" 
2. Configuration de l'app Web
3. Copier la valeur exacte de `storageBucket`

### **B. App ID - Vérification critique**
L'App ID doit être exactement : `1:937099986505:web:6e4e908aa604e76d4aa198`
*(Attention au "908" et non "900")*

---

## 🧪 **TESTS DE VALIDATION**

### **1. Vérification déploiement**
- Attendre que le build Vercel soit ✅ **Ready**
- URL : https://squadfield-front.vercel.app (ou votre domaine)

### **2. Test console navigateur**
1. Ouvrir le site en production
2. F12 → Console
3. **Vérifier absence de :**
   - ❌ "Configuration Firebase incomplète"
   - ❌ "api-key-not-valid"
   - ❌ "Variables manquantes"

### **3. Test fonctionnel**
1. Aller sur `/login` 
2. Essayer de créer un compte
3. **Résultat attendu :** Redirection vers dashboard sans erreur

---

## 🆘 **DÉPANNAGE**

### **Si l'erreur persiste après déploiement :**

**1. Vérifier les variables dans Vercel :**
- Settings > Environment Variables
- S'assurer que les 6 variables sont bien en **Production**
- Pas de typos dans les noms (respecter la casse)

**2. Force Clear Cache :**
- Vercel Dashboard > Functions > Clear All Cache
- Ou purger le cache CDN si domaine custom

**3. Vérifier logs Vercel :**
- Deployments > View Function Logs
- Chercher erreurs Firebase dans les logs build

---

## 📊 **CHECKLIST FINALE**

- [ ] 6 variables Firebase ajoutées en Production
- [ ] Valeurs copiées exactement (pas de trailing spaces)
- [ ] Déploiement forcé effectué (sans cache)
- [ ] Site accessible sans erreur console
- [ ] Authentification fonctionnelle en production
- [ ] Storage/Firestore opérationnels

---

**⏱️ Temps estimé :** 5-10 minutes  
**🎯 Résultat :** Firebase 100% fonctionnel sur Vercel  

**Dernière étape :** Tester l'inscription/connexion directement sur le site en production !
