const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController } = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Router Object
const router = express.Router();

// Routes
// GET USER || GET
router.get('/getuser', authMiddleware, getUserController);

// UPDATE PROFILE || PUT
router.put('/updateuser', authMiddleware, updateUserController);

// UPDATE PASSWORD || PUT
router.post('/updatepassword', authMiddleware, updatePasswordController);

// RESET PASSWORD || POST
router.post('/resetpassword', authMiddleware, resetPasswordController);

// DELETE USER || DELETE
router.delete('/deleteuser/:id', authMiddleware, deleteUserController);

module.exports = router;