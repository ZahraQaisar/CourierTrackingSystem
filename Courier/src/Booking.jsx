import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function ParcelBookingForm() {
    const [senderName, setSenderName] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [address, setAddress] = useState("");
    const [weight, setWeight] = useState("");
    const [type, setType] = useState("");
    const [charges, setCharges] = useState("");

    const navigate = useNavigate();

   const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/parcelbooking", {senderName,receiverName,address,weight,type,charges,})
    .then(result => {
        if (result.status === 201 || result.status === 200) {
        navigate("/track");  // Go to Track page
        }
        console.log(result);  // Optional: For debugging
    })
    .catch(err => {
        console.log(err);  // Error handling
    });
    };

  return (
    <div className="form-container">
      <h2>Parcel Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="senderName">Sender Name:</label>
          <input type="text" id="senderName" name="senderName"
            onChange={e => setSenderName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="receiverName">Receiver Name:</label>
          <input type="text" id="receiverName" name="receiverName"
            onChange={e => setReceiverName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address"
            onChange={e => setAddress(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input type="number" id="weight" name="weight"
            onChange={e => setWeight(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="type">Parcel Type:</label>
          <input type="text" id="type" name="type"
            onChange={e => setType(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="charges">Charges (Rs):</label>
          <input type="number" id="charges" name="charges"
            onChange={e => setCharges(e.target.value)} required />
        </div>

        <button type="submit">Book Parcel</button>
      </form>
    </div>
  );
}

export default ParcelBookingForm;
