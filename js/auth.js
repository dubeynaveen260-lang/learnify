// Authentication Module
// Handles login, logout, signup, password reset, and profile management

let currentUser = null;

// Wait for Firebase to be ready before setting up auth listener
function initializeAuthListener() {
    console.log('🔐 Initializing auth listener...');
    
    // Check if auth is available
    if (typeof auth === 'undefined' || !auth) {
        console.error('❌ Auth not available yet, waiting for Firebase...');
        // Wait for firebase-ready event
        window.addEventListener('firebase-ready', () => {
            console.log('✅ Firebase ready event received, setting up auth listener');
            setupAuthStateListener();
        });
        return;
    }
    
    setupAuthStateListener();
}

// Setup authentication state listener
function setupAuthStateListener() {
    console.log('📡 Setting up auth state listener...');
    
    auth.onAuthStateChanged((user) => {
        console.log('🔄 Auth state changed:', user ? user.email : 'No user');
        
        if (user) {
            currentUser = user;
            updateAuthButton(true);
            // Hide login screen if visible
            const loginScreen = document.getElementById('loginScreen');
            if (loginScreen) loginScreen.style.display = 'none';
            // Load user data and initialize features
            loadUserProfile();
            initializeDailyStreak();
            loadDailyQuote();
        } else {
            currentUser = null;
            updateAuthButton(false);
            // Show guest mode - don't force login
            showGuestMode();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuthListener);
} else {
    // DOM already loaded
    initializeAuthListener();
}

// Toggle between login and guest mode
function toggleAuth() {
    if (currentUser) {
        // User is logged in, so logout
        logout();
    } else {
        // User is not logged in, show login screen
        showLoginScreen();
    }
}

// Update auth button based on login state
function updateAuthButton(isLoggedIn) {
    const authButton = document.getElementById('authButton');
    const authIcon = document.getElementById('authIcon');
    const authText = document.getElementById('authText');
    
    if (isLoggedIn) {
        authIcon.className = 'fas fa-sign-out-alt';
        authText.textContent = 'Logout';
        authButton.style.background = 'var(--danger-color)';
    } else {
        authIcon.className = 'fas fa-sign-in-alt';
        authText.textContent = 'Login';
        authButton.style.background = 'var(--primary-color)';
    }
}

// Show guest mode (user can browse without login)
function showGuestMode() {
    // Set default guest values - with safety checks
    const userNameEl = document.getElementById('userName');
    const dashboardNameEl = document.getElementById('dashboardUserName');
    const userLevelEl = document.getElementById('userLevel');
    const totalXPEl = document.getElementById('totalXP');
    const completedTopicsEl = document.getElementById('completedTopics');
    const quizzesTakenEl = document.getElementById('quizzesTaken');
    const avgAccuracyEl = document.getElementById('avgAccuracy');
    const streakDaysEl = document.getElementById('streakDays');
    const xpTextEl = document.getElementById('xpText');
    const xpProgressEl = document.getElementById('xpProgress');
    
    if (userNameEl) userNameEl.textContent = 'Guest';
    if (dashboardNameEl) dashboardNameEl.textContent = 'Guest';
    if (userLevelEl) userLevelEl.textContent = 'Not logged in';
    if (totalXPEl) totalXPEl.textContent = '0';
    if (completedTopicsEl) completedTopicsEl.textContent = '0';
    if (quizzesTakenEl) quizzesTakenEl.textContent = '0';
    if (avgAccuracyEl) avgAccuracyEl.textContent = '0%';
    if (streakDaysEl) streakDaysEl.textContent = '0';
    if (xpTextEl) xpTextEl.textContent = 'Login to track progress';
    if (xpProgressEl) xpProgressEl.style.width = '0%';
    
    // Show guest notice
    const guestNotice = document.getElementById('guestNotice');
    if (guestNotice) {
        guestNotice.style.display = 'block';
    }
}

// Switch between login and signup tabs
function showTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Show password reset screen
function showResetPassword() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('resetScreen').style.display = 'flex';
}

// Back to login from reset
function backToLogin() {
    document.getElementById('resetScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
}

// Show login screen as modal
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
}

// Show main application
function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('resetScreen').style.display = 'none';
}

// Login form submission
window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                await auth.signInWithEmailAndPassword(email, password);
                showNotification('Login successful!', 'success');
                document.getElementById('loginScreen').style.display = 'none';
                
                // Force refresh user data after a short delay
                setTimeout(() => {
                    if (currentUser) {
                        console.log('Force refreshing user profile after login');
                        loadUserProfile();
                    }
                }, 500);
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }
});

// Signup form submission
window.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const course = document.getElementById('signupCourse').value;
            const password = document.getElementById('signupPassword').value;
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Check if database is ready
            if (typeof database === 'undefined' || !database) {
                showNotification('Database not ready yet. Please wait a moment and try again.', 'error');
                console.error('❌ Signup failed: Database not ready');
                return;
            }
            
            try {
                console.log('📝 Creating user account for:', email);
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;
                
                console.log('✅ User account created:', user.uid);
                console.log('💾 Creating user profile in database...');
                
                // Create user profile in database
                await database.ref('users/' + user.uid).set({
                    name: name,
                    email: email,
                    course: course,
                    xp: 0,
                    level: 1,
                    badges: [],
                    completedTopics: [],
                    joinedDate: Date.now(),
                    lastLoginDate: Date.now(),
                    streak: 0
                });
                
                console.log('✅✅ User profile created in database!');
                showNotification('Account created successfully!', 'success');
                document.getElementById('loginScreen').style.display = 'none';
                
                // Force refresh profile
                setTimeout(() => {
                    console.log('🔄 Loading new user profile...');
                    loadUserProfile();
                }, 500);
            } catch (error) {
                console.error('❌ Signup error:', error);
                showNotification(error.message, 'error');
            }
        });
    }
});

// Password reset form submission
window.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    if (resetForm) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('resetEmail').value;
            
            try {
                await auth.sendPasswordResetEmail(email);
                showNotification('Password reset email sent! Check your inbox.', 'success');
                backToLogin();
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }
});

// Logout function
async function logout() {
    try {
        await auth.signOut();
        showNotification('Logged out successfully', 'success');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Load user profile
async function loadUserProfile() {
    console.log('👤 loadUserProfile called');
    
    if (!currentUser) {
        console.log('⚠️ loadUserProfile: No current user');
        return;
    }
    
    // Check if database is available
    if (typeof database === 'undefined' || !database) {
        console.error('❌ loadUserProfile: Database not available yet!');
        // Wait a bit and retry
        setTimeout(() => {
            console.log('🔄 Retrying loadUserProfile...');
            loadUserProfile();
        }, 1000);
        return;
    }
    
    console.log('📊 Loading profile for user:', currentUser.uid);
    
    // Hide guest notice
    const guestNotice = document.getElementById('guestNotice');
    if (guestNotice) {
        guestNotice.style.display = 'none';
        console.log('✅ Guest notice hidden');
    }
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        
        console.log('📋 User data received:', userData ? 'Data found' : 'No data');
        
        if (userData) {
            // Update UI elements safely
            const userNameEl = document.getElementById('userName');
            const dashboardNameEl = document.getElementById('dashboardUserName');
            const profileNameEl = document.getElementById('profileName');
            const profileEmailEl = document.getElementById('profileEmail');
            const profileCourseEl = document.getElementById('profileCourse');
            
            if (userNameEl) {
                userNameEl.textContent = userData.name || 'User';
                console.log('✅ Updated userName to:', userData.name);
            }
            if (dashboardNameEl) {
                dashboardNameEl.textContent = userData.name || 'User';
                console.log('✅ Updated dashboardUserName to:', userData.name);
            }
            if (profileNameEl) profileNameEl.textContent = userData.name || 'User';
            if (profileEmailEl) profileEmailEl.textContent = userData.email || '';
            if (profileCourseEl) profileCourseEl.textContent = 'Course: ' + (userData.course || 'Not selected');
            
            // Update level and XP
            updateLevelAndXP(userData.xp || 0, userData.level || 1);
            console.log('✅ Updated level and XP');
            
            // Update stats
            const totalXPEl = document.getElementById('totalXP');
            const completedTopicsEl = document.getElementById('completedTopics');
            const streakDaysEl = document.getElementById('streakDays');
            const quizzesTakenEl = document.getElementById('quizzesTaken');
            const avgAccuracyEl = document.getElementById('avgAccuracy');
            
            if (totalXPEl) totalXPEl.textContent = userData.xp || 0;
            if (completedTopicsEl) completedTopicsEl.textContent = userData.completedTopics ? userData.completedTopics.length : 0;
            if (streakDaysEl) streakDaysEl.textContent = userData.streak || 0;
            
            // Update quiz stats
            const quizzesTaken = userData.quizzesTaken || 0;
            const totalQuizScore = userData.totalQuizScore || 0;
            const avgAccuracy = quizzesTaken > 0 ? Math.round(totalQuizScore / quizzesTaken) : 0;
            
            if (quizzesTakenEl) quizzesTakenEl.textContent = quizzesTaken;
            if (avgAccuracyEl) avgAccuracyEl.textContent = avgAccuracy + '%';
            
            console.log('📊 Stats updated:', {
                xp: userData.xp || 0,
                completedTopics: userData.completedTopics ? userData.completedTopics.length : 0,
                streak: userData.streak || 0,
                quizzes: quizzesTaken,
                accuracy: avgAccuracy
            });
            
            // Update badges count in profile
            const profileBadgesEl = document.getElementById('profileBadges');
            if (profileBadgesEl) profileBadgesEl.textContent = userData.badges ? userData.badges.length : 0;
            
            // Set course selector
            const courseSelect = document.getElementById('courseSelect');
            if (courseSelect && userData.course) {
                courseSelect.value = userData.course;
                // Only load roadmap if we're on that section
                if (typeof loadRoadmap === 'function') {
                    loadRoadmap();
                }
            }
            
            console.log('✅✅✅ Profile loaded successfully!');
        } else {
            console.error('❌ No user data found in database for:', currentUser.uid);
            showNotification('Profile data not found. Creating new profile...', 'warning');
            
            // Create new user profile if it doesn't exist
            await database.ref('users/' + currentUser.uid).set({
                name: currentUser.email.split('@')[0],
                email: currentUser.email,
                course: 'BCA',
                xp: 0,
                level: 1,
                badges: [],
                completedTopics: [],
                quizzesTaken: 0,
                totalQuizScore: 0,
                perfectQuizzes: 0,
                joinedDate: Date.now(),
                lastLoginDate: Date.now(),
                streak: 0
            });
            
            console.log('✅ New user profile created');
            showNotification('Welcome to Learnify! Your learning journey begins now! 🎉', 'success');
            
            // Initialize dashboard with default stats
            updateLevelAndXP(0, 1);
            const totalXPEl = document.getElementById('totalXP');
            const completedTopicsEl = document.getElementById('completedTopics');
            const quizzesTakenEl = document.getElementById('quizzesTaken');
            const avgAccuracyEl = document.getElementById('avgAccuracy');
            const streakDaysEl = document.getElementById('streakDays');
            
            if (totalXPEl) totalXPEl.textContent = '0';
            if (completedTopicsEl) completedTopicsEl.textContent = '0';
            if (quizzesTakenEl) quizzesTakenEl.textContent = '0';
            if (avgAccuracyEl) avgAccuracyEl.textContent = '0%';
            if (streakDaysEl) streakDaysEl.textContent = '0';
            
            // Update user name displays
            const userNameEl = document.getElementById('userName');
            const dashboardNameEl = document.getElementById('dashboardUserName');
            const newUserName = currentUser.email.split('@')[0];
            
            if (userNameEl) userNameEl.textContent = newUserName;
            if (dashboardNameEl) dashboardNameEl.textContent = newUserName;
            
            // Load dashboard for new user
            if (typeof updateDashboardStats === 'function') {
                setTimeout(() => updateDashboardStats(), 500);
            }
            
            // Reload profile after a short delay
            setTimeout(() => loadUserProfile(), 1000);
        }
    } catch (error) {
        console.error('❌ Error loading user profile:', error);
        showNotification('Error loading profile data: ' + error.message, 'error');
    }
}

// Update level and XP display
function updateLevelAndXP(xp, level) {
    const xpForNextLevel = level * APP_CONFIG.levelXpRequirement;
    const currentLevelXP = xp % APP_CONFIG.levelXpRequirement;
    const progress = (currentLevelXP / APP_CONFIG.levelXpRequirement) * 100;
    
    const userLevelEl = document.getElementById('userLevel');
    const profileLevelEl = document.getElementById('profileLevel');
    const profileXPEl = document.getElementById('profileXP');
    const xpTextEl = document.getElementById('xpText');
    const xpProgressEl = document.getElementById('xpProgress');
    
    if (userLevelEl) userLevelEl.textContent = `Level ${level}`;
    if (profileLevelEl) profileLevelEl.textContent = `Level ${level}`;
    if (profileXPEl) profileXPEl.textContent = xp;
    if (xpTextEl) xpTextEl.textContent = `${currentLevelXP} / ${APP_CONFIG.levelXpRequirement}`;
    if (xpProgressEl) xpProgressEl.style.width = progress + '%';
}

// Show profile modal
function showProfile() {
    document.getElementById('profileModal').style.display = 'block';
}

// Close profile modal
function closeProfile() {
    document.getElementById('profileModal').style.display = 'none';
}

// Profile update form
window.addEventListener('DOMContentLoaded', () => {
    const profileUpdateForm = document.getElementById('profileUpdateForm');
    if (profileUpdateForm) {
        profileUpdateForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!currentUser) return;
            
            const name = document.getElementById('updateName').value;
            const course = document.getElementById('updateCourse').value;
            
            const updates = {};
            if (name) updates.name = name;
            if (course) updates.course = course;
            
            try {
                await database.ref('users/' + currentUser.uid).update(updates);
                showNotification('Profile updated successfully!', 'success');
                loadUserProfile();
                closeProfile();
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }
});

// Initialize daily streak
async function initializeDailyStreak() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        
        if (!userData) return;
        
        const lastLogin = userData.lastLoginDate || 0;
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        
        const daysSinceLastLogin = Math.floor((now - lastLogin) / oneDayMs);
        
        let newStreak = userData.streak || 0;
        let xpBonus = 0;
        
        if (daysSinceLastLogin === 1) {
            // Consecutive day - increase streak
            newStreak++;
            xpBonus = APP_CONFIG.xpForDailyStreak;
        } else if (daysSinceLastLogin > 1) {
            // Streak broken - reset
            newStreak = 1;
        }
        // If daysSinceLastLogin === 0, user already logged in today
        
        await database.ref('users/' + currentUser.uid).update({
            lastLoginDate: now,
            streak: newStreak,
            xp: (userData.xp || 0) + xpBonus
        });
        
        if (xpBonus > 0) {
            showNotification(`Daily streak! +${xpBonus} XP`, 'success');
            // Refresh profile to show updated XP
            setTimeout(() => loadUserProfile(), 500);
        }
    } catch (error) {
        console.error('Error updating streak:', error);
    }
}

// Load daily motivational quote
function loadDailyQuote() {
    const quotes = APP_CONFIG.motivationalQuotes;
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;
    
    document.getElementById('dailyQuote').textContent = quotes[quoteIndex];
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '10px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s';
    notification.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#6366f1';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Toggle password visibility
function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
