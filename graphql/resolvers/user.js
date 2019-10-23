const User = require("../../models/User");
const authMiddleware = require("../../helpers/authMiddleware");
const processUpload = require("../../helpers/processUpload");

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
          .populate({
            path: "bookingRequests",
            populate: {
              path: "event",
              model: "Event"
            }
          })
          .populate({
            path: "confirmedBookings",
            populate: {
              path: "event",
              model: "Event"
            }
          });
        if (!user) {
          throw new Error("User does not exist");
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    uploadProfilePicture: async (parent, { picture }, context) => {
      const token = authMiddleware(context);

      const { picUrl } = await processUpload(picture);

      if (picUrl) {
        const user = await User.findById(token.userId);

        if (user) {
          user.profilePictureLink = picUrl;
          user.save();
        }
        return { picUrl };
      }
    }
  }
};
