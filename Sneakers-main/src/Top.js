import React , {Component,Fragment, useState, useEffect} from 'react';
import $ from 'jquery'
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';

const Top =()=>{
    
    const [userdata,setUserData] = useState()
    const UpdateTop = ()=>{
        if(sessionStorage.getItem("userdata") == null) return ;
        const data = sessionStorage.getItem("userdata");
        const obj = JSON.parse(data);

        if(obj["customer"] == true){
            return <li id = "top-li"><a class = "title" href = "/cart">Cart</a></li>
        }else{
            return <li id = "top-li"><a class = "title" href = "/storeshoes">Upload</a></li>
        }
    }
    const history = useHistory();
   const  SignOutButton = ()=>{
        sessionStorage.removeItem("userdata")
        history.push("/login")
    }
    
        return(
            <Fragment>
                <div className= "top">
                        <div className = "logo" >
                            <a href = "/">
                                Sneakers
                            </a>
                        </div>
                        <ul id = "top-id">
                            <li id = "top-li">
                                <a className = "title" href = "#" >Air Jordan</a>
                                <ul className = "cate-ul">
                                       <li class = "cate-li">
                                          <ul class = "aj1-5">
                                              <li><a href = "/shoestbl">Air Jordan 1</a></li>
                                              <li><a href = "#">Air Jordan 2</a></li>
                                              <li><a href = "#">Air Jordan 3</a></li>
                                              <li><a href = "#">Air Jordan 4</a></li>
                                              <li><a href = "#">Air Jordan 5</a></li>
                                          </ul>
                                       </li>
                                       <li class = "cate-li">
                                            <ul class = "aj1-5">
                                                    
                                                    <li><a href = "#">Air Jordan 6</a></li>
                                                    <li><a href = "#">Air Jordan 7</a></li>
                                                    <li><a href = "#">Air Jordan 8</a></li>
                                                    <li><a href = "#">Air Jordan 9</a></li>
                                                    <li><a href = "#">Air Jordan 10</a></li>
                                            </ul>
                                       </li>
                                       <li class = "cate-li">
                                            <ul class = "aj1-5">
                                                         <li><a href = "#">Air Jordan 11</a></li>
                                                            <li><a href = "#">Air Jordan 12</a></li>
                                                            <li><a href = "#">Air Jordan 13</a></li>
                                                            <li><a href = "#">Air Jordan 14</a></li>
                                                            <li><a href = "#">Other Jordans</a></li>
                                            </ul>
                                       </li>
                                </ul>
                            </li>
                            <li id = "top-li"><a  class = "title" href = "#">Nike</a></li>
                            <li id = "top-li"><a  class = "title" href = "#">Adidas</a></li>
                            <li id = "top-li"><a class = "title" href = "#">Streetwear</a></li>
                            <li id = "top-li"><a class = "title" href = "#">New Arrivals</a></li>
                            <li id = "top-li"><a class = "title" href = "#">Supreme</a></li>
                            {
                                UpdateTop()
                            }
                            <li id = "top-li"><a class = "title" href = "#" onClick={SignOutButton}>Sign Out</a></li>
                        </ul>

                        
                </div>

                
                
               
            </Fragment>
        )
}

export default Top;