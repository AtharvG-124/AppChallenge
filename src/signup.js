import {
    collection, getDocs,
    addDoc
} from 'firebase/firestore'
import {
    createUserWithEmailAndPassword, signOut
} from 'firebase/auth'
import {db, auth, firebaseConfig} from "../dist/firebase.js"

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
        
    addDoc(applicantCol, userdata)
        .then(() => {
            console.log("adding done")
        })
        .catch((err) => {
            console.log(err)
        })

    createUserWithEmailAndPassword(auth, email, password)
        .then(
            location.href = "../../home.html"
        )
    accountContent.reset()
    
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
