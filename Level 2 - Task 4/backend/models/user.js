const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

var User = mongoose.model("User", userSchema);
module.exports.User = User;
