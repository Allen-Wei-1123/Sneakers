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
        sizes:{},
        brand:"",
        shoesid: "",
        carts:[],
        selectedsize:""
    }
    componentDidMount(){
        var url = window.location.href;
        console.log(url)

        var fields = url.split('/');
        var id = fields.pop();


        

        fetch("http://localhost:8085/shoes/"+id)
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                id : id,
                dataset : data[0],
                image: data[0]["image"],
                name: data[0]["name"],
                description: data[0]["description"],
                price : data[0]["price"],
                sizes : data[0]["sizes"],
                brand: data[0]["brand"],
                shoesid:id
            })
        });
        this.handleShoes = this.handleShoes.bind(this)
        
        fetch("http://localhost:8085/users/1")
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data[0]["cart"])
            this.setState({
                carts : data[0]["cart"]
            })
        })

        

    }

    handleShoes = (e) =>{

        var id = e.currentTarget.id



        this.setState({
            selectedsize:e.target.value
        })

        var fakeid = id;
        if(id[id.length-1] == 'h'){
            var i = 0 ;
            var str = ""
            while( id[i] != 'h'){
                str += id[i];
                i+=1;
            }
            str += '.5';
            fakeid = str; 
        }


        $('#'+id).css('background-color','black');
        $('#'+id).css('color','white')
        var tmp  = this.state.shoesid
        var thesize = this.state.sizes;
        if(tmp != id){

            
            if(tmp != "" ){
                $(tmp).css('background-color','white');
                $(tmp).css('color','black')
                this.setState({
                    shoesid:'#'+id,
                    price : thesize[fakeid]
                })
            }else{
                this.setState({
                    shoesid:'#'+id,
                    price : thesize[fakeid]
                })
            }

        }
    }

    handleAdd = e =>{
    
        e.preventDefault()

        var idnum = this.state.shoesid;
        console.log("idnum ",idnum)
        var shoesize = ""
        for(var i = 1;i < idnum.length;i++){
            if(idnum[i] == 'h'){
                shoesize+='.5';
                break;
            }
            shoesize +=  (idnum[i])
        }
        console.log("shoessize ",shoesize)

        if(this.state.selectedsize == ""){
            alert("shoe size not selected!");
        }else{
            alert("shoes added")
            var baseurl = "http://localhost:8085/cart/0/"+this.state.id+ "/" + shoesize
        
            axios.post(baseurl).then(res => {
                console.log(res);
                console.log(res.data);
              })
        }

        
    }

    render(){
        return(
            <Fragment>
                <Top/>
                <div class = "shoes-father">
                    <div class = "images">
                        <div class = "big-image">
                                <img src = {process.env.PUBLIC_URL+ "/images/" + this.state.image}></img>
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
                             CAD {this.state.price}
                        </div>

                        <div class = "shoes-sizes">
                            <div class = "sizes-chart">
                                <ul>
                        
                                    {
                                            Object.keys(this.state.sizes).map((key,i)=>{
                                                var tmp  = key;
                                                
                                                if(key.includes('.')){
                                                    var i = 0 ;
                                                    var num = ""
                                                    while(key[i] != '.'){
                                                        num += key[i];
                                                        i++;
                                                    }
                                                    tmp = num + "h"
                                                }
                                                return(
                                                    <li>
                                                        <a id = "tmp">
                                                            <div class = "size" id= {tmp}  onClick = {this.handleShoes}>
                                                                    {

                                                                        key
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