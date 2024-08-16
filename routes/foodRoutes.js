const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { createFoodController, getAllFoodController, getFoodByIdController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, updateOrderController } = require('../controllers/foodController.js');
const adminMiddleware = require('../middlewares/adminMiddleware.js');

// Router Object
const router = express.Router();

// Routes
// CREATE FOOD || POST
router.post('/create', authMiddleware, createFoodController);

// GET ALL FOOD || GET
router.get('/getall', getAllFoodController);

// GET SINGLE FOOD || GET
router.get('/get/:id', getFoodByIdController);

// GET FOOD BY RESTAURANT || GET
router.get('/getbyrestaurant/:id', getFoodByRestaurantController);

// UPDATE FOOD || PUT
router.put('/update/:id', authMiddleware, updateFoodController);

// DELETE FOOD || DELETE
router.delete('/delete/:id', authMiddleware, deleteFoodController);

// PLACE ORDER || POST
router.post('/placeorder', authMiddleware, placeOrderController);

// UPDATE ORDER || PUT
router.put('/orderstatus/:id', authMiddleware, adminMiddleware, updateOrderController)

module.exports = router;