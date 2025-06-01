const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");  
const UserModel = require('./models/User');
const TrackModel = require('./models/Track');
const ContactModel = require('./models/Contact');
const BookingModel = require("./models/ParcelBooking");
const ConfirmModel = require("./models/Confirmation");
const { signinValidation, signupValidation } = require("./middlewares/myValidator");
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json());


const PORT = process.env.PORT || 3000;

// =====================================================================================

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// =====================================================================================

app.post("/register", signupValidation ,(req, res) => {
  const { name, email, password } = req.body;
  console.log("Received data:", req.body);

  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      UserModel.create({ name, email, password: hashedPassword , status: "user"})
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(500).json(err));
});

// =====================================================================================

app.post("/login",signinValidation, (req, res) => {
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

// =====================================================================================

app.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  try {
    const user = await UserModel.findOne({ email });
    console.log("Found user:", user);

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Password incorrect" });

    if (user.status !== "admin") {
      return res.status(403).json({ message: "Authorization error: Not an admin" });
    }

    res.status(200).json({
      message: "Admin login successful",
      name: user.name,
      email: user.email,
      status: user.status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================================================================================


app.post("/update", async (req, res) => {
  const { trackingID, parcel_status, address } = req.body;

  try {
    // Pehle check kar lo ke record exist karta hai ya nahi
    const parcel = await BookingModel.findById(trackingID);

    if (!parcel) {
      return res.status(404).json({ message: "Tracking ID not found" });
    }

    await BookingModel.updateOne(
      { _id: trackingID },
      { status: parcel_status, address: address }
    );

    res.status(200).json({ message: "Parcel updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// =====================================================================================

app.post('/track', async (req, res) => {
  const { trackingID } = req.body;

  try {
    const parcel = await BookingModel.findById(trackingID);

    if (!parcel) {
      return res.status(404).json({ message: 'Invalid Tracking ID' });
    }

    res.json({
      parcel_status: parcel.status,
      delivery_date: parcel.delivery_date,
      address: parcel.address
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// =====================================================================================

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await ContactModel.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// =====================================================================================
app.post("/parcelbooking", async (req, res) => {
  const { senderName, receiverName, address, weight, type, charges } = req.body;

  try {
    await BookingModel.create({ senderName, receiverName, address, weight, type, charges, status: "Pending"});
    res.status(200).send("Parcel booked successfully!");
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});


// =====================================================================================

app.post("/confirmation", async (req, res) => {
  const { trackingId, receiverSignature, deliveryDate } = req.body;

  try {
    await ConfirmModel.create({ trackingId, receiverSignature, deliveryDate });
    res.status(200).send("Delivery confirmation saved!");
  } catch (error) {
    res.status(500).send("Error saving delivery confirmation");
  }
});



// =====================================================================================


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
