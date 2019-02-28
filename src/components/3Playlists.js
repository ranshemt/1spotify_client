import React, {Component} from 'react'
import {Paper, Grid, GridList, GridListTile, GridListTileBar, IconButton, Typography} from '@material-ui/core'
import {CheckCircle, CheckCircleOutline} from '@material-ui/icons'

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
            playlists: [],
            chosenIDsNumber: 0,
            chosenPLS: []
        }
        this.circleClicked = this.circleClicked.bind(this)
    }
    //
    circleClicked = receivedPLid => e => {
        console.log(`tile.id = ${receivedPLid}`)
        //
        //update pl1/pl2
        let PLtoAdd = {};
        this.state.playlists.forEach(currPL => {
            if(currPL.isChosen === false && currPL.id === receivedPLid)
                Object.assign(PLtoAdd, currPL)
        })
        //
        //disable choosing
        PLtoAdd.isChosen = true
        PLtoAdd.disabled = true
        PLtoAdd.displayFull = ''
        PLtoAdd.displayOutline = 'none'
        //console.log(`PLtoAdd: ${JSON.stringify(PLtoAdd)}`)
        //
        //update state
        let newChosen = [...this.state.chosenPLS]
        newChosen.push(PLtoAdd)
        //console.log(`newChosen: ${JSON.stringify(newChosen)}`)
        let newPlaylists = []
        this.state.playlists.forEach(currPL => {
            if(currPL.id === PLtoAdd.id){
                newPlaylists.push(PLtoAdd)
            }
            else{
                newPlaylists.push(currPL)
            }
        })
        //
        //make API call
        if(this.state.chosenIDsNumber === 1){
            console.log('api call to merge playlists')
            //call API getPlaylists/id
            let url = 'https://spotify-merge.herokuapp.com/mergeMyPlaylists/' + this.props.UID
            //console.log(`fetch url: ${url}`)
            let bodyObj = {
                "pl1_id": this.state.chosenPLS[0].id,
                "pl2_id": PLtoAdd.id,
                "pl1_name": this.state.chosenPLS[0].name,
                "pl2_name": PLtoAdd.name
            }
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyObj)
            }
            fetch(url, options)
                .then(res => res.json())
                .then(body => {
                    let plArr = [...body.actualResponse.data.playlists]
                    plArr.forEach(currPL => {
                        currPL.disabled = false;
                        currPL.displayFull = 'none';
                        currPL.displayOutline = '';
                        currPL.isChosen = false;
                    })
                    this.setState(prevState => ({
                        playlists: [...plArr],
                        chosenIDsNumber: 0,
                        chosenPLS: [...prevState.chosenPLS]
                    }))
                })
                .catch(err => {
                    console.log(`err: ${err}`)
                    console.log(`status code: ${err.statusCode}`)
                    console.log(`message: ${err.message}`)
                })
        }
        //
        //console.log(`newPlaylists = ${JSON.stringify(newPlaylists)}`)
        this.setState(prevState => ({
            playlists: [...newPlaylists],
            chosenIDsNumber: prevState.chosenIDsNumber+1,
            chosenPLS: [...newChosen]
        }))
        
    }
    //
    componentDidMount(){
        //call API getPlaylists/id
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
            .then(body => {
                let plArr = [...body.actualResponse.data.playlists]
                plArr.forEach(currPL => {
                    currPL.disabled = false;
                    currPL.displayFull = 'none';
                    currPL.displayOutline = '';
                    currPL.isChosen = false;
                })
                this.setState(prevState => ({
                    playlists: [...plArr],
                    chosenIDsNumber: 0,
                    chosenPLS: [...prevState.chosenPLS]
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
        console.log(`this.state.chosenIDsNumber = ${this.state.chosenIDsNumber}`)
        console.log(`this.state.chosenPLS = ${JSON.stringify(this.state.chosenPLS)}`)
        //console.log(`this.state.playlists = ${JSON.stringify(this.state.playlists)}`)
        let pl1_name = 'none', pl2_name = 'none'
        if(this.state.chosenPLS.length >= 1){
            if(this.state.chosenPLS[0].hasOwnProperty('name')){
                pl1_name = this.state.chosenPLS[0].name
            }
        }
        if(this.state.chosenPLS.length === 2){
            if(this.state.chosenPLS[1].hasOwnProperty('name')){
                pl2_name = this.state.chosenPLS[1].name
            }
        }
        return(
            <Grid container item xs={12} justify='center' alignItems='center'>                
                <Paper
                    style={{...styles}}
                    square
                >
                    <Grid container>
                        <Grid container item xs={12} justify='center' alignItems='center'>
                            <Typography variant='h4'>
                                Chosen playlists: {this.state.chosenIDsNumber}
                                <Typography variant ='h6'>
                                    1. {pl1_name} <br/>
                                    2. {pl2_name}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} justify='center' alignItems='center'>
                            <GridList cols={5} style={{flexWrap: 'nowrap', transform: 'translateZ(0)'}}>
                                {this.state.playlists.map(tile => (
                                    <GridListTile key={tile.id}>
                                        <img src={tile.img} alt={tile.name} />
                                        <GridListTileBar
                                            title={tile.name}
                                            titlePosition='top'
                                            actionPosition='left'
                                            actionIcon={
                                                <IconButton
                                                    color='primary'
                                                    disabled={tile.disabled}
                                                    onClick={this.circleClicked(tile.id)}
                                                >
                                                    <CheckCircleOutline style={{display: tile.displayOutline}}/>
                                                    <CheckCircle style={{display: tile.displayFull}} />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>                    
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}

export default Playlists