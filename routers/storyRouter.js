const express = require('express');
const { writeStory } = require('../controllers/storyController');
const router = express.Router();



router.post('/write', writeStory);
// router.get('/allstory', g); // API endpoint to fetch all users
module.exports = router;
