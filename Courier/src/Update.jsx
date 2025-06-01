import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Update() {
  const [trackingID, setTrackingID] = useState('');
  const [parcel_status, setParcel_status] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/update", { trackingID, parcel_status, address })
      .then(result => {
        navigate("/track");
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="form-container">
      <h2>Update Package Status</h2>
      <h4>(Admin use Only)</h4>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="trackingId">Tracking ID (MongoDB _id):</label>
          <input type="text" id="trackingId" name="trackingId"
            onChange={(e) => setTrackingID(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address (optional):</label>
          <input type="text" id="address" name="address"
            onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status"
            onChange={(e) => setParcel_status(e.target.value)} required>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="In Transit">In Transit</option>
            <option value="Returned">Returned</option>
          </select>
        </div>

        <button type="submit">Update Status</button>
      </form>
    </div>
  );
}

export default Update;
