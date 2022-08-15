import { initializeApp } from "firebase/app"
import {
    getFirestore, collection, getDocs,
    addDoc
} from 'firebase/firestore'
import {
    getAuth, createUserWithEmailAndPassword
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

// Collection Ref
const applicantCol = collection(db, 'Job Applicants')

// Get Collection Data
getDocs(applicantCol)
    .then((snapshot) => {
        let applicants = []
        snapshot.docs.forEach((doc) => {
            applicants.push({ ...doc.data(), id: doc.id})
        })
        console.log(applicants)
    })
    .catch(err => {
        console.log(err.message) 
    })

// Add Data
const addInterests = document.querySelector(".interests")
const selectedInterests = document.getElementsByClassName("pill--selected")
const addBasicInfo = document.querySelector(".basicInfo")
const experienceContent = document.querySelector(".experienceContent")
const accountContent = document.querySelector(".accountContent")

let userdata = {}
let interests = []

addInterests.addEventListener('submit', (e) => {
    e.preventDefault()
    interests = []

    for (let i = 0; i < selectedInterests.length; i++){
        interests.push(selectedInterests[i].innerHTML)
    }
    
    if (interests.length === 0){
        alert("We recommend that you choose interests so we can deliver jobs that you prefer.")
    }
})

addBasicInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    userdata = {
        interest: interests,
        fullName: document.getElementById("first").value + " " + document.getElementById("last").value,
        birthday: document.getElementById("birthday").value,
        location: document.getElementById("location").value,
        summary: document.getElementById("summary").value,
        website: document.getElementById("website").value,
        linkedInProfile: document.getElementById("linkedInProfile").value
    }
})

experienceContent.addEventListener('submit', (e) => {
    e.preventDefault()
    userdata["work"] = document.getElementById("work").value;
    userdata["education"] = document.getElementById("education").value;
    userdata["skills"] = document.getElementById("skills").value;
})

accountContent.addEventListener('submit', (e) => {
    e.preventDefault()
    userdata["email"] = document.getElementById("email").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created', cred.user)
        })

    addDoc(applicantCol, userdata)
        .then(() => {
            console.log("adding done")
        })
        .catch((err) => {
            console.log(err)
        })
})

const basicInfo = document.getElementById("basicInfo")
const fname = document.getElementById("first")
const lname = document.getElementById("last")
const bday = document.getElementById("birthday")
const summary = document.getElementById("summary")
const location = document.getElementById("location")

basicInfo.addEventListener('submit', (e) => {
    e.preventDefault();

    if (
        fname.value === "" || fname.value === null ||
        lname.value === "" || lname.value === null ||
        bday.value === "" || bday.value === null ||
        summary.value === "" || summary.value === null ||
        location.value === "" || location.value === null
        ){
            alert("One or more values are not filled in");
    }
    else{
        nextClicked()
    }

})
