import React, {Component,Fragment} from 'react'
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import '../css/ShoppingCart.css'
import $ from 'jquery'
import Card from '../Card'
import CartItems from './CartItems'

import Recom from '../Comps/Recommendation'

function DeleteRow(i){
    var row = "#" + i;
    $(row).remove();
}

class ShoppingCart extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.setState({
            DeleteFunc : DeleteRow
        })
    }

    render(){
        return(
            <Fragment>
                <Top/>
                <ShortCut></ShortCut>
                <div class = "tblview">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" id = "item">Item</th>
                                <th scope="col" id = "name">Name</th>
                                <th scope="col" id = "price">Price</th>
                                <th scope="col" id = "amount">Amount</th>
                                <th scope="col" id ="delete"></th>
                            </tr>
                        </thead>
                        <tbody>

                            <CartItems key = "1" />    
                            <CartItems key = "2"/>  
                            <CartItems key = "3"/>    
                           
                        </tbody>
                    </table>
                </div>
                <div class = "checkout">
                    <button type="button" class="btn btn-outline-dark btn-lg">Check Out</button>
                </div>
                <Recom/>
                <Bot/>
            </Fragment>
        )
    }
}

export default ShoppingCart;