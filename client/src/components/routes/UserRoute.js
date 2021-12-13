import React from 'react'
// import { Routes, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import History from '../../pages/user/History'

const UserRoute = ({children, ...rest}) => {
    const {user} = useSelector((state) => ({...state}));
    
    return user && user.token ? (
            <>
            <History />
            </>
    ) 
    : (<h1>Loading....</h1>)
}

export default UserRoute;
