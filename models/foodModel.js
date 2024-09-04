const mongoose = require("mongoose");
// Food Schema
const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required:[true, "title is required"]
  },
  description: {
    type: String,
    required:[true, "description is required"]
  },
  price: {
    type: Number,
    required:[true, 1000]
  },
  imageUrl:{
    type: String,
    default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
  },
  foodTags: {
    type: String,
  },
  category: {
    type: String,
  },
  code: {
    type: Number,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resturant",
  },
  rating: {
    type:Number,
    default: 5,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("Food", foodSchema);