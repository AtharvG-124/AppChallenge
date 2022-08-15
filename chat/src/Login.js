import React from 'react';
import "./Login.css";
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
    const signin = () => {
        signInWithPopup(auth, provider)
        .then(result => console.log(result))
        .catch(error => console.log(error.message));
    }
  return (
    <div className='login'>
        <div className="login__container">
            <img src="https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2018%2F12%2FWhatsApp-hed.jpg&signature=a366bcadea8dc35b0bfa53379a98a07c" alt="" />
            <div className="login__text">
                <h1>Sign in to whatsapp</h1>
            </div>

            <button onClick={signin()}>
                Sign In with Email/Password
            </button>
        </div>
    </div>
  )
}

export default Login