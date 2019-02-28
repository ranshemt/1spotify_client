import React, {Component} from 'react'
import {Paper, Grid, GridList, GridListTile, GridListTileBar, IconButton} from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import screen1IMG from '../images/screen1.jpg'

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
class Artists extends Component{
    constructor(props){
        super(props)
        this.state = {
            artists: []
        }
        this.createPL = this.createPL.bind(this)
    }
    createPL = param => e => {
        console.log(`createPL() with artist id = ${param}`)
        let url = 'https://spotify-merge.herokuapp.com/makePLbyArtist/' + this.props.UID + '&' + param
        //console.log(`fetch url: ${url}`)
        let options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        fetch(url, options)
            .then(res => res.json())
            .then(body => {
                console.log(`new playlist created. DATA: ${body.actualResponse.data}`)
                this.props.myForceUpdate()
            })
            .catch(err => {
                console.log(`status code: ${err.statusCode}`)
                console.log(`message: ${err.message}`)
            })
    }
    //
    componentDidMount(){
        let url = 'https://spotify-merge.herokuapp.com/getTopArtists/' + this.props.UID
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
                artists: [...body.actualResponse.data.artists]
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
        //console.log(`in Artists: state = ${JSON.stringify(this.state.artists)}`)
        return(
            <Grid container item xs={12} justify='center' alignItems='center'>                
                <Paper
                    style={{...styles}}
                    square
                >
                    <GridList cols={5} style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}}>
                        {this.state.artists.map(tile => (
                            <GridListTile key={tile.id}>
                                <img src={screen1IMG} alt={tile.name} />
                                <GridListTileBar
                                    title={tile.name}
                                    actionIcon={
                                        <IconButton onClick={this.createPL(tile.id)}>
                                            <StarBorderIcon color="primary" />
                                        </IconButton>
                                    }
                                />
                                    
                            </GridListTile>
                        ))}
                    </GridList>
                </Paper>
            </Grid>
        )
    }
}

export default Artists