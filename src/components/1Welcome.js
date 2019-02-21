import React, {Component} from 'react'
import {Paper, Grid, Avatar, Typography} from '@material-ui/core'

import IMG from '../images/screen1.jpg'
//image ratio = original_height/original_width
let RATIO = parseFloat(2667 / 4000).toFixed(2)
//custom style for <Paper> component
var styles = {
    constStyle: {
        backgroundImage: `url(${IMG})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    calcStyle: {
        height: 0
    }
}
var avatar_style = {
    margin: '1vw',
    width: '10vw',
    height: '10vw'
}
//
class Welcome extends Component{
    constructor(props){
        super(props)
        this.state = {
            user_name: '',      
            profile_picture: ''
        }
        //sizing
        this.handleResize = this.handleResize.bind(this)
        this.calcHeight = this.calcHeight.bind(this)
    }
    calcHeight(){
        let w = window.innerWidth
        let h = parseFloat(w * RATIO).toFixed(2)
        styles.calcStyle.height = `${h}px`
        //console.log(`ratio = ${RATIO}. width = ${w}. height = ${h}`)
    }
    handleResize(e){
        this.calcHeight()
        this.setState(this.state)
        this.props.sendData(styles.calcStyle.height)
    }
    componentDidMount(){
        //sizing
        window.addEventListener('resize', this.handleResize)
        //call API welcomeMsg/id
        let url = 'https://spotify-merge.herokuapp.com/welcomeMsg/' + this.props.UID
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
                this.setState({
                    user_name: body.actualResponse.data.un,
                    profile_picture: body.actualResponse.data.img
                })
            })
            .catch(err => {
                console.log(`status code: ${err.statusCode}`)
                console.log(`message: ${err.message}`)
                this.setState({
                    user_name: 'error, no name found',
                    profile_picture: '#'
                })
            })
    }
    componentWillMount(){
        //sizing
        window.removeEventListener('resize', this.handleResize)
        this.calcHeight()
        this.props.sendData(styles.calcStyle.height)
    }
    //
    render(){
        // console.log(`in Screen1: this.state.user_name = ${this.state.user_name}`)
        return(
            <Grid container item xs={12} justify='center' alignItems='center'>
                {/* {console.log(`in render() styles.calcStyle.height = ${styles.calcStyle.height}`)} */}
                
                <Paper
                    style={{
                        ...styles.constStyle,
                        ...styles.calcStyle
                    }}
                    square
                >
                    <Typography variant='h2'>
                        {this.state.user_name}
                    </Typography>
                    <Avatar 
                        alt={`${this.state.user_name}_profile_picture`}
                        src={this.state.profile_picture}
                        style={{...avatar_style}}
                    />
                </Paper>
            </Grid>
        )
    }
}

export default Welcome