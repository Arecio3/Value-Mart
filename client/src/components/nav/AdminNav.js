import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/userNav.css'
import { FaStore, FaDatabase } from 'react-icons/fa';
import { GiTicket } from 'react-icons/gi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillDiagram2Fill } from "react-icons/bs";
import { AppstoreAddOutlined } from '@ant-design/icons';
import '../../styles/adminDark.css'
import '../../styles/adminNav.css'
import { useSelector } from 'react-redux';

const AdminNav = ({theme}) => {
    const { user } = useSelector((state) => ({ ...state }));

    return user?.role === "admin" ? (
        <nav>
            <ul className="nav flex-column mt-4">
            <li className="nav-item">
                <Link to="/admin/dashboard" style={theme === "dark" ? {color: "#fff"} : {color: "#0d6efd"}} className="nav-link"><FaStore style={{marginRight: '7px'}} />Admin Dashboard</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/product" style={theme === "dark" ? {color: "#fff"} : {color: "#0d6efd"}} className="nav-link"><AppstoreAddOutlined style={{marginRight: '7px'}} />Product</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/products" style={theme === "dark" ? {color: "#fff"} : {color: "#0d6efd"}} className="nav-link"><FaDatabase style={{marginRight: '7px'}} />Inventory</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/category" style={theme === "dark" ? {color: "#fff"} : {color: "#0d6efd"}} className="nav-link"><AiOutlineUnorderedList style={{marginRight: '7px'}} />Category</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/sub" style={theme === "dark" ? {color: "#fff"} : {color: "#0d6efd"}} className="nav-link"><BsFillDiagram2Fill style={{marginRight: '7px'}} />Sub-Categories</Link>
            </li>
            <li className="nav-tem">
                <Link to="/admin/coupon" style={theme === "dark" ? {color: "#fff"} : {color: "#0d6efd"}} className="nav-link"><GiTicket style={{marginRight: '7px'}} />Coupons</Link>
            </li>
            <li className="nav-tem">
                <Link to="/user/password" style={theme === "dark" ? {color: "#fff"} : {color: "#0d6efd"}} className="nav-link"><RiLockPasswordFill style={{marginRight: '7px'}} />Change Password</Link>
            </li>
            </ul>
        </nav>
    ) : (<></>)
}

export default AdminNav