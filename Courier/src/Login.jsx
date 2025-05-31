import React from 'react';
import './App.css';

function Login() {
    return (
        <div className="form-container">
            <h2>Login</h2>
            <form>
            <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required/>
            </div>
            
            <div className="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            
            <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login
