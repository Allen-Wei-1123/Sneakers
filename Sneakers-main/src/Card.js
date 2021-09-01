import React , {Component,Fragment} from 'react';
import $ from 'jquery'

class Card extends Component{

    
    constructor(props){
        super(props)
    }

    componentDidMount(){
        // $("#a").attr("href","/shoes/"+this.props.id);
    }

    brandname(){
        if(this.props.brand != ""){
            return this.props.brand;
        }
        return "NIKE"
    }

    render(){
        return(
            <div class = "box-son" style = {{marginBottom : "20px"}}>
                            <div class = "box-son-img">
                                <img src = {process.env.PUBLIC_URL+ "/images/"+this.props.img}></img>
                            </div>
                            <div class = "company">
                                {
                                    this.brandname()
                                }
                            </div>

                            <div class = "shoes-name">
                               <a id = "a" href = {this.props.url}>

                                    {this.props.name}
                                    
                               </a>

                               
                               
                                
                            </div>


                            <div class = "price">
                               CAD {this.props.price}
                            </div>

            </div>
        )
    }
}

export default Card;