const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contacts');

// Import error handler
// const errorHandler = require('./middleware/errorHandler'); // COMMENTED OUT

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contacts', contactRoutes);

const twilio = require('twilio');
const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

app.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;

  // validation
  if (!to || !message) {
    return res.status(400).json({
      success: false,
      error: "Phone number and message required"
    });
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to: to
    });

    res.json({
      success: true,
      sid: response.sid
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (COMMENTED OUT)
// app.use(errorHandler);

module.exports = app;
