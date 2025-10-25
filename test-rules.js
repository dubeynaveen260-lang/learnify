// Script to test Firebase Database Rules Syntax
const fs = require('fs');

try {
    // Read the database rules file
    const rulesContent = fs.readFileSync('./database.rules.json', 'utf8');
    
    // Parse JSON to check syntax
    const rules = JSON.parse(rulesContent);
    
    console.log('✅ Firebase Database Rules Syntax Check: PASSED');
    console.log('✅ Rules file is valid JSON');
    
    // Check for common issues
    let issues = [];
    
    // Check if all required sections exist
    const requiredSections = ['users', 'discussions', 'discussionReplies', 'questions', 'studyGroups', 'groupChats', 'userNotifications'];
    for (const section of requiredSections) {
        if (!rules.rules[section]) {
            issues.push(`Missing section: ${section}`);
        }
    }
    
    // Check studyGroups section
    if (rules.rules.studyGroups) {
        const studyGroups = rules.rules.studyGroups;
        if (!studyGroups['.read']) {
            issues.push('studyGroups missing .read rule');
        }
        if (!studyGroups.$groupId || !studyGroups.$groupId['.write']) {
            issues.push('studyGroups.$groupId missing .write rule');
        }
    }
    
    // Check groupChats section
    if (rules.rules.groupChats) {
        const groupChats = rules.rules.groupChats;
        // Read and write rules are now nested under $groupId
        if (!groupChats.$groupId || !groupChats.$groupId['.read']) {
            issues.push('groupChats.$groupId missing .read rule');
        }
        if (!groupChats.$groupId || !groupChats.$groupId['.write']) {
            issues.push('groupChats.$groupId missing .write rule');
        }
    }
    
    // Check userNotifications section
    if (rules.rules.userNotifications) {
        const userNotifications = rules.rules.userNotifications;
        if (!userNotifications.$userId) {
            issues.push('userNotifications missing $userId section');
        } else {
            const userIdSection = userNotifications.$userId;
            if (!userIdSection['.read']) {
                issues.push('userNotifications.$userId missing .read rule');
            }
            if (!userIdSection['.write']) {
                issues.push('userNotifications.$userId missing .write rule');
            }
        }
    }
    
    if (issues.length > 0) {
        console.log('⚠️  Issues found:');
        issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
        console.log('✅ No issues found in rules structure');
    }
    
    console.log('\n📋 Next steps:');
    console.log('1. Run: firebase login');
    console.log('2. Run: firebase deploy --only database');
    console.log('3. Test the group functionality in your app');
    
} catch (error) {
    console.error('❌ Firebase Database Rules Syntax Check: FAILED');
    console.error('Error:', error.message);
    
    if (error instanceof SyntaxError) {
        console.error('\n🔧 Fix the JSON syntax error in database.rules.json');
    }
}