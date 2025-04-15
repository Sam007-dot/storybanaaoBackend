// models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  storyName: { type: String, required: true },
  storyContent: { type: String, required: true },
  storyBanner: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Story', storySchema);
