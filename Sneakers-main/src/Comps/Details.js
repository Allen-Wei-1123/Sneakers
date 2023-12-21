import React , {Component,Fragment} from 'react';
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import Recom from './Recommendation'
import '../css/Details.css'
import $ from 'jquery'
import axios from 'axios'
class Details extends Component{
    constructor(props){
        super(props)
    }
    state = {
        id : "",
        dataset : [],
        image:"",
        name : "",
        description:"",
        price : "",
        sizes:[],
        brand:"",
        shoesid: "",
        carts:[],
        selectedIndex:0,
        selectedsize:""
    }
    componentDidMount(){
        var url = window.location.href;
        console.log(url)

        var fields = url.split('/');
        var id = fields.pop();

        axios.get("http://127.0.0.1:8085/shoes/"+id).then((res)=>{
            console.log(res);
            const data = res.data;
            this.setState({
                id: data["_id"],
                image:data["imgurl"],
                name:data["shoename"],
                description: data["shoeDescription"],
                sizes: data["sizes"],
                brand:data["shoetype"],
            })
        })
        

    }

    handleShoes = (item,index) =>{


        console.log(item["size"])

        this.setState({
            selectedSize:item["size"],
            selectedPrice:item["price"]
        })
        const currInd = this.state.selectedIndex;
        $('#'+index).css('background-color','black');
        $('#'+index).css('color','white')
        if(currInd != index){
            $('#'+currInd).css('background-color','white');
            $('#'+currInd).css('color','black')
        }
        this.setState({selectedIndex:index})
    }

    handleAdd = async (e) =>{
    
        e.preventDefault()
        const userdata = sessionStorage.getItem("userdata")
        const userid = JSON.parse(userdata)["_id"]
        const url = "http://127.0.0.1:8085/addCart/"+userid+"/"+this.state.id
        console.log(url);
        const PassValue = {id:userid,count:1, name:this.state.name,
            size:this.state.selectedSize,price:this.state.selectedPrice,shoeid:this.state.shoeid,img:this.state.image}
            console.log(PassValue)
        const result = await axios.post("http://127.0.0.1:8085/addCart",PassValue)
        .then((res)=>{
            console.log(res);
        })

        
    }

    render(){
        return(
            <Fragment>
                <Top/>
                <div class = "shoes-father">
                    <div class = "images">
                        <div class = "big-image">
                                <img src = {this.state.image}></img>
                        </div>
                        
                    </div>
                    <div class = "shoes-infos">
                        <div class = "details-brand">
                            {this.state.brand}
                        </div>

                        <div class = "shoes-infos-name">
                                {this.state.name}
                        </div>

                        <div class = "social-medias">
                            <ul>
                                <li>
                                    <a href = "#">
                                     <img src = {process.env.PUBLIC_URL+"/images/fblogo.png"}></img>
                                    </a>
                                </li>
                                
                                <li>
                                    <a href = "#">
                                        <img src = {process.env.PUBLIC_URL+"/images/wechatlogo.jpeg"}></img>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class = "shoes-description">
                            {this.state.description}
                        </div>

                        <div class = "price-div">
                             CAD ${this.state.selectedPrice}
                        </div>

                        <div class = "shoes-sizes">
                            <div class = "sizes-chart">
                                <ul>
                        
                                    {
                                            (this.state.sizes).map((item,index)=>{
                                                return(
                                                    <li>
                                                        <a id = "tmp">
                                                            <div class = "size" id= {index} value={item} onClick={()=>this.handleShoes(item,index)} >
                                                                    {

                                                                        item["size"]
                                                                    }
                                                            </div>
                                                        </a>
                                                    </li>
                                                )
                                            })

                                    }
                                   
                                </ul>
                            </div>

                            <div class = "buy-btn-div">
                                
                                <a>
                                    <div class = "buy-now-btn" onClick = {this.handleAdd}>
                                            Add to Cart
                                    </div>
                                </a>

                            </div>
                            
                        </div>

                        

                    </div>
                    
                </div>
                <Recom/>
                <Bot/>
            </Fragment>
        )
    }
}

export default Details