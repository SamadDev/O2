const mongoose = require("mongoose");

const OrderSch = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a name"],
  },
  type:{
      type:String,
      default:"false",
      enu:["true","false"]
  },

  amount:{
    type:Number,
    default:0
  },

  date: {
    type: Date,
    default: Date.now,
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"Auth",
    require:true
  }

});

module.exports = mongoose.model("Order", OrderSch);
