const User = require("../../models/User");

module.exports = {
  Query: {
    getSpeakers: async () => {
      try {
        const users = await User.find({ userType: "SPEAKER" });
        return users.map((user) => {
          return {
            ...user._doc,
            password: null
          };
        });
      } catch (err) {
        throw err;
      }
    }
  }
};
