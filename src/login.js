import { initializeApp } from "firebase/app"
import {
    getFirestore, collection, getDocs,
    addDoc,
    doc
} from 'firebase/firestore'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
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
const auth =  getAuth()

const logoutButton = document.queryselector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log("user is logged out")
    })
    .catch((err) => {
      console.log(err)
    })

})

const loginForm = document.queryselector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('user created', user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  const user = auth.currentUser;
});

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}
