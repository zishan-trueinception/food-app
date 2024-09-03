const mongoose = require('mongoose');

// schema

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
       
    },
    name: {
        type: String,
       
    },
    img:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
    },
    options: {
        type: Array,
        
    },

    discription: {
        type: String,
    },
 
    
});

module.exports = mongoose.model('foodCategory',categorySchema) 