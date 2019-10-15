const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  creatorCompany: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  creatorPerson: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  requestedSpeakers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  confirmedSpeaker: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
