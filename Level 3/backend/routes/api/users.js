const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require("nodemailer");
const admin = require("../../middlewares/admin");
const auth = require("../../middlewares/auth");

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
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      config.get("jwtPrivateKey")
    );
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "abdul.senger22@ethereal.email",
        pass: "ZvtdbjdZ6c2RncP4gh",
      },
    });
    let info = await transporter.sendMail({
      from: '"FanFund" <abdul.senger22@ethereal.email>',
      to: req.body.email,
      subject: "Email Verification",
      html: `<div><h1>Follow the link to verify your email</h1><a href='http://localhost:3001/forgotpassword/verify/${token}'></a></div>`,
    });
    return res.send(token);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

router.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { isVerified: true } }
    );
    res.redirect("http://localhost:3000/login"); // Redirect to login page
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token" });
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
        role: user.role,
      },
      config.get("jwtPrivateKey")
    );
    res.send(token);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("No user found with given email");
    let token = jwt.sign(
      { _id: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
      config.get("jwtPrivateKey")
    );
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "abdul.senger22@ethereal.email",
        pass: "ZvtdbjdZ6c2RncP4gh",
      },
    });
    let info = await transporter.sendMail({
      from: '"FanFund" <abdul.senger22@ethereal.email>',
      to: req.body.email,
      subject: "Reset password link",
      html: `<div><h1>Follow the link to  reset your password</h1><a href='http://localhost:3001/forgotpassword/${user._id}/${token}'></a><br /><p>This link will expire in one day</p></div>`,
    });
    console.log("Message sent: %s", info.messageId);
    res.send(info);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
});

router.get("/forgotpassword/:id/:token", async (req, res) => {
  const token = req.params.token;
  const id = req.params.id;

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    if (decoded._id === id) {
      res.redirect(`http://localhost:3000/resetpassword/${id}/${token}`);
    } else {
      res.status(400).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// get all users
router.get("/", auth, admin, async (req, res) => {
  try {
    let users = await User.find();
    return res.send(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
