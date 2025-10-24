// Secure Backend Proxy Server
// Protects API keys by keeping them server-side only

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Firebase config endpoint (returns only public configuration)
app.get('/api/firebase-config', (req, res) => {
    res.json({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL || "https://learnify-842b8-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    });
});

// Gemini AI proxy endpoint (keeps API key secret)
app.post('/api/ai/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Validate API key exists
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ 
                error: 'API key not configured on server' 
            });
        }

        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', errorText);
            return res.status(response.status).json({ 
                error: `AI API error: ${response.status}` 
            });
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            res.json({ 
                response: data.candidates[0].content.parts[0].text 
            });
        } else {
            res.status(500).json({ 
                error: 'No response from AI' 
            });
        }

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve index.html for SPA routes (for client-side routing)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/roadmap', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ai-assistant', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/quizzes', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/community', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cgpa-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Learnify server running on http://localhost:${PORT}`);
    console.log(`🔒 API keys are protected and not exposed to client`);
    console.log(`📁 Serving files from: ${__dirname}`);
});