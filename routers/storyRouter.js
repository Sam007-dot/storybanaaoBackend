const express = require('express');
const { writeStory, showStory } = require('../controllers/storyController');
const router = express.Router();



router.post('/write', writeStory);
router.get('/allstories', showStory)
module.exports = router;
