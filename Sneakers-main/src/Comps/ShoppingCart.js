import React, {Component,Fragment} from 'react'
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import '../css/ShoppingCart.css'
import $ from 'jquery'
import Card from '../Card'
import CartItems from './CartItems'

import Recom from '../Comps/Recommendation'
import axios from 'axios'

function DeleteRow(i){
    var row = "#" + i;
    $(row).remove();
}

class ShoppingCart extends Component{

    constructor(props){
        super(props);
        
    }
    getFormattedDate = () => {
        const currentDate = new Date();
    
        // Format date as "YYYY/month/date hour:minute:second"
        const formattedDate = currentDate.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        });
    
        return formattedDate;
      };
    handleCheckOut = e => { 
        const tmpdate = this.getFormattedDate();
        axios.post("http://127.0.0.1:8085/emptyCart",{id:this.state.person._id,date:tmpdate,data:this.state.dataset})
        .then((res)=>{
            console.log(res);
        })
    }

    handleNewTotal = (newtotal) =>{
            
    }

    handleNewTotal2  = (newtotal) =>{
       
    }

    

    state = {
        dataset:[]
    }


    deleteTblCell(id, value){
        
        
    }


    cvtPricetoInt (pricevalue){
        var n = pricevalue.length;
        var word= pricevalue.substring(1,n);
        return parseInt(word);
    }

    componentDidMount(){
       
        const userSessionStorage = sessionStorage.getItem("userdata")
        const userID = JSON.parse(userSessionStorage)["_id"]
        const url = "http://127.0.0.1:8085/getCartItems/"+userID;
        console.log("url "+url);
        axios.get(url)
        .then((res)=>{
            console.log(res.data.cart);
            this.setState({dataset:res.data.cart,person:res.data})
        })
    }

    render(){
        return(
            <Fragment>
                <Top/>
                <div className = "tblview" >
                    <table className="table" data-testid = "todo-1">
                        <thead>
                            <tr>
                                <th scope="col" id = "item">Item</th>
                                <th scope="col" id = "name">Name</th>
                                <th scope="col" id = "size">Size</th>
                                <th scope="col" id = "price">Price</th>
                                <th scope="col" id = "amount">Amount</th>
                                <th scope="col" id ="delete"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                (this.state.dataset||[]).map((item,index)=>{
                                    // console.log(item["img"]);
                                     return <CartItems key = {item.id} idnum = {item.id} shoeid={item.shoeid} img = { item["img"] } name = {item.name} price = {item.price} 
                                        size = {item.size} amount={item.count} deleteCell = {this.deleteTblCell}  handleNewTotal = {this.handleNewTotal} handleNewTotal2 = {this.handleNewTotal2}
                                    ></CartItems>
                                })
                            }
                           
                        </tbody>
                    </table>
                </div>
                <div className = "checkout">
                    <button type="button" class="btn btn-outline-dark btn-lg" onClick = {this.handleCheckOut}>{"$" + this.state.total + " Check Out"}</button>
                </div>
                <Recom/>
                <Bot/>
            </Fragment>
        )
    }
}

export default ShoppingCart;