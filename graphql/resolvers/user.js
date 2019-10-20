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
        throw new Error(err);
      }
    },
    getSingleUser: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId)
          .populate("createdCompany")
          .populate("bookingRequests");
        if (!user) {
          throw new Error("User does not exist");
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
