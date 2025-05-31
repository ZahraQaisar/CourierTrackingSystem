import React from 'react';
import './App.css';

function SignUp() {
    return (
        <div className="form-container">
            <h2>Create an Account</h2>
            <form>
            <div className="form-group">
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" required/>
            </div>

            <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required/>
            </div>
            
            <div className="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            
            <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default SignUp