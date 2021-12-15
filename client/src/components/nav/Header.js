import React, { useState } from "react";
import { Menu, Switch } from "antd";
import {
  UserAddOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DesktopOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "../../styles/header.css";
import { Link } from "react-router-dom";
import firebase from "firebase/compat";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import cuba from "../../assets/cuba.png";
import us from "../../assets/united-states-of-america.png";
import { FaStore, FaUserShield } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
const { SubMenu, Item, ItemGroup } = Menu;

const Header = ({ theme, setTheme }) => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();

  // For active border highlight
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  const nickname = () => {
    return (
      <>
        {t("Hello")} {`${user?.email && user.email.split("@")[0]}`}
      </>
    );
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="logo-title-container">
        <h2 className="logo-title">Value-Mart</h2>
      </div>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className={theme === "dark" ? "dark-mode" : "nav-container"}
      >
        <Item key="home" icon={<HomeOutlined />}>
          <Link to="/" className={theme === "dark" ? "dark" : "light"}>
            {t("Home")}
          </Link>
        </Item>
        {!user && (
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link
              to="/register"
              className={theme === "dark" ? "dark" : "light"}
            >
              {t("Register")}
            </Link>
          </Item>
        )}
        {!user && (
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login" className={theme === "dark" ? "dark" : "light"}>
              {t("Login")}
            </Link>
          </Item>
        )}
        {user && (
          <SubMenu
            className={user ? "float-right" : "float-left"}
            key="SubMenu"
            icon={user.role === "subscriber" ? <UserOutlined /> : <FaUserShield />}
            title={nickname()}
          >
            {user ? (
              ""
            ) : (
              <Item key="setting:1">
                <Link to="/login">{t("Login")}</Link>
              </Item>
            )}
            {user ? (
              ""
            ) : (
              <Item key="setting:2">
                <Link to="/register">{t("CreateAccount")}</Link>
              </Item>
            )}
            <Item icon={<SettingOutlined />}>
              <Link to="/settings">{t("Settings")}</Link>
            </Item>
            {user && user.role === "subscriber" && 
            <Item icon={<RiDashboardFill />}key="setting:3">
              <Link to="/user/history">Dashboard</Link>
            </Item>}
            {user && user.role === "admin" && 
            <Item icon={<FaStore/>} key="setting:3">
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </Item>}
            <SubMenu
              key="setting:3"
              title={t("Display")}
              icon={<EyeOutlined />}
            >
              <ItemGroup title={t("Languages")}>
                <Item onClick={() => i18n.changeLanguage("en")}>
                  <div>
                    <img className="flag" src={us} alt="us flag" />
                    {t("English")}
                  </div>
                </Item>
                <Item onClick={() => i18n.changeLanguage("es")}>
                  <div>
                    <img className="flag" src={cuba} alt="cuba flag" />
                    {t("Spanish")}
                  </div>
                </Item>
              </ItemGroup>
              <ItemGroup title={t("Theme")}>
                <Item key="12" icon={<DesktopOutlined />} onClick={changeTheme}>
                  <Switch
                    checkedChildren={<i className="fas fa-sun"></i>}
                    unCheckedChildren={<i className="far fa-moon"></i>}
                    defaultChecked
                  />
                </Item>
              </ItemGroup>
            </SubMenu>
            <Item
              icon={<LogoutOutlined />}
              style={{ color: "red" }}
              onClick={logout}
            >
              <Link to="/register">{t("Logout")}</Link>
            </Item>
          </SubMenu>
        )}
        {!user && (
          <SubMenu title="Guest" icon={<UserOutlined />} className="float-left">
            <ItemGroup title={t("Languages")}>
              <Item onClick={() => i18n.changeLanguage("en")}>
                <div>
                  <img className="flag" src={us} alt="us flag" />
                  {t("English")}
                </div>
              </Item>
              <Item onClick={() => i18n.changeLanguage("es")}>
                <div>
                  <img className="flag" src={cuba} alt="cuba flag" />
                  {t("Spanish")}
                </div>
              </Item>
            </ItemGroup>
            <ItemGroup title={t("Theme")}>
              <Item key="12" icon={<DesktopOutlined />} onClick={changeTheme}>
                <Switch
                  checkedChildren={<i className="fas fa-sun"></i>}
                  unCheckedChildren={<i className="far fa-moon"></i>}
                  defaultChecked
                />
              </Item>
            </ItemGroup>
          </SubMenu>
        )}
      </Menu>
    </>
  );
};

export default Header;
