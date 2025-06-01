const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");  
const UserModel = require('./models/User');
require('dotenv').config();

const app = express();

app.use(cors()); 
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


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      bcrypt.compare(password, user.password)
        .then(isPasswordEqual => {
          if (isPasswordEqual) {
            const jwtToken = jwt.sign(
              { email: user.email, _id: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "24h" }
            );

            return res.status(200).json({
              message: "Login successful",
              jwtToken,
              name: user.name,
              email: user.email
            });
          } else {
            return res.status(400).json({ message: "Password is incorrect" });
          }
        })
        .catch(err => {
          console.error("Error comparing password:", err);
          res.status(500).json({ message: "Error checking password" });
        });
    })
    .catch(err => {
      console.error("Database error:", err);
      res.status(500).json({ message: "Database error" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
