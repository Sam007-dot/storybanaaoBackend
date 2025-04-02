const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "https://storybanaao.netlify.app", // Corrected CORS origin
    credentials: true // Allows cookies if needed
}));  

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Route Middleware
app.use('/api/users', userRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Helps prevent long connection delays
})
.then(() => app.listen(PORT, () => console.log(`DB connected & Server running on port ${PORT}`)))
.catch(err => console.error("MongoDB connection error:", err));

// write users story
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serves static files

mongoose.connect('mongodb://localhost:27017/storyDB', { useNewUrlParser: true, useUnifiedTopology: true });

const StorySchema = new mongoose.Schema({ story: String });
const Story = mongoose.model('Story', StorySchema);

app.post('/save-story', async (req, res) => {
    try {
        const newStory = new Story({ story: req.body.story });
        await newStory.save();
        res.json({ message: 'Story saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving story' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
