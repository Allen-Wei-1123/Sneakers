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

    handleCheckOut = e => { 
        if(this.state.total == 0){
            alert("no cart added")
        }else{
            alert("checked out")
            axios.post("http://localhost:8085/removeall").then(res =>{
                console.log("done")
            })
            this.removeAllSheos();
        }
    }

    handleNewTotal = (newtotal) =>{
            this.setState((prev,curr)=>({
                total: prev.total - this.cvtPricetoInt(newtotal)
            }))

    }

    handleNewTotal2  = (newtotal) =>{
        this.setState((prev,curr)=>({
            total : prev.total + newtotal,
        }))
    }

    

    state = {
        sizes:[],
        cart:[],
        shoesinfos:[],
        total : 0 ,
    }


    deleteTblCell(id, value){
        var tmp = [...this.state.shoesinfos];
        var filteredtmp  = tmp.filter((item)=>item[0][1] != value)
        console.log(filteredtmp)
        
        this.setState({
            shoesinfos:filteredtmp
        })

        console.log("id is ",id);

        var baseurl = "http://localhost:8085/remove/0/"+id
        axios.post(baseurl).then(res =>{
            console.log("done")
        })
        
    }


    removeAllSheos(){
        this.setState({
            sizes:[],
            cart:[],
            shoesinfos:[],
            total : 0 ,
        })

    }

    cvtPricetoInt (pricevalue){
        var n = pricevalue.length;
        var word= pricevalue.substring(1,n);
        return parseInt(word);
    }

    componentDidMount(){
        this.setState({
            DeleteFunc : DeleteRow
        })

        this.deleteTblCell = this.deleteTblCell.bind(this)

        var url = "http://localhost:8085/users/1"
        var obj;
        var values = 0 ; 
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                sizes : data[0]["sizes"],
                cart : data[0]["cart"]
            })
            var url2 = "http://localhost:8085/shoes/"
            var cartarr = this.state.cart
            var i = 0 ;
            cartarr.map((item)=>{


                fetch(url2 + item)
                .then((res)=>res.json())
                .then((data)=>{
                    var img = data[0]["image"]
                    var name = data[0]["name"]
                    var itemid = data[0]["id"]
                    var price = data[0]["sizes"][this.state.sizes[i]]
                    var size = this.state.sizes[i];
                    
                    var arr = [img,name,price,size,itemid]
                    
                    var joined = [arr]                    
                    console.log("values is ",values);

                    this.setState({
                        shoesinfos:[...this.state.shoesinfos,joined],
                    })
                    this.setState((prevState,props)=>({
                        total : prevState.total + this.cvtPricetoInt(price),
                    }))
                    i++;
                    
                })
            })
        })

        
    }

    
    

    render(){
        return(
            <Fragment>
                <Top/>
                <ShortCut></ShortCut>
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
                                this.state.shoesinfos.map((item)=>{
                                    return <CartItems key = {item[0][4]} idnum = {item[0][4]}img = {item[0][0]  } name = {item[0][1]} price = {item[0][2]} 
                                        size = {item[0][3]} deleteCell = {this.deleteTblCell}  handleNewTotal = {this.handleNewTotal} handleNewTotal2 = {this.handleNewTotal2}
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