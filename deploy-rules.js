// Script to deploy Firebase Database Rules using Admin SDK
// This is an alternative method if the Firebase CLI doesn't work

const admin = require('firebase-admin');
const fs = require('fs');

// Check if service account key file exists
const serviceAccountPath = './service-account-key.json';
if (!fs.existsSync(serviceAccountPath)) {
    console.log('Service account key file not found.');
    console.log('To use this script, you need to:');
    console.log('1. Go to Firebase Console > Project Settings > Service Accounts');
    console.log('2. Generate a new private key and download the JSON file');
    console.log('3. Rename it to "service-account-key.json" and place it in this directory');
    console.log('4. Run this script again');
    process.exit(1);
}

// Initialize Firebase Admin SDK
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://learnify-842b8-default-rtdb.asia-southeast1.firebasedatabase.app'
});

// Read database rules from file
const rules = fs.readFileSync('./database.rules.json', 'utf8');

// Deploy rules
const db = admin.database();
const rulesRef = db.ref();

console.log('Deploying database rules...');

// Note: The Firebase Admin SDK doesn't directly support updating security rules
// This script is provided as a reference, but you'll still need to use the Firebase CLI
// or manually update the rules in the Firebase Console

console.log('Note: The Firebase Admin SDK cannot directly deploy security rules.');
console.log('Please use the Firebase CLI method or manually update the rules in the Firebase Console:');
console.log('1. firebase login');
console.log('2. firebase deploy --only database');
console.log('OR');
console.log('1. Go to Firebase Console > Realtime Database > Rules tab');
console.log('2. Copy the content of database.rules.json');
console.log('3. Paste it in the rules editor and click "Publish"');