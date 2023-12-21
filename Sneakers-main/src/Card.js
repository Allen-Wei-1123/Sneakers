import React , {Component,Fragment} from 'react';
import $ from 'jquery'

class Card extends Component{

    
    constructor(props){
        super(props)
    }
    state={
        data:[]
    }
    componentDidMount(){
        // $("#a").attr("href","/shoes/"+this.props.id);
        this.setState({
            data:this.props.item
        })
    }

    brandname(){
        return this.state.data["shoetype"]
    }

    render(){
        return(
            <div class = "box-son" style = {{marginBottom : "20px"}}>
                            <div class = "box-son-img">
                                <img src = {this.state.data["imgurl"]}></img>
                            </div>
                            <div class = "company">
                                {
                                    this.brandname()
                                }
                            </div>
                            <div class = "shoes-name">
                               <a id = "a" href = {"/shoes/"+this.state.data["_id"]}>

                                    {this.state.data["shoename"]}
                                    
                               </a>
                            </div>
                            <div class = "price">
                               CAD ${1234}
                            </div>

            </div>
        )
    }
}

export default Card;