const mongoose = require("mongoose");

const { Schema } = mongoose;

const vendorModel = new Schema({
  accountDetails: {
    username: String,
    email: String,
    password: String
  },
  vendorInformation: {
    businessName: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    telephone: String,
    fax: String,
    authorizedPerson: String,
    contactEmail: String
  },
  storeProfile: {
    storeType: String,
    discountInPercent: Number,
    discountToAll: Boolean,
    discountExclusions: String
  },
  payment: {
    method: String,
    ccType: String,
    subscription: Number,
    promoCode: String
  }
});

module.exports = mongoose.model("Vendor", vendorModel);
