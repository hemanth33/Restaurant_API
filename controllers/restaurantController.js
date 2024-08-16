const restaurantModel = require("../models/restaurantModel.js");

// Create Restaurant
const createRestaurantController = async (req, res) => {
    try {
        const { title, 
                imageUrl, 
                foods, 
                time, 
                pickup, 
                delivery, 
                isOpen, 
                logoUrl, 
                rating, 
                ratingCount, 
                coords, 
                code 
            } = req.body;

        // Validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "Please provide Title & Address of Restaurant."
            });
        }

        // Create Restaurant
        const newRestaurant = new restaurantModel({
            title,
            imageUrl, 
            foods, 
            time, 
            pickup, 
            delivery, 
            isOpen, 
            logoUrl, 
            rating, 
            ratingCount, 
            coords, 
            code 
        });

        await newRestaurant.save();

        res.status(201).send({
            success: true,
            message: "New Restaurant Created."
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Create Restaurant API"
        });
    }
}

const getAllRestaurantController = async (req, res) => {
    try {
        
        const restaurants = await restaurantModel.find({});
        if(!restaurants) {
            return res.status(404).send({
                success: false,
                message: "No Restaurant To Show."
            });
        }

        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Get All Restaurant API"
        })
    }
}

const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        
        if(!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide valid ID"
            })
        }

        const restaurant = await restaurantModel.findById(restaurantId);

        if(!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Restaurant Not Found."
            });
        }

        res.status(200).send({
            success: true,
            restaurant
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Erron In Get Restaurant By Id API",
            error
        });
    }
}

const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        if(!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Valid ID"
            });
        }

        await restaurantModel.findByIdAndDelete(restaurantId);

        res.status(200).send({
            success: true,
            message: "Restaurant Deletion Successfull."
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Delete Restaurant API",
            error
        })
    }
}

module.exports = { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController };