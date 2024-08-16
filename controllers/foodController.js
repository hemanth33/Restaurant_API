const foodModel = require("../models/foodModel.js");
const orderModel = require("../models/orderModel.js");

const createFoodController = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            price, 
            imageUrl, 
            foodTags, 
            category, 
            code, 
            isAvailable, 
            restaurant, 
            rating
        } = req.body;

        if (!title || !description || !price || !restaurant || !category) {
            return res.status(500).send({
                success: false,
                message: "Please provide all mandatory fields."
            });
        }

        const newFood = new foodModel({
            title, 
            description, 
            price, 
            imageUrl, 
            foodTags, 
            category, 
            code, 
            isAvailable, 
            restaurant, 
            rating
        });

        await newFood.save();

        res.status(201).send({
            success: true,
            message: "New Food Item Created and Added.",
            newFood
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Create Food API",
            error
        });
    }
}

const getAllFoodController = async (req, res) => {
    try {
        const food = await foodModel.find({});

        if(!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Item was found."
            });
        }

        res.status(200).send({
            success: true,
            totalCount: food.length,
            food
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Get All Food API",
            error
        });
    }
}

const getFoodByIdController = async (req, res) => {
    try {
        const foodId  = req.params.id;

        if(!foodId) {
            return res.status(404).send({
                success: false,
                message: "Invalid / Food ID not Found"
            });
        }

        const food = await foodModel.findById(foodId);

        if(!food) {
            return res.status(404).send({
                success: false,
                message: "No food item was found with provided ID"
            });
        }

        res.status(200).send({
            success: true,
            food
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error Get Food By ID API",
            error
        });
    }
}

const getFoodByRestaurantController = async (req, res) => {
    try {
        const restaurantId  = req.params.id;

        if(!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Invalid / Restaurant ID not Found"
            });
        }

        const foodByRestaurant = await foodModel.find({ restaurant: restaurantId });

        if(!foodByRestaurant) {
            return res.status(404).send({
                success: false,
                message: "No food item was found with the provided restaurant ID"
            });
        }

        res.status(200).send({
            success: true,
            message: "Food Based On Restaurant",
            totalCount: foodByRestaurant.length,
            foodByRestaurant
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error Get Food By ID API",
            error
        });
    }
}

const updateFoodController = async (req, res) => {
    try {
        const updateFoodId = req.params.id;

        if (!updateFoodId) {
            return res.status(500).send({
                success: false,
                message: "No Food ID was found"
            });
        }

        const food = await foodModel.findById(updateFoodId);

        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Item was found with given ID"
            });
        }

        const {
            title, 
            description, 
            price, 
            imageUrl, 
            foodTags, 
            category, 
            code, 
            isAvailable, 
            restaurant, 
            rating
            } = req.body;
        
        const updateFood = await foodModel.findByIdAndUpdate(updateFoodId, {
            title, 
            description, 
            price, 
            imageUrl, 
            foodTags, 
            category, 
            code, 
            isAvailable, 
            restaurant, 
            rating
        }, {new: true});

        res.status(200).send({
            success: true,
            message: "Food Item Was Updated.",
            updateFood
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Update Food API",
            error
        });
    }
}

const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;

        if (!foodId) {
            return res.status(500).send({
                success: false,
                message: "Invalid / No Food Id was found."
            });
        }

        const deleteFood = await foodModel.findByIdAndDelete(foodId);

        if (!deleteFood) {
            return res.status(404).send({
                success: false,
                message: "No Food was found for given ID"
            });
        }

        res.status(200).send({
            success: true,
            message: "Food Deletion Successfull."
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Delete Food API",
            error
        });
    }
}

const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;

        // Validation

        if(!cart) {
            return res.status(500).send({
                success: false,
                message: "Please add cart ot Payment Method"
            });
        }

        let total = 0;

        // Calculate Price
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = await orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id
        });

        await newOrder.save();

        res.status(201).send({
            success: true,
            message: "Order Placed Successfully.",
            newOrder
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Order Food API",
            error
        });
    }
}

const updateOrderController = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(404).send({
                success: false,
                message: "Please provide order ID"
            });
        }

        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true});

        res.status(200).send({
            success: true,
            message: "Order Status Updated."
        });
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Update Order API",
            error
        });
    }
}

module.exports = { 
    createFoodController, 
    getAllFoodController, 
    getFoodByIdController, 
    getFoodByRestaurantController, 
    updateFoodController, 
    deleteFoodController, 
    placeOrderController,
    updateOrderController 
};