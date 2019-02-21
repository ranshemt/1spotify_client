import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
//
import Screen1 from './Screen1'
import Screen2 from './Screen2'
class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            UID: 'default_uid'
        }
        //bind methods
    }
    componentWillMount(){
        //set state
        let pathName = this.props.location.pathname
        let receivedUID = /[^=]*$/.exec(pathName)[0]
        this.setState({
            UID: receivedUID
        })
    }
    render(){
        return(
            <div>
                <Grid container>
                    <Screen1 UID={this.state.UID} />
                    <Screen2/>
                </Grid>
            </div>
        )
    }
}

export default App