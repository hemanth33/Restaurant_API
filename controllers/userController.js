const userModel = require("../models/userModel.js");
const bcrypt = require('bcryptjs');

// GET USER INFO
const getUserController = async (req, res) => {
    // res.status(200).send({
    //     message: "User Data."
    // });
    // console.log(req.body.id);

    try {
        // Find User
        const user = await userModel.findById({ _id: req.body.id });

        // Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found."
            });
        }

        // Hide Password
        user.password = undefined;

        // Response
        res.status(200).send({
            success: true,
            message: "User Data Found.",
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error
        })
    }
}

const updateUserController = async (req, res) => {
    try {
        // Find User
        const user = await userModel.findById({ _id: req.body.id });

        // Validation 
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        // Update User
        const { userName, address, phone, userType } = req.body;
        if(userName) user.userName = userName;
        if(address) user.address = address;
        if(phone) user.phone = phone;
        if(userType) user.userType = userType;

        await user.save();

        res.status(200).send({
            success: true,
            message: "User Updated Successfully."
        });

    } catch (error) {
       
        res.status(500).send({
            success: false,
            message: "Error In Update User API",
            error
        })
    }
}

const updatePasswordController = async (req, res) => {
    try {
        // Find User
        const user = await userModel.findById({ _id: req.body.id });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        // Get data from user
        const { oldPassword, newPassword } = req.body;
        if( !oldPassword || !newPassword ) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Old and New Password",
            });
        } 

        // Compare Old Password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid / Wrong Old Password."
            });
        }

        // Update Password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();

        res.status(200).send({
            success: true,
            message: "Password Update Successfull."
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: "Erron in Update Password API"
        });
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        // Validation
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields."
            });
        }

        // Chech User
        const user = await userModel.findOne({ email, answer });
        if( !user ) {
            return res.status(500).send({
                success: false,
                message: "User not found OR Answer not correct."
            })
        }

        // Hashing Password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: "Password Reset Successfull."
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: "Error in Reset Password API",
            error
        })
    }
}

const deleteUserController = async (req, res) => {
    try {
        
        await userModel.findByIdAndDelete( req.params.id );
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted."
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: "Error in Delete User API",
            error
        })
    }
}

module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController };