const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');
const { registerUser, loginUser, getUserProfile, updateUser, getAllUsers, getUserProfileByName } = require('../controllers/userController');
const router = express.Router();


// Configure Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
  },
});

const upload = multer({ storage });

// Routes
router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile)
router.get('/:username', getUserProfileByName);
router.patch('/update/:id', upload.single('profilePicture'), updateUser);
router.get('/all', getAllUsers); // API endpoint to fetch all users
module.exports = router;
