const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const privateKey = config.get("TOKEN_PRIVATE_KEY");

module.exports = {
  Query: {
    users: async () => {
      try {
        const users = await User.find().populate({
          path: "createdEvents",
          populate: { path: "creator" }
        });
        const newUsers = JSON.parse(JSON.stringify(users));
        return newUsers.map((user) => {
          return {
            ...user,
            password: null
          };
        });
      } catch (err) {
        throw err;
      }
    },
    login: async ({ email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid credentials - email");
      }

      const userPassword = await bcrypt.compare(password, user.password);

      if (!userPassword) {
        throw new Error("Invalid credentials - password");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        `${privateKey}`,
        { expiresIn: "12h" }
      );

      return {
        userId: user.id,
        token,
        tokenExpiration: 12
      };
    }
  },
  Mutation: {
    createUser: async (args) => {
      try {
        const { firstName, lastName, email, password } = args.input;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          dateCreated: new Date().toString()
        });

        const savedUser = await user.save();
        const finalUser = JSON.parse(JSON.stringify(savedUser));
        return { ...finalUser, password: null };
      } catch (error) {
        throw error;
      }
    }
  }
};
