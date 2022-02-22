const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  brandName: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  listOfImages: {
    type: Array,
  },
  options: {
    type: Array,
  },
});
module.exports = mongoose.model("Product", ProductSchema);
