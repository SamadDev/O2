const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthSch = mongoose.Schema({
  photo: {
    type: String,
  },
  userName: {
    type: String,
    required: [true, "Please provide user name"],
    maxlength: [20, "user name can not be more than 50 characters"],
    minlength: [3, "user name can not be less than 3 charecters"],
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: [50, "Name can not be more than 20 characters"],
    minlength: [3, "name can not be less than 3 charecters"],
  },
  phone: {
    type: String,
    maxlength: [20],
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    unique: true,
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
});

// Encrypt password using bcrypt
AuthSch.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
AuthSch.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
AuthSch.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Auth", AuthSch);
