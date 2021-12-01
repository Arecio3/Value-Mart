import React, { useState, useEffect } from 'react';
import bg1 from '../../assets/register-pic1.svg';
import bg2 from '../../assets/register-pic2.svg';
import '../../styles/register.css';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
require("firebase/auth");

toast.configure()
const RegisterFinal = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Grab email from local storage
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    // Form UI
    const completeRegistrationForm = () => 
        <form onSubmit={handleSubmit}>
            <input
             placeholder='Email' 
             type="email" 
             className="form-control email-form" 
             value={email} 
             autoFocus
             />
             <button type="submit" className="btn btn-green m-3">Complete Registration</button>
        </form>
    

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className='heading'>Register Now</h2>
                    <h6 className='subhead'>Start shopping today !</h6>
                    {completeRegistrationForm()}
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

export default RegisterFinal;