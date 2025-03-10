// In a real application, this would be a database model
const bookmarks = [];

module.exports = {
  getAll: () => {
    return [...bookmarks];
  },
  
  add: (video) => {
    // Check if video already exists in bookmarks
    const existingIndex = bookmarks.findIndex(item => item.id === video.id);
    if (existingIndex !== -1) {
      return null; // Return null to indicate duplicate
    }
    
    // Add to bookmarks
    bookmarks.push(video);
    return video;
  },
  
  exists: (videoId) => {
    return bookmarks.some(item => item.id === videoId);
  }
};
