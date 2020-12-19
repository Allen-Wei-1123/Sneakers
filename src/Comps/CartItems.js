import React, {Component,Fragment} from 'react'
import $ from 'jquery'
import '../css/ShoppingCart.css'


class CartItems extends Component{
    deleteclicked = e =>{
        $(e).parents('tr').remove();
    }

    AmountChanged = e =>{
        this.setState({
            price : 3
        })
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.setState({
            price : 1
        })
    }

    render(){
        
        return(
            
            <Fragment>
                    <tr>
                        <td>
                            <img src = {process.env.PUBLIC_URL + "/images/offaj.jpg"}></img>
                        </td>
                        <td id = "cart-item-name">
                            AIR JORDAN 1 RETRO HIGH OFF-WHITE Chicago
                        </td>
                        <td id = "price-td">
                            $1
                        </td>
                        <td>
                            
                            <div class = "adjust-amount" >
                              
                               
                            <input type="number" id="quantity"  name="quantity" min="1" max="5" onChange = {this.AmountChanged}/>
                                
                            </div>

                            
                        </td>
                        <td id ="button-td">
                            <button type="button" class="btn btn-danger" onClick={this.deleteclicked}>Delete</button>
                        </td>
                    </tr>
            </Fragment>
        )
    }
}

export default CartItems;