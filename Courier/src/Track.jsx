import React from 'react';
import './App.css';

function Track() {
  return (
    <div className="form-container">
        <h2>Track Your Parcel</h2>
        <form>
        <div className="form-group">
            <label for="tracking-id">Tracking Number:</label>
            <input type="text" id="tracking-id" name="tracking-id" required/>
        </div>
        
        <button type="submit">Track</button>
        </form>
        
        <div className="status-display">
        <h3>Parcel Status:</h3>
        <p><strong>Status:</strong> In Transit</p>
        <p><strong>Estimated Delivery Date:</strong> April 10, 2025</p>
        <p><strong>Current Location:</strong> Lahore, Pakistan</p>
        </div>
    </div>
  );
}

export default Track;
