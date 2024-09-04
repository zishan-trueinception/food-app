const mongoose = require('mongoose');

// Food Category Shema

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require:[true, " category title is requrie"]
    },
    imgUrl:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
    },
},
{timestamps: true}
);

module.exports = mongoose.model('foodCategory',categorySchema) 