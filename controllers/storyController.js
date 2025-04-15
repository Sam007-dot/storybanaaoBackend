const Story = require("../models/Story");
const User = require("../models/User");

// 📥 Add a new story
exports.addStory = async (req, res) => {
  try {
    const { storyName, storyContent, author } = req.body;

    if (!storyName || !storyContent || !author) {
      return res.status(400).json({ message: "Required fields missing." });
    }

    const newStory = new Story({
      storyName,
      storyContent,
      storyBanner: req.file?.path || '',
      author
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get all stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("author", "username");
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔎 Get all stories of a user by user ID
exports.getStoryById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Changed from username to ID
    if (!user) return res.status(404).json({ message: "User not found" });

    const stories = await Story.find({ author: user._id });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🛠️ Update a story
exports.updateStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    const { storyName, storyContent } = req.body;

    if (!storyName || !storyContent) {
      return res.status(400).json({ message: "Story name and content required." });
    }

    const updatedData = {
      storyName,
      storyContent,
      ...(req.file && { storyBanner: req.file.path }),
    };

    const updatedStory = await Story.findByIdAndUpdate(storyId, updatedData, { new: true });

    if (!updatedStory) return res.status(404).json({ message: "Story not found." });

    res.json({ message: "Story updated successfully!", story: updatedStory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete a story
exports.deleteStory = async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);
    if (!deletedStory) return res.status(404).json({ message: "Story not found" });

    res.json({ message: "Story deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
