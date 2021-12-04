import React, { useState } from 'react'
import { Menu } from 'antd';
import { UserAddOutlined, HomeOutlined, SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import '../../styles/header.css';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}));
    let navigate = useNavigate();
  // For active border highlight
    const handleClick = (e) => {
     setCurrent(e.key)
    }

    const logout = () => {
      firebase.auth().signOut();
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      navigate('/login')
    }

    const nickname = `Hello, ${user.email && user.email.split('@')[0]}`

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='nav-container'>
        <Item  key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        {!user && (<Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>)}
        {!user && (<Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>)}
        {user && (<SubMenu className={user ? "float-right" : "float-left"} key="SubMenu" icon={<SettingOutlined />} title={nickname}>
            {user ? "" : <Item key="setting:1"><Link to="/login">Login</Link></Item>}
            {user ? "" : <Item key="setting:2"><Link to="/register">Create Account</Link></Item>}
            <Item icon={<LogoutOutlined />} style={{color: 'red'}} onClick={logout}><Link to="/register">Logout</Link></Item>
        </SubMenu>
        )}
      </Menu>
    )
}

export default Header