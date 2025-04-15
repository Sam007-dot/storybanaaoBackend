// models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  storyName: String,
  storyContent: String,
  storyBanner: String,
  createdAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Story', storySchema);
