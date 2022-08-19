const mongoose = require("mongoose");

const workSchi = mongoose.Schema({
  hourse: {
    type: String,
    required: [true, "Please add a hourse"],
  },
  permition: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Auth",
    require: true
  }

});

module.exports = mongoose.model("Work_time", workSchi);
