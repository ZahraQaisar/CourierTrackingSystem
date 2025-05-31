
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Track from './Track';
import Contact from './Contact';
import Admin from './Admin';
import Update from './Update';

function App() {
  return (
    <div>
        <nav className="navigation">
          <div className="logo">CourierBox</div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/track">Track</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
          <a href="/register" className="btn">Get Started</a>
        </nav>

      <BrowserRouter>
        <Routes>
          
          <Route path='/'   element={<Home />}>  </Route> 
          <Route path='/login'   element={<Login />}>  </Route> 
          <Route path='/register'   element={<SignUp />}>  </Route> 
          <Route path='/track'   element={<Track />}>  </Route> 
          <Route path='/contact'   element={<Contact />}>  </Route> 
          <Route path='/admin'   element={<Admin />}>  </Route> 
          <Route path='/update'   element={<Update />}>  </Route> 
                          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
