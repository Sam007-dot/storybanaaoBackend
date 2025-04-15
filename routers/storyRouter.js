const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// 🗂️ Configure Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "story__banners", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file types
  },
});

// Multer file size limit (e.g., 5MB)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const fileExtension = file.mimetype.split("/")[1];
    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Only JPG, JPEG, and PNG files are allowed"), false); // Reject file
    }
  },
});

// 📝 Add a new story
router.post("/", upload.single("storyBanner"), storyController.addStory);

// 📄 Get all stories
router.get("/", storyController.getStories);

// 🔎 Get a single story by ID
router.get("/:id", storyController.getStoryById);

// 🛠️ Update a story
router.patch("/update/:id", upload.single("storyBanner"), storyController.updateStory);

// ❌ Delete a story
router.delete("/delete/:id", storyController.deleteStory);

module.exports = router;
