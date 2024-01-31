import React, { useState } from 'react';
import "../../css/community/register.css"
import { db,auth } from '../../firebase-config';
import { collection, addDoc,doc, getDocs,setDoc  } from "firebase/firestore";
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword } from "firebase/auth"
import ReactLoading from 'react-loading';
import AccountCreationSuccess from './AccountCreationSuccess';

function Register() {
  const {t} =useTranslation()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading,setLoading]=useState(false);
  const [error_code,setError_code]=useState(null)
  const [accountCreated,setAccountCreated]=useState(false)

  const handleSubmit = async(event) => {
    
    console.log('asdf')
    if(password!==confirmPassword){
      window.alert(t('PassWordNotComfirmed'))
      
    }else if(password===''||username===''||email==='',confirmPassword===''){
      window.alert('accomplish the form')
    }else{
      event.preventDefault();
      // Here you should include the logic for user registration
      // Like sending data to a backend server
      setLoading(true)
      console.log('Registration Submitted', { username, email, password, confirmPassword });
      try {
        const userCredential=await createUserWithEmailAndPassword(auth,email,password);
        await setDoc(doc(db,'users',userCredential.user.uid),{
          username:username,
          email:email,
        })
        console.log('User registered : '+userCredential.user);
        // Handle actions after successful registration (e.g., redirect to login)
      } catch (error) {
        console.log(error.code)
        setError_code(error.code)
        console.error('Error adding document: ', error);
        // Handle error scenarios
      } finally{
        setLoading(false) 
        setAccountCreated(true)
      }
    }


  };

  if (accountCreated) {
    return <AccountCreationSuccess />;
  }


  return (
    <form onSubmit={handleSubmit} className="registration-form">
      {error_code!==null?<p className='register-issue'>{error_code}</p>
      :null}
      
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </label>
      </div>
      <div>
        {loading?<div className='loading'> <ReactLoading  type='spin' width='50px' height='50px' color='#43CDF0'  /></div>
          :<button type="submit">Create Account</button>
        }
        
      </div>
    </form>
  );
}

export default Register;
