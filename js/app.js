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
    
    // Special handling for CGPA calculator - open in full screen modal
    if (sectionName === 'cgpa-calculator') {
        openCGPAModal();
        // Keep the section active in the background but show modal on top
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            hideSidebarAndShowContent();
        }
        return;
    }
    
    // Close sidebar on mobile after selecting any section and show full screen content
    if (window.innerWidth <= 768) {
        hideSidebarAndShowContent();
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
            // Add a slight delay to ensure smooth transition
            setTimeout(() => {
                if (overlay) overlay.style.opacity = '1';
            }, 10);
        } else {
            document.body.style.overflow = '';
            if (overlay) overlay.style.opacity = '0';
        }
    }
}

// Hide sidebar and show full screen content (new mobile behavior)
function hideSidebarAndShowContent() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    // Hide sidebar
    sidebar.classList.remove('active');
    
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.opacity = '0';
    }
    
    // Prevent body scroll
    document.body.style.overflow = '';
    
    // Update menu toggle icon
    const menuToggles = document.querySelectorAll('.menu-toggle');
    menuToggles.forEach(menuToggle => {
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    });
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

// Close sidebar when clicking outside or selecting an item (mobile)
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth <= 768) {
        // Close sidebar when clicking nav item
        if (e.target.closest('.nav-item')) {
            hideSidebarAndShowContent();
        }
        // Close sidebar when clicking overlay
        else if (e.target === overlay) {
            hideSidebarAndShowContent();
        }
        // Don't close when clicking inside sidebar or menu toggle
        else if (!sidebar.contains(e.target) && !menuToggle?.contains(e.target)) {
            if (sidebar.classList.contains('active')) {
                hideSidebarAndShowContent();
            }
        }
    }
});

// Add touch swipe support for mobile sidebar
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Swipe right to open sidebar (only on mobile)
    if (window.innerWidth <= 768 && touchEndX - touchStartX > 50) {
        if (!sidebar.classList.contains('active')) {
            sidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Change menu icon
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-times';
            }
        }
    }
    // Swipe left to close sidebar (only on mobile)
    else if (window.innerWidth <= 768 && touchStartX - touchEndX > 50) {
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

// Handle window resize
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // If window is resized to desktop size, ensure sidebar is visible and overlay is hidden
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.style.opacity = '';
        }
        document.body.style.overflow = '';
        
        // Reset menu icon
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
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
        
        // Close sidebar on mobile
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        }
    }
});