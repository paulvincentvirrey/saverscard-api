const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  birthday: Date,
  contactNumber: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: Number,
  paymentMethod: String,
  ccType: String,
  subscription: Number,
  promoCode: String,
  accountStatus: String,
  dateCreated: Date,
  dateModified: Date,
  remarks: String,
  isAdmin: Boolean,
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userModel);
