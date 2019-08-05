const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  accountDetails: {
    username: String,
    email: String,
    password: String
  },
  userProfile: {
    firstName: String,
    lastName: String,
    birthday: Date,
    contactNumber: String,
    address: String,
    city: String,
    state: String,
    zip: Number
  },
  payment: {
    method: String,
    ccType: String,
    subscription: Number,
    promoCode: String
  }
});

module.exports = mongoose.model("User", userModel);
