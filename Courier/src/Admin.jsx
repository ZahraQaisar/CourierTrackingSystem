import React from 'react';
import './App.css';

function Admin() {
  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form action="update">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}


export default Admin
