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

// CORS - allow frontend origin & allow credentials for cookies
// const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
// app.use(cors({
//   origin: FRONTEND_ORIGIN,
//   credentials: true, // <--- allow cookies to be sent
// }));

const allowedOrigins = ["http://localhost:5173", "https://launchpad-bacbe.web.app"];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// connect to mongo and start server
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

app.get('/', (req, res) => {
  res.send("✅ LaunchPad API is running on Render!");
});
