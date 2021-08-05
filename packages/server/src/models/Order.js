const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  quantities: {
    type: [Number],
    required: true,
  },
  drinks: {
    type: [String],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  client_name: {
    type: String,
    required: true,
  },
  client_phone: {
    type: String,
    required: true,
  },
  client_location: {
    type: String,
    required: true,
  },
  client_email: {
    type: String,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Shipped", "Completed", "Canceled"],
    default: "Pending",
  },
});

OrderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = Order = mongoose.model("Order", OrderSchema);
