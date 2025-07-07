import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAqGvOa1X76TdenpX89ZcE0EZgr96rGWfQ",
  authDomain: "matchme-d6bce.firebaseapp.com",
  projectId: "matchme-d6bce",
  storageBucket: "matchme-d6bce.firebasestorage.app",
  messagingSenderId: "468857420785",
  appId: "1:468857420785:web:a1f1d6e6caec495d42a250"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;