import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import IMG from '../images/screen1.jpg'
var styles = {
    backgroundImage: `url(${IMG})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: '50px',
    width: '50px',
    borderRadius: '50%'
}
const Playlists = () => {
    return(
        <Grid container item xs={12} justify='center' alignItems='center'>
            <Paper
                style={{
                    ...styles
                }}
            >
                <Button variant="contained" color="primary">
                    Wow, I'm a button
                </Button>
            </Paper>
            
        </Grid>
    )
}

export default Playlists