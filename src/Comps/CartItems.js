import React, {Component,Fragment} from 'react'
import $ from 'jquery'
import '../css/ShoppingCart.css'


class CartItems extends Component{
    deleteclicked = e =>{
        $(e).parents('tr').remove();
    }

    AmountChanged = e =>{
       
        this.setState({
            price : "$" + ( this.state.singlePrice * e.target.value).toString()
        })

    }

    constructor(props){
        super(props)
    }
    state = {
        singlePrice:""
    }
    componentDidMount(){
        this.setState({
            price : 1
        })
        var pricestr = ""
        var tmp = this.props.price;
        for(var i = 1 ;i<tmp.length;i++){
            pricestr += tmp[i];
        }
        this.setState({
            singlePrice : parseInt(pricestr),
            price : this.props.price
        })
    }

    render(){
        
        return(
            
            <Fragment>
                    <tr>
                        <td>
                            <img src = {process.env.PUBLIC_URL + "/images/" +this.props.img}></img>
                        </td>
                        <td id = "cart-item-name">
                            {this.props.name}
                        </td>
                        <td id = "size-td">
                            {this.props.size}
                        </td>
                        <td id = "price-td">
                            {this.state.price }
                        </td>
                        <td>
                            
                            <div class = "adjust-amount" >
                              

                                <input defaultValue="1" type="number" id="quantity"  name="quantity" min="1" max="5" onChange = {this.AmountChanged}/>
                                
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