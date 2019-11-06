const Event = require("../../models/Event");
const Company = require("../../models/Company");
const authMiddleware = require("../../helpers/authMiddleware");
const { validateCreateEventInput } = require("../../helpers/validators");
const { UserInputError } = require("apollo-server-express");

module.exports = {
  Query: {
    getEvents: async () => {
      try {
        const events = await Event.find()
          .sort("-createdAt")
          .populate("creatorPerson")
          .populate("creatorCompany");
        return events;
      } catch (err) {
        throw new Error(error);
      }
    },
    getSingleEvent: async (parent, { eventId }) => {
      try {
        const singleEvent = await Event.findById(eventId)
          .populate("creatorPerson")
          .populate("creatorCompany");
        if (!singleEvent) {
          throw new Error("No matching event found in database");
        }
        return singleEvent;
      } catch (error) {
        throw new Error(error);
      }
    },
    getSingleUserEvents: async (parent, args, context) => {
      try {
        const token = authMiddleware(context);

        const events = await Event.find({
          creatorPerson: token.userId
        }).populate({
          path: "booking",
          populate: [
            { path: "confirmedSpeaker", select: "_id firstName lastName" },
            { path: "requestedSpeakers", select: "_id firstName lastName" }
          ]
        });

        return events;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    createEvent: async (parent, args, context) => {
      const token = authMiddleware(context);

      const {
        title,
        eventDate,
        startTime,
        endTime,
        payType,
        eventType,
        eventTopic,
        requirementType,
        payAmount,
        expectedTurnout,
        address,
        eventVisibility
      } = args.input;

      const { errors, valid } = validateCreateEventInput(
        title,
        payType,
        payAmount,
        expectedTurnout,
        address
      );

      if (!valid) {
        throw new UserInputError("User input errors", { errors });
      }

      const creatorCompany = await Company.findOne({ creator: token.userId });

      if (!creatorCompany) {
        throw new Error("Please create a company first");
      }

      const event = new Event({
        title,
        eventDate,
        startTime,
        endTime,
        payType,
        eventType,
        eventTopic,
        requirementType,
        payAmount,
        expectedTurnout,
        address,
        eventVisibility,
        creatorCompany,
        creatorPerson: token.userId
      });

      creatorCompany.createdEvents.push(event);

      const savedEvent = await event.save();
      await creatorCompany.save();
      return savedEvent;
    },
    renewEvent: async (
      parent,
      { eventId, eventDate, startTime, endTime },
      context
    ) => {
      const token = authMiddleware(context);

      const event = await Event.findById(eventId);

      if (event) {
        event.eventDate = eventDate;
        event.startTime = startTime;
        event.endTime = endTime;

        await event.save();
        return { success: true };
      }
    }
  }
};
