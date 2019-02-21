import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
//
import Welcome from './1Welcome'
import History from './2History'
import Playlists from './3Playlists'
import Artists from './4Artists'
class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            UID: 'default_uid',
            screen_height: '100px'
        }
        //bind methods
        this.getData = this.getData.bind(this)
    }
    getData(val){
        //console.log(`in App: received height = ${val}`)
        this.setState(prevState => ({
            UID: prevState.UID,
            screen_height: val
        }))
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
        //console.log(`in App: screen_height = ${this.state.screen_height}`)
        return(
            <div>
                <Grid container>
                    <Welcome sendData={this.getData} UID={this.state.UID} />
                    <History UID={this.state.UID} HEIGHT={this.state.screen_height} />
                    <Playlists UID={this.state.UID} HEIGHT={this.state.screen_height} />
                    <Artists UID={this.state.UID} HEIGHT={this.state.screen_height} />
                </Grid>
            </div>
        )
    }
}

export default App