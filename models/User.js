const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dateCreated: String,
  userType: String,
  createdCompany: [
    {
      type: Schema.Types.ObjectId,
      ref: "Company"
    }
  ],
  bookingRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
