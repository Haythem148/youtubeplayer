// In a real application, this would be a database model
const history = [];

module.exports = {
  getAll: () => {
    return [...history];
  },
  
  add: (video) => {
    
    const existingIndex = history.findIndex(item => item.id === video.id);
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    history.unshift(video);
    return video;
  }
};
