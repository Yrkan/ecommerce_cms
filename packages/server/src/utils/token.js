const jwt = require("jsonwebtoken");
const config = require("config");

const DEFAULT_EXPIRY = config.get("defaultTokenExpiry");
const DEFAULT_JWT_KEY = config.get("JwtKey");

const makeToken = (payload, expiry = DEFAULT_EXPIRY, key = DEFAULT_JWT_KEY) => {
  const token = jwt.sign(payload, key, { expiresIn: DEFAULT_EXPIRY });
  return token;
};

module.exports = {
  makeToken,
};
