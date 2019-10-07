const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  pay: {
    type: Number,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Event", eventSchema);
