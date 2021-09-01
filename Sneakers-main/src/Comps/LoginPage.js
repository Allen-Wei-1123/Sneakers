import React , {Component,Fragment} from 'react';
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import '../css/Login.css'

import $ from 'jquery'


class LoginPage extends Component{

    constructor(props){
        super(props);
    }
    state = {
        email:"",
        password:"",
        dataset:{}
    }

    handleEmail = e=>{
        var val = e.target.value;
        this.setState({
            email:val
        })
    }

    handlePassword = e=>{
        var val = e.target.value;
        this.setState({
            password:val
        })
    }

    handleSubmit = e=>{
        var email = this.state.email
        var password = this.state.password
        console.log("set")
        fetch("http://127.0.0.1:8085/users")
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                dataset : data.filter((item)=>item["email"] == email && item["password"] == password)
            })
        });

        if(this.state.dataset.length > 0){
            $('#subbtn').attr('href',"/")
        }

    }

    
    componentDidMount(){
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    render(){
        return(
            <Fragment>
                <Top/>
                <div class = "LoginForm">
                    <form >
                        <div class="form-group">
                        <label for="exampleInputPassword1">Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange = {this.handleEmail}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" onChange = {this.handlePassword}/>
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                            <label class="form-check-label" for="exampleCheck1">Subscribe Us</label>
                        </div>
                        <a  id = "subbtn" class="btn btn-primary" onClick = {this.handleSubmit}>Submit</a>
                    </form>
                </div>
                <Bot/>
            </Fragment>
        )
    }
}

export default LoginPage;