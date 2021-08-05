const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { DELETED_SUCCESSFULLY } = require("../../../consts/actions");
const {
  INTERNAL_SERVER_ERROR,
  OUT_OF_STOCK,
  UNAUTHORIZED_ACCESS,
  INVALID_REQUEST,
} = require("../../../consts/errors");
const { authAdmin } = require("../../../middlewears/auth");
const Order = require("../../../models/Order");
const Product = require("../../../models/Product");
const { is_valid_id } = require("../../../utils/validators");

const router = Router();

// @Endpoint:     GET   /api/v1/orders/
// @Description   Get all orders
// @Access        Private (admin)
router.get("/", authAdmin, async (req, res) => {
  try {
    const orders_list = await Order.find().populate("products");
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    res.set("x-total-count", orders_list.length);

    return res.json(orders_list);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
// @Endpoint:     GET   /api/v1/orders/:id
// @Description   Get a single order
// @Access        Public
router.get("/:id", async (req, res) => {
  try {
    // Check the id
    if (!is_valid_id(req.params.id)) {
      return res.status(401).json(INVALID_REQUEST);
    }

    // Check the order exists
    const order = await Order.findById(req.params.id).populate("products");
    if (!order) {
      return res.status(401).json(INVALID_REQUEST);
    }
    return res.json(order);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
// @Endpoint:     POST   /api/v1/orders/
// @Description   Create a new order
// @Access        Public
router.post(
  "/",
  [
    check("products", "Products are required").isArray({ min: 1 }),
    check("products.*", "Invalid product id").isMongoId(),
    check("quantities", "Quantities are required").isArray({ min: 1 }),
    check("quantities.*", "Quantities are integer").isInt().notEmpty(),
    check("drinks", "drinks are required").isArray({ min: 1 }),
    check("drinks.*", "invalid drink").isString().notEmpty(),
    check("client_name", "Client name is required").isString().notEmpty(),
    check("client_phone", "Client phone is required").isMobilePhone(),
    check("client_location", "Client location is required")
      .isString()
      .notEmpty(),
    check("client_email", "Client email is required").isEmail().optional(),
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
        products,
        quantities,
        drinks,
        client_name,
        client_phone,
        client_location,
        client_email,
      } = req.body;
      let total = 0;
      // Products array should be equal to quantities array
      if (
        products.length !== quantities.length ||
        quantities.length !== drinks.length
      ) {
        return res.status(400).json(INVALID_REQUEST);
      }
      // Check all products are correct and available in stock
      for (const [index, id] of products.entries()) {
        const prod = await Product.findById(id);
        const qte = quantities[index];
        if (!prod) {
          return res.status(401).json(UNAUTHORIZED_ACCESS);
        } else if (!prod.in_stock) {
          return res.status(400).json(OUT_OF_STOCK);
        }
        total += prod.price * qte; // TODO => USE TOFIXED
      }
      // Create the new order
      const new_order = new Order({
        products,
        quantities,
        total,
        drinks,
        client_name,
        client_phone,
        client_location,
      });
      if (client_email) {
        new_order.client_email = client_email;
      }

      // Save the new order
      await new_order.save();
      return res.json(new_order);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  }
);
// @Endpoint:     PUT   /api/v1/orders/:id
// @Description   Modify an order (Change status)  ..
// @Access        Private (admin)
router.put("/:id", [
  authAdmin,
  [
    check("status", "status is required").isString().notEmpty(),
    check("status", "invalid status").isIn([
      "Pending",
      "Preparing",
      "Shipped",
      "Completed",
      "Canceled",
    ]),
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

      // Check if the order exists
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(401).json(INVALID_REQUEST);
      }

      // Update the order
      order.status = req.body.status;
      await order.save();
      return res.json(order);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  },
]);

// @Endpoint:     DELETE   /api/v1/orders/:id
// @Description   Delete an order
// @Access        Private (admin)
router.delete("/:id", authAdmin, async (req, res) => {
  try {
    // validate the id
    if (!is_valid_id(req.params.id)) {
      return res.status(401).json(UNAUTHORIZED_ACCESS);
    }

    // Check if the order exists
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(401).json(INVALID_REQUEST);
    }

    // Delete the category
    await order.delete();
    return res.json(DELETED_SUCCESSFULLY);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
});
module.exports = router;
