import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
var apiPathName = 'https://spotify-merge.herokuapp.com'
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
const Login = () => {
    return(
        <Grid container item xs={12} justify='center' alignItems='center'> 
            <Paper
                style={{...styles}}
                square
            >
                <Button
                    variant="contained"
                    color="secondary"
                    href={apiPathName+'/login'}
                >
                    Wow! I'm a login button
                </Button>
            </Paper>
        </Grid>
    )
}

export default Login