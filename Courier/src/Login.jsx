import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './App.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/login", { email, password })
      .then((response) => {
        if (response.status === 200) {
          navigate('/');
        }
        else{
            alert("Login failed");
        }
      })
      .catch((error) => {
        alert("Login failed");
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" id="email" name="email"
            onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" id="password" name="password" 
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
