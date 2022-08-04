const mongoose = require("mongoose");

const ProdcutSch = mongoose.Schema({
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
  amount_till_now:{
    type:Number,
    default:0
  },
  amount_of_heal:{
    type:Number,
    default:0
  },
  amount_of_crash:{
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

module.exports = mongoose.model("Products", ProdcutSch);
