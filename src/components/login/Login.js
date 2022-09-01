import React,{useEffect,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Login.css'
import auth from '../firebase'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');

  const signIn = e =>{
    e.preventDefault(); 
    signInWithEmailAndPassword(auth, email, password)
    .then((auth =>{
       navigate('/')
       
    }))
    .catch(error =>alert(error.message))
  }
  
  const register =e =>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((auth) =>{
      console.log(auth);
      if(auth)
      {
        navigate('/')
      }
    })
    .catch(error =>alert(error.message))
  }
  return (
    <div className='login'>
        <Link to='/'>
        <img 
        className='login__logo'
        src="ocean-waveLogo.png" alt="logo"/>
      </Link>
      <div className='login__container'>
        <h1>Sign In</h1>
        <form>
            <h5>Email</h5>
            <input type='text' value={email} 
            onChange = {e => setEmail(e.target.value)}
            />
            <h5>Password</h5>
            <input type='password' value={password} 
            onChange={e =>setPassword(e.target.value)}
            />
            <button className='login__signInButton' 
            type='submit'
            onClick={signIn}
            >Sign In</button>
        </form>
        <p>
        These Terms apply to all visitors,<br/>
        users and others who access or use the Service.<br/>
        By accessing or using the Service you agree <br/>to be bound by these Terms.<br/>
         If you disagree with any part of the<br/>
         terms then you may not access the Service.
        </p>
        <button className='login__registerButton'
        onClick={register} type='submit'
        >Create your OceanWave Account</button>
      </div>
    </div>
  )
}

export default Login
