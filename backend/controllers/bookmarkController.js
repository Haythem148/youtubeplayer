const bookmarkService = require('../services/bookmarkService');

module.exports = {
  getBookmarks: (req, res) => {
    try {
      const videos = bookmarkService.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  addToBookmarks: (req, res) => {
    try {
      const video = req.body;
      const savedVideo = bookmarkService.addVideo(video);
      res.status(201).json(savedVideo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
