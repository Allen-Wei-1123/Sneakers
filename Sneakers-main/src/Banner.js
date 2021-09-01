import React , {Component} from 'react';
import './css/FP.css'
import $ from 'jquery'

class Banner extends Component{
    componentDidMount(){
        // $('.carousel').carousel({
        //     interval:200
        // })
    }

    exampleCarousel(){
        return (
            <div class = "banner">
                <div id="mycarousel" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner" >
                        <div class="carousel-item active" data-interval="5000">
                            < img class="d-block w-100" src={process.env.PUBLIC_URL+"/images/yeezymain.jpeg"} alt="First slide"/>
                        </div>
                        <div class="carousel-item" data-interval="5000">
                        <img class="d-block w-100" src={process.env.PUBLIC_URL+"/images/yeezymain.jpeg"} alt="Second slide"/>
                        </div>
                        <div class="carousel-item" data-interval="5000">
                        <img class="d-block w-100" src={process.env.PUBLIC_URL+"/images/yeezymain.jpeg"} alt="Third slide"/>
                        </div>
                    </div>
                    <a id = "prev" class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a id = "next"class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
            </div>
          </div>
        )
    }

    
    render(){
        return this.exampleCarousel()
    }
}

export default Banner;