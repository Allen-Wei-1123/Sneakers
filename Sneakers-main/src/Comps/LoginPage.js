import React , {Component,Fragment, useState, useEffect} from 'react';
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import '../css/Login.css'
import axios from 'axios';
import $ from 'jquery'
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';

const LoginPage = ()=>{


    const handleEmailAction = e=>{
        var val = e.target.value;
        handleEmail(val);
    }

    const handlePasswordAction = e=>{
        var val = e.target.value;
        handlePassword(val);
    }
    const [email,handleEmail] = useState("");
    const [password,handlePassword] = useState("");
    const history = useHistory();


    const HandleSubmit = async(e)=>{
        const userData = {email:email,password:password}
        console.log(userData)
        try{
            console.log(userData)
            const response = await axios.post("http://127.0.0.1:8085/login",userData)
            console.log("login successful")
            if(response.data){
                console.log(response.data);
                sessionStorage.setItem("userdata",JSON.stringify(response.data))
                history.push("/")
            }
            
        }catch(error){
            console.log(error);
        }
    }
    
   

        return(
            <Fragment>
                <Top/>
                <div class = "LoginForm">
                    <form >
                        <div class="form-group">
                        <label for="exampleInputPassword1">Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmailAction}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" onChange = {handlePasswordAction}/>
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                            <label class="form-check-label" for="exampleCheck1">Subscribe Us</label>
                        </div>
                        <a  id = "subbtn" class="btn btn-primary" onClick = {HandleSubmit}>Login</a>
                    </form>
                </div>
                <Bot/>
            </Fragment>
        )
}

export default LoginPage;