require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const ApiError = require('./utils/ApiError');

// Routes
const authRoutes = require('./routes/authRoute');
const quizRoutes = require('./routes/quizRoute');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Health Check & Root
app.get('/', (req, res) => {
  res.send('Welcome to Quizzie server 🚀');
});

app.get('/health', (req, res) => {
  res.json({
    serverName: 'Quizzie Server',
    currentTime: new Date().toISOString(),
    state: 'active',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

// Handle unknown routes
app.use((req, res, next) => {
  next(new ApiError(404, 'Route not found'));
});

// Centralized error handler (must be last)
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 MongoDB connected successfully');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`⚡ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

startServer();
