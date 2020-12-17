import React , {Component,Fragment} from 'react';


class Card extends Component{
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
                               <a>

                               {this.props.name}
                               </a>
                               
                                
                            </div>


                            <div class = "price">
                                CAD $1000
                            </div>

            </div>
        )
    }
}

export default Card;