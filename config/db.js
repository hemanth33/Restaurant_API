const mongoose = require('mongoose');

// Function mongoDB Database Connection
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Database: ${mongoose.connection.host}`);
    } catch (error) {
        console.log("DB Error", error);
    }
}

module.exports = connectDb;