const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');

// Import routes
const historyRoutes = require('./routes/historyRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: config.CORS_ORIGIN
}));
app.use(bodyParser.json());

// Routes
app.use('/api/history', historyRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(config.PORT, () => {
  console.log(`API server running on http://localhost:${config.PORT}`);
});
