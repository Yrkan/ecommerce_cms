const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { DELETED_SUCCESSFULLY } = require("../../../consts/actions");
const {
  INTERNAL_SERVER_ERROR,
  CATEGORY_NAME_ALREADY_IN_USE,
  UNAUTHORIZED_ACCESS,
} = require("../../../consts/errors");
const { authAdmin } = require("../../../middlewears/auth");
const Category = require("../../../models/Category");
const { is_valid_id } = require("../../../utils/validators");

const router = Router();

// @Endpoint:     GET   /api/v1/categories/
// @Description   Get all categories
// @Access        Public
router.get("/", async (req, res) => {
  const categories_list = await Category.find();
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.set("x-total-count", categories_list.length);
  return res.json(categories_list);
});

// @Endpoint:     GET   /api/v1/categories/:id
// @Description   Get a single category
// @Access        Private (admin)
router.get("/:id", authAdmin, async (req, res) => {
  try {
    // Check the id
    if (!is_valid_id(req.params.id)) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Check the product exists
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }
    return res.json(category);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
// @Endpoint:     POST   /api/v1/categories/
// @Description   Add new category
// @Access        Private (admin)
router.post(
  "/",
  [
    authAdmin,
    [
      check("name", "category name is required").notEmpty().isString(),
      check("drinks", "at least one drink is required").isArray({ min: 1 }),
    ],
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

      const { name, drinks } = req.body;
      // Check if the category name already exists
      if (await Category.findOne({ name })) {
        return res.status(400).json(CATEGORY_NAME_ALREADY_IN_USE);
      }

      // Create the new category
      const new_category = new Category({
        name,
        drinks,
      });
      await new_category.save();
      return res.json(new_category);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  }
);
// @Endpoint:     PUT   /api/v1/categories/:id
// @Description   Edit a category
// @Access        Private (admin)
router.put(
  "/:id",
  [
    authAdmin,
    [
      check("name", "category name is required")
        .notEmpty()
        .isString()
        .optional(),
      check("drinks", "at least one drink is required")
        .isArray({ min: 1 })
        .optional(),
    ],
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

      // validate the id
      if (!is_valid_id(req.params.id)) {
        return res.status(401).json(UNAUTHORIZED_ACCESS);
      }

      // Check if the category exists
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(401).json(UNAUTHORIZED_ACCESS);
      }

      // Update the category
      const { name, drinks } = req.body;
      const updates = {};
      if (name) {
        // make sure the name doesn't  exist already
        if (name !== category.name && (await Category.findOne({ name }))) {
          return res.status(400).json(CATEGORY_NAME_ALREADY_IN_USE);
        }
        updates.name = name;
      }
      if (drinks) {
        updates.drinks = drinks;
      }

      const updated = await Category.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });
      return res.json(updated);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  }
);

// @Endpoint:     DELETE   /api/v1/categories/:id
// @Description   Delete a category
// @Access        Private (admin)
router.delete("/:id", authAdmin, async (req, res) => {
  try {
    // validate the id
    if (!is_valid_id(req.params.id)) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Check if the category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Delete the category
    await category.delete();
    return res.json(DELETED_SUCCESSFULLY);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
module.exports = router;
