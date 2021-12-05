import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterFinal from './pages/auth/RegisterFinal';
import ForgotPassword from './pages/auth/ForgotPassword';
import { ThemeProvider } from "styled-components";
import { auth } from './firebase'; 
import { useDispatch } from 'react-redux';



const App = () => {
  const [theme, setTheme] = useState("dark");
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lightTheme = {
    body: "#eff0f4",
    fontColor: "#fff",
  };
  const darkTheme = {
    body: "#000000",
    fontColor: "#fff",
  };

  const themes = {
    light: lightTheme,
    dark: darkTheme,
  }


  return (
    <>
    <ThemeProvider theme={themes[theme]}>
      <Header theme={theme} setTheme={setTheme}/>
      <ToastContainer/>
          <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/register' element={<Register/>}/>
              <Route exact path='/register/complete' element={<RegisterFinal/>}/>
              <Route exact path='/forgot/password' element={<ForgotPassword/>}/>
          </Routes>
    </ThemeProvider>
    </>
  );
}

// export const backgroundColor = theme("theme", {
//   light: "#fff",
//   dark: "#2d2d2d",
// });

//   export const textColor = theme("theme", {
//     light: "#000",
//     dark: "#fff",
//   });
  
  // const Container = styled.div`
  //   width: 100vw;
  //   height: 100vh;
  //   background-color: #2d2d2d;
  //   color: #fff;
  // `;

export default App;
