// Gamification Module
// Handles XP, levels, badges, and achievements

// Badge definitions
const BADGES = {
    'first-topic': {
        name: 'First Steps',
        description: 'Complete your first topic',
        icon: '🎯',
        color: '#3b82f6'
    },
    'ten-topics': {
        name: 'Rising Star',
        description: 'Complete 10 topics',
        icon: '⭐',
        color: '#f59e0b'
    },
    'fifty-topics': {
        name: 'Knowledge Seeker',
        description: 'Complete 50 topics',
        icon: '📚',
        color: '#8b5cf6'
    },
    'hundred-topics': {
        name: 'Master Learner',
        description: 'Complete 100 topics',
        icon: '👑',
        color: '#ffd700'
    },
    'level-5': {
        name: 'Expert Learner',
        description: 'Reach Level 5',
        icon: '🏆',
        color: '#10b981'
    },
    'level-10': {
        name: 'Legendary Scholar',
        description: 'Reach Level 10',
        icon: '💎',
        color: '#06b6d4'
    },
    'streak-7': {
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        color: '#ef4444'
    },
    'streak-30': {
        name: 'Dedication Master',
        description: 'Maintain a 30-day streak',
        icon: '⚡',
        color: '#f97316'
    },
    'first-quiz': {
        name: 'Quiz Novice',
        description: 'Complete your first quiz',
        icon: '📝',
        color: '#6366f1'
    },
    'quiz-master': {
        name: 'Quiz Master',
        description: 'Score 100% on 5 quizzes',
        icon: '🎓',
        color: '#ec4899'
    },
    'community-helper': {
        name: 'Community Helper',
        description: 'Help 10 peers in discussions',
        icon: '🤝',
        color: '#14b8a6'
    },
    'top-learner': {
        name: 'Top Learner',
        description: 'Reach top 10 on leaderboard',
        icon: '🥇',
        color: '#fbbf24'
    }
};

// Load and display all badges/achievements
async function loadAchievements() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        const userBadges = userData.badges || [];
        
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;
        
        achievementsGrid.innerHTML = '';
        
        // Display all possible badges
        Object.keys(BADGES).forEach(badgeId => {
            const badge = BADGES[badgeId];
            const isUnlocked = userBadges.includes(badgeId);
            
            const badgeCard = document.createElement('div');
            badgeCard.className = `badge-card ${isUnlocked ? '' : 'locked'}`;
            
            badgeCard.innerHTML = `
                <div class="badge-icon" style="color: ${badge.color}">
                    ${badge.icon}
                </div>
                <h4>${badge.name}</h4>
                <p>${badge.description}</p>
                ${isUnlocked ? '<span style="color: var(--success-color); font-weight: 600;">✓ Unlocked</span>' : '<span style="color: var(--text-secondary);">🔒 Locked</span>'}
            `;
            
            achievementsGrid.appendChild(badgeCard);
        });
        
        // Update profile badge count
        document.getElementById('profileBadges').textContent = userBadges.length;
        
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

// Award XP to user
async function awardXP(amount, reason) {
    if (!currentUser) return;
    
    try {
        const userRef = database.ref('users/' + currentUser.uid);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
        
        const currentXP = userData.xp || 0;
        const currentLevel = userData.level || 1;
        const newXP = currentXP + amount;
        const newLevel = Math.floor(newXP / APP_CONFIG.levelXpRequirement) + 1;
        
        await userRef.update({
            xp: newXP,
            level: newLevel
        });
        
        showNotification(`+${amount} XP: ${reason}`, 'success');
        
        if (newLevel > currentLevel) {
            showNotification(`🎉 Level Up! You're now Level ${newLevel}!`, 'success');
            checkAndAwardBadges();
        }
        
        loadUserProfile();
        
    } catch (error) {
        console.error('Error awarding XP:', error);
    }
}

// Check and award badges based on user progress
async function checkAndAwardBadges() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        const currentBadges = userData.badges || [];
        
        const completedTopics = userData.completedTopics ? userData.completedTopics.length : 0;
        const level = userData.level || 1;
        const streak = userData.streak || 0;
        const quizzesTaken = userData.quizzesTaken || 0;
        const perfectQuizzes = userData.perfectQuizzes || 0;
        
        const newBadges = [];
        
        // Check badge criteria
        const criteria = [
            { id: 'first-topic', condition: completedTopics >= 1 },
            { id: 'ten-topics', condition: completedTopics >= 10 },
            { id: 'fifty-topics', condition: completedTopics >= 50 },
            { id: 'hundred-topics', condition: completedTopics >= 100 },
            { id: 'level-5', condition: level >= 5 },
            { id: 'level-10', condition: level >= 10 },
            { id: 'streak-7', condition: streak >= 7 },
            { id: 'streak-30', condition: streak >= 30 },
            { id: 'first-quiz', condition: quizzesTaken >= 1 },
            { id: 'quiz-master', condition: perfectQuizzes >= 5 }
        ];
        
        criteria.forEach(({ id, condition }) => {
            if (condition && !currentBadges.includes(id)) {
                newBadges.push(id);
                const badge = BADGES[id];
                showNotification(`🏆 New Badge: ${badge.name}!`, 'success');
                
                // Award bonus XP for badges
                awardXP(25, 'Badge unlocked!');
            }
        });
        
        if (newBadges.length > 0) {
            await database.ref('users/' + currentUser.uid + '/badges').set([...currentBadges, ...newBadges]);
            loadAchievements();
        }
        
    } catch (error) {
        console.error('Error checking badges:', error);
    }
}

// Save weekly goal
async function saveWeeklyGoal() {
    if (!currentUser) return;
    
    const goalInput = document.getElementById('weeklyGoal');
    const goal = goalInput.value.trim();
    
    if (!goal) {
        showNotification('Please enter a goal', 'error');
        return;
    }
    
    try {
        await database.ref('users/' + currentUser.uid + '/weeklyGoal').set({
            goal: goal,
            setDate: Date.now()
        });
        
        showNotification('Weekly goal saved!', 'success');
        loadWeeklyGoal();
        goalInput.value = '';
        
    } catch (error) {
        showNotification('Error saving goal', 'error');
    }
}

// Load weekly goal
async function loadWeeklyGoal() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid + '/weeklyGoal').once('value');
        const goalData = snapshot.val();
        
        const currentGoalDiv = document.getElementById('currentGoal');
        if (!currentGoalDiv) return;
        
        if (goalData) {
            const setDate = new Date(goalData.setDate);
            currentGoalDiv.innerHTML = `
                <div style="background: var(--darker-bg); padding: 15px; border-radius: 10px; border-left: 4px solid var(--primary-color);">
                    <strong style="color: var(--primary-color);">Current Goal:</strong>
                    <p style="margin: 10px 0; font-size: 16px;">${goalData.goal}</p>
                    <small style="color: var(--text-secondary);">Set on ${setDate.toLocaleDateString()}</small>
                </div>
            `;
        } else {
            currentGoalDiv.innerHTML = '<p style="color: var(--text-secondary);">No goal set yet</p>';
        }
    } catch (error) {
        console.error('Error loading goal:', error);
    }
}

// Calculate user rank based on XP
async function getUserRank() {
    if (!currentUser) return null;
    
    try {
        const snapshot = await database.ref('users').orderByChild('xp').once('value');
        const users = [];
        
        snapshot.forEach(childSnapshot => {
            users.push({
                uid: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Sort by XP descending
        users.sort((a, b) => (b.xp || 0) - (a.xp || 0));
        
        // Find current user's rank
        const rank = users.findIndex(user => user.uid === currentUser.uid) + 1;
        
        return {
            rank: rank,
            totalUsers: users.length,
            percentile: Math.round((1 - (rank / users.length)) * 100)
        };
        
    } catch (error) {
        console.error('Error calculating rank:', error);
        return null;
    }
}

// Display progress chart
async function displayProgressChart() {
    const canvas = document.getElementById('progressChart');
    if (!canvas || !currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid + '/progressHistory').once('value');
        let progressData = snapshot.val() || {};
        
        // If no history, create sample data for the chart
        if (Object.keys(progressData).length === 0) {
            progressData = {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                topics: [2, 5, 8, 12],
                xp: [20, 50, 80, 120]
            };
        }
        
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if any
        if (window.progressChartInstance) {
            window.progressChartInstance.destroy();
        }
        
        window.progressChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: progressData.labels || ['Start'],
                datasets: [
                    {
                        label: 'Topics Completed',
                        data: progressData.topics || [0],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'XP Earned',
                        data: progressData.xp || [0],
                        borderColor: '#ec4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e0e0'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#a0a0b0'
                        },
                        grid: {
                            color: '#3a3a4e'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#a0a0b0'
                        },
                        grid: {
                            color: '#3a3a4e'
                        }
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Error displaying chart:', error);
    }
}

// Track daily progress for chart
async function trackDailyProgress() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        
        const today = new Date().toISOString().split('T')[0];
        const progressRef = database.ref(`users/${currentUser.uid}/dailyProgress/${today}`);
        
        await progressRef.set({
            topics: userData.completedTopics ? userData.completedTopics.length : 0,
            xp: userData.xp || 0,
            quizzes: userData.quizzesTaken || 0
        });
        
    } catch (error) {
        console.error('Error tracking progress:', error);
    }
}

// Initialize gamification features
window.addEventListener('load', () => {
    if (currentUser) {
        setTimeout(() => {
            loadAchievements();
            loadWeeklyGoal();
            displayProgressChart();
            trackDailyProgress();
        }, 1500);
    }
});

// Update progress chart when switching to dashboard
async function updateDashboardStats() {
    console.log('📊 Updating dashboard stats...');
    
    if (currentUser) {
        await displayProgressChart();
        await generateStudySuggestions();
        await updateQuizStats();
    } else {
        // Show sample data for guest users
        showGuestDashboard();
    }
}

// Generate personalized study suggestions
async function generateStudySuggestions() {
    const nextStepsDiv = document.getElementById('nextSteps');
    if (!nextStepsDiv || !currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        
        const completedTopics = userData.completedTopics ? userData.completedTopics.length : 0;
        const course = userData.course || 'BCA';
        const level = userData.level || 1;
        
        let suggestions = [];
        
        // Personalized suggestions based on progress
        if (completedTopics === 0) {
            suggestions = [
                { icon: 'fa-map', text: 'Start your learning journey by selecting a topic from your course roadmap' },
                { icon: 'fa-robot', text: 'Try the AI Assistant to get explanations on any topic' },
                { icon: 'fa-fire', text: 'Build a daily study streak to earn bonus XP!' }
            ];
        } else if (completedTopics < 5) {
            suggestions = [
                { icon: 'fa-chart-line', text: `Great start! Complete ${5 - completedTopics} more topics to earn the "Rising Star" badge` },
                { icon: 'fa-clipboard-question', text: 'Take a quiz to test your knowledge on completed topics' },
                { icon: 'fa-users', text: 'Join the community to ask questions and help others' }
            ];
        } else if (completedTopics < 10) {
            suggestions = [
                { icon: 'fa-trophy', text: 'You\'re making great progress! Keep completing topics to climb the leaderboard' },
                { icon: 'fa-award', text: `Only ${10 - completedTopics} more topics until you earn the "Rising Star" badge!` },
                { icon: 'fa-book-open', text: 'Review your completed topics and explore related resources' }
            ];
        } else {
            suggestions = [
                { icon: 'fa-star', text: `Excellent work! You've completed ${completedTopics} topics!` },
                { icon: 'fa-graduation-cap', text: 'Consider exploring advanced topics in your course' },
                { icon: 'fa-share-nodes', text: 'Share your progress with friends and motivate others!' }
            ];
        }
        
        // Add level-specific suggestion
        if (level >= 5) {
            suggestions.push({ icon: 'fa-crown', text: 'You\'re an Expert Learner! Help others in the community' });
        }
        
        // Render suggestions
        nextStepsDiv.innerHTML = suggestions.map(suggestion => `
            <div class="next-step-item">
                <i class="fas ${suggestion.icon}" style="color: var(--primary-color);"></i>
                <p>${suggestion.text}</p>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error generating suggestions:', error);
        nextStepsDiv.innerHTML = `
            <div class="next-step-item">
                <i class="fas fa-lightbulb"></i>
                <p>Start learning to get personalized suggestions!</p>
            </div>
        `;
    }
}

// Update quiz statistics
async function updateQuizStats() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        
        const quizzesTakenEl = document.getElementById('quizzesTaken');
        const avgAccuracyEl = document.getElementById('avgAccuracy');
        
        const quizzesTaken = userData.quizzesTaken || 0;
        const totalQuizScore = userData.totalQuizScore || 0;
        const avgAccuracy = quizzesTaken > 0 ? Math.round(totalQuizScore / quizzesTaken) : 0;
        
        if (quizzesTakenEl) quizzesTakenEl.textContent = quizzesTaken;
        if (avgAccuracyEl) avgAccuracyEl.textContent = avgAccuracy + '%';
        
    } catch (error) {
        console.error('Error updating quiz stats:', error);
    }
}

// Show guest user dashboard with sample data
function showGuestDashboard() {
    console.log('👤 Showing guest dashboard');
    
    const nextStepsDiv = document.getElementById('nextSteps');
    if (nextStepsDiv) {
        nextStepsDiv.innerHTML = `
            <div class="next-step-item">
                <i class="fas fa-user-plus" style="color: var(--primary-color);"></i>
                <p><strong>Create an account</strong> to track your progress, earn XP, and unlock badges!</p>
            </div>
            <div class="next-step-item">
                <i class="fas fa-map" style="color: var(--secondary-color);"></i>
                <p>Explore course roadmaps to see what you can learn</p>
            </div>
            <div class="next-step-item">
                <i class="fas fa-robot" style="color: var(--success-color);"></i>
                <p>Try the AI Assistant for instant help with any topic</p>
            </div>
        `;
    }
    
    // Show sample chart for guests
    const canvas = document.getElementById('progressChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        if (window.progressChartInstance) {
            window.progressChartInstance.destroy();
        }
        
        window.progressChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Sample Progress',
                        data: [5, 12, 20, 35],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e0e0e0'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Login to see your personal progress!',
                        color: '#a0a0b0'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#a0a0b0' },
                        grid: { color: '#3a3a4e' }
                    },
                    x: {
                        ticks: { color: '#a0a0b0' },
                        grid: { color: '#3a3a4e' }
                    }
                }
            }
        });
    }
}
