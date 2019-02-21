import React, {Component} from 'react'
import {Paper, Grid, GridList, GridListTile, GridListTileBar} from '@material-ui/core'

import IMG from '../images/screen1.jpg'
import mergeIMG from '../images/command2_merge.png'
import newIMG from '../images/command1_newPL.png'
//custom style for <Paper> component
var styles = {
    backgroundColor: '#1DB954',
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
}
//
class History extends Component{
    constructor(props){
        super(props)
        this.state = {
            history: []
        }
    }
    componentDidMount(){
        //call API getHistory/id
        let url = 'https://spotify-merge.herokuapp.com/getHistory/' + this.props.UID
        //console.log(`fetch url: ${url}`)
        let options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
            .then(res => res.json())
            .then(body => {this.setState(prevState => ({
                    history: [...body.actualResponse.data.history]
                }))
            })
            .catch(err => {
                console.log(`status code: ${err.statusCode}`)
                console.log(`message: ${err.message}`)
            })
    }
    //
    render(){
        styles.height = this.props.HEIGHT
        return(
            <Grid container item xs={12} justify='center' alignItems='center'>                
                <Paper
                    style={{...styles}}
                    square
                >
                    <GridList cols={5} style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}}>
                        {this.state.history.map(tile => (
                            <GridListTile key={tile._id}>
                                <img src={newIMG} alt={tile.desc} />
                                <GridListTileBar
                                    title={tile.desc}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Paper>
            </Grid>
        )
    }
}

export default History