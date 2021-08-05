const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { DELETED_SUCCESSFULLY } = require("../../../consts/actions");
const {
  CATEGORY_NOT_EXIST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_ACCESS,
} = require("../../../consts/errors");
const { authAdmin } = require("../../../middlewears/auth");
const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const { is_valid_id } = require("../../../utils/validators");

const router = Router();

// @Endpoint:     GET   /api/v1/products/
// @Description   Get all products
// @Access        Public
router.get("/", async (req, res) => {
  try {
    const productsList = await Product.find().populate("category");
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("x-total-count", productsList.length);
    return res.json(productsList);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
// @Endpoint:     GET   /api/v1/products/:id
// @Description   Get a single product
// @Access        Public
router.get("/:id", async (req, res) => {
  try {
    // Check the id
    if (!is_valid_id(req.params.id)) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Check the product exists
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }
    return res.json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});

// @Endpoint:     POST   /api/v1/products/
// @Description   Create a new product
// @Access        Private (admin)
router.post(
  "/",
  [
    authAdmin,
    [
      check("name", "Product name is required").notEmpty().isString(),
      check("category", "Category is required").isMongoId().notEmpty(),
      check("price", "Price is required").isNumeric().notEmpty(),
      check("description", "description is required").isString().notEmpty(),
      check("in_stock", "Stock must be a boolean").isBoolean().optional(),
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

      const {
        name,
        category,
        price,
        description,
        img_url,
        in_stock,
      } = req.body;

      // Make sure that the Caegory exists
      if (!(await Category.findById(category))) {
        return res.status(400).json(CATEGORY_NOT_EXIST);
      }

      // Create the new category
      const new_product = new Product({
        name,
        category,
        price,
        description,
      });
      if (img_url) {
        new_product.img_url = img_url;
      }
      if (in_stock) {
        new_product.in_stock = in_stock;
      }
      await new_product.save();
      return res.json(new_product);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  }
);

// @Endpoint:     PUT   /api/v1/products/:id
// @Description   Modify a product
// @Access        Private (admin)
router.put(
  "/:id",
  [
    authAdmin,
    [
      check("name", "Product name is required")
        .notEmpty()
        .isString()
        .optional(),
      check("category", "Category is required").isMongoId().optional(),
      check("price", "Price is required").isNumeric().notEmpty().optional(),
      check("description", "description is required")
        .isString()
        .notEmpty()
        .optional(),
      check("in_stock", "Stock must be a boolean").isBoolean().optional(),
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

      // Check if the product exists
      if (!(await Product.findById(req.params.id))) {
        return res.status(401).json(UNAUTHORIZED_ACCESS);
      }

      // Update the product
      const {
        name,
        category,
        price,
        description,
        img_url,
        in_stock,
      } = req.body;
      const updates = {};
      if (name) {
        updates.name = name;
      }
      if (category) {
        // Check if the category exists
        if (!(await Category.findById(category))) {
          return res.status(401).json(UNAUTHORIZED_ACCESS);
        }
        updates.category = category;
      }
      if (price) {
        updates.price = price;
      }
      if (description) {
        updates.description = description;
      }
      if (img_url) {
        updates.img_url = img_url;
      }
      if (typeof in_stock === "boolean") {
        updates.in_stock = in_stock;
      }

      const updated_product = await Product.findByIdAndUpdate(
        req.params.id,
        updates,
        {
          new: true,
        }
      );
      return res.json(updated_product);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  }
);

// @Endpoint:     DELETE   /api/v1/products/:id
// @Description   Delete a product
// @Access        Private (admin)
router.delete("/:id", authAdmin, async (req, res) => {
  try {
    // validate the id
    if (!is_valid_id(req.params.id)) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Check if the product exists
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Delete the category
    await product.delete();
    return res.json(DELETED_SUCCESSFULLY);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
