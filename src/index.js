import React from 'react'; 
import ReactDOM from 'react-dom'; 
import FrontPage from './FrontPage';
import LoginPage from './Comps/LoginPage'
import Details from './Comps/Details'
import Gallery from './Comps/Gallery'
import ShoppingCart from './Comps/ShoppingCart'
import Recommendation from './Comps/Recommendation'
import Top from './Top'


import Router from './Router.js'

// This is a functional component 




ReactDOM.render( 
    <Router />,  
    document.getElementById("root") 
); 