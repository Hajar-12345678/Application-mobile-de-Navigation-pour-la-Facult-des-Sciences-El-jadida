import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdYAA057ffeH3bigLw33J1E0zV-LfHHcs",
  authDomain: "projetf-d8fb1.firebaseapp.com",
  projectId: "projetf-d8fb1",
  storageBucket: "projetf-d8fb1.appspot.com",
  messagingSenderId: "893803954066",
  appId: "1:893803954066:web:df565a6fc19c16c4bd8b4b"
};
const app = initializeApp(firebaseConfig);

// Initialisez Firebase Auth avec AsyncStorage pour la persistance
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export { auth };