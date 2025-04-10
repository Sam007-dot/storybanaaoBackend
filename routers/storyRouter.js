const express = require("express");
const router = express.Router();
const storyController = require("../controllers/stroyController");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

// 🗂️ Configure Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'story__banners', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
  },
});

const upload = multer({ storage });

// 📝 Add a new story
router.post("/", upload.single("storyBanner"), storyController.addStory);

// 📄 Get all storys
router.get("/", storyController.getStories);

// 🔎 Get a single story by ID
router.get("/:id", storyController.getStoryById);

// 🛠️ Update a story
router.patch('/update/:id', upload.single('storyBanner'), storyController.updateStory);

// ❌ Delete a story
router.delete('/delete/:id', storyController.deleteStory); // ✅ Added delete route

module.exports = router;