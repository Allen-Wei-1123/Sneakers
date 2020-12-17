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
    componentDidMount =()=>{
        $('#morebtn').on('click',function(){
            $('#morebtn').css("display","none");
        })
    }


    render(){
        return(
            <Fragment>
                <Top/>
                <Banner/>
                <div class = "info">
                    <div class = "info-head">
                        Most Popular Items
                    </div>
                    <div class= "box-father">

                        <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                        <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                        <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                        <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>

                        
                    </div>
                    

                    <div id="accordion">
                         <p>
                        
                            <button id = "morebtn" class="btn btn-outline-dark" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                More
                            </button>
                        </p>
                        <div class="collapse" id="collapseExample">
                            <div class= "box-father">

                                <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"} price = "1000"/>
                                <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"} price = "1000"/>
                                <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"} price = "1000"/>
                                <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>



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