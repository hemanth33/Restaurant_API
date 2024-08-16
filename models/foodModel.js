const mongoose = require('mongoose');

// Schema
const foodSchema = mongoose.Schema({
   title: {
    type: String,
    require: [true, 'Food title is required.']
   },
   description: {
    type: String,
    required: [true, 'Food description is required.']
   },
   price: {
    type: Number,
    required: [true, 'Food Price is required.']
   },
   imageUrl: {
    type: String,
    default: 'C:\Users\heman\Desktop\Projects\restaurantapi\public\human-1.svg' 
   },
   foodTags: {
    type: String
   },
   category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, 'Category Name is required.']
   },
   code: {
    type: String
   },
   isAvailable: {
    type: Boolean,
    default: true
   },
   restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: [true, 'Restaurant Name is required.']
   },
   rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
   },
   ratingCount: {
    type: String
   }
},
    { timestamps: true }    
);

module.exports = mongoose.model('Food', foodSchema);