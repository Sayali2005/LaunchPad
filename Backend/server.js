// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Parse frontend origins from .env
const allowedOrigins = process.env.FRONTEND_ORIGIN.split(',');

// CORS setup
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests (Postman, server-to-server)
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy does not allow this origin"), false);
    }
    return callback(null, true);
  },
  credentials: true, // allow cookies or JWT in headers
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Test route
app.get('/', (req, res) => {
  res.send("✅ LaunchPad API is running on Render!");
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
