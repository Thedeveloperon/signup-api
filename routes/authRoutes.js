const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', authenticate, AuthController.logout);
router.delete('/delete', authenticate, AuthController.deleteUser);
router.get('/profile', authenticate, AuthController.getUserProfile);
router.put('/profile', authenticate, AuthController.updateUserProfile);




module.exports = router;
