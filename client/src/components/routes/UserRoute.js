import React from 'react'
import { Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../spinner/Spinner'

const UserRoute = ({children, ...rest}) => {
    const {user} = useSelector((state) => ({...state}));
    
    return user && user.token ? (
    <Route {...rest} render={() => children}/>
    ) : (
    <Spinner />
    );
};

export default UserRoute;