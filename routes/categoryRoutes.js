const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { createCateoryController, getAllCategoriesController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController.js');

// Router Object
const router = express.Router();

// Routes
// CREATE CATEGORY || POST
router.post('/create', authMiddleware, createCateoryController);

// GET ALL CATEGORIES || GET
router.get('/getall', getAllCategoriesController);

// UPDATE CATEGORIES || PUT
router.put('/update/:id', authMiddleware, updateCategoryController);

// DELETE CATEGORY || DELETE
router.delete('/delete/:id', authMiddleware, deleteCategoryController)

module.exports = router;