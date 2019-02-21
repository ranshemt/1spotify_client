import React, {Component} from 'react'
import {Paper, Grid, GridList, GridListTile, GridListTileBar} from '@material-ui/core'

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
class Playlists extends Component{
    constructor(props){
        super(props)
        this.state = {
            playlists: []
        }
    }
    componentDidMount(){
        //call API getHistory/id
        let url = 'https://spotify-merge.herokuapp.com/getPlaylists/' + this.props.UID
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
                playlists: [...body.actualResponse.data.playlists]
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
                        {this.state.playlists.map(tile => (
                            <GridListTile key={tile.id}>
                                <img src={tile.img} alt={tile.name} />
                                <GridListTileBar
                                    title={tile.name}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Paper>
            </Grid>
        )
    }
}

export default Playlists