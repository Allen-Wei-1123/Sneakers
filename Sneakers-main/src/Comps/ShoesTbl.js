import React , {Component,Fragment} from 'react';
import { TransitionGroup,CSSTransition } from 'react-transition-group';
import Top from '../Top'
import Bottom from '../Bottom'
import Card from '../Card'
import '../css/shoestbl.css'
import axios from 'axios';
class ShoesTbl extends Component{

    state = {
        shoesinfo:[],
        recommended: [],
        recommended_clicked : false,
        currpage : 1
    }

    constructor(props){
        super(props)
        console.log(props)
        this.click_pagination = this.click_pagination.bind(this)
    }

    componentDidMount(){
        var baseurl = "http://127.0.0.1:8085/data";
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{
            var tmp = data.filter((item)=> item["brand"] == "Jordan" && item["types"] == "AJ1")
            var tmp2 = tmp.filter((item) => item["recommended"] == "true")
            this.setState({
                shoesinfo:tmp,
                recommended : tmp2,
            })
            // localStorage.setItem("isrecommended",false);
            if(localStorage.getItem("shoes_tbl") == tmp2){
                this.setState({
                    recommended_clicked:true
                })
            }else{
                this.setState({
                    recommended_clicked:false
                })
            }

        });
    }


    
    cvtPricetoInt (pricevalue){
        var n = pricevalue.length;
        var word= pricevalue.substring(1,n);
        return parseInt(word);
    }

    handle_sort_desc = () =>{
        // alert("clicked")
        var prev = this.state.shoesinfo

        if(this.state.recommended_clicked){
            prev= this.state.recommended;
        }

        prev.sort((a,b)=>{
            var a_price = a["price"]
            var b_price = b["price"]
            if(this.cvtPricetoInt(a_price) < this.cvtPricetoInt(b_price)){
                return -1;
            }
            return 1; 
        })
        if(this.state.recommended_clicked){
            this.setState({
                recommended:prev
            })
            return 0 ;
        }
        this.setState({
            shoesinfo:prev
        })
    }

    handle_sort_asc = () =>{
        var prev = this.state.shoesinfo; 
        if(this.state.recommended_clicked){
            prev= this.state.recommended;
        }
        prev.sort((a,b)=>{
            var a_price = a["price"]
            var b_price = b["price"]
            if(this.cvtPricetoInt(a_price) < this.cvtPricetoInt(b_price)){
                return 1;
            }
            return -1; 
        })

        if(this.state.recommended_clicked){
            this.setState({
                recommended: prev
            })
            return 0 ;
        }

        this.setState({
                shoesinfo:prev,
        })
        
    }

    handleRecommend = () =>{
        var tmp = this.state.recommended_clicked;
        if(tmp == true ){
            this.setState({
                recommended_clicked:false
            })
            localStorage.setItem("isrecommended",false)
            localStorage.setItem("shoes_tbl",this.state.shoesinfo)
        }else{
            this.setState({
                recommended_clicked:true
            })
            localStorage.setItem("isrecommended",true);
            localStorage.setItem("shoes_tbl",this.state.recommended)

        }
        // this.forceUpdate();
    }

    click_pagination = e =>{
        // console.log("value is ",e.target.name)
        e.preventDefault();
        this.setState({
            currpage: parseInt(e.target.name)
        })
    }

    click_pagination_prev = e =>{
        e.preventDefault();
        var page = this.state.currpage;
        if(page == 1){
            return ;
        }
        this.setState({
            currpage:page-1
        })
    }

    click_pagination_nxt = e =>{
        e.preventDefault();
        var page = this.state.currpage;

        var tmp = this.state.shoesinfo.length
        if(tmp % 6 == 0){
            tmp = tmp /6;
        }else{
            tmp = Math.floor(tmp / 6 )+ 1;
        }

        if(page == tmp)return;
        this.setState({
            currpage:page+1
        })
    }

    
    
    buildPagination(){



        var tmp = this.state.shoesinfo.length
        if(this.state.recommended_clicked){
            tmp = this.state.recommended.length
        }
        if(tmp % 6 == 0){
            tmp = tmp /6;
        }else{
            tmp = Math.floor(tmp / 6 )+ 1;
        }
        // return tmp
       
        var ans = []
        
        for(let i = 0 ;i<tmp;i++){
            
            ans.push( <li class="page-item"><a class="page-link" href="#" onClick = {(this.click_pagination)}   name = {i+1}>{i+1}</a></li>)
        } 
        return ans;
    }
    
    pagination(){

        return (
            <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#" onClick = {this.click_pagination_prev}>Previous</a></li>
                {
                    this.buildPagination()
                }
                
                <li class="page-item"><a class="page-link" onClick ={this.click_pagination_nxt} href="#">Next</a></li>
            </ul>
            </nav>
        )
    }

    recommended_chckbox(){
        if(this.state.recommended_clicked == true || localStorage.getItem("isrecommended") == true){
            return (
                <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" checked/>
            )
        }else{
            return (
                <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
            )
        }
    }

    collapsible(){
        return(
            <Fragment>
                <Top></Top>
                <div id = "collap">
                    <h4>Refine Results</h4>
                    <div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button id = "sort-btn" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Sort
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div id = "sort-by-price-asc" class="card-body" onClick = { this.handle_sort_asc}>
            Sort by Price (Desc)
      </div>
      <div id = "sort-by-price-asc" class="card-body" onClick = {this.handle_sort_desc}>
            Sort by Price (Asc)
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button id = "sort-btn" class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Recommended
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body" id = "sort-by-price-asc" onClick = {this.handleRecommend}>
          
            {/* <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/> */
                this.recommended_chckbox()
            }
            
            <label class="form-check-label" for="flexCheckIndeterminate">
                See Recommended
            </label>
      </div>
    </div>
  </div>
  
</div>
                    

                </div>

                
            </Fragment>
        )
    }

    recommendedShoes(){
        var shoes_tbl  = localStorage.getItem("isrecommended");
        var shoes_tbl2  = localStorage.getItem("shoes_tbl");
        console.log("shoestbl is ",shoes_tbl)
        if(this.state.recommended_clicked == true || shoes_tbl == true){
            console.log("everything is true")
            return (
                this.state.recommended.slice((this.state.currpage-1)*6,this.state.currpage*6).map((item)=>(
                    <CSSTransition classNames ="product-fade" timeout = {{enter:300}} >
                    <Card  img = {item["image"]} name = {item["name"]} price = {item["price"]} brand = {item["brand"]} url = {"/shoes/"+item["id"]}></Card>
                    </CSSTransition>
                ))
            )   


        }else{
            console.log("everything is not true")
            return (this.state.shoesinfo.slice((this.state.currpage-1)*6,this.state.currpage*6).map((item) => (
                <CSSTransition classNames ="product-fade" timeout = {{enter:300}} >
                <Card  img = {item["image"]} name = {item["name"]} price = {item["price"]} brand = {item["brand"]} url = {"/shoes/"+item["id"]}></Card>
                </CSSTransition>
            )))
        }
    }
    
    render(){
        return(
            <Fragment>
                {this.collapsible()}
                <div id = "shoes-tbl">
                    <TransitionGroup component = {null}>
                    {
                        
                        this.recommendedShoes()
                    }
                    </TransitionGroup>
                    <div id = "pagination">
                        {
                            this.pagination()
                        }
                    </div>
                    
                </div>
                <div id = "bottompage">
                    <Bottom></Bottom>
                </div>
            </Fragment>
        )   
    }
}

export default ShoesTbl