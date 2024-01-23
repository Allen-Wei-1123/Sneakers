import React, {Component,Fragment} from 'react'
import $ from 'jquery'
import '../css/ShoppingCart.css'
import axios from 'axios';


class CartItems extends Component{
    deleteclicked = async(e) =>{
        this.props.deleteCell(this.props.idnum,this.props.name);
        // var oldprice = this.state.price
        const userSessionStorage = sessionStorage.getItem("userdata")
        const userID = JSON.parse(userSessionStorage)["_id"]
        // this.props.handleNewTotal(oldprice);
        const response =  await axios.delete(`http://127.0.0.1:8085/deleteItem/${userID}/${this.props.shoeid}`).then((response)=>{
            console.log(response);
        })
    }
    cvtPricetoInt (pricevalue){
        var n = pricevalue.length;
        var word= pricevalue.substring(1,n);
        return parseInt(word);
    }
    
    deleteItem =e=>{
        
    }

    AmountChanged = async(e) =>{
       var oldamnt = this.state.amount ;
        this.setState({
            price : "$" + ( this.state.singlePrice * e.target.value).toString(),
            amount : e.target.value
        })

        if(oldamnt > e.target.value){
            this.props.handleNewTotal2(this.state.singlePrice*-1)
        }else{
            this.props.handleNewTotal2(this.state.singlePrice)
        }
        const userSessionStorage = sessionStorage.getItem("userdata")
        const userID = JSON.parse(userSessionStorage)["_id"]
        console.log("this.amount is ",this.state.amount)
        await axios.post(`http://127.0.0.1:8085/changeAmount/${userID}/${this.props.key}/${this.state.amount+1}`,{})
        .then((res)=>{
            console.log(res);
        })
    }
    state = {
        singlePrice:"",
        price:"",
        amount : this.props.amount
    }
    constructor(props){
        super(props)
        this.props = props
        console.log(props)
        
    }

    async GetAmount (){
        
    }
    componentDidMount(){
        
        var pricestr = ""
        var tmp = this.props.price;
        for(var i = 1 ;i<tmp.length;i++){
            pricestr += tmp[i];
        }
        this.setState({
            singlePrice : parseInt(pricestr),
            price : this.props.price,
            amount:this.props.amount
        })
        this.deleteclicked = this.deleteclicked.bind(this)
        
    }

    render(){
        
        return(
            
            <Fragment>
                    <tr>
                        <td>
                            <img src = {this.props.img}></img>
                        </td>
                        
                        <td id = "cart-item-name">
                            {this.props.name}
                        </td>
                        <td id = "size-td">
                            {this.props.size}
                        </td>
                        <td id = "price-td">
                            ${this.state.price  }
                        </td>
                        <td>
                            
                            <div class = "adjust-amount" >
                              

                                <input defaultValue="1" type="number" id="quantity"  name="quantity" min="1" value={this.state.amount} onChange = {this.AmountChanged}/>
                                
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