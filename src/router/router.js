/** router.js
* @ this file 'decides'
* @ which component to render at each path
*/
//React
import React from 'react'
//React Route component
import {Route} from 'react-router-dom'
//The components to render in each route
import App from '../components/App'
import Login from '../components/Login'
import Err from '../components/Err'

//
//stateless component!
const ReactRouter = () => {
    //<React.Fragment> is similar to div
    //  but solve some problems when div cannot be used
    return (
        <React.Fragment>
            <Route exact path ='/' component={Login} />
            <Route exact path='/App/:UID' component={App} />
            <Route exact path='/Err' component={Err} />
        </React.Fragment>
    )
}

export default ReactRouter