import React , {Component} from 'react';

class Bottom extends Component{
    render(){
        return(
            <div class = "bottom">
                <div class = "subscribe">
                    <h5>Subscribe</h5>
                    <form>
                    <div class="form-group">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                    </div>
                    <button type="submit" class="btn btn-outline-primary">Submit</button>
                    </form>
                </div>


                <div class = "contact">
                    <h6>Contact Us</h6>
                    <br/>
                    <ul>
                        <li>778-123-1234</li>
                        <li>sneakers@sneakers.com</li>
                        <li>Monday-Friday 9am-5pm</li>
                    </ul>
                </div>
                <div class = "contact1">
                    <h6>About Sneakers</h6>
                    <br/>
                    <ul>
                        <li>About Us</li>
                        <li>Social Media</li>
                        <li>Career</li>
                    </ul>
                </div>

                <div class = "contact">
                    <h6>You Must Know</h6>
                    <br/>
                    <ul>
                        <li>Common Questions</li>
                        <li>Return Sneakers</li>
                        <li>Payment Methods</li>
                        <li>Service</li>
                        <li>Privacy</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Bottom;