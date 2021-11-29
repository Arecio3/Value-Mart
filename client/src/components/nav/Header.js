import React, { useState } from 'react'
import { Menu } from 'antd';
import { UserAddOutlined, HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import '../../styles/header.css';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')
  // For active border highlight
    const handleClick = (e) => {
     setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<HomeOutlined />}>
          Home
        </Item>
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          Register
        </Item>
        <Item key="login" icon={<UserOutlined />} className="float-right">
          Login
        </Item>
        <SubMenu className="float-left" key="SubMenu" icon={<SettingOutlined />} title="Username">
            <Item key="setting:1">Login</Item>
            <Item key="setting:2">Create Account</Item>
        </SubMenu>
      </Menu>
    )
}

export default Header