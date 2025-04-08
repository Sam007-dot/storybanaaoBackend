
const Story = require('../models/Story');
const PDFDocument = require('pdfkit');

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


exports.showStory = async (req, res) => {
  try {
    const stories = await Story.find(); // Fetch all Storys from the database
    res.status(200).json(stories); // Return the list of Storys
  }
  catch (err) {
    res.status(400).json({ eroor: err.message });
  }
}

const PDFDocument = require('pdfkit');

// Generate PDF of a story
// GET /api/stories/pdf/:id
exports.getStoryPDF = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${story.storyName}.pdf"`);

    doc.pipe(res); // stream PDF directly

    doc.fontSize(24).text(story.storyName, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(story.storyContent, { align: 'left' });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


