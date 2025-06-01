import React from 'react';
import './App.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Update() {
    const [trackingID, setTrackingID] = useState('');
    const [delivery_time, setDelivery_time] = useState('');
    const [parcel_status, setParcel_status] = useState('');
    const [location, setLocation] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sending trackingID:", trackingID);
        axios.post("http://localhost:3000/update", { trackingID, delivery_time, parcel_status, location })
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
                <label htmlFor="trackingId">Tracking ID:</label>
                <input type="text" id="trackingId" name="trackingId"
                onChange={(e) => setTrackingID(e.target.value)} required/>

                <label htmlFor="deliveryDate">Estimated Delivery Date:</label>
                <input type="text" id="date" name="date"
                onChange={(e) => setDelivery_time(e.target.value)} required/>

                <label htmlFor="loaction">Location:</label>
                <input type="text" id="location" name="location"
                onChange={(e) => setLocation(e.target.value)} required/>
            </div>
            
            <div className="form-group">
                <label htmlFor="status">Status:</label>

                <select id="status" name="status"
                onChange={(e) => setParcel_status(e.target.value)} required>

                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
                <option value="returned">Returned</option>
                </select>
            </div>
            
            <button type="submit">Update Status</button>
            </form>
        </div>
    );
}

export default Update
