import React from 'react'
import { Link } from 'react-router-dom'
import { RiHistoryFill, RiShoppingBasketFill } from 'react-icons/ri';
import '../../styles/userNav.css'
import { SettingOutlined } from "@ant-design/icons";import '../../styles/userNav.css'


const UserNav = ({theme}) => {

    return (
        <nav>
            <ul className="nav flex-column mt-4">
            <li className="nav-item">
                <Link to="/user/history" className="nav-link"><RiHistoryFill style={{marginRight: '7px'}}/> History</Link>
            </li>
            <li className="nav-tem">
                <Link to="/user/password" className="nav-link"><SettingOutlined style={{marginRight: '7px'}}/> Change Password</Link>
            </li>
            <li className="nav-tem">
                <Link to="/user/wishlist" className="nav-link"><RiShoppingBasketFill style={{marginRight: '7px'}}/> Wish List</Link>
            </li>
            </ul>
        </nav>
    )
}

export default UserNav
