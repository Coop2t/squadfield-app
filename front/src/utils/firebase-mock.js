// Firebase Mock pour le développement local
// Évite les erreurs d'API Key en mode dev

const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    console.log('🔧 Mock Auth: onAuthStateChanged called');
    callback(null); // Pas d'utilisateur connecté
    return () => {}; // Unsubscriber
  },
  signInWithEmailAndPassword: async (email, password) => {
    console.log('🔧 Mock Auth: signInWithEmailAndPassword', email);
    // Simule une connexion réussie
    return {
      user: {
        uid: 'mock-user-123',
        email: email,
        displayName: 'Test User'
      }
    };
  },
  createUserWithEmailAndPassword: async (email, password) => {
    console.log('🔧 Mock Auth: createUserWithEmailAndPassword', email);
    // Simule une création de compte réussie
    return {
      user: {
        uid: 'mock-user-' + Date.now(),
        email: email,
        displayName: 'New User'
      }
    };
  },
  signOut: async () => {
    console.log('🔧 Mock Auth: signOut');
    return true;
  }
};

const mockDb = {
  collection: (path) => {
    console.log('🔧 Mock Firestore: collection', path);
    return {
      doc: (id) => ({
        set: async (data) => {
          console.log('🔧 Mock Firestore: set document', id, data);
          return true;
        },
        get: async () => {
          console.log('🔧 Mock Firestore: get document', id);
          return {
            exists: () => false,
            data: () => null
          };
        }
      }),
      add: async (data) => {
        console.log('🔧 Mock Firestore: add document', data);
        return {
          id: 'mock-doc-' + Date.now()
        };
      }
    };
  }
};

const mockStorage = {
  ref: (path) => {
    console.log('🔧 Mock Storage: ref', path);
    return {
      put: async (file) => {
        console.log('🔧 Mock Storage: put file', file.name);
        return {
          ref: {
            getDownloadURL: async () => {
              return `https://mock-storage.com/${file.name}`;
            }
          }
        };
      }
    };
  }
};

export const auth = mockAuth;
export const db = mockDb;
export const storage = mockStorage;

export default {
  auth: mockAuth,
  db: mockDb,
  storage: mockStorage
};

console.log('🔧 Firebase Mock initialized - No API keys required!');
