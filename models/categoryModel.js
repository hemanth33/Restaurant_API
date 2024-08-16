const mongoose = require('mongoose');

// Schema
const cateogySchema = mongoose.Schema({
   title: {
    type: String,
    required: [true, 'Category title is required.'],
   },
   imageUrl: {
    type: String,
    default: 'C:\Users\heman\Desktop\Projects\restaurantapi\public\human-1.svg'
   }
},
    { timestamps: true }    
);

module.exports = mongoose.model('Category', cateogySchema);