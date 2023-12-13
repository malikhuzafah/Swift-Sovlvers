const express = require("express");
const router = express.Router();
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// register user
router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with given email already exists");
    user = new User();
    const salt = await bcrypt.genSalt(10);
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    let token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      config.get("jwtPrivateKey")
    );
    return res.send(token);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not registered");
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send("Invalid Password");
    let token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      config.get("jwtPrivateKey")
    );
    res.send(token);
  } catch (error) {
    return res.status(500).err("Something went wrong!");
  }
});

module.exports = router;
