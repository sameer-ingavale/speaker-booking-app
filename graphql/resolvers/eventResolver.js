const Event = require("../../models/Event");
const User = require("../../models/User");

module.exports = {
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User unauthenticated.");
    }

    try {
      const { title, pay } = args.input;

      const event = new Event({
        title,
        pay,
        dateCreated: new Date().toString(),
        creator: req.userId
      });

      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found");
      }

      creator.createdEvents.push(event);
      await creator.save();

      await event.save();
      return event;
    } catch (error) {
      throw error;
    }
  },
  events: async () => {
    try {
      const events = await Event.find().populate({
        path: "creator",
        populate: { path: "createdEvents" }
      });
      const newEvents = JSON.parse(JSON.stringify(events));
      return newEvents.map((event) => {
        return {
          ...event
        };
      });
    } catch (err) {
      throw err;
    }
  }
};
