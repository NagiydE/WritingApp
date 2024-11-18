const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 2024;

// Import the model and routes
const prompts = require('./models/prompts'); // Adjust path to match your structure
const promptRoutes = require('./routes/promptRoutes'); // Adjust path to your `routes` folder

// MongoDB connection string and database name
const configURI = "mongodb+srv://ewellnagiyd:29iGftEOSQfmwA73@cluster0.lwzbz.mongodb.net/writingApp?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(configURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB!"))
    .catch(error => console.error("Failed to connect to MongoDB:", error));

// Middleware
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (e.g., CSS, JS)

// Routes
app.use('/', promptRoutes); // Use the routes defined in `promptRoutes.js`

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
