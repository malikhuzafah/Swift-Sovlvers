const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  base: {
    type: String,
    enum: ["thin", "thick", "whole-wheat", "gluten-free", "cauliflower"],
    required: true,
  },
  sauce: {
    type: String,
    enum: ["marinara", "barbecue", "alfredo", "pesto", "ranch"],
    required: true,
  },
  cheese: {
    type: String,
    enum: ["mozzarella", "cheddar", "parmesan", "vegan"],
    required: true,
  },
  veggies: {
    type: [String],
    enum: [
      "tomatoes",
      "olives",
      "mushrooms",
      "bell-peppers",
      "onions",
      "spinach",
      "broccoli",
      "jalapenos",
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    required: true,
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
