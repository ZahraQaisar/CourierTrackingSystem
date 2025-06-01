const mongoose = require("mongoose");

const ConfirmationSchema = new mongoose.Schema({
  trackingId: String,
  receiverSignature: String,
  deliveryDate: String,
});

const ConfirmModel = mongoose.model("Confirmation", ConfirmationSchema);
module.exports = ConfirmModel;

