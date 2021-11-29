import React, { useState } from 'react'
import bg1 from '../../assets/register-pic1.svg'
import bg2 from '../../assets/register-pic2.svg'
import '../../styles/register.css'

const Register = () => {
    const [email, setEmail] = useState("");

    // Sends Email to firebase
    const handleRegister = () => {

    }

    // Form UI
    const registerForm = () => 
        <form onSubmit={handleRegister}>
            <input
             placeholder='Email' 
             type="email" 
             className="form-control email-form" 
             value={email} 
             onChange={(e) => setEmail(e.target.value)} 
             autoFocus
             />
             <button type="submit" className="btn btn-blue m-3">Register @{email} </button>
        </form>
    

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className='heading'>Register Now</h2>
                    <h6 className='subhead'>Start shopping today !</h6>
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