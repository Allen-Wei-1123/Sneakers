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
const Router = () =>(
    <BrowserRouter>
        <Switch>

            <Route path = "/" exact component= {FrontPage}></Route>
            <Route path = "/login" component= {LoginPage}></Route>
            <Route path = "/shoes/:id" component= {Details}></Route>
            <Route path = "/cart" component= {ShoppingCart}></Route>
            <Route path = "/shoestbl" component = {ShoesTbl}></Route>
            
        </Switch>
    </BrowserRouter>
)


export default Router