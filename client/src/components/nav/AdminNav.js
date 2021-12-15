import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/userNav.css'
import { FaStore, FaDatabase } from 'react-icons/fa';
import { FcAddRow } from 'react-icons/fc';
import { GiTicket } from 'react-icons/gi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFillDiagram2Fill } from "react-icons/bs";
import { AppstoreAddOutlined } from '@ant-design/icons';
import '../../styles/adminDash.css'

const AdminNav = ({theme}) => {

    return (
        <nav>
            <ul className="nav flex-column mt-4">
            <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link"><FaStore style={{marginRight: '7px'}}/>Admin Dashboard</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/product" className="nav-link"><AppstoreAddOutlined style={{marginRight: '7px'}}/>Product</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/products" className="nav-link"><FaDatabase style={{marginRight: '7px'}}/>Inventory</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/category" className="nav-link"><FcAddRow style={{marginRight: '7px'}}/>Category</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/subcat" className="nav-link"><BsFillDiagram2Fill style={{marginRight: '7px'}}/>Sub-Categories</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/coupon" className="nav-link"><GiTicket style={{marginRight: '7px'}}/>Coupons</Link>
            </li>
            <li className="nav-tem">
                <Link to="/user/password" className="nav-link"><RiLockPasswordFill style={{marginRight: '7px'}}/>Change Password</Link>
            </li>
            </ul>
        </nav>
    )
}

export default AdminNav