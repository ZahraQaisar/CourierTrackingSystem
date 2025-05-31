import React from 'react';
import './App.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handlesubmit = (e) =>
    {
        e.preventDefault();

        axios.post("http://localhost:3000/register", {name, email, password})
        .then(result => {
            navigate("/login");
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="form-container">
            <h2>Create an Account</h2>
            <form onSubmit={handlesubmit}>
            <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" name="name" onChange = { (e) => setName(e.target.value) } required/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange = { (e) => setEmail(e.target.value) } required/>
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange = { (e) => setPassword(e.target.value) } required/>
            </div>
            
            <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default SignUp