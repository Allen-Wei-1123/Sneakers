import React , {Component,Fragment} from 'react';
import './css/FP.css'
import Card from './Card'
import Top from './Top'
import Banner from './Banner'
import $ from 'jquery'
import Bot from './Bottom'

class FrontPage extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        dataset: []
    }
    
    componentDidMount(){
        $('#morebtn').on('click',function(){
            $('#morebtn').css("display","none");
        })
        
        fetch("http://127.0.0.1:8085/data")
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                dataset : data
            })
        });

        
    }

    render(){
        var values = [1,2,3,4] , values2  = [5,6,7,8];
        return(
            <Fragment>
                <Top/>
                <Banner/>
                <div class = "info">
                    <div class = "info-head">
                        Most Popular Items
                    </div>
                    <div class= "box-father">

                         
                        {
                            this.state.dataset.filter(item => values.includes(item["id"])).map((item1)=>(
                                <Card brand = "NIKE" img = {item1["image"]} name = {item1["name"]} price = {item1["price"]} info = {item1} id = {item1["id"]}  url = {"/shoes/" + item1["id"]} ></Card>
                            ))
                        }
      
                    </div>
                    
                    
                    <div id="accordion">
                         <p>
                        
                            <button id = "morebtn" class="btn btn-outline-dark" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                See More
                            </button>
                        </p>
                        <div class="collapse" id="collapseExample">
                            <div class= "box-father">

                            {
                            this.state.dataset.filter(item => values2.includes(item["id"])).map((item1)=>(
                                <Card brand = "NIKE" img = {item1["image"]} name = {item1["name"]} price = {item1["price"]} info = {item1} id = {item1["id"]}  url = {"/shoes/" + item1["id"]} ></Card>
                            ))
                        }
      



                            </div>
                        </div>
                    </div>
                    <Bot/>
                </div>

               
                

            
            </Fragment>
            

        )
    }
}

export default FrontPage