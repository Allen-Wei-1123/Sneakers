import react , {Component, Fragment} from 'react'

class RadioBtns extends Component{
    render(){
        return(
                <Fragment>
                        <div class = "form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <label class="form-check-label" for="defaultCheck1">
                                            {this.props.sizes}
                                        </label>
                                        
                            </div>
                </Fragment>
        )
    }
}


export default RadioBtns