const express = require('express');
const { register } = require('../controllers/authController'); // Import the register function

const router = express.Router();


// Logout Route
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('http://localhost:5173/login'); // Redirect to your React app
  });
});

// Register Route
router.post('/register', register); // Add the register route

module.exports = router;
