const jwt = require("jsonwebtoken");
const config = require("config");
const privateKey = config.get("TOKEN_PRIVATE_KEY");
const { AuthenticationError } = require("apollo-server-express");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const authToken = authHeader.split(" ")[1];
    if (authToken) {
      try {
        const token = jwt.verify(authToken, `${privateKey}`);
        return token;
      } catch (error) {
        throw new AuthenticationError("Expired token");
      }
    }

    throw new Error("An authentication token must be provided");
  }

  throw new Error("Authorization header must be present");
};
