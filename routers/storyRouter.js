// routes/storyRoutes.js
const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "story__banners",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileExtension = file.mimetype.split("/")[1];
    if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, and PNG files are allowed"), false);
    }
  },
});

router.post("/", upload.single("storyBanner"), storyController.addStory);
router.get("/", storyController.getStories);
router.get("/:id", storyController.getStoryById);
router.patch("/update/:id", upload.single("storyBanner"), storyController.updateStory);
router.delete("/delete/:id", storyController.deleteStory);

module.exports = router;
