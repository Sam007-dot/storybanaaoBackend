const Story = require("../models/Story");

// 📥 Add a new story
exports.addStory = async (req, res) => {
  try {
    const newStory = new Story({
      storyName: req.body.storyName,
      storyContent: req.body.storyContent,
      storyBanner: req.file?.path, // Store file path if uploaded
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
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔎 Get single story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🛠️ Update a story
exports.updateStory = async (req, res) => {
  try {
    const storyId = req.params.id;

    const updatedData = {
      storyName: req.body.storyName,
      storyValue: req.body.storyValue,
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