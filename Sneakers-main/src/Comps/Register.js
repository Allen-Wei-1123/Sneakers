import React , {Component,Fragment, useState} from 'react';
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import '../css/Login.css'
import axios from 'axios';
import $ from 'jquery'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const RegisterPage =()=>{


    const handleEmail = e=>{
        var vals = e.target.value;
        setEmail(vals);
    }

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [customer,setCustomer] = useState(true)

    const handlePassword = e=>{
        var vals = e.target.value;
        setPassword(vals);
    }

    const handleCustomer = e=>{
        console.log("clicked")
        setCustomer(true);
    }

    const handleStore = e=>{
       setCustomer(false);
    }

    const history = useHistory();
    const handleSubmit = async(e)=>{
        const userData = {email:email,
                        password:password,
                        customer:customer}
        let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
        };                     
        try{
            await axios.post("http://127.0.0.1:8085/register",userData,axiosConfig)
            .then(response=>{
                const id = response.data.insertedId;
                userData["id"] = id;
                sessionStorage.setItem("userdata",JSON.stringify(userData));
                history.push("/")
            }).catch((err)=>{console.log(err)})
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
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {handleEmail}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" onChange = {handlePassword}/>
                        </div>
                       
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onClick={handleCustomer}/>
                            <label class="form-check-label" for="inlineRadio1">Customer</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={handleStore}/>
                            <label class="form-check-label" for="inlineRadio2">Store</label>
                        </div>
                        <a  id = "subbtn" class="btn btn-primary" onClick = {handleSubmit}>Register</a>
                    </form>
                </div>
                <Bot/>
            </Fragment>
        )
}

export default RegisterPage;