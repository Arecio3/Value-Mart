import React, { useState } from 'react'
import { Menu } from 'antd';
import { UserAddOutlined, HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import '../../styles/header.css';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')
  // For active border highlight
    const handleClick = (e) => {
     setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className='nav-container'>
        <Item  key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
        <SubMenu className="float-left" key="SubMenu" icon={<SettingOutlined />} title="Username">
            <Item key="setting:1"><Link to="/login">Login</Link></Item>
            <Item key="setting:2"><Link to="/register">Create Account</Link></Item>
        </SubMenu>
        <Item className='logo'>
          Value-Mart
        </Item>
      </Menu>
    )
}

export default Header