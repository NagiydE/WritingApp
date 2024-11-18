const express = require('express');
const axios = require('axios');
const router = express.Router();
const Prompt = require('../models/prompts');

// Trying out using Axios for the first time after reading about it. I used these links for ref:
//  https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
// https://axios-http.com/docs/intro
// https://axios-http.com/docs/api_intro

// Homepage: Generate and display a random word prompt outside API
router.get('/', async (req, res) => {
    let prompt = "Click to generate a prompt!";
    try {
        const response = await axios.get('https://random-word-api.herokuapp.com/word?number=3');
        prompt = response.data; // Gets three random words, displays them.
    } catch (error) {
        console.error('Error fetching random words:', error.message);
    }
    res.render('index', { prompt });
});

// Save a new writing entry
router.post('/save', async (req, res) => {
    const { temporaryUserId, promptText, writing } = req.body;
    try {
        const newPrompt = new Prompt({ temporaryUserId, promptText, writing });
        await newPrompt.save();
        res.redirect('/gallery');
    } catch (error) {
        console.error('Error saving prompt:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Display gallery of all prompts and writings
router.get('/gallery', async (req, res) => {
    const { temporaryUserId } = req.query; // Get temporaryUserId from query string
    try {
        const prompts = await Prompt.find();
        res.render('gallery', { prompts, temporaryUserId });
    } catch (error) {
        console.error('Error fetching prompts:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Like a prompt
router.post('/like', async (req, res) => {
    const { id } = req.body;
    try {
        await Prompt.findByIdAndUpdate(id, { $inc: { likes: 1 } });
        res.redirect('/gallery');
    } catch (error) {
        console.error('Error liking prompt:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a user's writing
router.post('/delete', async (req, res) => {
    const { id, temporaryUserId } = req.body;
    try {
        const prompt = await Prompt.findById(id);
        if (prompt.temporaryUserId === temporaryUserId) {
            await Prompt.findByIdAndDelete(id);
            res.redirect('/gallery');
        } else {
            res.status(403).send('Forbidden: You can only delete your own prompts.');
        }
    } catch (error) {
        console.error('Error deleting prompt:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
