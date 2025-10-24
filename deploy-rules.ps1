# Firebase Database Rules Deployment Script
# This script helps deploy the updated database rules to Firebase

Write-Host "Firebase Database Rules Deployment Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if Firebase CLI is installed
Write-Host "Checking if Firebase CLI is installed..." -ForegroundColor Yellow
try {
    $firebaseVersion = firebase --version
    Write-Host "Firebase CLI version: $firebaseVersion" -ForegroundColor Green
} catch {
    Write-Host "Firebase CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g firebase-tools
}

# Check if user is logged in
Write-Host "Checking Firebase authentication..." -ForegroundColor Yellow
try {
    $projects = firebase projects:list
    Write-Host "User is already logged in to Firebase" -ForegroundColor Green
} catch {
    Write-Host "Please log in to Firebase:" -ForegroundColor Yellow
    Write-Host "1. Run: firebase login" -ForegroundColor Cyan
    Write-Host "2. Complete the authentication in your browser" -ForegroundColor Cyan
    Write-Host "3. Run this script again after logging in" -ForegroundColor Cyan
    exit
}

# Deploy database rules
Write-Host "Deploying database rules..." -ForegroundColor Yellow
try {
    firebase deploy --only database
    Write-Host "Database rules deployed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error deploying database rules:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "1. Make sure you have the correct permissions for the Firebase project" -ForegroundColor Cyan
    Write-Host "2. Check if the database.rules.json file is properly formatted" -ForegroundColor Cyan
    Write-Host "3. Verify your internet connection" -ForegroundColor Cyan
}