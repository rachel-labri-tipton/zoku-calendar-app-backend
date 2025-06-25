const express = require('express');
const { sequelize } = require('../models');
require('dotenv').config();
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow cookies and authorization headers
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const todoListRoutes = require('./routes/todos');
const settingsRoutes = require('./routes/settings');
const categoryRoutes = require('./routes/categories');
const timeLogRoutes = require('./routes/timeLogs');

// Use routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/todos', todoListRoutes);
app.use('/settings', settingsRoutes);
app.use('/time-logs', timeLogRoutes); 
app.use('/categories', categoryRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync();
    console.log('Models synchronized!');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

start();

module.exports = app;