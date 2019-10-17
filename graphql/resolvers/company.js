const { UserInputError } = require("apollo-server-express");

const Company = require("../../models/Company");
const authMiddleware = require("../../helpers/authMiddleware");
const User = require("../../models/User");
const { validateCreateCompanyInput } = require("../../helpers/validators");

module.exports = {
  Query: {
    getCompany: async (parent, args, context) => {
      try {
        const token = authMiddleware(context);
        const creatorId = token.userId;

        const company = await Company.findOne({ creator: creatorId })
          .populate("creator")
          .populate("createdEvents");

        return company;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    createCompany: async (parent, args, context) => {
      const token = authMiddleware(context);
      const { name, address, phone, einNumber, companyType } = args.input;

      const { errors, valid } = validateCreateCompanyInput(
        name,
        phone,
        einNumber,
        address
      );

      if (!valid) {
        throw new UserInputError("User input errors", { errors });
      }

      const user = await User.findById(token.userId);

      if (!user) {
        throw new Error("Can not find user");
      }

      if (user.createdCompany.length === 1) {
        errors.oneCompanyPolicy =
          "You can not create more than one company at this time";
        throw new UserInputError("One company per user policy", { errors });
      }

      const existingCompany = await Company.findOne({ einNumber });
      if (existingCompany) {
        errors.companyExists = "Company already exists";
        throw new UserInputError("Company already exists", { errors });
      }

      const company = new Company({
        name,
        address,
        phone,
        einNumber,
        companyType,
        dateCreated: new Date().toISOString(),
        creator: token.userId
      });

      user.createdCompany = company;

      const savedCompany = await company.save();
      await user.save();
      return savedCompany;
    }
  }
};
