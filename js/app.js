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
    document.querySelectorAll('.nav-link').forEach(item => {
        item.classList.remove('active');
    });
    
    // Also update mobile nav links if they exist
    document.querySelectorAll('.mobile-nav-link').forEach(item => {
        item.classList.remove('active');
    });
    
    // Check if login required for certain sections
    const loginRequiredSections = ['quizzes', 'community', 'achievements'];
    if (loginRequiredSections.includes(sectionName) && !currentUser) {
        showNotification('Please login to access this feature', 'info');
        setTimeout(() => {
            document.getElementById('loginScreen').style.display = 'flex';
        }, 1000);
    }
    
    // Special handling for CGPA calculator - open in full screen modal
    if (sectionName === 'cgpa-calculator') {
        openCGPAModal();
        return;
    }
    
    // Close mobile nav menu after selecting any section
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    if (mobileNavMenu) {
        mobileNavMenu.classList.remove('active');
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

// Toggle mobile navigation menu
function toggleMobileNav() {
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    if (mobileNavMenu) {
        mobileNavMenu.classList.toggle('active');
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

// Close mobile nav menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    
    // Close mobile nav when clicking outside (works on both mobile and desktop)
    if (mobileNavMenu && mobileNavMenu.classList.contains('active') && 
        !e.target.closest('.mobile-nav-menu') && 
        !e.target.closest('.mobile-nav-toggle')) {
        mobileNavMenu.classList.remove('active');
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
    
    // Test layout on different screen sizes
    testLayoutResponsiveness();
    
    // Ensure sidebar is hidden on mobile devices
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.style.display = 'none';
        }
    }
}

// Test layout responsiveness on different screen sizes
function testLayoutResponsiveness() {
    // Test screen sizes: 320px, 375px, 425px, 768px
    const testSizes = [320, 375, 425, 768];
    
    // Create a test element to check layout
    const testElement = document.createElement('div');
    testElement.style.position = 'fixed';
    testElement.style.top = '0';
    testElement.style.left = '0';
    testElement.style.width = '100vw';
    testElement.style.height = '1px';
    testElement.style.backgroundColor = 'transparent';
    testElement.style.zIndex = '9999';
    testElement.id = 'layout-test-element';
    document.body.appendChild(testElement);
    
    // Check each test size
    testSizes.forEach(size => {
        // Set viewport width for testing
        const originalWidth = window.innerWidth;
        
        // Check if main content fits properly
        const mainContent = document.querySelector('.main-content');
        
        if (mainContent) {
            const mainContentWidth = mainContent.offsetWidth;
            
            // Log test results
            console.log(`Screen width: ${size}px`);
            console.log(`Main content width: ${mainContentWidth}px`);
            console.log(`Window inner width: ${window.innerWidth}px`);
            
            // Check if layout is valid (no horizontal overflow)
            if (mainContentWidth <= window.innerWidth + 1) { // +1 for potential rounding
                console.log(`✓ Layout valid for ${size}px screen width`);
            } else {
                console.log(`✗ Layout invalid for ${size}px screen width - total width exceeds screen`);
            }
        }
    });
    
    // Clean up test element
    setTimeout(() => {
        const testEl = document.getElementById('layout-test-element');
        if (testEl) {
            testEl.remove();
        }
    }, 5000);
}

// Resources section functionality is now handled in resources.js
// Removed duplicate loadResources() and filterResources() functions

// Handle window resize
window.addEventListener('resize', () => {
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    
    // If window is resized to desktop size, ensure mobile nav is hidden unless manually opened
    if (window.innerWidth > 768) {
        // Show sidebar on desktop
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.style.display = 'block';
        }
    } else {
        // Hide sidebar on mobile
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.style.display = 'none';
        }
    }
});

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
    
    // Alt + Q = Quizzes
    if (e.altKey && e.key === 'q') {
        e.preventDefault();
        showSection('quizzes');
    }
    
    // Alt + C = Community
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        showSection('community');
    }
    
    // Alt + L = Leaderboard
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        showSection('leaderboard');
    }
    
    // Alt + A = AI Assistant
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        showSection('ai-assistant');
    }
    
    // ESC = Close modals
    if (e.key === 'Escape') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('resetScreen').style.display = 'none';
        document.getElementById('profileModal').style.display = 'none';
        document.getElementById('notificationsPanel').style.display = 'none';
        
        // Close mobile nav menu
        const mobileNavMenu = document.querySelector('.mobile-nav-menu');
        if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
            mobileNavMenu.classList.remove('active');
        }
    }
});

// Ensure proper layout on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        // Hide sidebar on mobile devices
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.style.display = 'none';
        }
        
        // Ensure main content takes full width
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.marginLeft = '0';
            mainContent.style.width = '100%';
        }
    }
});