import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {    GoogleAuthProvider,
            getAuth,
            signInWithPopup,
            createUserWithEmailAndPassword,
            updateProfile,
            onAuthStateChanged,
            signOut,
            signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-U-el9yRwKqKcE9VI_VWGqnooSGojUAM",
    authDomain: "journalapp-react-b1531.firebaseapp.com",
    projectId: "journalapp-react-b1531",
    storageBucket: "journalapp-react-b1531.appspot.com",
    messagingSenderId: "708500249975",
    appId: "1:708500249975:web:363330dd506c5102d45572"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();

export {
    app,
    db,
    auth,
    signInWithPopup,
    googleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
}