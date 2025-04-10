const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  storyName: { type: String, required: true },
  storyContent: { type: Number, required: true },
  storyBanner: { type: String, required: true } // Image path
});

module.exports = mongoose.model("Story", storySchema);