import {
    collection, getDocs,
    addDoc
} from 'firebase/firestore'
import {
    createUserWithEmailAndPassword, signOut
} from 'firebase/auth'
import {db, auth, firebaseConfig} from "../dist/firebase.js"

// Collection Ref
const businessCol = collection(db, 'Small Businesses')

// Get Collection Data
getDocs(businessCol)
    .then((snapshot) => {
        let businesses = []
        snapshot.docs.forEach((doc) => {
            businesses.push({ ...doc.data(), id: doc.id})
        })
        console.log(businesses)
    })
    .catch(err => {
        console.log(err.message) 
    })

// Add Data
const addBasicInfo = document.querySelector(".basicInfo")
const accountContent = document.querySelector(".accountContent")

let userdata = {}

addBasicInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    userdata = {
        businessName: document.getElementById("businessName").value,
        established: document.getElementById("establishDay").value,
        location: document.getElementById("location").value,
        summary: document.getElementById("summary").value,
        website: document.getElementById("website").value,
        linkedInProfile: document.getElementById("linkedInProfile").value
    }

    console.log(userdata)
})

accountContent.addEventListener('submit', (e) => {
    e.preventDefault()
    userdata["email"] = document.getElementById("email").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
        
    addDoc(businessCol, userdata)
        .then(() => {
            console.log("adding done")
        })
        .catch((err) => {
            console.log(err)
        })

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) =>{
            console.log(user.cred)
        }
            // location.href = "../../home.html"
        )
    accountContent.reset()
    
})

const basicInfo = document.getElementById("basicInfo")
const businessName = document.getElementById("businessName")
const est = document.getElementById("establishDay")
const summary = document.getElementById("summary")
const location = document.getElementById("location")

basicInfo.addEventListener('submit', (e) => {
    e.preventDefault();

    if (
        businessName.value === "" || businessName.value === null ||
        est.value === "" || est.value === null ||
        summary.value === "" || summary.value === null ||
        location.value === "" || location.value === null
        ){
            alert("One or more values are not filled in");
    }
    else{
        nextClicked()
    }

})
