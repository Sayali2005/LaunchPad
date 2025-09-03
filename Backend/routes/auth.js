const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Cookie options
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 1000*60*60*24,
};

// Register
// routes/auth.js
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // Validate all fields
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: 'All fields required including username' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: 'Email already registered' });

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: 'Username already taken' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({ name, email, passwordHash, username });

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Send cookie
    res.cookie('token', token, COOKIE_OPTIONS).status(201).json({
      user: { id: user._id, name: user.name, email: user.email, username: user.username }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if(!valid) return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000*60*60*24*7
    }).json({
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS).json({ message: 'Logged out' });
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'User not found' });

    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch(err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
