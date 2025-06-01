const mongoose = require("mongoose");

const ParcelBookingSchema = new mongoose.Schema({
  senderName: String,
  receiverName: String,
  address: String,
  weight: Number,
  type: String,
  charges: Number,
});

const BookingModel=mongoose.model("ParcelBooking", ParcelBookingSchema);
module.exports=BookingModel
