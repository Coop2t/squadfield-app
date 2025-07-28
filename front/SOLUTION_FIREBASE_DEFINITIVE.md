# 🚨 SOLUTION DÉFINITIVE - Erreur Firebase API Key

## ❌ **PROBLÈME CONFIRMÉ**

L'erreur `Firebase: Error (auth/api-key-not-valid)` persiste car l'API Key dans votre `.env.local` est **INVALIDE**.

**API Key actuelle (FAUSSE)** : `AIzaSyDGHW3Q9Y6L8aXkZX5z2p4wQZ3vF1zR7Ns`

## 🎯 **SOLUTION EN 3 ÉTAPES SIMPLES**

### **ÉTAPE 1 : Ouvrir Firebase Console**

🔗 **Aller sur** : https://console.firebase.google.com/project/squadfield-f1f49/settings/general/

Si le lien ne fonctionne pas :
1. Aller sur https://console.firebase.google.com/
2. Chercher le projet **"squadfield-f1f49"**
3. Cliquer dessus pour l'ouvrir

### **ÉTAPE 2 : Récupérer les VRAIES clés**

1. Dans Firebase Console, cliquer sur **⚙️ "Paramètres du projet"**
2. Faire défiler jusqu'à **"Vos applications"**
3. **Si vous voyez une application Web** :
   - Cliquer sur l'icône **`</>`** ou **"Configuration"**
   - Copier la configuration complète

4. **Si vous ne voyez AUCUNE application Web** :
   - Cliquer **"Ajouter une application"**
   - Choisir **"Web"** (icône `</>`)
   - Nom de l'app : **"SquadField"**
   - Copier la configuration qui s'affiche

### **ÉTAPE 3 : Remplacer dans .env.local**

Vous verrez quelque chose comme :
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // ← COPIER CETTE VALEUR
  authDomain: "squadfield-f1f49.firebaseapp.com",
  projectId: "squadfield-f1f49",
  storageBucket: "squadfield-f1f49.appspot.com",
  messagingSenderId: "924657832180",
  appId: "1:924657832180:web:XXXXXXXXXXXXXXXXXXXXX" // ← COPIER CETTE VALEUR
};
```

**Dans VSCode, ouvrir** : `mvp-squadfield/.env.local`

**REMPLACER ces 2 lignes** :
```env
# AVANT (INVALIDE)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDGHW3Q9Y6L8aXkZX5z2p4wQZ3vF1zR7Ns
NEXT_PUBLIC_FIREBASE_APP_ID=1:924657832180:web:4bc8c73f5f8b4c5e6d9f4a

# APRÈS (VRAIES VALEURS de Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_APP_ID=1:924657832180:web:XXXXXXXXXXXXXXXXXXXXX
```

## 🔄 **ÉTAPE 4 : TEST FINAL**

### A. Redémarrer Next.js
```bash
# Dans le terminal VSCode
cd mvp-squadfield
# Arrêter avec Ctrl+C puis relancer
npm run dev
```

### B. Tester l'authentification
1. Aller sur `http://localhost:3000/login` (ou le port affiché)
2. Essayer de créer un compte
3. **RÉSULTAT ATTENDU** : ✅ Plus d'erreur "api-key-not-valid"

## 🛡️ **VÉRIFICATIONS SUPPLÉMENTAIRES**

### Si ça ne marche toujours pas :

#### 1. **Authentication activée ?**
- Firebase Console → **"Authentication"**
- Onglet **"Sign-in method"**
- **"Email/Password"** doit être **ACTIVÉ**

#### 2. **Domaines autorisés ?**
- Dans **"Authentication"** → **"Settings"** → **"Authorized domains"**
- Vérifier que `localhost` est dans la liste

#### 3. **Cache Next.js ?**
```bash
cd mvp-squadfield
Remove-Item -Recurse -Force .next
npm run dev
```

## 🎉 **RÉSULTAT FINAL ATTENDU**

Une fois les VRAIES clés configurées :
- ✅ Page `/login` sans erreur console
- ✅ Création de compte réussie
- ✅ Connexion fonctionnelle
- ✅ Console navigateur propre

## 🆘 **BESOIN D'AIDE ?**

Si vous ne trouvez pas les bonnes clés dans Firebase Console :

1. **Partagez-moi un screenshot** de la page "Paramètres du projet" → "Vos applications"
2. **Ou copiez-collez** la configuration Firebase que vous voyez
3. **Ou créez un nouveau projet** Firebase si celui-ci est corrompu

---

**🔴 IMPORTANT** : Le problème vient UNIQUEMENT des clés invalides. Une fois les vraies clés mises, tout fonctionnera immédiatement.
