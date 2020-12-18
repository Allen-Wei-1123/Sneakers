import React , {Component,Fragment} from 'react';
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import '../css/Details.css'
class Details extends Component{
    render(){
        return(
            <Fragment>
                <Top/>
                <ShortCut/>
                <div class = "shoes-father">
                    <div class = "images">
                        <div class = "big-image">
                                <img src = {process.env.PUBLIC_URL+ "/images/offaj.jpg"}></img>
                        </div>
                        <div class = "small-image">
                                <ul>
                                    <li>
                                        <img src = {process.env.PUBLIC_URL + "/images/offblue.png"}></img>
                                    </li>
                                    <li>
                                        <img src = {process.env.PUBLIC_URL + "/images/offblue.png"}></img>
                                    </li>
                                    <li>
                                        <img src = {process.env.PUBLIC_URL + "/images/offblue.png"}></img>
                                    </li>
                                    <li>
                                        <img src = {process.env.PUBLIC_URL + "/images/offblue.png"}></img>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div class = "shoes-infos">
                        <div class = "brand">
                            air jordan
                        </div>

                        <div class = "shoes-infos-name">
                                AIR JORDAN 1 RETRO HIGH OFF-WHITE Chicago
                        </div>

                        <div class = "social-medias">
                            <ul>
                                <li>
                                    <a href = "#">
                                     <img src = {process.env.PUBLIC_URL+"/images/fblogo.png"}></img>
                                    </a>
                                </li>
                                
                                <li>
                                    <a href = "#">
                                        <img src = {process.env.PUBLIC_URL+"/images/wechatlogo.jpeg"}></img>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class = "shoes-description">
                        由 Virgil Abloh 帶來的全新 Air Jordan 1 Retro High Off-White™「UNC」配色，突擊登陸美國 Nike SNKRS App，一如所料隨即被狂掃一空。<br/><br/>

Off-White™ x Air Jordan 1「UNC」以經典 Air Jordan 1「UNC」藍白配色為變奏，並再搭以 Virgil Abloh 的改造設計手法，添上如紅色 “Zip-Tie”、「Off-White™ for NIKE」字樣及 “AIR” 等豐富細節。
                        </div>

                        <div class = "price-div">
                             CAD $150000
                        </div>

                        <div class = "shoes-sizes">
                            <div class = "sizes-chart">
                                
                            </div>
                            
                        </div>
                        

                    </div>
                    
                </div>
                <Bot/>
            </Fragment>
        )
    }
}

export default Details