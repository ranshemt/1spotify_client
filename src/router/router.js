//React
import React from 'react'
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
            <Route path ='/App/:UID' component={App} />
            <Route path ='/Err' component={Err} />
            <Route path ='/' component={Login} />
        </React.Fragment>
    )
}

export default ReactRouter