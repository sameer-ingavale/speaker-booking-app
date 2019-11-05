const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  tagline: String,
  headline: String,
  tags: [String],
  city: String,
  state: String,
  phone: String,
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: [Number]
  },
  about: String,
  gender: String,
  age: String,
  education: [
    {
      school: String,
      degree: String,
      field: String,
      startYear: String,
      endYear: String,
      grade: String,
      activities: String,
      description: String
    }
  ],
  availability: {
    fromDate: String,
    toDate: String
  },
  userVisibility: {
    type: Boolean,
    default: false
  },
  dateCreated: String,
  userType: String,
  profilePictureLink: {
    type: String,
    default: function() {
      if (this.gender === "Male") {
        return "https://i.ibb.co/gSbgf9K/male-placeholder.jpg";
      } else {
        return "https://i.ibb.co/dKx0vDS/woman-placeholder.jpg";
      }
    }
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

userSchema.index({ firstName: "text", lastName: "text" });
module.exports = mongoose.model("User", userSchema);
