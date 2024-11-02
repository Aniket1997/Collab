const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');// Import GoogleStrategy

const authRouter = require('./routes/auth'); // Import your auth controller

dotenv.config();

const app = express();
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));



// Use the auth routes
app.use('/auth', authRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
