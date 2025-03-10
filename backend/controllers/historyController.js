const historyService = require('../services/historyService');

module.exports = {
  getHistory: (req, res) => {
    try {
      const videos = historyService.getAllVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  addToHistory: (req, res) => {
    try {
      const video = req.body;
      const savedVideo = historyService.addVideo(video);
      res.status(201).json(savedVideo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
