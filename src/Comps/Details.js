import React , {Component,Fragment} from 'react';
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import Recom from './Recommendation'
import '../css/Details.css'
import $ from 'jquery'
class Details extends Component{
    constructor(props){
        super(props)
    }
    state = {
        dataset : [],
        image:"",
        name : "",
        description:"",
        price : "",
        sizes:{},
        brand:""
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
                dataset : data[0],
                image: data[0]["image"],
                name: data[0]["name"],
                description: data[0]["description"],
                price : data[0]["price"],
                sizes : data[0]["sizes"],
                brand: data[0]["brand"]
            })
        });
        this.handleShoes = this.handleShoes.bind(this)
        


    }

    handleShoes = (e) =>{

        var id = e.currentTarget.id
        
        $('#'+id).css('background-color','yellow');

    }

    render(){
        return(
            <Fragment>
                <Top/>
                <ShortCut/>
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
                             CAD $150000
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
                                    <div class = "buy-now-btn">
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