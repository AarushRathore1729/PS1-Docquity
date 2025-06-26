require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const { swaggerUi, specs } = require('./config/swagger');

const PORT = process.env.PORT || 8080;
app.use(express.json());

 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
 app.use(cors());

const connectDB = require('./config/database');
const { globalErrorHandler, notFound } = require('./middleware/errorHandler');

const urlRoutes = require('./routes/urlRoutes');
const userRoutes = require('./routes/userRoutes');

// const urlController = require('./controllers/urlController');
// const UrlService = require('./services/UrlService');
// const UrlRepository = require('./repositories/urlRepository');

// const userController = require('./controllers/userController');
// const UserService = require('./services/UserService');
// const UserRepository = require('./repositories/userRepository');

connectDB();

app.use('/api/shorten', urlRoutes);
app.use('/api/users', userRoutes);

//Healthcheck endpoint
app.get('/health', async (req, res) => {
  const healthStatus = {
    "Express Server": 'UP',
    database: 'DOWN',
    timestamp: new Date().toISOString()
  };

  try {
    await mongoose.connection.db.collection('healthchecks').findOne({});
    healthStatus.database = 'UP';
  } catch (dbErr) {
    console.error('Health check: MongoDB connection failed:', dbErr);
    healthStatus.database = 'DOWN';
  }

  if (healthStatus.database === 'UP') {
    res.status(200).json(healthStatus);
  } else {
    res.status(500).json(healthStatus);
  }
});


  app.get('/', (req, res) => {
    res.json({ 
      message: 'URL Shortener API is up and running!',
      version: '1.0.0',
      documentation: '/api-docs'
    });
  });

// 404 handler for undefined routes
app.use(notFound);

//Global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;

 
    