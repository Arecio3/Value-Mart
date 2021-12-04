import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/fgmp.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

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
        setLoading(true)

        const config = {
            url: 'http://localhost:3000/login',
            handleCodeInApp: true,
        };
        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail("")
            setLoading(false)
            toast.success(`A password reset link was sent to ${email} check email for final step!`)
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
        })
    }

    return (
        <div className='container col-md-6 offset-md-3 p-5'>
           {loading ? <h1>Loading..</h1> : 
           <div>
               <h1>Forgot Password?</h1>
               <h6 className='text-info'>Submit form then check your email!</h6>
            </div>}
           <form action="submit" onSubmit={handleSubmit}>
               <input type="email" className='form-control' placeholder="Account Email" value={email} onChange={(e) => setEmail((e.target.value))} autoFocus/>
                <br />
                <button className="btn btn-raised fgmp-btn" disabled={!email}>Submit</button>
           </form>
        </div>
    )
}

export default ForgotPassword
