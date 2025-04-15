const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Optional now with express.json() method
const userRouter = require('./routers/userRouter');
const storyRouter = require('./routers/storyRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "https://storybanaao.netlify.app", // Corrected CORS origin
    credentials: true // Allows cookies if needed
}));

// Express's built-in JSON parser (replaces bodyParser.json())
app.use(express.json()); // Automatically parses JSON data in request body

// Serve uploads (optional, check for privacy)
app.use('/uploads', express.static('uploads'));

// Route Middleware
app.use('/api/users', userRouter);
app.use('/api/stories', storyRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Helps prevent long connection delays
})
.then(() => app.listen(PORT, () => console.log(`DB connected & Server running on port ${PORT}`)))
.catch(err => console.error("MongoDB connection error:", err));

