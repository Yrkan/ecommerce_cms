const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { DELETED_SUCCESSFULLY } = require("../../../consts/actions");
const {
  UNAUTHORIZED_ACCESS,
  USERNAME_ALREADY_IN_USE,
  EMAIL_ALREADY_IN_USE,
  INTERNAL_SERVER_ERROR,
} = require("../../../consts/errors");
const { authAdmin } = require("../../../middlewears/auth");
const Admin = require("../../../models/Admin");
const { encryptPassword } = require("../../../utils/crypto");
const { is_valid_id } = require("../../../utils/validators");

const router = Router();

// @Endpoint:     GET   /api/v1/admins/:id
// @Description   Get a single admin
// @Access        Private (superadmin)
router.get("/:id", async (req, res) => {
  try {
    // Check the id
    if (!is_valid_id(req.params.id)) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Check the product exists
    const admin = await Admin.findById(req.params.id).populate("category");
    if (!admin && !admin.is_super_admin) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }
    return res.json(admin);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
// @Endpoint:     GET   /api/v1/admins/
// @Description   Get all admins infos
// @Access        Private (Superadmin)
router.get("/", authAdmin, async (req, res) => {
  try {
    // Check if the admin is a super admin
    const admin = await Admin.findById(req.admin.id);
    if (!admin || !admin.is_super_admin) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }
    // Get admin list
    const admin_list = await Admin.find();
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("x-total-count", admin_list.length);
    return res.json(admin_list);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
// @Endpoint:     POST   /api/v1/admins/
// @Description   Create new admin
// @Access        Private (Superadmin)
router.post(
  "/",
  [
    authAdmin,
    [
      check("username", "Invalid username")
        .isString()
        .notEmpty()
        .isAlphanumeric(),
      check("password", "Invalid password")
        .isString()
        .notEmpty()
        .isAlphanumeric(),
      check("email", "Invalid email").isEmail().notEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      // Bad request handeling
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array({ onlyFirstError: true }));
      }

      // Check if the admin is a super admin
      const admin = await Admin.findById(req.admin.id);
      if (!admin || !admin.is_super_admin) {
        return res.status(401).json(UNAUTHORIZED_ACCESS);
      }

      // Create the new admin
      const { username, password, email } = req.body;
      // Make sure the username & email doesn't already exists
      if (await Admin.findOne({ username })) {
        return res.status(400).json(USERNAME_ALREADY_IN_USE);
      } else if (email && (await Admin.findOne({ email }))) {
        return res.status(400).json(EMAIL_ALREADY_IN_USE);
      }

      // Hash password
      const hashedPassword = await encryptPassword(password);
      // Initiate the new admin
      const new_admin = new Admin({
        username,
        email,
        password: hashedPassword,
      });
      // save the new admin to the database
      await new_admin.save();
      return res.json(new_admin);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  }
);
// @Endpoint:     PUT   /api/v1/admins/:id
// @Description   Edit admin infos (password, email)
// @Access        Private (Sueradmin)
router.put(
  "/:id",
  [
    authAdmin,
    [
      check("username", "Invalid username")
        .notEmpty()
        .isString()
        .isAlphanumeric()
        .optional(),
      check("password", "Invalid password").notEmpty().isString().optional(),
      check("email", "Invalid email")
        .notEmpty()
        .isString()
        .isEmail()
        .optional(),
    ],
  ],
  async (req, res) => {
    try {
      // Handeling bad requests
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array({ onlyFirstError: true }) });
      }
      // validate the id
      if (!is_valid_id(req.params.id)) {
        return res.status(401).json(UNAUTHORIZED_ACCESS);
      }

      // check if the requested admin exists
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(401).json(UNAUTHORIZED_ACCESS);
      }

      // check if the logged admin is a superadmin
      const loggedAdmin = await Admin.findById(req.admin.id);
      if (!loggedAdmin || !loggedAdmin.is_super_admin) {
        return res.status(401).json(UNAUTHORIZED_ACCESS);
      }

      // update the admin
      const { username, password, email } = req.body;
      const updates = {};
      if (username) {
        // make sure  username doesn't  exist already
        if (
          username !== admin.username &&
          (await Admin.findOne({ username }))
        ) {
          return res.status(400).json(USERNAME_ALREADY_IN_USE);
        }
        updates.username = username;
      }

      if (email) {
        // make sure  email doesn't  exist already
        if (email !== admin.email && (await Admin.findOne({ email }))) {
          return res.status(400).json(EMAIL_ALREADY_IN_USE);
        }
        updates.email = email;
      }

      if (password) {
        const hashedPassword = await encryptPassword(password);
        updates.password = hashedPassword;
      }

      // Update the admin info
      const updated_admin = await Admin.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true }
      );

      return res.json(updated_admin);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  }
);
// @Endpoint:     DELETE   /api/v1/admins/:id
// @Description   Delete an admin
// @Access        Private (Sueradmin)
router.delete("/:id", authAdmin, async (req, res) => {
  try {
    // validate the id
    if (!is_valid_id(req.params.id)) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // check if the logged admin is a superadmin
    const loggedAdmin = await Admin.findById(req.admin.id);
    if (!loggedAdmin || !loggedAdmin.is_super_admin) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Check the admin exists
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(400).json(UNAUTHORIZED_ACCESS);
    }

    // Delete the admin
    await Admin.findByIdAndDelete(req.params.id);
    return res.json(DELETED_SUCCESSFULLY);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
module.exports = router;
