const authResolver = require("./authResolver");
const eventResolver = require("./eventResolver");

module.exports = {
  ...authResolver,
  ...eventResolver
};
