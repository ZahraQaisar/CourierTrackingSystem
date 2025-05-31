const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import cors
const bcrypt = require('bcrypt');
const UserModel = require('./models/User');
require('dotenv').config();

const app = express(); // ✅ This must be here

app.use(cors()); // ✅ Allow requests from other origins
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received data:", req.body);

  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      UserModel.create({ name, email, password: hashedPassword })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(500).json(err));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
