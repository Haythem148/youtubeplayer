const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

// GET /api/bookmarks - Get all bookmarks
router.get('/', bookmarkController.getBookmarks);

// POST /api/bookmarks - Add to bookmarks
router.post('/', bookmarkController.addToBookmarks);

module.exports = router;
