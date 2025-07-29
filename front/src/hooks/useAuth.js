import { useState, useEffect } from 'react';
import { useAuth as useAuthContext } from '../context/AuthContext';
import { db } from '../lib/firebase';

// Mock des fonctions Firestore pour éviter les erreurs
const doc = (db, collection, id) => ({ collection, id });
const getDoc = async (docRef) => ({
  exists: () => false,
  data: () => ({}),
  id: docRef.id
});
const setDoc = async (docRef, data) => {
  console.log('🔧 Mock setDoc:', docRef, data);
  return Promise.resolve();
};
const updateDoc = async (docRef, data) => {
  console.log('🔧 Mock updateDoc:', docRef, data);
  return Promise.resolve();
};

/**
 * Enhanced useAuth hook with additional user data management
 */
export function useAuth() {
  const authContext = useAuthContext();
  const { currentUser, login, signup, logout, updateUserProfile } = authContext || {};
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create or get user profile from Firestore
  const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create new user profile
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString(),
          cardsCreated: 0,
          totalCardsValue: 0,
          favoritesSport: 'football',
          achievements: [],
          ...additionalData
        };
        
        await setDoc(userRef, userData);
        setUserProfile(userData);
      } else {
        setUserProfile(userSnap.data());
      }
    } catch (error) {
      setError(error.message);
      console.error('Error creating user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile in Firestore
  const updateProfile = async (updates) => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      
      setUserProfile(prev => ({
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString()
      }));
      
      // Update Firebase Auth profile if needed
      if (updates.displayName || updates.photoURL) {
        await updateUserProfile({
          displayName: updates.displayName,
          photoURL: updates.photoURL
        });
      }
    } catch (error) {
      setError(error.message);
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Increment cards created count
  const incrementCardsCreated = async () => {
    if (!currentUser || !userProfile) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const newCount = (userProfile.cardsCreated || 0) + 1;
      
      await updateDoc(userRef, {
        cardsCreated: newCount,
        updatedAt: new Date().toISOString()
      });
      
      setUserProfile(prev => ({
        ...prev,
        cardsCreated: newCount,
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error incrementing cards created:', error);
    }
  };

  // Add achievement
  const addAchievement = async (achievement) => {
    if (!currentUser || !userProfile) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const achievements = userProfile.achievements || [];
      
      if (!achievements.find(a => a.id === achievement.id)) {
        const newAchievements = [...achievements, {
          ...achievement,
          earnedAt: new Date().toISOString()
        }];
        
        await updateDoc(userRef, {
          achievements: newAchievements,
          updatedAt: new Date().toISOString()
        });
        
        setUserProfile(prev => ({
          ...prev,
          achievements: newAchievements,
          updatedAt: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  // Enhanced signup with profile creation
  const signupWithProfile = async (email, password, displayName, additionalData = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      await signup(email, password, displayName);
      // Profile creation will be handled in the useEffect when user state changes
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Enhanced login
  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Enhanced logout
  const logoutUser = async () => {
    setLoading(true);
    try {
      await logout();
      setUserProfile(null);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Load user profile when currentUser changes
  useEffect(() => {
    if (currentUser) {
      createUserProfile(currentUser);
    } else {
      setUserProfile(null);
    }
  }, [currentUser]);

  return {
    currentUser,
    userProfile,
    loading,
    error,
    signupWithProfile,
    loginUser,
    logoutUser,
    updateProfile,
    incrementCardsCreated,
    addAchievement,
    setError: (error) => setError(error)
  };
}
