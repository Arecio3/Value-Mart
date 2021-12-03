import React, { useState } from 'react';
import bg1 from '../../assets/login1.png';
import bg3 from '../../assets/login3.png';
import '../../styles/login.css';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { MailOutlined } from '@ant-design/icons';
import { Button } from 'antd';
require("firebase/auth");

toast.configure()
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async (e) => {
        e.preventDefault();
    //    console.table(email, password)
    }

    // Form UI
    const loginForm = () => 
        <form onSubmit={handleLogin}>
            <input
             placeholder='Your email' 
             type="email" 
             className="form-control email-form" 
             value={email} 
             onChange={(e) => setEmail(e.target.value)} 
             autoFocus
             />
            <input
             placeholder='Your password' 
             type="password" 
             className="form-control email-form" 
             value={password} 
             onChange={(e) => setPassword(e.target.value)} 
             />
             <Button
             onClick={handleLogin}
             type="primary"
             className='mb-1'
             shape='round'
             icon={<MailOutlined/>}
             size='large'
             disabled={!email || password.length < 6}
             > Login</Button>
        </form>
    

    return (
        <div className='loginContainer'>
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className='login-heading'>Login</h1>
                    <h5 className='login-subhead'>Welcome Back</h5>
                    {loginForm()}
                </div>
            </div>
            <div className="img1-box img-fluid">
                <img className="loginImg2" src={bg1} alt="" />
            </div>          
            <div className="img2-box img-fluid">
                <img  className="loginImg3" src={bg3} alt="" />
            </div>      
        </div>
        </div>
    )
}

export default Login;