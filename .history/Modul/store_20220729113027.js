const mongoose = require("mongoose");

const StoreSch = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a name"],
  },
  category: {
    type: String,
    default:""
  },
  amount:{
    type:Number,
    default:0
  },

  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Store", StoreSch);
