const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');

// dotEnv Confiuration
dotenv.config();

// DB Connection
connectDb();

// Rest Object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', require('./routes/testRoutes.js'));
app.use('/api/v1/auth', require('./routes/authRoutes.js'));
app.use('/api/v1/user', require('./routes/userRoutes.js'));
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes.js'));
app.use('/api/v1/category', require('./routes/categoryRoutes.js'));
app.use('/api/v1/food', require('./routes/foodRoutes.js'));


// route
app.get('/', (req, res) => {
    return res.status(200).send('<h1>Welcome To Server</h1>');
});

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});