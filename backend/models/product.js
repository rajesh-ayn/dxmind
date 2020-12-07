const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: { type: String },
  product_name: { type: String },
  price: { type: Number },
  profit_margin: { type: Number },
  sku: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
