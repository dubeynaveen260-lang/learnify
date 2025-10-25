// Script to verify Firebase Database Rules are working correctly
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

console.log('✅ Firebase Admin SDK initialized');
console.log('✅ Database URL:', 'https://learnify-842b8-default-rtdb.asia-southeast1.firebasedatabase.app');

// Test group chat access
async function testGroupChatAccess() {
    try {
        const db = admin.database();
        
        // Try to read the group chats (this should fail without proper auth)
        console.log('Testing group chat access without auth...');
        try {
            await db.ref('groupChats').once('value');
            console.log('❌ Unexpected: Group chats are publicly readable');
        } catch (error) {
            if (error.code === 'PERMISSION_DENIED') {
                console.log('✅ Correctly denied access to group chats without auth');
            } else {
                console.log('❌ Unexpected error:', error.message);
            }
        }
        
        console.log('\n📋 Manual verification steps:');
        console.log('1. Go to Firebase Console > Realtime Database > Rules tab');
        console.log('2. Verify the groupChats rules match:');
        console.log('   "groupChats": {');
        console.log('     "$groupId": {');
        console.log('       ".read": "auth != null && root.child(\'studyGroups/\' + $groupId + \'/members/\' + auth.uid).exists()",');
        console.log('       ".write": "auth != null && root.child(\'studyGroups/\' + $groupId + \'/members/\' + auth.uid).exists()",');
        console.log('       "$messageId": {');
        console.log('         ".validate": "newData.hasChildren([\'content\', \'senderId\', \'senderName\', \'timestamp\'])",');
        console.log('         ...');
        console.log('       }');
        console.log('     }');
        console.log('   }');
        console.log('3. If they don\'t match, copy the content of database.rules.json to the rules editor');
        console.log('4. Click "Publish" to update the rules');
        
    } catch (error) {
        console.error('Error during test:', error.message);
    }
}

testGroupChatAccess();