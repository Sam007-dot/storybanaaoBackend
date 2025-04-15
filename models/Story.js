const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  storyName: { type: String, required: true },
  storyContent: { type: String, required: true },
  storyBanner: { type: String },  // Image path (optional)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [{ type: String }],
  tags: [{ type: String }],
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 }
  }],
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewText: { type: String }
  }]
});

module.exports = mongoose.model("Story", storySchema);
