require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
// const Redis = require('ioredis');
const { swaggerUi, specs } = require('./config/swagger');

const PORT = process.env.PORT || 8080;
app.use(express.json());

 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
 app.use(cors());

const connectDB = require('./config/database');

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
    const prisma = require('./config/prismaClient');
    await prisma.$queryRaw`SELECT 1`;
    healthStatus.database = 'UP';
  } catch (dbErr) {
    console.error('Health check: Database connection failed:', dbErr);
    healthStatus.database = 'DOWN';
  }

  if (healthStatus.database === 'UP') {
    res.status(200).json(healthStatus);
  } else {
    res.status(500).json(healthStatus);
  }
});


  app.get('/', (req, res) => {
    res.send('API is up and running!');
  });

  //Global error handler
  app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

module.exports = app;

 
    