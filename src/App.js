import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'; 
import Home2 from './Pages/Home/Home2.jsx';
import { useSelector } from 'react-redux';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Test from './Pages/Test/Test';
import P404 from './Pages/P404/P404';
import Website from './Pages/Website.jsx';
import './index.css';
import { useEffect } from 'react';


function App() {

  const user = useSelector((state)=> state.user );
  const token = useSelector((state)=> state.token );

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ !token ? <Navigate to="/login" /> : <Home2 />} />
          <Route path='/login' element={ token ? <Navigate to="/"  />: <Login /> } />
          <Route path='/register' element={token ? <Navigate to="/"  />: <Register /> } />
          <Route path='/test' element={ <Test /> } />
          <Route path='*' element={ <P404 /> } />
          <Route path='/dakir' element={ <Website /> } />
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;

