const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  UNAUTHORIZED_ACCESS,
} = require("../../../consts/errors");
const { authAdmin } = require("../../../middlewears/auth");
const Admin = require("../../../models/Admin");
const { comparePassword } = require("../../../utils/crypto");
const { makeToken } = require("../../../utils/token");
const { is_valid_id } = require("../../../utils/validators");

const router = Router();

// @Endpoint:     GET   /api/v1/auth/admin
// @Description   Get authentificated admin
// @Access        Private (admin)
router.get("/admin", authAdmin, async (req, res) => {
  try {
    // validate the admin id
    if (!is_valid_id(req.admin.id)) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Search the admin
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }
    // Return admin's info
    return res.json(admin);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});

// @Endpoint:     POST   /api/v1/auth/admin/login
// @Description   Login admin
// @Access        Public
router.post(
  "/admin/login",
  [
    check("username", "Invalid username").isString().notEmpty(),
    check("password", "Invalid password").isString().notEmpty(),
  ],
  async (req, res) => {
    try {
      // Bad request handeling
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array({ onlyFirstError: true }) });
      }

      // Request body destructuring
      const { username, password } = req.body;
      // Search database for username
      const admin = await Admin.findOne({ username }).select("+password");
      // No admin with that username
      if (!admin) {
        return res.status(401).json(INVALID_CREDENTIALS);
      }
      // Verify password
      if (!(await comparePassword(password, admin.password))) {
        return res.status(401).json(INVALID_CREDENTIALS);
      }
      // All correct, send the token
      const payload = { admin: { id: admin.id } };
      const token = makeToken(payload);
      return res.json({ token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  }
);

module.exports = router;
