const mongoose = require("mongoose");

const workSchi = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Please add a name"],
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
