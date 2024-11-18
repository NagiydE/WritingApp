const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    temporaryUserId: { 
        type: String, 
        required: true 
    }, // Identifier for the user (stored in localStorage)
    promptText: { 
        type: String, 
        required: true 
    }, // The random writing prompt
    writing: { 
        type: String, 
        required: true 
    }, // User's response to the prompt
    likes: { 
        type: Number, 
        default: 0 
    }, // Number of likes the prompt has received
    createdAt: { 
        type: Date, 
        default: Date.now 
    }, // Timestamp for when the prompt was created
});

module.exports = mongoose.model('Prompt', promptSchema);
