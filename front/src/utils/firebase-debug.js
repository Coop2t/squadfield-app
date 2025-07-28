// Debug Firebase Configuration
console.log('🔧 FIREBASE DEBUG CONFIG:');
console.log('API_KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log('AUTH_DOMAIN:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log('PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log('STORAGE_BUCKET:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
console.log('MESSAGING_SENDER_ID:', process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
console.log('APP_ID:', process.env.NEXT_PUBLIC_FIREBASE_APP_ID);

export const debugFirebaseConfig = () => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };
  
  console.log('🚀 Firebase Config Object:', config);
  
  // Vérifier les valeurs
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      console.error(`❌ MISSING: ${key}`);
    } else {
      console.log(`✅ ${key}: ${value.substring(0, 20)}...`);
    }
  });
  
  return config;
};
