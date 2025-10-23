// Main App Module
// Handles navigation, section switching, and overall app coordination

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (event && event.target) {
        event.target.closest('.nav-item').classList.add('active');
    }
    
    // Check if login required for certain sections
    const loginRequiredSections = ['quizzes', 'community', 'achievements'];
    if (loginRequiredSections.includes(sectionName) && !currentUser) {
        showNotification('Please login to access this feature', 'info');
        setTimeout(() => {
            document.getElementById('loginScreen').style.display = 'flex';
        }, 1000);
    }
    
    // Load section-specific data
    switch(sectionName) {
        case 'dashboard':
            if (typeof updateDashboardStats === 'function') {
                setTimeout(() => updateDashboardStats(), 200);
            }
            break;
        case 'roadmap':
            if (typeof loadRoadmap === 'function') {
                loadRoadmap();
            }
            break;
        case 'leaderboard':
            if (typeof loadLeaderboard === 'function') {
                loadLeaderboard();
            }
            break;
        case 'achievements':
            if (typeof loadAchievements === 'function') {
                loadAchievements();
            }
            break;
        case 'community':
            if (typeof loadDiscussions === 'function') {
                if (currentCommunityTab === 'discussions') loadDiscussions();
                else if (currentCommunityTab === 'qa') loadQuestions();
                else if (currentCommunityTab === 'groups') loadStudyGroups();
            }
            break;
        case 'quizzes':
            if (typeof loadQuizHistory === 'function') {
                loadQuizHistory();
            }
            break;
    }
}

// Toggle sidebar (for mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    sidebar.classList.toggle('active');
    
    if (overlay) {
        overlay.classList.toggle('active');
    }
    
    // Add visual feedback to menu toggle
    if (menuToggle) {
        const icon = menuToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
    
    // Prevent body scroll when sidebar is open on mobile
    if (window.innerWidth <= 768) {
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Toggle dark/light theme
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
}

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth <= 768) {
        // Close sidebar when clicking nav item
        if (e.target.closest('.nav-item')) {
            sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset menu icon
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        }
        // Don't close when clicking inside sidebar or menu toggle
        else if (!sidebar.contains(e.target) && !menuToggle?.contains(e.target)) {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset menu icon
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        }
    }
});

// Initialize app
function initializeApp() {
    console.log('Learnify initialized');
    
    // Load saved theme
    loadSavedTheme();
    
    // Check authentication state
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('User authenticated:', user.email);
        } else {
            console.log('No user authenticated');
        }
    });
}

// Resources section functionality is now handled in resources.js
// Removed duplicate loadResources() and filterResources() functions

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + D = Dashboard
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        showSection('dashboard');
    }
    
    // Alt + R = Roadmap
    if (e.altKey && e.key === 'r') {
        e.preventDefault();
        showSection('roadmap');
    }
    
    // Alt + A = AI Assistant
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        showSection('ai-assistant');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset menu icon
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    }
});

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable offline support
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// Export user data (for backup)
async function exportUserData() {
    if (!currentUser) {
        showNotification('Please login first', 'error');
        return;
    }
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'learnify-data-backup.json';
        link.click();
        
        showNotification('Data exported successfully!', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showNotification('Error exporting data', 'error');
    }
}

// Print progress report
function printProgressReport() {
    window.print();
}

// Share progress on social media
function shareProgress() {
    if (!currentUser) return;
    
    database.ref('users/' + currentUser.uid).once('value').then(snapshot => {
        const userData = snapshot.val();
        const shareText = `I'm learning on Learnify! 🎓\nLevel ${userData.level} | ${userData.xp} XP | ${userData.completedTopics ? userData.completedTopics.length : 0} topics completed!\n\nJoin me at: [Your Website URL]`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Progress copied to clipboard! Share it anywhere!', 'success');
        });
    });
}

// Initialize app
window.addEventListener('load', () => {
    initializeApp();
});

// Add print styles
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .sidebar, .top-bar, .btn-primary, button {
            display: none !important;
        }
        
        .main-content {
            margin-left: 0 !important;
            padding-top: 0 !important;
        }
        
        .content-section {
            display: block !important;
        }
    }
`;
document.head.appendChild(printStyle);

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.duration}ms`);
    }
});

// Uncomment to enable performance monitoring
// perfObserver.observe({ entryTypes: ['measure', 'navigation'] });

// Console welcome message
console.log('%c Welcome to Learnify! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Built with ❤️ for learners everywhere', 'color: #6366f1; font-size: 14px;');
console.log('%c Tip: Press Alt+D for Dashboard, Alt+R for Roadmap, Alt+A for AI Assistant', 'color: #a0a0b0; font-size: 12px;');
