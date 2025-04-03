const express = require('express');
const { writeStory } = require('../controllers/storyController');
const router = express.Router();



router.post('/write', writeStory);
module.exports = router;
