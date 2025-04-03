const mongoose = require('mongoose');
const { registerUser, loginUser, getUserProfile, updateUser, getAllUsers } = require('../controllers/userController');


const stroySchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('Story', stroySchema);
