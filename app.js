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
const postRoutes = require('./routes/postRoutes'); // Import the new post routes


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // Mount the new post routes


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
