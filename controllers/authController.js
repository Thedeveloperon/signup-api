/**
 * @module controllers/authController
 * 
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');

//signup API declarion
class AuthController {
  static async signup(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        username,
        email,
        password: hashedPassword // Store the hashed password in the database
      };

      await User.create(newUser);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  

  }
  //login API declarion
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwtConfig.generateToken(user);
      
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  //logout api
  static async logout(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
  
      if (!token) {
        return res.status(400).json({ message: 'Token not provided' });
      }
  
      // Rest of your code
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'An error occurred during logout' });
    }
  }
  
  //Delete user api
  static async deleteUser(req, res) {
    try {
      const userId = req.user.id;

      // Delete the user
      await User.deleteUserById(userId);

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
  }

  //Get user profile api
  static async getUserProfile(req, res) {
    try {
      const userId = req.user.id;

      // Get the user profile
      const userProfile = await User.getUserProfile(userId);

      if (!userProfile) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(userProfile);
    } catch (error) {
      console.error('Get user profile error:', error);
      res.status(500).json({ message: 'An error occurred while retrieving user profile' });
    }
  }


  
}

module.exports = AuthController;
