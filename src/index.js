import React from 'react';
import ReactDOM from 'react-dom';
//import {BrowserRouter as Router} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles';
import './index.css';
import * as serviceWorker from './serviceWorker';
import myTheme from './themes/theme'
//
//
import ReactRouter from './router/router'
//
ReactDOM.render(
    <Router>
        <MuiThemeProvider theme={myTheme}>
            <ReactRouter />
        </MuiThemeProvider>
    </Router>
  ,document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
