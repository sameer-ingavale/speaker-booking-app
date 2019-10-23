const authResolver = require("./auth");
const eventResolver = require("./events");
const companyResolver = require("./company");
const bookingResolver = require("./booking");
const userResolver = require("./user");

module.exports = {
  Query: {
    ...eventResolver.Query,
    ...companyResolver.Query,
    ...userResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation,
    ...eventResolver.Mutation,
    ...companyResolver.Mutation,
    ...bookingResolver.Mutation,
    ...userResolver.Mutation
  }
};
