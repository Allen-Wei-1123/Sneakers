import React , {Component,Fragment} from 'react';
import Top from '../Top'
import ShortCut from './ShortCut'
import Bot from '../Bottom'
import '../css/Gallery.css'
import $ from 'jquery'
import Card from '../Card'
import Recom from './Recommendation'
import RadioBtns from './RadioBtns'
class Gallery extends Component{

    constructor(props){
        super(props)
        this.state = {
            title_clicked:false
        }
    }
    
    componentDidMount(){
        var check = false;
        $('#stitle').on('click',function(){
            if(check){
                $('.category-gender').css('border-bottom','1px solid lightgray');
                $('.category-gender').css('-webkit-transition','all .4s ease ')   
                // alert(check)
            }else{
                $('.category-gender').css('border-bottom','0px');
                $('.content').css('border-bottom','1px solid lightgray');
            }
            check  = !check;
        })

        
    }
    
    render(){
        return(
            <Fragment>
                 <Top/>
                 <ShortCut></ShortCut>
                 <div class = "gallery-father">
                    <div class = "sidebar">
                        <a id = "stitle" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                            <div class = "category-gender">
                                Gender
                                
                            </div>
                        </a>

                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class = "content">
                                <div class = "form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                    <label class="form-check-label" for="defaultCheck1">
                                        Male
                                    </label>
                                    
                                </div>
                                <div class = "form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                                    <label class="form-check-label" for="defaultCheck2">
                                        Female
                                    </label>
                                    
                                </div>
                            </div>
                        </div>

                        <a data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">
                            <div class = "category">
                                Sizes
                            </div>
                        </a>

                        <div class="collapse multi-collapse" id="multiCollapseExample2">
                            <div class = "content1">
                                
                                    <RadioBtns sizes = {"3"}></RadioBtns>
                                    <RadioBtns sizes = {"3.5"}></RadioBtns>
                                    <RadioBtns sizes = {"4"}></RadioBtns>
                                    <RadioBtns sizes = {"4.5"}></RadioBtns>
                                    <RadioBtns sizes = {"5"}></RadioBtns>
                                    <RadioBtns sizes = {"5.5"}></RadioBtns>
                                    <RadioBtns sizes = {"6"}></RadioBtns>
                                    <RadioBtns sizes = {"7"}></RadioBtns>
                                    <RadioBtns sizes = {"7.5"}></RadioBtns>
                                    <RadioBtns sizes = {"8"}></RadioBtns>
                                    <RadioBtns sizes = {"8.5"}></RadioBtns>
                                    <RadioBtns sizes = {"9"}></RadioBtns>
                            </div>
                        </div>
                    <div>

                  

                    </div>

                    </div>
                    <div class = "gallery-view">
                        <div class = "brand">
                                OffWhite
                        </div>
                        <div class = "shoes-order">
                            <ul>
                                <li>
                                    <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                                </li>
                                <li>
                                    <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                                </li>
                                <li>
                                    <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                                </li>
                                <li>
                                    <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                                </li>
                                <li>
                                    <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                                </li>
                                <li>
                                    <Card img = {'offvape.jpg'} name = {"OffWhite x Vapormax"}/>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                
                 <Bot/>
            </Fragment>
        )
    }
}

export default Gallery;