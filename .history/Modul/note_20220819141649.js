const mongoose = require("mongoose");

const NoteSch = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a name"],
  },
  done: {
    type: Boolean,
    default: false
  },

  private: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model("Note", NoteSch);
