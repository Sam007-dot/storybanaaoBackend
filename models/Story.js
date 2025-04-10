const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  storyName: { type: String, required: true  },
  storyContent: { type: String, required: true },
  storyBanner: { type: String } // Image path
});

module.exports = mongoose.model("Story", storySchema);