const jwt = require("jsonwebtoken");
const config = require("config");
const privateKey = config.get("TOKEN_PRIVATE_KEY");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, `${privateKey}`);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
