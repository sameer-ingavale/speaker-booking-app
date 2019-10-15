const Event = require("../../models/Event");
const Company = require("../../models/Company");
const authMiddleware = require("../../helpers/authMiddleware");

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
    }
  },
  Mutation: {
    createEvent: async (parent, args, context) => {
      const token = authMiddleware(context);

      try {
        const {
          title,
          eventDate,
          startTime,
          endTime,
          payType,
          eventType,
          eventTopic,
          payAmount,
          expectedTurnout,
          address,
          public
        } = args.input;

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
          payAmount,
          expectedTurnout,
          address,
          public,
          creatorCompany,
          creatorPerson: token.userId
        });

        creatorCompany.createdEvents.push(event);

        const savedEvent = await event.save();
        await creatorCompany.save();
        return savedEvent;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
