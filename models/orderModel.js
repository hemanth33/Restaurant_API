const mongoose = require('mongoose');

// Schema
const orderSchema = mongoose.Schema({
   foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }
   ],
   payment: {

   },
   buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   },
   status: {
    type: String,
    enum: ["Preparing", "Prepared", "On The way", "Delievered"],
    default: "Preparing"
   }
},
    { timestamps: true }    
);

module.exports = mongoose.model('Order', orderSchema);