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
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import Password from "./pages/user/Password";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import Wishlist from "./pages/user/Wishlist";
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';

const App = () => {
  const [theme, setTheme] = useState("dark");
  const dispatch = useDispatch()

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()
        
        currentUser(idTokenResult.token)
            .then((res) => {
            // Dispatch result to redux
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
            })
            .catch(err => console.log(err))
;      }
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
              <Route exact path='/' element={<Home theme={theme}/>}/>
              <Route exact path='/login' element={<Login theme={theme}/>}/>
              <Route exact path='/register' element={<Register theme={theme}/>}/>
              <Route exact path='/register/complete' element={<RegisterFinal/>}/>
              <Route exact path='/forgot/password' element={<ForgotPassword/>}/>
              <Route exact path='/user/history' element={<UserRoute theme={theme}/>}/>
              <Route exact path='/user/password' element={<Password theme={theme}/>}/>
              <Route exact path='/user/wishlist' element={<Wishlist/>}/>
              <Route exact path='/admin/dashboard' element={<AdminRoute theme={theme}/>}/>
              <Route exact path='/admin/category' element={<CategoryCreate theme={theme}/>}/>
              <Route exact path='/admin/category/:slug' element={<CategoryUpdate theme={theme}/>}/>
              <Route exact path='/admin/sub' element={<SubCreate theme={theme}/>}/>
              <Route exact path='/admin/sub/:slug' element={<SubUpdate theme={theme}/>}/>
              <Route exact path='/admin/product' element={<ProductCreate theme={theme}/>}/>
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
