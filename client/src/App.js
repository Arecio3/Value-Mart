import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Header />
    <Router>
   <Routes>
     <Route exact path='/' element={<Home />}/>
     <Route exact path='/login' element={<Login/>}/>
     <Route exact path='/register' element={<Register/>}/>
   </Routes>
    </Router>
    </>
  );
}

export default App;
