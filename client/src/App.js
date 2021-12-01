import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterFinal from './pages/auth/RegisterFinal';

import { auth } from './firebase'; 
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch()

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()
        
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    })
    // Clean up
    return () => unsubscribe();
  }, [])


  return (
    <>
      <Header />
      <ToastContainer/>
          <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/register' element={<Register/>}/>
              <Route exact path='/register/complete' element={<RegisterFinal/>}/>
          </Routes>
    </>
  );
}

export default App;
