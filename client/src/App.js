import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterFinal from './pages/auth/RegisterFinal';
const App = () => {
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
