const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controler');


// User Routes
router.post('/user/register',authController.register);
router.post('/user/login',authController.loginUser);
router.get('/user/logout',authController.logoutUser);


// Food Partner Routes

router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.get('/food-partner/logout', authController.logoutFoodPartner)




module.exports = router;