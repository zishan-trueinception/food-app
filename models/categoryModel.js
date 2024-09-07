const mongoose = require('mongoose');

// Food Category Shema

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require:[true, " category title is requrie"]
    },
    imgUrl:{
        type: String,
        default: "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_732,c_fill,g_auto/v1661887113/indian-food/indian-food-1120x732.jpg"
    },
},
{timestamps: true}
);

module.exports = mongoose.model('foodCategory',categorySchema) 