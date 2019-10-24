const Booking = require("../../models/Booking");
const User = require("../../models/User");
const Event = require("../../models/Event");
const authMiddleware = require("../../helpers/authMiddleware");
const { UserInputError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    requestBooking: async (
      parent,
      { requestedSpeakerId, eventId },
      context
    ) => {
      try {
        const token = authMiddleware(context);

        const creatorPersonId = token.userId;

        const requestedSpeaker = await User.findById(requestedSpeakerId);

        const existingBooking = await Booking.findOne({ event: eventId });

        if (existingBooking) {
          const existingRequest = existingBooking.requestedSpeakers;

          if (existingRequest.indexOf(requestedSpeakerId) !== -1) {
            throw new UserInputError("Duplicate request", {
              error: "Speaker already requested"
            });
          }

          existingBooking.requestedSpeakers.push(requestedSpeakerId);
          requestedSpeaker.bookingRequests.push(existingBooking);

          await requestedSpeaker.save();
          await existingBooking.save();

          return existingBooking;
        }

        const newBooking = new Booking({
          event: eventId,
          creatorPerson: creatorPersonId
        });

        const event = await Event.findById(eventId);

        if (event) {
          event.booking = newBooking;
        }

        newBooking.requestedSpeakers.push(requestedSpeakerId);
        requestedSpeaker.bookingRequests.push(newBooking);

        await requestedSpeaker.save();
        await newBooking.save();
        await event.save();

        return booking;
      } catch (error) {
        throw new Error(error);
      }
    },
    confirmBooking: async (parent, { bookingId }, context) => {
      const token = authMiddleware(context);

      const booking = await Booking.findById(bookingId);

      const user = await User.findById(token.userId);

      if (booking) {
        booking.confirmedSpeaker = token.userId;
        booking.confirmed = true;

        if (user.confirmedBookings.indexOf(bookingId) === -1) {
          user.confirmedBookings.push(bookingId);
          await user.save();
        }

        await booking.save();

        return booking;
      }
    }
  }
};
