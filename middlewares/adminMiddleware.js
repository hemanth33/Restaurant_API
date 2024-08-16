const userModel = require('../models/userModel.js');

module.exports = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (user.userType !== 'Admin') {
            return res.status(401).send({
                success: false,
                message: "Only Admin Access"
            });
        } else {
            next();
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unauthorized Access",
            error
        })
    }
}