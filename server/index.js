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
  const { trackingID, delivery_time, parcel_status, location } = req.body;

  console.log("Received trackingID:", trackingID);

  try {
    const parcel = await TrackModel.findOne({ tracking_number: trackingID });

    if (!parcel) {
      return res.status(404).json({ message: "Invalid tracking ID" });
    }

    parcel.parcel_status = parcel_status;
    parcel.delivery_date = delivery_time;
    parcel.location = location;

    await parcel.save(); 

    res.status(200).json({ message: "Parcel updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// =====================================================================================

app.post('/track', async (req, res) => {
  const { trackingID } = req.body;

  try {
    const parcel = await TrackModel.findOne({ tracking_number: trackingID });

    if (!parcel) {
      return res.status(404).json({ message: 'Invalid Tracking ID' });
    }

    res.json({
      parcel_status: parcel.parcel_status,
      delivery_date: parcel.delivery_date,
      location: parcel.location
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// =====================================================================================

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new ContactModel({ name, email, message });
    await contact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// =====================================================================================

app.post("/parcelbooking", async (req, res) => {
  try {
    const booking = new BookingModel(req.body);
    await booking.save();
    res.send("Parcel booked successfully!");
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});

// =====================================================================================

app.post("/confirmation", async (req, res) => {
  try {
    const confirmation = new ConfirmModel(req.body);
    await confirmation.save();
    res.send("Delivery confirmation saved!");
  } catch (e) {
    res.status(500).send("Error saving delivery confirmation");
  }
});

// =====================================================================================


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
