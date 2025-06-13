import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        // e.preventDefault();

        axios.post("http://localhost:3000/contact", {name,email,message})
    }
    return (
        <div className="form-container">
            <h2>Contact Support</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Your Name:</label>
                <input type="text" id="name" name="name" 
                onChange={e => setName(e.target.value)} required/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Your Email:</label>
                <input type="email" id="email" name="email"
                onChange={e => setEmail(e.target.value)} required/>
            </div>

            <div className="form-group">
                <label htmlFor="message">Your Message:</label>
                <textarea id="message" name="message"
                onChange={e => setMessage(e.target.value)} required></textarea>
            </div>
            
            <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default Contact
