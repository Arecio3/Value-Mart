import React, { useState } from 'react';
import bg1 from '../../assets/login1.png';
import bg3 from '../../assets/login3.png';
import '../../styles/login.css';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { MailOutlined, LoadingOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
require("firebase/auth");

toast.configure()
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch();
    let navigate = useNavigate();

    function showPass() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
    x.type = "text";
    } else {
    x.type = "password";
  }
}


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
    //    console.table(email, password)
    // Log user in
    try {
        const result = await auth.signInWithEmailAndPassword(email, password)
        // console.log(result)
        const { user } = result
        const idTokenResult = await user.getIdTokenResult()
        // Dispatch result to redux
        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: user.email,
              token: idTokenResult.token
            },
          });
          navigate('/')
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        setLoading(false)
    }
    }

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider).then(async(result) => {
            const {user} = result
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  email: user.email,
                  token: idTokenResult.token
                },
              });
            navigate('/');
        })
        .catch((error) =>  {
            console.log(error);
            toast.error(error.message);
        })
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
             id="myInput"
             placeholder='Your password' 
             type="password" 
             className="form-control email-form" 
             value={password} 
             onChange={(e) => setPassword(e.target.value)}
             />
             <input type='checkbox' onClick={showPass} /> <div className="showPassLabelContainer"><p className="showPassBtn">Show Password</p></div>
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
                    { !loading ? (

                        <h1 className='login-heading'>Login</h1>
                    ) : (

                        <h4 className='login-loading'>Loading <LoadingOutlined style={{color: '#d2d2d2'}}/></h4>
                    )}
                
                    {loginForm()}
                    <Button
                    onClick={googleLogin}
                    type="danger"
                    className='mb-1 google-btn'
                    shape='round'
                    icon={<GoogleOutlined/>}
                    size='large'
                    >Google Login</Button>
                    <Link to="/forgot/password" className='fgmp'>Forgot Password</Link>
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