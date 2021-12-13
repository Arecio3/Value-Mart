import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/userNav.css'


const UserNav = ({theme}) => {

    return (
        <nav>
            <ul className="nav flex-column mt-4">
            <li className="nav-item">
                <Link to="/user/history" className="nav-link">History</Link>
            </li>
            <li className="nav-tem">
                <Link to="/user/password" className="nav-link">Change Password</Link>
            </li>
            <li className="nav-tem">
                <Link to="/user/wishlist" className="nav-link">Wish List</Link>
            </li>
            </ul>
        </nav>
    )
}

export default UserNav
