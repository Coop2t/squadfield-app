// Configuration Firebase pour SquadField
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  connectAuthEmulator
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Configuration Firebase à partir des variables d'environnement
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Vérification de la configuration
const requiredKeys = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missingKeys = requiredKeys.filter(key => !process.env[key]);

if (missingKeys.length > 0) {
  console.error('🚨 Configuration Firebase incomplète. Variables manquantes:', missingKeys);
  console.log('📋 Vérifiez votre fichier .env.local');
}

// Initialisation de Firebase
let app;
let auth;
let db;
let storage;

try {
  // Initialiser Firebase seulement si toutes les clés sont présentes
  if (missingKeys.length === 0) {
    console.log('🔄 Initialisation de Firebase...');
    
    app = initializeApp(firebaseConfig);
    
    // Initialiser Auth avec gestion d'erreur
    try {
      auth = getAuth(app);
      console.log('✅ Firebase Auth initialisé');
    } catch (authError) {
      console.error('❌ Erreur Auth:', authError);
      throw authError;
    }
    
    // Initialiser Firestore avec gestion d'erreur
    try {
      db = getFirestore(app);
      console.log('✅ Firestore initialisé');
    } catch (dbError) {
      console.error('❌ Erreur Firestore:', dbError);
      db = null;
    }
    
    // Initialiser Storage avec gestion d'erreur
    try {
      storage = getStorage(app);
      console.log('✅ Firebase Storage initialisé');
    } catch (storageError) {
      console.error('❌ Erreur Storage:', storageError);
      storage = null;
    }
    
    console.log('✅ Firebase initialisé avec succès');
  } else {
    console.warn('⚠️ Firebase non initialisé - utilisation du mode mock');
    
    // Mode mock pour le développement
    const mockAuth = {
      currentUser: null,
      onAuthStateChanged: (callback) => {
        console.log('🔧 Mock: onAuthStateChanged');
        callback(null);
        return () => {};
      }
    };
    
    auth = mockAuth;
    db = null;
    storage = null;
  }
} catch (error) {
  console.error('❌ Erreur lors de l\'initialisation de Firebase:', error);
  console.error('Stack trace:', error.stack);
  
  // Mode fallback avec fonctions mock complètes
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      console.log('🔧 Fallback: onAuthStateChanged');
      setTimeout(() => callback(null), 100);
      return () => {};
    }
  };
  
  db = null;
  storage = null;
}

// Mock des fonctions Firebase Auth pour le mode fallback
const mockSignInWithEmailAndPassword = async (auth, email, password) => {
  console.log('🔧 Mock: signInWithEmailAndPassword', email);
  return Promise.resolve({
    user: {
      uid: 'mock-user-123',
      email: email,
      displayName: 'Test User'
    }
  });
};

const mockCreateUserWithEmailAndPassword = async (auth, email, password) => {
  console.log('🔧 Mock: createUserWithEmailAndPassword', email);
  return Promise.resolve({
    user: {
      uid: 'mock-user-' + Date.now(),
      email: email,
      displayName: 'New User'
    }
  });
};

const mockSignOut = async (auth) => {
  console.log('🔧 Mock: signOut');
  return Promise.resolve();
};

const mockUpdateProfile = async (user, profile) => {
  console.log('🔧 Mock: updateProfile');
  return Promise.resolve();
};

// Exports pour compatibilité avec AuthContext
export { 
  auth,
  db, 
  storage,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
};

export default app;
