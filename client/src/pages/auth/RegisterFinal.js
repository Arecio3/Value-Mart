import React, { useState, useEffect } from 'react';
import bg1 from '../../assets/registerfinal1.png';
import bg2 from '../../assets/registerfinal2.png';
import '../../styles/register.css';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import '../../styles/registerfinal.css';
import { useNavigate } from 'react-router-dom';
require("firebase/auth");

toast.configure()
const RegisterFinal = ({history}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    // Grabs email from local Storage and sets it to the email state
    useEffect(() => {
        // Grab email & name from local storage
        setEmail(window.localStorage.getItem('emailForRegistration'));
        setName(window.localStorage.getItem('nameForRegistration'));
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Sign in
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log('User Successfully created', result)

            if(result.user.emailVerified) {
                // Delete email & name from local storage
                window.localStorage.removeItem('emailForRegistration')
                window.localStorage.removeItem('nameForRegistration')
                // get current user logged into firebase
                let user = auth.currentUser
                // Update password
                await user.updatePassword(password)
                // Get id
                const idTokenResult = await user.getIdTokenResult();
                // populate user to redux store
                console.log(idTokenResult)
                // redirect user back
                navigate("/");
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
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
             <br />
            <input
             placeholder='First Name' 
             type="name" 
             className="form-control" 
             value={name} 
             autoFocus
             />
             <br />
            <input
             placeholder='Password' 
             type="password" 
             className="form-control" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             autoFocus 
             />
             <button type="submit" className="btn btn-green m-3">Start Shopping</button>
        </form>
    

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className='heading'>Final Step</h2>
                    <h6 className='subhead'>Once submitted you will be returned to the shop</h6>
                    {completeRegistrationForm()}
                </div>
            </div>
            <div className="registerImg1-box img-fluid">
                <img className="registerImg1" src={bg1} alt="" />
            </div>      
            <div className="registerImg2-box img-fluid">
                <img  className="registerImg2" src={bg2} alt="" />
            </div>      
        </div>
    )
}

export default RegisterFinal;