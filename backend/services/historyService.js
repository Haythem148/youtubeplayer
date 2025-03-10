const historyModel = require('../models/historyModel');

module.exports = {
  getAllVideos: () => {
    return historyModel.getAll();
  },
  
  addVideo: (video) => {
    // Validate video object
    if (!video || !video.id || !video.title) {
      throw new Error('Video must have id and title');
    }
    
  }
};
