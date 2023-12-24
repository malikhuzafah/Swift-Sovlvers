// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51N8WSfLtfsy3fxWXYWnsqMsns7blsoKNNG24SOx3QS6haoDT9EKDun2DDmCZLAXviHxQb9u7zgQR4TBQKjzy4qnf00SM7iISLf"
);

router.get("/secret", async (req, res) => {
  try {
    const amount = req.query.amount;
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "pkr",
      payment_method_types: ["card"],
    });
    res.json({ client_secret: intent.client_secret });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
