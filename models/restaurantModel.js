const mongoose = require('mongoose');

// schema

const restaurantSchema = new mongoose.Schema({
 title: {
    type: String,
    required:[true, "title is required"]
 },
 imageUrl: { 
    type: String,
    default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
 },
 foods: {
    type: Array,
 },
 time: {
    type: String,
 },
 pickup: {
    type: Boolean,
    default: true
 },
 delivery: {
     type: Boolean,
     default: true
 },
 isOpen: {
    type: Boolean,
    default: true   
 },
 logoUrl :{
    type: String
 },
 rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
 },
  ratingCount: {
    type: String,
  },
  code: {
     type: String
  }  
 
    
},{timestamps:true});

module.exports = mongoose.model('resturant',restaurantSchema) 