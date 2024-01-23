import React , {Component,Fragment} from 'react';
import './css/FP.css'
import Card from './Card'
import Top from './Top'
import Banner from './Banner'
import $ from 'jquery'
import Bot from './Bottom'
import axios from 'axios'
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
        
        
        axios.get("http://127.0.0.1:8085/findShoes")
        .then(response=>{
            console.log(response.data);
            this.setState({dataset:response.data})
        })
        .catch(error=>{
            console.error(error);
        })

        const socket = new WebSocket('ws://localhost:3001');

        socket.addEventListener('open', () => {
            console.log('Connected to the WebSocket server');
        });

        socket.addEventListener('message', (event) => {
        });

        socket.addEventListener('close', () => {
            console.log('Connection closed');
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
                            this.state.dataset.map((item1)=>(
                                // <Card brand = "NIKE" img = {item1["image"]} name = {item1["name"]} price = {item1["price"]} info = {item1} id = {item1["id"]}  url = {"/shoes/" + item1["id"]} ></Card>
                                <Card brand = "NIKE" item = {item1}></Card>
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