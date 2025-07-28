// 🔧 Script de correction Firebase - Étape par étape
// Ce script vous aide à résoudre l'erreur api-key-not-valid

console.log("🚨 PROBLÈME DÉTECTÉ : Firebase API Key invalide");
console.log("");
console.log("📋 ÉTAPES POUR CORRIGER :");
console.log("");
console.log("1️⃣ Aller sur : https://console.firebase.google.com/");
console.log("2️⃣ Cliquer sur 'Ajouter un projet' OU ouvrir le projet existant 'squadfield-f1f49'");
console.log("3️⃣ Dans le projet, aller sur ⚙️ 'Paramètres du projet'");
console.log("4️⃣ Descendre à 'Vos applications' et cliquer sur l'icône '</>'");
console.log("5️⃣ Si pas d'app Web : cliquer 'Ajouter une application' → 'Web' → nom: 'SquadField'");
console.log("6️⃣ Copier TOUTE la configuration qui ressemble à :");
console.log("");
console.log("const firebaseConfig = {");
console.log("  apiKey: 'AIzaSy...', // ← CETTE CLÉE DOIT ÊTRE DIFFÉRENTE");
console.log("  authDomain: 'squadfield-f1f49.firebaseapp.com',");
console.log("  projectId: 'squadfield-f1f49',");
console.log("  storageBucket: 'squadfield-f1f49.appspot.com',");
console.log("  messagingSenderId: '924657832180',");
console.log("  appId: '1:924657832180:web:...' // ← CETTE CLÉE AUSSI");
console.log("};");
console.log("");
console.log("7️⃣ Remplacer dans .env.local les lignes :");
console.log("   NEXT_PUBLIC_FIREBASE_API_KEY=...");
console.log("   NEXT_PUBLIC_FIREBASE_APP_ID=...");
console.log("");
console.log("8️⃣ Redémarrer Next.js : npm run dev");
console.log("");

// Test des clés actuelles
const currentApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const currentAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

console.log("🔍 DIAGNOSTIC ACTUEL :");
console.log(`API Key actuelle : ${currentApiKey?.substring(0, 20)}...`);
console.log(`App ID actuelle  : ${currentAppId?.substring(0, 30)}...`);
console.log("");

if (currentApiKey === "AIzaSyDGHW3Q9Y6L8aXkZX5z2p4wQZ3vF1zR7Ns") {
  console.log("❌ CONFIRME : Cette API Key est INVALIDE");
  console.log("   → Vous DEVEZ la remplacer par la vraie depuis Firebase Console");
} else {
  console.log("✅ API Key semble différente de celle invalide");
}

console.log("");
console.log("🎯 ACTION REQUISE :");
console.log("   1. Aller sur Firebase Console");
console.log("   2. Copier les VRAIES clés");
console.log("   3. Remplacer dans .env.local");
console.log("   4. Redémarrer le serveur");
console.log("");
console.log("📞 BESOIN D'AIDE ? Partagez-moi la config depuis Firebase Console");
