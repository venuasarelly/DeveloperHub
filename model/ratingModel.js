const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  taskprovider: {
    type: String
  },
  taskworker: {
    type: String,
    required: true
  },
  
  rating: {
    type: String,
    required: true
  }
 
});

module.exports = mongoose.model('Rating', ratingSchema);
