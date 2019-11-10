const { UserInputError } = require("apollo-server-express");

const User = require("../../models/User");
const authMiddleware = require("../../helpers/authMiddleware");
const processUpload = require("../../helpers/processUpload");

module.exports = {
  Query: {
    getSpeakers: async () => {
      try {
        const users = await User.find({
          userType: "SPEAKER",
          userVisibility: true
        });

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
    },
    editProfileIntro: async (parent, args, context) => {
      const {
        firstName,
        lastName,
        headline,
        city,
        state,
        gender,
        age
      } = args.input;

      const token = authMiddleware(context);

      const user = await User.findById(token.userId);

      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.headline = headline;
        user.city = city;
        user.state = state;
        user.gender = gender;
        user.age = age;

        await user.save();
        return user;
      }
    },
    editProfileAbout: async (parent, args, context) => {
      const { about } = args;

      const token = authMiddleware(context);

      const user = await User.findById(token.userId);

      if (user) {
        user.about = about;
        await user.save();
        return user;
      }
    },
    addProfileEducation: async (parent, args, context) => {
      const {
        school,
        degree,
        field,
        startYear,
        endYear,
        grade,
        activities,
        description
      } = args.input;

      const token = authMiddleware(context);

      const user = await User.findById(token.userId);

      const educationObject = {
        school,
        degree,
        field,
        startYear,
        endYear,
        grade,
        activities,
        description
      };

      if (user) {
        let educationArray = user.education;
        for (let i = 0; i < educationArray.length; i++) {
          if (
            educationArray[i].degree === degree &&
            educationArray[i].field === field
          ) {
            throw new UserInputError(
              "Education record matching the same degree found"
            );
          }
        }
        user.education.push(educationObject);
        await user.save();
        return user;
      }
    },
    editEducation: async (parent, args, context) => {
      try {
        const {
          educationId,
          school,
          degree,
          field,
          startYear,
          endYear,
          grade,
          activities,
          description
        } = args.input;

        const token = authMiddleware(context);

        await User.updateOne(
          { _id: token.userId, "education._id": educationId },
          {
            $set: {
              "education.$.school": school,
              "education.$.degree": degree,
              "education.$.field": field,
              "education.$.startYear": startYear,
              "education.$.endYear": endYear,
              "education.$.grade": grade,
              "education.$.activities": activities,
              "education.$.description": description
            }
          }
        );

        return { success: true };
      } catch (error) {
        throw new Error(erro);
      }
    },
    deleteEducation: async (parent, { educationId }, context) => {
      const token = authMiddleware(context);

      const user = await User.findById(token.userId);

      user.education.remove({ _id: educationId });

      await user.save();

      return { success: true };
    },
    setSpeakerAvailability: async (parent, { fromDate, toDate }, context) => {
      const token = authMiddleware(context);

      const user = await User.findById(token.userId);

      if (user) {
        user.availability.fromDate = fromDate;
        user.availability.toDate = toDate;
        await user.save();

        return { success: true };
      }
    },
    changeUserSettings: async (parent, args, context) => {
      const { tagline, tags, userVisibility, phone } = args.input;

      const token = authMiddleware(context);

      const user = await User.findById(token.userId);

      if (user) {
        user.userVisibility = userVisibility;
        user.tags = tags;
        user.tagline = tagline;
        user.phone = phone;
        await user.save();

        return { success: true };
      }
    },
    speakerSearch: async (parent, { searchValue }) => {
      const searchResult = await User.find(
        {
          $text: { $search: searchValue }
        },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });

      if (searchResult.length === 0) {
        const partialSearchResult = await User.find({
          firstName: { $regex: searchValue, $options: "i" }
        });

        return partialSearchResult;
      }

      return searchResult;
    },
    addUserLocation: async (parent, { coordinates }, context) => {
      const token = authMiddleware(context);

      const user = await User.findById(token.userId);

      console.log(coordinates);

      if (user) {
        user.location.type = "Point";
        user.location.coordinates = coordinates;
        await user.save();

        return { success: true };
      }
    },
    searchByTags: async (parent, { tags }) => {
      try {
        if (tags.length === 0) {
          const users = await User.find({
            userType: "SPEAKER",
            userVisibility: true
          });

          return users;
        }
        const user = await User.find({
          userType: "SPEAKER",
          tags: { $all: tags },
          userVisibility: true
        });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    sortSpeakersByDistance: async (parent, { maxDistance }, context) => {
      const token = authMiddleware(context);

      const authUser = await User.findById(token.userId);

      if (!authUser.location) {
        throw new UserInputError("Must set location first");
      }

      const speakers = await User.find({
        location: {
          $near: {
            $maxDistance: maxDistance,
            $geometry: {
              type: "Point",
              coordinates: [
                authUser.location.coordinates[0],
                authUser.location.coordinates[1]
              ]
            }
          }
        }
      });

      return speakers;
    }
  }
};
