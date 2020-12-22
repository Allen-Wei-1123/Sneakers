import React , {Component,Fragment} from 'react';
import $ from 'jquery'

class Card extends Component{

    
    constructor(props){
        super(props)
    }

    componentDidMount(){
        // $("#a").attr("href","/shoes/"+this.props.id);
    }

    render(){
        return(
            <div class = "box-son">
                            <div class = "box-son-img">
                                <img src = {process.env.PUBLIC_URL+ "/images/"+this.props.img}></img>
                            </div>
                            <div class = "company">
                                NIKE
                            </div>

                            <div class = "shoes-name">
                               <a id = "a" href = "/shoes/1">

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