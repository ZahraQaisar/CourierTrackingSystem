import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeliveryConfirmationForm() {
  const [trackingId, setTrackingId] = useState("");
  const [receiverSignature, setReceiverSignature] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/confirmation", {trackingId,receiverSignature,deliveryDate})
    .then(result => {
      if (result.status === 201 || result.status === 200) {
        navigate("/track"); // page jahan jana hai submit ke baad
      }
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  };


  return (
    <div className="form-container">
      <h2>Delivery Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="trackingId">Tracking ID:</label>
          <input
            type="text"
            id="trackingId"
            name="trackingId"
            onChange={(e) => setTrackingId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="receiverSignature">Receiver Signature:</label>
          <input
            type="text"
            id="receiverSignature"
            name="receiverSignature"
            onChange={(e) => setReceiverSignature(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input
            type="text"
            id="deliveryDate"
            name="deliveryDate"
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Confirm Delivery</button>
      </form>
    </div>
  );
}

export default DeliveryConfirmationForm;
