const authResolver = require("./authResolver");
const eventResolver = require("./eventResolver");

module.exports = {
  Query: {
    ...authResolver.Query,
    ...eventResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation,
    ...eventResolver.Mutation
  }
};
