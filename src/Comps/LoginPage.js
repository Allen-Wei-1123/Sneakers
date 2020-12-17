import React , {Component,Fragment} from 'react';
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import '../css/Login.css'
class LoginPage extends Component{
    render(){
        return(
            <Fragment>
                <Top/>
                <ShortCut></ShortCut>
                <div class = "LoginForm">
                    <form >
                        <div class="form-group">
                        <label for="exampleInputPassword1">Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                            <label class="form-check-label" for="exampleCheck1">Subscribe Us</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <Bot/>
            </Fragment>
        )
    }
}

export default LoginPage;