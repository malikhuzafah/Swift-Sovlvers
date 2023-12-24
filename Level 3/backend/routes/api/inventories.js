const express = require("express");
const router = express.Router();
const Inventory = require("../../models/inventory");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");

// get all inventories
router.get("/", async (req, res) => {
  try {
    const inventories = await Inventory.find();
    return res.send(inventories);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

// get single inventory
router.get("/:id", async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory)
      return res.status(400).send("Inventory with given id is not present");
    return res.send(inventory);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

// add new inventory
router.post("/", auth, admin, async (req, res) => {
  try {
    const inventory = new Inventory();
    inventory.name = req.body.name;
    inventory.quantity = req.body.quantity;
    inventory.category = req.body.category;
    inventory.description = req.body.description;
    await inventory.save();
    return res.send(inventory);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

// update inventory
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category,
        description: req.body.description,
      },
      { new: true }
    );
    await inventory.save();
    return res.send(inventory);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

// delete inventory
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory)
      return res.status(400).send("Inventory with given id is not present");
    return res.send(inventory);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
