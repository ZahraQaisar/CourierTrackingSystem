import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function Track() {
  const [trackingID, setTrackingID] = useState('');
  const [parcelData, setParcelData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/track', { trackingID })
      .then(res => {
        setParcelData(res.data);
        setError('');
      })
      .catch(err => {
        setParcelData(null);
        if (err.response?.status === 404) {
          setError("Invalid Tracking ID");
        } else {
          setError("Something went wrong");
        }
      });
  };

  return (
    <div className="form-container">
      <h2>Track Your Parcel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tracking-id">Tracking Number:</label>
          <input
            type="text"
            id="tracking-id"
            name="tracking-id"
            value={trackingID}
            onChange={(e) => setTrackingID(e.target.value)}
            required
          />
        </div>
        <button type="submit">Track</button>
      </form>

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
      )}

      {parcelData && (
        <div className="status-display">
          <h3>Parcel Status:</h3>
          <p><strong>Status:</strong> {parcelData.parcel_status}</p>
          {/* <p><strong>Estimated Delivery Date:</strong> {parcelData.delivery_date}</p> */}
          <p><strong>Address:</strong> {parcelData.address}</p>
        </div>
      )}
    </div>
  );
}

export default Track;
