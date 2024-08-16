const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantController.js');

// Router Object
const router = express.Router();

// Routes
// CREATE RESTAURANT || POST
router.post('/create', authMiddleware, createRestaurantController);

// GET ALL RESTAURANT || GET
router.get('/getall', getAllRestaurantController);

// GET RESTAURANT BY ID || GET
router.get('/get/:id', getRestaurantByIdController);

// DELETE RESTAURANT || DELETE
router.get('/delete/:id', authMiddleware, deleteRestaurantController);

module.exports = router;