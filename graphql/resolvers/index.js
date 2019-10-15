const authResolver = require("./auth");
const eventResolver = require("./events");
const speakersResolver = require("./speakers");
const companyResolver = require("./company");
const bookingResolver = require("./booking");

module.exports = {
  Query: {
    ...authResolver.Query,
    ...eventResolver.Query,
    ...speakersResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation,
    ...eventResolver.Mutation,
    ...companyResolver.Mutation,
    ...bookingResolver.Mutation
  }
};
