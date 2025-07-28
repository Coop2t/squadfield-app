# 🚨 Guide de Résolution - Erreur Firebase API Key

## ❌ **PROBLÈME IDENTIFIÉ**

**Erreur** : `Firebase: Error (auth/api-key-not-valid,-please-pass-a-valid-api-key)`

**Diagnostic effectué** :
- ✅ Configuration Firebase correcte (plus d'erreur duplicate-app)
- ✅ Variables d'environnement bien chargées (`NEXT_PUBLIC_FIREBASE_*`)
- ✅ Structure du projet Firebase identifiée (`squadfield-f1f49`)
- ❌ **API Key invalide** - Le problème est confirmé

## 🔍 **ANALYSE DU PROBLÈME**

### Test Diagnostic Effectué
```bash
# Variables chargées correctement :
API Key: AIzaSyDGHW3Q9Y6L8aXk...
Auth Domain: squadfield-f1f49.firebaseapp.com
Project ID: squadfield-f1f49
Storage Bucket: squadfield-f1f49.appspot.com
Messaging Sender ID: 924657832180
App ID: 1:924657832180:web:4bc8c73f5f8...
```

**Conclusion** : Les variables sont bien lues mais l'API Key `AIzaSyDGHW3Q9Y6L8aXkZX5z2p4wQZ3vF1zR7Ns` n'est pas valide pour le projet Firebase.

## 🛠️ **SOLUTION ÉTAPE PAR ÉTAPE**

### **ÉTAPE 1 : Vérifier l'API Key dans Firebase Console**

1. Aller sur [Firebase Console](https://console.firebase.google.com/)
2. Ouvrir le projet **`squadfield-f1f49`**
3. Aller dans **"Paramètres du projet"** (⚙️ → Project settings)
4. Section **"Général"** → **"Vos applications"**
5. Trouver l'application Web et cliquer sur **"Configuration"**

### **ÉTAPE 2 : Copier la VRAIE configuration**

Vous devriez voir quelque chose comme :
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy... (VRAIE clé - différente de celle actuelle)",
  authDomain: "squadfield-f1f49.firebaseapp.com",
  projectId: "squadfield-f1f49",
  storageBucket: "squadfield-f1f49.appspot.com",
  messagingSenderId: "924657832180",
  appId: "1:924657832180:web:... (VRAIE valeur)"
};
```

### **ÉTAPE 3 : Mettre à jour `.env.local`**

Remplacer dans le fichier `mvp-squadfield/.env.local` :

```env
# AVANT (clés invalides)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDGHW3Q9Y6L8aXkZX5z2p4wQZ3vF1zR7Ns
NEXT_PUBLIC_FIREBASE_APP_ID=1:924657832180:web:4bc8c73f5f8b4c5e6d9f4a

# APRÈS (vraies clés de la console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (copier la vraie valeur)
NEXT_PUBLIC_FIREBASE_APP_ID=1:924657832180:web:... (copier la vraie valeur)
```

### **ÉTAPE 4 : Vérifications supplémentaires**

#### A. **Authentification activée ?**
1. Dans Firebase Console → **"Authentication"**
2. Onglet **"Sign-in method"**
3. Vérifier que **"Email/Password"** est **ACTIVÉ**

#### B. **Restrictions de l'API Key ?**
1. Dans **"Paramètres du projet"** → **"Général"**
2. Section **"Restrictions d'API key"**
3. Vérifier que `localhost` et votre domaine sont autorisés

#### C. **Application Web bien configurée ?**
1. Section **"Vos applications"**
2. Vérifier qu'il y a bien une application **Web** (pas seulement mobile)
3. Si manquante, cliquer **"Ajouter une application"** → **"Web"**

### **ÉTAPE 5 : Test final**

1. **Redémarrer Next.js** :
```bash
cd mvp-squadfield
# Arrêter le serveur (Ctrl+C)
npm run dev
```

2. **Tester sur** : `http://localhost:3000/login` (ou le port affiché)
3. **Créer un compte de test**
4. **Vérifier** : Plus d'erreur "api-key-not-valid" ✅

## 🔧 **COMMANDES DE DÉPANNAGE**

### Si le problème persiste après mise à jour :

```bash
# 1. Nettoyer le cache Next.js
cd mvp-squadfield
Remove-Item -Recurse -Force .next

# 2. Redémarrer complètement
npm run dev

# 3. Tester en navigation privée (évite le cache navigateur)
```

### Debug supplémentaire :
```javascript
// Ajouter temporairement dans firebase.js pour debug
console.log("🔍 DEBUG Firebase Config:");
console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
```

## 📋 **CHECKLIST FINALE**

- [ ] API Key correcte copiée depuis Firebase Console
- [ ] App ID correcte copiée depuis Firebase Console  
- [ ] Authentication Email/Password activée
- [ ] Application Web configurée dans Firebase
- [ ] Aucune restriction d'API key bloquante
- [ ] Next.js redémarré après modification `.env.local`
- [ ] Test de création de compte réussi
- [ ] Plus d'erreur "api-key-not-valid" dans la console

## 🎯 **RÉSULTAT ATTENDU**

Une fois les vraies clés configurées :
- ✅ Page `/login` se charge sans erreur
- ✅ Création de compte fonctionne  
- ✅ Connexion fonctionne
- ✅ Redirection vers `/dashboard` après authentification
- ✅ Console navigateur sans erreur Firebase

---

**Date** : 22/01/2025 18:13  
**Status** : Problème identifié - Solution détaillée fournie  
**Action** : Mettre à jour les clés Firebase avec les VRAIES valeurs de la console
