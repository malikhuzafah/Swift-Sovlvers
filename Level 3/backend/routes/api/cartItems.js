const express = require("express");
const router = express.Router();
const CartItem = require("../../models/cartItem");
const auth = require("../../middlewares/auth");

// get cart item
// router.get("/", auth, async (req, res) => {
//   try {
//     const cartItem = await CartItem.findOne({ userId: req.user._id });
//     if (!cartItem) return res.status(400).send("Cart item not found");
//     res.send(cartItem);
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send("Something went wrong!");
//   }
// });

// get cart
router.get("/", auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user._id });

    if (!cartItems) return res.status(400).send("Cart item not found");
    var total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    res.send({ cartItems, total });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

// add item to cart
router.post("/", auth, async (req, res) => {
  try {
    var cartItem = await CartItem.findOne({
      base: req.body.base,
      size: req.body.size,
      sauce: req.body.sauce,
      cheese: req.body.cheese,
      veggies: req.body.veggies,
    });
    if (cartItem) {
      cartItem.quantity += req.body.quantity;
      await cartItem.save();
      return res.send(cartItem);
    }
    cartItem = new CartItem();
    cartItem.userId = req.user._id;
    cartItem.base = req.body.base;
    cartItem.sauce = req.body.sauce;
    cartItem.cheese = req.body.cheese;
    cartItem.veggies = req.body.veggies;
    cartItem.size = req.body.size;
    cartItem.quantity = req.body.quantity;
    cartItem.price = req.body.price;
    cartItem.single = req.body.single;
    await cartItem.save();
    return res.send(cartItem);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

// remove item from cart
router.delete("/:id", auth, async (req, res) => {
  try {
    let cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(400).send("Cart item not found");
    return res.send(cartItem);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

// empty cart
router.delete("/", auth, async (req, res) => {
  try {
    console.log("cartItems");
    let cartItems = await CartItem.find({ userId: req.user._id });
    if (!cartItems) return res.status(400).send("Cart is empty");
    cartItems.forEach(async (item) => {
      await CartItem.findByIdAndDelete(item._id);
    });
    return res.send("Cart emptied");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong");
  }
});

// update item quantity
router.put("/:id", auth, async (req, res) => {
  try {
    let cartItem = await CartItem.findById(req.params.id);
    if (!cartItem) return res.status(400).send("Cart Item not found");
    cartItem.quantity = req.body.quantity;
    cartItem.price = cartItem.single * req.body.quantity;
    await cartItem.save();
    return res.send(cartItem);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

// get cart summary
router.get("/summary", auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user._id });
    if (!cartItems) return res.status(400).send("Cart item not found");
    var total = 0;
    var delivery = 150;
    var discount = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    var grandTotal = total + delivery - discount;
    res.send({ total, discount, delivery, grandTotal });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
