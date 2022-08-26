const mongoose = require("mongoose");

const ProdcutSch = mongoose.Schema({
  title: {
    type: String,

    required: [true, "Please add a name"],
  },
  category: {
    type: String,
    default: ""
  },
  amount: {
    type: Number,
    default: 0
  },
  store_id: {
    type: String,
    default: ''
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
ProdcutSch.index({store_id: 1, user: 1});

module.exports = mongoose.model("Product", ProdcutSch);
