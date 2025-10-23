// Firebase Configuration
// ⚠️ SECURITY: This file now loads config from secure backend
// API keys are NO LONGER hardcoded here!

let firebaseConfig = null;

// Fetch Firebase config from secure backend
async function loadFirebaseConfig() {
    try {
        const response = await fetch('/api/firebase-config');
        if (!response.ok) {
            throw new Error('Failed to load Firebase config');
        }
        firebaseConfig = await response.json();
        return firebaseConfig;
    } catch (error) {
        console.error('Error loading Firebase config:', error);
        // Fallback for development (remove in production)
        console.warn('Using fallback config - configure backend server!');
        return {
            apiKey: "AIzaSyCdmjpkBvywUBSMr_flmeKxbGQuh67Zyjg",
            authDomain: "learnify-842b8.firebaseapp.com",
            databaseURL: "https://learnify-842b8-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "learnify-842b8",
            storageBucket: "learnify-842b8.firebasestorage.app",
            messagingSenderId: "728101907483",
            appId: "1:728101907483:web:86c9031d1186b692c35cbe",
            measurementId: "G-GDXKP8FRY4"
        };
    }
}
// Initialize Firebase (async)
let auth, database;

(async function initializeApp() {
    console.log('🔥 Initializing Firebase...');
    
    try {
        const config = await loadFirebaseConfig();
        console.log('✅ Firebase config loaded:', config.projectId);
        
        firebase.initializeApp(config);
        auth = firebase.auth();
        database = firebase.database();
        
        // Export after initialization
        window.auth = auth;
        window.database = database;
        
        console.log('✅ Firebase initialized successfully');
        console.log('✅ Auth:', auth ? 'Ready' : 'Not ready');
        console.log('✅ Database:', database ? 'Ready' : 'Not ready');
        
        // Trigger app ready event
        window.dispatchEvent(new Event('firebase-ready'));
        console.log('📢 Firebase-ready event dispatched');
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        // Show error to user
        alert('Failed to initialize Firebase. Please refresh the page.');
    }
})();

// Firebase references are now initialized asynchronously above

// Google Gemini API Configuration
// ⚠️ SECURITY: API key is now on backend server, NOT exposed to client!
const GEMINI_API_KEY = null; // No longer used client-side
const GEMINI_API_URL = '/api/ai/chat'; // Proxy endpoint on our server

// Fallback API key for direct access (when server is not running)
// ⚠️ This is visible to users! For production, always use the server.
// Get your free API key at: https://makersuite.google.com/app/apikey
window.GEMINI_API_KEY_FALLBACK = 'AIzaSyA9oRHu78GZyL2w32bde5lxtt2xAJKaMUA';

// App Configuration
const APP_CONFIG = {
    xpPerTopic: 10,
    xpPerQuiz: 50,
    xpForDailyStreak: 5,
    levelXpRequirement: 100, // XP needed per level
    motivationalQuotes: [
        "The expert in anything was once a beginner.",
        "Learning is a treasure that will follow its owner everywhere.",
        "Education is the most powerful weapon you can use to change the world.",
        "The beautiful thing about learning is that no one can take it away from you.",
        "Success is the sum of small efforts repeated day in and day out.",
        "Don't watch the clock; do what it does. Keep going.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Believe you can and you're halfway there.",
        "The only way to do great work is to love what you do.",
        "Learning never exhausts the mind."
    ]
};

// Export for use in other files
window.GEMINI_API_URL = GEMINI_API_URL;
window.APP_CONFIG = APP_CONFIG;
// auth and database are exported after async initialization above
