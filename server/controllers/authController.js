const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as needed

// Sign-up function
const register = async (req, res) => {
  const { email, password, phone } = req.body;

  try {
    // Validate input
    if (!email || !password || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      phone,
    });

    // Save user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register };
