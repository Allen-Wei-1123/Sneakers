import React , {Component,Fragment} from 'react';
import '../css/Recom.css'
import Card from '../Card'
class Recommendations extends Component{
    render(){
        return(
                <Fragment>
                    <div class = "recom-view">
                        <div class = "recom-title">
                            Recommendations
                        </div>
                        <div class = "recom-cards">
                            <ul>
                                <li>
                                    <Card img = {"offvape.jpg"} name = {"OffWhite x Vapormax"}/>
                                </li>
                                <li>
                                    <Card img = {"offvape.jpg"} name = {"OffWhite x Vapormax"}/>
                                </li>
                                <li>
                                    <Card img = {"offvape.jpg"} name = {"OffWhite x Vapormax"}/>
                                </li>
                                <li>
                                    <Card img = {"offvape.jpg"} name = {"OffWhite x Vapormax"}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Fragment>
        )
    }
}

export default Recommendations;