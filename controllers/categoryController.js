const categoryModel = require("../models/categoryModel.js");

// Create Category
const createCateoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        // Validation

        if (!title || !imageUrl) {
            return res.status(500).send({
                success: false,
                message: "Please provide Category title and ImageURL"
            });
        }

        const newCategory = new categoryModel({
            title, 
            imageUrl
        });

        await newCategory.save();

        res.status(201).send({
            success: true,
            message: 'Category Creation Successfull.',
            newCategory
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Create Category API",
            error
        })
    }
}

const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});

        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No Categories Found"
            });
        }

        res.status(200).send({
            success: true,
            totalCount: categories.length,
            categories
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Get All Categories API",
            error
        })
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const categoryId  = req.params.id;
        const { title, imageUrl } = req.body;

        if(!categoryId) {
            return res.status(500).send({
                success: false,
                message: "CategoryID is invalid / Not found."
            });
        }

        if (!title) {
            return res.status(500).send({
                success: false,
                message: "Please provide title to Update."
            });
        }

        const updateCategory = await categoryModel.findByIdAndUpdate(categoryId, {title, imageUrl}, {new: true});

        if(!updateCategory) {
            return res.status(500).send({
                success: false,
                message: "No category found with provided ID"
            });
        }

        res.status(200).send({
            success: true,
            message: "Category Update Successfull.",
            updateCategory
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Update Category API",
            error
        });
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        if (!categoryId) {
            return res.status(500).send({
                success: false,
                message: "Please provide Category ID"
            });
        }

        const deleteCategory = await categoryModel.findById(categoryId);

        if (!deleteCategory) {
            return res.status(404).send({
                success: false,
                message: "No Category found with Provided ID"
            });
        }

        await categoryModel.findByIdAndDelete(categoryId);

        res.status(200).send({
            success: true,
            message: "Category Deletion Successfull."
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Delete Category API",
            error
        });
    }
}

module.exports = { createCateoryController, getAllCategoriesController, updateCategoryController, deleteCategoryController };