const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: String,
    eventDate: String,
    startTime: String,
    endTime: String,
    payType: String,
    payAmount: {
      type: String,
      default: "0"
    },
    expectedTurnout: String,
    address: [
      {
        _id: false,
        streetAddress1: String,
        streetAddress2: String,
        zip: String,
        city: String,
        state: String,
        country: {
          type: String,
          default: "US"
        }
      }
    ],
    eventType: String,
    eventTopic: String,
    expired: {
      type: Boolean,
      default: false
    },
    eventVisibility: Boolean,
    creatorPerson: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    creatorCompany: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);
