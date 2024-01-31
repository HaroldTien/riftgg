import React, { useState } from 'react';
import "../../css/community/login.css";
import { signInWithEmailAndPassword ,setPersistence} from "firebase/auth"
import { auth } from '../../firebase-config';
import {GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css' //bootstrap
import ReactLoading from 'react-loading';
import AfterLogin from "../community/AfterLogin.jsx"



function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading]=useState(false)
  const [logedIN,setLogedIn]=useState(false)

  const handleGoogleAuth=(props)=>{
    setIsLoading(true)
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential)
        const token = credential.accessToken;
        console.log(token)
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        setLogedIn(true)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        console.log(error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    }).finally(()=>{
        setIsLoading(false)
    });
}


  const handleSubmit = async(event) => {
    setIsLoading(true);
    event.preventDefault();
    // Handle the login logic here
    console.log('Login Submitted', { email, password });
    try{
        const userCredential=await signInWithEmailAndPassword(auth,email,password)
        console.log(userCredential.user)
        setLogedIn(true)
    }catch(error){
        console.error('Error adding document: ', error.code);
    }finally{
        setIsLoading(false);
        
    }
    // You might want to send these details to a server or verify them somehow
  };
  if(logedIN) return(<AfterLogin />)
  return (
    <div className='login-form'>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                Email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
            </div>
            <div>
            {isLoading?<div className='loading'> <ReactLoading  type='spin' width='50px' height='50px' color='#43CDF0'  /></div>
            :<button type="submit">Login</button>
            }
            </div>

        </form>
        <div className='google-auth'>
            <button onClick={handleGoogleAuth} >Google <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
            </svg></button>
        </div>

    </div>
  );
}

export default Login;