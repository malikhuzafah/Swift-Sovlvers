const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    items: [
      {
        base: String,
        sauce: String,
        cheese: String,
        veggies: [String],
        size: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    address: String,
    paymentMethod: String,
    phoneNumber: String,
    status: {
      type: String,
      enum: ["pending", "in-progress", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
