const mongoose = require("mongoose");
const Auth=require('../Modul/Auth')

const ProdcutSch = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a name"],
    maxlength: [50, "Name can not be more than 50 characters"],
  },

  type: {
    type: String,
    required: [true, "Please add a name"],

    enum: ["lost", "found"],
  },

  category: {
    type: String,
    required: [true, "pleas provide category"],
  },
  reward: {
    type: String,
  },
  //contact
  phone: {
    required: [true, "pleas provide phone number"],
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },

  viber: {
    type: String,
  },
  email: {
    type: String,
  },

  description: {
    type: String,
    maxlength: [500, "description can not be longer than 500 charecters"],
  },
  //address
  country: {
    type: String,
    required: [true, "pleas provide country"],
  },

  district: {
    type: String,
  },

  address: {
    type: String,
    required: [true, "Please add an address"],
  },

  photos: [
    {
      type: String,
      required: [true, "pleas provide images"],
    },
  ],

  color:String,
  videos:{
    video:{
      type:String,
    }
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dateFL: { type: Date, required: [true, "pleas provide dateFL"] },

  user:{
    type:mongoose.Schema.ObjectId,
    ref:"Auth",
    require:true
  }

});

module.exports = mongoose.model("Products", ProdcutSch);
