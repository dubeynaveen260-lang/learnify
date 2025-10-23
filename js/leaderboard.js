// Leaderboard Module
// Displays rankings and competitive features

let currentLeaderboardFilter = 'global';

// Filter leaderboard
function filterLeaderboard(filter) {
    currentLeaderboardFilter = filter;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Load leaderboard with filter
    loadLeaderboard();
}

// Load and display leaderboard
async function loadLeaderboard() {
    const leaderboardContainer = document.getElementById('leaderboardContainer');
    if (!leaderboardContainer) return;
    
    // Check if Firebase database is ready
    if (!window.database) {
        console.error('Firebase database not initialized');
        leaderboardContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--warning-color);">⏳ Loading Firebase... Please wait</p>';
        
        // Wait for Firebase to initialize
        window.addEventListener('firebase-ready', function() {
            loadLeaderboard();
        }, { once: true });
        return;
    }
    
    leaderboardContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Loading leaderboard...</p>';
    
    try {
        const snapshot = await database.ref('users').orderByChild('xp').once('value');
        let users = [];
        
        snapshot.forEach(childSnapshot => {
            const userData = childSnapshot.val();
            users.push({
                uid: childSnapshot.key,
                name: userData.name || 'Anonymous',
                course: userData.course || 'N/A',
                xp: userData.xp || 0,
                level: userData.level || 1,
                badges: userData.badges || [],
                completedTopics: userData.completedTopics || []
            });
        });
        
        // Sort by XP (descending)
        users.sort((a, b) => b.xp - a.xp);
        
        // Apply filters
        if (currentLeaderboardFilter === 'course' && currentUser) {
            const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
            const userCourse = userSnapshot.val()?.course;
            if (userCourse) {
                users = users.filter(user => user.course === userCourse);
            }
        } else if (currentLeaderboardFilter === 'month') {
            // For monthly leaderboard, we'd need to track monthly XP
            // For now, show top performers
            users = users.slice(0, 20);
        }
        
        // Display leaderboard
        if (users.length === 0) {
            leaderboardContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No users found. Be the first to earn XP!</p>';
            return;
        }
        
        leaderboardContainer.innerHTML = users.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = currentUser && user.uid === currentUser.uid;
            
            let rankClass = '';
            let medal = '';
            if (rank === 1) {
                rankClass = 'top-1';
                medal = '🥇';
            } else if (rank === 2) {
                rankClass = 'top-2';
                medal = '🥈';
            } else if (rank === 3) {
                rankClass = 'top-3';
                medal = '🥉';
            }
            
            return `
                <div class="leaderboard-item ${isCurrentUser ? 'current-user' : ''}" style="${isCurrentUser ? 'background: var(--card-bg); border: 2px solid var(--primary-color);' : ''}">
                    <div class="rank ${rankClass}">${medal || rank}</div>
                    <div class="user-avatar" style="width: 50px; height: 50px;">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="leaderboard-user-info" style="flex: 1;">
                        <div style="font-weight: 600; margin-bottom: 5px;">
                            ${user.name} ${isCurrentUser ? '(You)' : ''}
                        </div>
                        <div style="font-size: 13px; color: var(--text-secondary);">
                            ${user.course} • Level ${user.level} • ${user.completedTopics.length} topics
                        </div>
                    </div>
                    <div class="leaderboard-xp" style="text-align: right;">
                        <div style="font-size: 24px; font-weight: bold; color: var(--primary-color);">
                            ${user.xp}
                        </div>
                        <div style="font-size: 12px; color: var(--text-secondary);">
                            XP
                        </div>
                    </div>
                    <div class="leaderboard-badges" style="margin-left: 20px;">
                        <i class="fas fa-award" style="color: var(--warning-color); margin-right: 5px;"></i>
                        ${user.badges.length}
                    </div>
                </div>
            `;
        }).join('');
        
        // Check for top learner badge
        if (currentUser && users.findIndex(u => u.uid === currentUser.uid) < 10) {
            checkTopLearnerBadge();
        }
        
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        console.error('Error details:', error.code, error.message);
        
        let errorMessage = '⚠️ Error loading leaderboard';
        let errorDetails = '';
        
        // Provide specific error guidance
        if (error.code === 'PERMISSION_DENIED') {
            errorMessage = '🔒 Permission Denied';
            errorDetails = 'Database rules need to be updated. See FIX_LEADERBOARD.md for instructions.';
        } else if (error.message && error.message.includes('network')) {
            errorMessage = '🌐 Network Error';
            errorDetails = 'Please check your internet connection.';
        } else if (error.message && error.message.includes('auth')) {
            errorMessage = '🔑 Authentication Error';
            errorDetails = 'Please log out and log back in.';
        } else {
            errorDetails = 'Please check your internet connection and try again.';
        }
        
        leaderboardContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="color: var(--danger-color); margin-bottom: 10px; font-size: 18px;">${errorMessage}</p>
                <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">${errorDetails}</p>
                ${error.code === 'PERMISSION_DENIED' ? `
                    <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 15px; margin: 20px auto; max-width: 500px; text-align: left;">
                        <strong style="color: #856404;">💡 Quick Fix:</strong>
                        <ol style="color: #856404; margin: 10px 0; padding-left: 20px;">
                            <li>Go to <a href="https://console.firebase.google.com/" target="_blank" style="color: #6366f1;">Firebase Console</a></li>
                            <li>Select your project → Realtime Database → Rules</li>
                            <li>Update rules to allow authenticated users to read leaderboard data</li>
                            <li>See <strong>FIX_LEADERBOARD.md</strong> for detailed instructions</li>
                        </ol>
                    </div>
                ` : ''}
                <button onclick="loadLeaderboard()" class="btn-primary" style="margin-top: 20px; display: inline-block;">🔄 Retry</button>
            </div>
        `;
    }
}

// Check and award top learner badge
async function checkTopLearnerBadge() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        const badges = userData.badges || [];
        
        if (!badges.includes('top-learner')) {
            badges.push('top-learner');
            await database.ref('users/' + currentUser.uid + '/badges').set(badges);
            showNotification('🏆 New Badge: Top Learner!', 'success');
        }
    } catch (error) {
        console.error('Error checking top learner badge:', error);
    }
}

// Add CSS for leaderboard
const leaderboardStyle = document.createElement('style');
leaderboardStyle.textContent = `
    .leaderboard-user-info {
        flex: 1;
    }
    
    .current-user {
        animation: highlightPulse 2s infinite;
    }
    
    @keyframes highlightPulse {
        0%, 100% { box-shadow: 0 0 0 rgba(99, 102, 241, 0); }
        50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
    }
`;
document.head.appendChild(leaderboardStyle);

// Load leaderboard when section is shown
window.addEventListener('load', () => {
    if (currentUser) {
        setTimeout(loadLeaderboard, 2500);
    }
});
