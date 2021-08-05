const jwt = require("jsonwebtoken");
const config = require("config");
const { INTERNAL_SERVER_ERROR, INVALID_TOKEN } = require("../consts/errors");
const { is_valid_id } = require("../utils/validators");

const authAdmin = async (req, res, next) => {
  try {
    // Verify token exists
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(400).json(INVALID_TOKEN);
    }

    // Decode the token
    try {
      const { admin } = jwt.decode(token, config.get("JwtKey"));
      if (!admin || !is_valid_id(admin.id)) {
        return res.status(400).json(INVALID_TOKEN);
      }

      req.admin = admin;
      next();
    } catch (e) {
      console.log(e.message);

      return res.status(400).json(INVALID_TOKEN);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  authAdmin,
};
