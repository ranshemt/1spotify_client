import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
//custom style for <Paper> component
var styles = {
    backgroundColor: '#1DB954',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
}
//
const Err = () => {
    return(
        <Grid container item xs={12} justify='center' alignItems='center'> 
            <Paper
                style={{...styles}}
                square
            >
                <h2>This is error page!</h2>
            </Paper>
        </Grid>
    )
}

export default Err