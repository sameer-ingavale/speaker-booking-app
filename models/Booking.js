const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
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
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
