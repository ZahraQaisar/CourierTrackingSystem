import React from 'react';
import './App.css';

function Update() {
    return (
        <div className="form-container">
            <h2>Update Package Status</h2>
            <h4>(Admin use Only)</h4>
            <form action="update_package_status.php" method="POST">
            <div class="form-group">
                <label for="trackingId">Tracking ID:</label>
                <input type="text" id="trackingId" name="trackingId" required/>
            </div>
            
            <div class="form-group">
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" required>
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
