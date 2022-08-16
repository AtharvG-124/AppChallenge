import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {db, auth, firebaseConfig} from "../dist/firebase.js"

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log("user is logged out")
    })
    .catch((err) => {
      console.log(err)
    })

})


const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password)
    .then(console.log("done"))
    .catch((err) => {
      console.log(err.message)
    })
    loginForm.reset()
    location.href = "../../home.html"


});
