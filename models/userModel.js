const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required."]
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.']
    },
    userType: {
        type: String,
        required: [true, 'User type is required'],
        default: 'Client',
        enum: ['Client', 'Admin', 'Vendor', 'Driver']
    },
    profile: {
        type: String,
        default: 'C:\Users\heman\Desktop\Projects\restaurantapi\public\human-1.svg'
    },
    answer: {
        type: String,
        required: [true, 'Answer is required.']
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);