const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// REGISTER
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;

        // Validation
        if (!userName || !email || !password || !address || !phone || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields."
            });
        }

        // Check User
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.status(500).send({
                success: false,
                message: "Email already registered, Please login."
            });
        }

        // Password Hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        // Create New User
        const user = await userModel.create({ 
            userName, 
            email, 
            password: hashedPassword, 
            address, 
            phone,
            answer
        });

        res.status(201).send({
            success: true,
            message: "Successfully Registered.",
            user
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error
        });
    };
};

// LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide Email or Password.",
            });
        }

        // Check User
        const user = await userModel.findOne({ email: email  });
        if( !user) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        // Decypt Hashed Password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Token
        const token = JWT.sign({ id:user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // User Authenticated
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Logged in successfully.",
            token,
            user
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error
        })
    }
};

module.exports = { registerController, loginController };