import React , {Component,Fragment} from 'react';

class Top extends Component{
    render(){
        return(
            <div class= "top">
                    <div class = "logo" >
                        Sneakers
                    </div>
                    <ul>
                        <li>
                            <a href = "#">Air Jordan</a>
                        </li>
                        <li><a href = "#">Nike</a></li>
                        <li><a href = "#">Adidas</a></li>
                        <li><a href = "#">Streetwear</a></li>
                        <li><a href = "#">New Arrivals</a></li>
                        <li><a href = "#">Supreme</a></li>
                    </ul>
                </div>
        )
    }
}

export default Top;