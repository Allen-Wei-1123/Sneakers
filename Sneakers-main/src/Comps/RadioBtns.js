import react , {Component, Fragment} from 'react'

class RadioBtns extends Component{
    render(){
        return(
                <Fragment>
                        <div class = "form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck3"/>
                                        <label class="form-check-label" >
                                            {this.props.sizes}
                                        </label>
                                        
                            </div>
                </Fragment>
        )
    }
}


export default RadioBtns