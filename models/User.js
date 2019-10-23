const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dateCreated: String,
  userType: String,
  profilePictureLink: {
    type: String,
    default: "https://semantic-ui.com/images/avatar2/large/kristy.png"
  },
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
  ],
  confirmedBookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
