const Booking = require("../../models/Booking");
const User = require("../../models/User");
const authMiddleware = require("../../helpers/authMiddleware");
const { UserInputError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    requestBooking: async (parent, args, context) => {
      try {
        const token = authMiddleware(context);

        const creatorPersonId = token.userId;
        const { requestedSpeakerId, eventId } = args;

        const requestedSpeaker = await User.findById(requestedSpeakerId);

        const existingBooking = await Booking.findOne({ event: eventId });

        if (existingBooking) {
          const existingrequest = existingBooking.requestedSpeakers;

          if (existingrequest.indexOf(requestedSpeakerId) !== -1) {
            throw new UserInputError("Duplicate request", {
              error: "Speaker already resquested"
            });
          }

          existingBooking.requestedSpeakers.push(requestedSpeakerId);
          requestedSpeaker.bookingRequests.push(existingBooking);

          await requestedSpeaker.save();
          await existingBooking.save();

          return existingBooking;
        }

        const creatorPerson = await User.findById(creatorPersonId);

        const creatorCompany = creatorPerson.createdCompany[0];

        const booking = new Booking({
          event: eventId,
          creatorPerson: creatorPersonId,
          creatorCompany
        });

        booking.requestedSpeakers.push(requestedSpeakerId);
        requestedSpeaker.bookingRequests.push(booking);

        await requestedSpeaker.save();
        await booking.save();

        return booking;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
