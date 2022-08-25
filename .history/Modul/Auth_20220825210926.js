const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthSch = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: [50, "Name can not be more than 20 characters"],
    minlength: [3, "name can not be less than 3 charecters"],
  },
  phone: {
    type: String,
    unique: true,
    default:""
  },
  role:{
    type:String,
    default:'employee',
  },
  password: {
    type: String,
    require: true,
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
