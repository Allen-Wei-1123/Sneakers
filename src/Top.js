import React , {Component,Fragment} from 'react';
import $ from 'jquery'
class Top extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    
   
       
    }
    render(){
        return(
            <Fragment>
                <div class= "top">
                        <div class = "logo" >
                            <a href = "/">
                                Sneakers
                            </a>
                        </div>
                        <ul id = "top-id">
                            <li id = "top-li">
                                <a class = "title" href = "#" >Air Jordan</a>
                                <ul class = "cate-ul">
                                       <li class = "cate-li">
                                          <ul class = "aj1-5">
                                              <li><a href = "#">Air Jordan 1</a></li>
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
                            <li id = "top-li"><a class = "title" href = "/cart">Cart</a></li>
                        </ul>

                        
                </div>

                
                
               
            </Fragment>
        )
    }
}

export default Top;