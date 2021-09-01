import React , {Component,Fragment} from 'react';
import '../css/Recom.css'
import Card from '../Card'
class Recommendations extends Component{

    constructor(props){
        super(props)
    }
    state = {
        dataset:[]
    }
    componentDidMount(){
        fetch('http://localhost:8085/data')
        .then((res)=>res.json())
        .then((data)=>{

            this.setState({
                dataset: data
            })

        })
    }
    render(){
        return(
                <Fragment>
                    <div class = "recom-view">
                        <div class = "recom-title">
                            Recommendations
                        </div>
                        <div class = "recom-cards">
                            <ul>
                               
                                {

                                    this.state.dataset.filter((item)=>item["recommended"] == "true").slice(0,5).map((item1)=>(
                                        <li>
                                            <Card brand = {item1["brand"]} img = {item1["image"]} name = {item1["name"]} price = {item1["price"]} info = {item1} id = {item1["id"]}  url = {"/shoes/" + item1["id"]} ></Card>
                                        </li>
                                    ))

                                }
                            </ul>
                        </div>
                    </div>
                </Fragment>
        )
    }
}

export default Recommendations;