import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import FrontPage from './FrontPage';
import LoginPage from './Comps/LoginPage'
import Details from './Comps/Details'
import Gallery from './Comps/Gallery'
import ShoppingCart from './Comps/ShoppingCart'
import Recommendation from './Comps/Recommendation'
import Top from './Top'
import ShoesTbl from './Comps/ShoesTbl';
import Storeshoes from './Comps/StoreShoes'
import RegisterPage from './Comps/Register'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-I9UUk6wLzqPtb-YIy1Jqh1_cvVRIK58",
  authDomain: "shoes-b9857.firebaseapp.com",
  projectId: "shoes-b9857",
  storageBucket: "shoes-b9857.appspot.com",
  messagingSenderId: "1010851631188",
  appId: "1:1010851631188:web:cdefa38af9041c2ff11dc1",
  measurementId: "G-7YEP8CD91L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Router = () =>(
    <BrowserRouter>
        <Switch>
            <Route path = "/" exact component= {FrontPage}></Route>
            <Route path = "/login" component= {LoginPage}></Route>
            <Route path = "/register" component= {RegisterPage}></Route>
            <Route path = "/shoes/:id" component= {Details}></Route>
            <Route path = "/cart" component= {ShoppingCart}></Route>
            <Route path = "/shoestbl" component = {ShoesTbl}></Route>
            <Route path="/storeshoes" component ={Storeshoes}></Route>

        </Switch>
    </BrowserRouter>
)


export default Router