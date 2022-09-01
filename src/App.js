import React from 'react';
import Home from './components/home/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Checkout from './components/checkout/Checkout';
import Login from './components/login/Login';
import Payment from './components/payment/Payment';
import auth from './components/firebase';
import { useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

import './App.css';
import { useStateValue } from './components/StateProvider';
import Header from './components/header/Header';


 const stripePromise = loadStripe(
   "pk_test_51LdCUeKTfsZOaFc9vuw38O9jMbtiKkIOhNM9yDY2YN3WqMm7p41IXqIFZpm6KHgUjej5NQtQvo8B7xG427iZcxpp00q2vyW5xo"); 

function App() {
  const [{},dispatch] = useStateValue();
  useEffect(() => {
   auth.onAuthStateChanged(authUser =>{
    console.log('user is login >>>>',authUser);

    if(authUser){
      // user is login / user was login
      dispatch({
        type:'SET_USER',
        user:authUser
      })
    }else{
        //if the user is logout
        dispatch({
          type:'SET_USER',
        user:null
        })
    }
   })
  
    
  }, [ ])
  
  return (
    <Router>
    <div className="App">
     <Routes>
          <Route exact path='/login' element={<Login/>}/>   
          <Route exact path='/' element={<><Header/><Home /></>} />
          <Route exact path='/checkout' element={<><Header /> <Checkout/></>} />  
          <Route exact path='/payment' element={<><Header/>
          <Elements stripe={stripePromise}>
             <Payment />
          </Elements>
          </>} />      
     </Routes>
        </div>
    </Router>
  );
}

export default App;
