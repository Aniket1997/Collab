// server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session'); // Import express-session
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User'); // Ensure correct path to User model

const app = express();

// Middleware for session management
app.use(session({
  secret: process.env.SESSION_SECRET, // Your session secret
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Passport configuration
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err, null)); // Error handling
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email'], // Requesting email and profile
}, (accessToken, refreshToken, profile, done) => {
  console.log('Google profile received:', profile); // Log profile
  User.findOne({ googleId: profile.id }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser); // User already exists
    } else {
      // Create a new user if not found
      new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        photoURL: profile._json.picture,
      })
      .save()
      .then(user => done(null, user))
      .catch(err => {
        console.error('Error saving user:', err); // Log any error
        done(err, null);
      }); // Error handling
    }
  }).catch(err => {
    console.error('Error finding user:', err); // Log any error
    done(err, null); // Error handling
  });
}));

// Auth Routes
app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), // Redirect on failure
  (req, res) => {
    res.redirect('http://localhost:5173/login'); // Redirect to your React app on success
  }
);

app.get('/api/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('http://localhost:5173/login'); // Redirect to your React app
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
