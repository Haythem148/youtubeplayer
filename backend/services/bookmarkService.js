const bookmarkModel = require('../models/bookmarkModel');

module.exports = {
  getAllVideos: () => {
    return bookmarkModel.getAll();
  },
  
  addVideo: (video) => {
    // Validate video object
    if (!video || !video.id || !video.title) {
      throw new Error('Video must have id and title');
    }
    
    // Check if already exists
    if (bookmarkModel.exists(video.id)) {
      throw new Error('Video already bookmarked');
    }
    
    return bookmarkModel.add(video);
  }
};
