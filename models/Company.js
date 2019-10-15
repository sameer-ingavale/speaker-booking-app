const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
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
        default: "us"
      }
    }
  ],
  phone: String,
  einNumber: String,
  companyType: String,
  dateCreated: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdEvents: [
    {
      type: [Schema.Types.ObjectId],
      ref: "Event"
    }
  ]
});

module.exports = mongoose.model("Company", companySchema);
