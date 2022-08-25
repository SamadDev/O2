const mongoose = require("mongoose");

const ExerciseSch = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a name"],
  },

  amount: {
    type: Number,
    default: 0,
  },

  type: {
    type: String,
    default: "چاکبوو",
  },
  date: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Auth",
    require: true,
  },
});

module.exports = mongoose.model("exercise", ExerciseSch);
