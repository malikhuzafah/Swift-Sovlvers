const express = require("express");
const router = express.Router();
const Order = require("../../models/order");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
const Inventory = require("../../models/inventory");

// get orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    if (!orders) return res.status(400).send("Orders not found");
    res.send(orders);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(400).send("Order not found");
    res.send(order);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

//get all orders admin
router.get("/all", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) return res.status(400).send("Orders not found");
    res.send(orders);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

// add order
router.post("/", auth, async (req, res) => {
  try {
    var order = new Order();
    order.userId = req.user._id;
    order.items = req.body.items;
    order.total = req.body.total;
    order.address = req.body.address;
    order.paymentMethod = req.body.paymentMethod;
    order.phoneNumber = req.body.phoneNumber;
    order.items.map(async (item) => {
      let base = await Inventory.findOne({ name: item.base });
      base.quantity = base.quantity - item.quantity;
      console.log(base);
      await base.save();
      let sauce = await Inventory.findOne({ name: item.sauce });
      sauce.quantity = sauce.quantity - item.quantity;
      await sauce.save();
      let cheese = await Inventory.findOne({ name: item.cheese });
      cheese.quantity = cheese.quantity - item.quantity;
      await cheese.save();
      item.veggies.map(async (veggie) => {
        let veg = await Inventory.findOne({ name: veggie });
        veg.quantity = veg.quantity - item.quantity;
        await veg.save();
      });
      let meat;
      if (item.size === "small") {
        meat = await Inventory.findOne({ name: "Meat" });
        meat.quantity = meat.quantity - 0.5 * item.quantity;
        await meat.save();
      } else if (item.size === "medium") {
        meat = await Inventory.findOne({ name: "Meat" });
        meat.quantity = meat.quantity - item.quantity;
        await meat.save();
      } else {
        meat = await Inventory.findOne({ name: "Meat" });
        meat.quantity = meat.quantity - 1.5 * item.quantity;
        await meat.save();
      }
    });
    await order.save();
    res.send(order);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

// update order
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    await order.save();
    return res.send(order);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
