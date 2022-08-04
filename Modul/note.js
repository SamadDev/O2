const mongoose = require("mongoose");

const NoteSch = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a name"],
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

module.exports = mongoose.model("Note", NoteSch);
