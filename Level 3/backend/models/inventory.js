const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
