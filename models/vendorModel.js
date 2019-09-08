const mongoose = require("mongoose");

const { Schema } = mongoose;

const vendorModel = new Schema({
  username: String,
  email: String,
  password: String,
  businessName: String,
  website: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: Number,
  telephone: String,
  fax: String,
  authorizedPerson: String,
  authorizedPersonPhone: String,
  authorizedPersonEmail: String,
  logoPath: String,
  vendorCategory: String,
  discountInPercent: Number,
  discountToAll: Boolean,
  discountExclusions: String,
  paymentMethod: String,
  ccType: String,
  subscription: Number,
  promoCode: String,
  invoice: String,
  applicationStatus: String,
  remarks: String,
  dateModified: String,
  dateCreated: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Vendor", vendorModel);
