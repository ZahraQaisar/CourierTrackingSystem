import React from 'react';
import './App.css';

function Home() {
  return (
    <div className="container">
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

      <main className="content">
        <h1>Welcome to Courier Tracking System!</h1>
        <p>Your reliable courier service solution.</p>
      </main>
    </div>
  );
}

export default Home;
