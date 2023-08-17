/**
 * @module controllers/authController
 */


const User = require('../models/User');
const jwtConfig = require('../config/jwt');

//signup API declarion
class AuthController {
  static async signup(req, res) {
    try {
      const { username, email, password } = req.body;
      
      // Validate inputs here
      
      const newUser = { username, email, password };
      await User.create(newUser);
      
      const token = jwtConfig.generateToken(newUser);
      
      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  //login API declarion
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate inputs here

      // Check if the user exists with the provided email
      const user = await User.getByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the stored hash
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwtConfig.generateToken(user);

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = AuthController;
