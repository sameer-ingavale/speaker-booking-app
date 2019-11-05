const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { UserInputError } = require("apollo-server-express");

const PRIVATE_KEY = config.get("TOKEN_PRIVATE_KEY");
const User = require("../../models/User");
const {
  validateCreateUserInput,
  validateLoginInput
} = require("../../helpers/validators");

module.exports = {
  Mutation: {
    login: async (parent, { email, password }) => {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("User input errors", { errors });
      }
      const user = await User.findOne({ email });

      if (!user) {
        errors.general = "Invalid credentials";
        throw new UserInputError("Invalid credentials - email", { errors });
      }

      const userPassword = await bcrypt.compare(password, user.password);

      if (!userPassword) {
        errors.general = "Invalid credentials";
        throw new UserInputError("Invalid credentials - password", { errors });
      }
      const token = jwt.sign(
        { userId: user.id, firstName: user.firstName, userType: user.userType },
        PRIVATE_KEY,
        { expiresIn: "2h" }
      );

      const { firstName, userType } = user;

      return {
        userId: user.id,
        firstName,
        userType,
        token
      };
    },
    register: async (parent, args) => {
      const {
        firstName,
        lastName,
        gender,
        email,
        userType,
        password,
        confirmPassword
      } = args.input;

      const { valid, errors } = validateCreateUserInput(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        errors.emailExists = "Email already exists";
        throw new UserInputError("Email already exists", { errors });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        firstName,
        lastName,
        gender,
        email,
        password: hashedPassword,
        userType,
        dateCreated: new Date().toISOString()
      });

      const savedUser = await user.save();

      const token = jwt.sign(
        { userId: user.id, firstName: user.firstName, userType: user.userType },
        PRIVATE_KEY,
        { expiresIn: "2h" }
      );
      return { userId: savedUser.id, firstName, userType, token };
    }
  }
};
