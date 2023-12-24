const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: String,
    base: String,
    sauce: String,
    cheese: String,
    veggies: [String],
    size: String,
    price: Number,
    single: Number,
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model("CartItem", cartSchema);

module.exports = CartItem;
