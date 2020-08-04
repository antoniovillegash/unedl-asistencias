import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
//import { isLogin } from '../utils';

function isUser() {
    const dateNow = Math.ceil(Date.now()/1000)

    let decodedToken = jwt.decode(localStorage.getItem('token')) || false;
    if (decodedToken.role === 'USER' && dateNow < decodedToken.exp) {
        
        return true
    } else {
        localStorage.removeItem('token')
        return false
    }

};

const PrivateRoute = ({ component: Component, ...rest }) => {


    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isUser() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );

};



export default PrivateRoute;