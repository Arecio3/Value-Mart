import React, { useState } from 'react'
import { Menu, Switch } from 'antd';
import { UserAddOutlined, HomeOutlined, SettingOutlined, UserOutlined, LogoutOutlined, DesktopOutlined, EyeOutlined } from '@ant-design/icons';
import '../../styles/header.css';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18n  from "../../i18n";

const { SubMenu, Item, ItemGroup } = Menu;

const Header = ({theme, setTheme}) => {
    const [current, setCurrent] = useState('home')
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}));
    let navigate = useNavigate();

    // For active border highlight
    const handleClick = (e) => {
      setCurrent(e.key)
    }

    function changeTheme() {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };
    
    const logout = () => {
      firebase.auth().signOut();
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      navigate('/login')
    }
    
    const nickname = `Hello, ${user?.email && user.email.split('@')[0]}`
    
    const { t } = useTranslation();
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className={theme === "dark" ? "dark-mode" : 'nav-container'}>
        <Item  key="home" icon={<HomeOutlined />}>
          <Link to="/" className={theme === "dark" ? "dark": "light"}>{t('Home')}</Link>
        </Item>
        {!user && (<Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register" className={theme === "dark" ? "dark": "light"}>Register</Link>
        </Item>)}
        {!user && (<Item key="login" icon={<UserOutlined/>} className="float-right">
          <Link to="/login" className={theme === "dark" ? "dark": "light"}>Login</Link>
        </Item>)}
        {user && (<SubMenu className={user ? "float-right" : "float-left"} key="SubMenu" icon={<UserOutlined />} title={nickname}>
            {user ? "" : <Item key="setting:1"><Link to="/login">Login</Link></Item>}
            {user ? "" : <Item key="setting:2"><Link to="/register">Create Account</Link></Item>}
            <Item icon={<SettingOutlined />}><Link to="/settings">Settings</Link></Item>
            <SubMenu key="sub3" title="Display" icon={<EyeOutlined />}>
              <ItemGroup title="Langauges">
              <Item onClick={() => i18n.changeLanguage('en')}>English</Item>
              <Item onClick={() => i18n.changeLanguage('es')}>Spanish</Item>
              </ItemGroup>
              <ItemGroup title="Theme">
              <Item key="12" icon={<DesktopOutlined />} onClick={changeTheme}><Switch checkedChildren={<i class="fas fa-sun"></i>} unCheckedChildren={<i class="far fa-moon"></i>} defaultChecked /></Item>
              </ItemGroup>
            </SubMenu>
            <Item icon={<LogoutOutlined />} style={{color: 'red'}} onClick={logout}><Link to="/register">Logout</Link></Item>
        </SubMenu>
        )}
      </Menu>
    )
}

export default Header