import React, { useState } from 'react';
import bg1 from '../../assets/login1.png';
import bg3 from '../../assets/login3.png';
import '../../styles/login.css';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
require("firebase/auth");

toast.configure()
const Login = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // config for email
        const config = {
            url: 'http://localhost:3000/register/complete',
            handleCodeInApp: true,
        };
        // Passes email and config into function
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Thank you ${name}, an email was sent to ${email}. Click the link to finish registration!`, {
             position: "top-right",
             autoClose: false,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined
         })
        // Save email to local storage
        window.localStorage.setItem('emailForRegistration', email);
        window.localStorage.setItem('nameForRegistration', name);
        setEmail("");
        setName("");
    }

    // Form UI
    const registerForm = () => 
        <form onSubmit={handleSubmit}>
            <input
             placeholder='Your email' 
             type="email" 
             className="form-control email-form" 
             value={email} 
             onChange={(e) => setEmail(e.target.value)} 
             autoFocus
             />
            <input
             placeholder='First name' 
             type="name" 
             className="form-control email-form" 
             value={name} 
             onChange={(e) => setName(e.target.value)} 
             autoFocus
             />
             <button type="submit" className="btn btn-green m-3">Login</button>
        </form>
    

    return (
        <div className='loginContainer'>
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className='login-heading'>Login</h1>
                    <h5 className='login-subhead'>Welcome Back</h5>
                    {registerForm()}
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