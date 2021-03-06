import React, { useState, useEffect } from 'react';
import bg1 from '../../assets/register-pic1.svg';
import bg2 from '../../assets/register-pic2.svg';
import '../../styles/register.css';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
require("firebase/auth");

toast.configure()
const Register = ({theme}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    let navigate = useNavigate();

    const { t } = useTranslation();

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) {
            navigate('/')
        }  else {
            return
        }
    }, [navigate, user]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // config for email
        const config = {
            url: 'http://localhost:3000/register/complete',
            handleCodeInApp: true,
        };
        // Passes email and config into function
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Thank you ${name}, an email was sent to ${email}. Click the link to finish registration!`)
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
             />
             <button onClick={handleSubmit} className="btn btn-blue m-3">{t('Register')} {email}</button>
        </form>
    

    return (
        <div className={theme === "dark" ? "dm-container p-5" : "container p-5"}>
            <div className={theme === "dark" ? "row text-white" : "row"}>
                <div className="col-md-6 offset-md-3">
                    <h2 className={theme === "dark" ? "text-white heading" : 'heading'}>{t('RegisterNow')}</h2>
                    <h6 className='subhead'>{t('RegisterSubHead')}</h6>
                    {registerForm()}
                </div>
            </div>
            <div className="img1-box img-fluid">
                <img className="img1" src={bg1} alt="" />
            </div>      
            <div className="img2-box img-fluid">
                <img  className="img2" src={bg2} alt="" />
            </div>      
        </div>
    )
}

export default Register;