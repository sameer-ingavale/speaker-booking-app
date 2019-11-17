const User = require("../../models/User");
const Event = require("../../models/Event");

module.exports = {
  Query: {
    getStats: async () => {
      try {
        const speakerCount = await User.find({
          userType: "SPEAKER",
          userVisibility: true
        }).countDocuments();

        const eventCount = await Event.find({
          eventVisibility: true
        }).countDocuments();

        return {
          speakerCount,
          eventCount
        };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
