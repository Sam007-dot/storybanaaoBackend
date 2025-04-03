
const User = require('../models/Story');

// Register User
exports.writeStory = async (req, res) => {
  try {
    const { title, content } = req.body;
   

  

    const newStory = new User({
      title,
      content,
    });

    await newStory.save();
    res.status(201).json({ message: 'Story written successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};