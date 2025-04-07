
const Story = require('../models/Story');

// Register Story
exports.writeStory = async (req, res) => {
  try {
    const { title, content } = req.body;




    const newStory = new Story({
      title,
      content,
    });

    await newStory.save();
    res.status(201).json({ message: 'Story written successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.showStory() = async (req, res) => {
  try {
    const stories = await Story.find(); // Fetch all Storys from the database
    res.status(200).json(stories); // Return the list of Storys
  }
  catch (err) {
    res.status(400).json({ eroor: err.message });
  }
}