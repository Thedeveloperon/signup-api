/**
 * @module controllers/authController
 */

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes'); // Add this line

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes); // Add this line

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
