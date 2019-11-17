const authResolver = require("./auth");
const eventResolver = require("./events");
const companyResolver = require("./company");
const bookingResolver = require("./booking");
const userResolver = require("./user");
const aggregateResolver = require("./aggregate");

module.exports = {
  Query: {
    ...eventResolver.Query,
    ...companyResolver.Query,
    ...userResolver.Query,
    ...aggregateResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation,
    ...eventResolver.Mutation,
    ...companyResolver.Mutation,
    ...bookingResolver.Mutation,
    ...userResolver.Mutation
  }
};
