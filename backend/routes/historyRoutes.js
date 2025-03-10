const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// GET /api/history - Get all history items
router.get('/', historyController.getHistory);

// POST /api/history - Add to history
router.post('/', historyController.addToHistory);

module.exports = router;
