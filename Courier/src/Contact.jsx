import React from 'react';
import './App.css';

function Contact() {
    return (
        <div className="form-container">
            <h2>Contact Support</h2>
            <form>
            <div className="form-group">
                <label for="name">Your Name:</label>
                <input type="text" id="name" name="name" required/>
            </div>

            <div className="form-group">
                <label for="email">Your Email:</label>
                <input type="email" id="email" name="email" required/>
            </div>

            <div className="form-group">
                <label for="message">Your Message:</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            
            <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default Contact
