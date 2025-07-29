import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: displayName
        });
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function updateUserProfile(updates) {
    return updateProfile(currentUser, updates);
  }

  useEffect(() => {
    let unsubscribe = () => {};
    
    try {
      // Vérifier que auth est disponible et valide
      if (auth && typeof auth.onAuthStateChanged === 'function') {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
        });
      } else if (auth && typeof auth.onAuthStateChanged === 'function') {
        // Utiliser la méthode directe si disponible
        unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setLoading(false);
        });
      } else {
        // Mode fallback - pas d'auth disponible
        console.warn('⚠️ Auth non disponible - mode fallback');
        setCurrentUser(null);
        setLoading(false);
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation de l\'auth listener:', error);
      setCurrentUser(null);
      setLoading(false);
    }

    return () => {
      try {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      } catch (error) {
        console.error('❌ Erreur lors du cleanup de l\'auth listener:', error);
      }
    };
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
