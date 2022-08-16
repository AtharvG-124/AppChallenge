import { initializeApp } from "firebase/app"
import {
    getFirestore, collection, getDocs,
    addDoc
} from 'firebase/firestore'
import {
    getAuth, createUserWithEmailAndPassword, signOut
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAdWCJxEHmQQCVmWfXMTHD_NjrlAOKkpCA",
    authDomain: "fir-testing2-aafd5.firebaseapp.com",
    databaseURL: "https://fir-testing2-aafd5-default-rtdb.firebaseio.com",
    projectId: "fir-testing2-aafd5",
    storageBucket: "fir-testing2-aafd5.appspot.com",
    messagingSenderId: "886071641020",
    appId: "1:886071641020:web:f57ebc362c6968027e21b9",
    measurementId: "G-4NFJ0QQBGL"
}

// Initialize Firebase App
initializeApp(firebaseConfig)

// Initialize Services
const db = getFirestore()
const auth = getAuth()

export {firebaseConfig, db, auth}