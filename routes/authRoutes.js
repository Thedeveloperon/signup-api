const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate'); // Create this middleware


router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login); // Add this line
router.post('/logout', AuthController.logout);




module.exports = router;
