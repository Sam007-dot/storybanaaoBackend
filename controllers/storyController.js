const Story = require("../models/Story");
const User = require("../models/User")

// 📥 Add a new story
exports.addStory = async (req, res) => {
  try {
    const newStory = new Story({
      storyName: req.body.storyName,
      storyContent: req.body.storyContent,
      storyBanner: req.file?.path || '', // Store file path if uploaded
      author: req.user._id, // coming from JWT/session
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get all storys
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().populate('author', 'username');
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔎 Get single story by ID
exports.getStoryById = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const stories = await Story.find({ author: user._id });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🛠️ Update a story
// 🛠️ Update a story
exports.updateStory = async (req, res) => {
  try {
    const storyId = req.params.id;

    // Ensure that storyContent is included
    if (!req.body.storyName || !req.body.storyContent) {
      return res.status(400).json({ message: "Story name and content are required." });
    }

    const updatedData = {
      storyName: req.body.storyName,
      storyContent: req.body.storyContent, // Correct field name
    };

    if (req.file) {
      updatedData.storyBanner = req.file.path; // Update banner if uploaded
    }

    // Remove undefined fields
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined) {
        delete updatedData[key];
      }
    });

    const updatedStory = await Story.findByIdAndUpdate(storyId, updatedData, { new: true });

    if (!updatedStory) {
      return res.status(404).json({ message: "No such Story found" });
    }

    res.json({ message: "Story updated successfully!", story: updatedStory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ❌ Delete a story
exports.deleteStory = async (req, res) => {
  try {
    const storyId = req.params.id;

    const deletedStory = await Story.findByIdAndDelete(storyId);

    if (!deletedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ message: "Story deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};