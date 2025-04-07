const express = require('express');
const { writeStory, showStory, getStoryPDF } = require('../controllers/storyController');
const router = express.Router();



router.post('/write', writeStory);
router.get('/allstories', showStory)
router.get('/pdf/:id', getStoryPDF); // Add this line

module.exports = router;
