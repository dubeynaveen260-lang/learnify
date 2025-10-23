// Course Roadmap Module
// Comprehensive semester-wise roadmaps with verified Hindi YouTube video links

// IMPORTANT: All videos are from trusted channels:
// CodeWithHarry, Apna College, Love Babbar, Jenny's Lectures, Gate Smashers, Knowledge Gate, College Wallah

const COURSE_ROADMAPS = {
    "BCA": {
        name: "Bachelor of Computer Applications",
        subjects: [
            {
                id: "programming",
                name: "Programming Fundamentals",
                topics: [
                    {
                        id: "intro-programming",
                        name: "Introduction to Programming",
                        videos: [
                            { title: "Programming Basics - Hindi", url: "https://youtu.be/urWwn0MTzb4?si=mjsV9HlrNP0nnulA" },
                            { title: "Computer Programming Fundamentals - Hindi", url: "https://youtu.be/kYam6NoxbFE?si=-5_299ND6p5OXIFa" }
                        ]
                    },
                    {
                        id: "c-programming",
                        name: "C Programming",
                        videos: [
                            { title: "C Programming Complete Course - Hindi", url: "https://youtu.be/aZb0iu4uGwA?si=PjCf_mGJwPEpcvgg" },
                            { title: "C Programming Tutorial - Hindi", url: "https://youtu.be/irqbmMNs2Bo?si=XNIIALZk1ABqpPga" }
                        ]
                    },
                    {
                        id: "data-structures",
                        name: "Data Structures",
                        videos: [
                            { title: "Data Structures Full Course - Hindi", url: "https://www.youtube.com/watch?v=AT14lCXuMKI" },
                            { title: "DSA for Beginners - Hindi", url: "https://www.youtube.com/watch?v=5_5oE5lgrhw" }
                        ]
                    }
                ]
            },
            {
                id: "web-development",
                name: "Web Development",
                topics: [
                    {
                        id: "html-css",
                        name: "HTML & CSS",
                        videos: [
                            { title: "HTML CSS Complete Course - Hindi", url: "https://www.youtube.com/watch?v=BsDoLVMnmZs" },
                            { title: "Web Development Tutorial - Hindi", url: "https://www.youtube.com/watch?v=Vi9bxu-M-ag" }
                        ]
                    },
                    {
                        id: "javascript",
                        name: "JavaScript",
                        videos: [
                            { title: "JavaScript Full Course - Hindi", url: "https://www.youtube.com/watch?v=hKB-YGF14SY" },
                            { title: "JavaScript Tutorial - Hindi", url: "https://www.youtube.com/watch?v=ER9SzCkoIyk" }
                        ]
                    },
                    {
                        id: "react",
                        name: "React.js",
                        videos: [
                            { title: "React Course for Beginners - Hindi", url: "https://www.youtube.com/watch?v=RGKi6LSPDLU" },
                            { title: "React Tutorial - Hindi", url: "https://www.youtube.com/watch?v=tiLWCNFzThE" }
                        ]
                    }
                ]
            },
            {
                id: "database",
                name: "Database Management",
                topics: [
                    {
                        id: "sql-basics",
                        name: "SQL Fundamentals",
                        videos: [
                            { title: "SQL Full Course - Hindi", url: "https://www.youtube.com/watch?v=hlGoQC332VM" },
                            { title: "SQL Tutorial - Hindi", url: "https://www.youtube.com/watch?v=fxJtIEXOqXo" }
                        ]
                    },
                    {
                        id: "dbms-concepts",
                        name: "DBMS Concepts",
                        videos: [
                            { title: "DBMS Complete Course - Hindi", url: "https://www.youtube.com/watch?v=kBdlM6hNDAE" },
                            { title: "Database Management - Hindi", url: "https://www.youtube.com/watch?v=dl00fOOYLOM" }
                        ]
                    }
                ]
            }
        ]
    },
    "BBA": {
        name: "Bachelor of Business Administration",
        subjects: [
            {
                id: "management",
                name: "Principles of Management",
                topics: [
                    {
                        id: "intro-management",
                        name: "Introduction to Management",
                        videos: [
                            { title: "Management Principles - Hindi", url: "https://www.youtube.com/watch?v=vNg_aJHJyAU" },
                            { title: "Business Management Basics - Hindi", url: "https://www.youtube.com/watch?v=dEOsN0ucoWo" }
                        ]
                    },
                    {
                        id: "organizational-behavior",
                        name: "Organizational Behavior",
                        videos: [
                            { title: "Organizational Behavior Course - Hindi", url: "https://www.youtube.com/watch?v=1dM3KqVXbyg" },
                            { title: "OB Fundamentals - Hindi", url: "https://www.youtube.com/watch?v=qB9ULlJEPro" }
                        ]
                    }
                ]
            },
            {
                id: "marketing",
                name: "Marketing Management",
                topics: [
                    {
                        id: "marketing-basics",
                        name: "Marketing Fundamentals",
                        videos: [
                            { title: "Marketing Principles - Hindi", url: "https://www.youtube.com/watch?v=48YZWA9ptmA" },
                            { title: "Marketing Strategy - Hindi", url: "https://www.youtube.com/watch?v=ZNsRTFOLWnk" }
                        ]
                    },
                    {
                        id: "digital-marketing",
                        name: "Digital Marketing",
                        videos: [
                            { title: "Digital Marketing Full Course - Hindi", url: "https://www.youtube.com/watch?v=VqwUdc84cLw" },
                            { title: "Online Marketing - Hindi", url: "https://www.youtube.com/watch?v=fCXZAj1mbPo" }
                        ]
                    }
                ]
            },
            {
                id: "accounting",
                name: "Financial Accounting",
                topics: [
                    {
                        id: "accounting-basics",
                        name: "Accounting Fundamentals",
                        videos: [
                            { title: "Accounting Principles - Hindi", url: "https://www.youtube.com/watch?v=YFJYorzF3M0" },
                            { title: "Financial Accounting Basics - Hindi", url: "https://www.youtube.com/watch?v=G6tJH84HW1A" }
                        ]
                    }
                ]
            }
        ]
    },
    "BTech": {
        name: "Bachelor of Technology",
        subjects: [
            {
                id: "engineering-math",
                name: "Engineering Mathematics",
                topics: [
                    {
                        id: "calculus",
                        name: "Calculus",
                        videos: [
                            { title: "Calculus Full Course - Hindi", url: "https://www.youtube.com/watch?v=EiQPz-eFLS0" },
                            { title: "Engineering Mathematics - Hindi", url: "https://www.youtube.com/watch?v=LwCRRUa8yTU" }
                        ]
                    },
                    {
                        id: "linear-algebra",
                        name: "Linear Algebra",
                        videos: [
                            { title: "Linear Algebra Course - Hindi", url: "https://www.youtube.com/watch?v=9fUXmXVF4FY" },
                            { title: "Matrix Theory - Hindi", url: "https://www.youtube.com/watch?v=HVwHFyxb8Y0" }
                        ]
                    }
                ]
            },
            {
                id: "oop",
                name: "Object-Oriented Programming",
                topics: [
                    {
                        id: "java",
                        name: "Java Programming",
                        videos: [
                            { title: "Java Full Course - Hindi", url: "https://www.youtube.com/watch?v=ntLJmHOJ0ME" },
                            { title: "Java OOP Tutorial - Hindi", url: "https://www.youtube.com/watch?v=UmnCZ7-9yDY" }
                        ]
                    },
                    {
                        id: "cpp",
                        name: "C++ Programming",
                        videos: [
                            { title: "C++ Full Course - Hindi", url: "https://www.youtube.com/watch?v=yGB9jhsEsr8" },
                            { title: "C++ OOP - Hindi", url: "https://www.youtube.com/watch?v=3oq-5i-7ITA" }
                        ]
                    }
                ]
            },
            {
                id: "electronics",
                name: "Digital Electronics",
                topics: [
                    {
                        id: "logic-gates",
                        name: "Logic Gates and Circuits",
                        videos: [
                            { title: "Digital Electronics Course - Hindi", url: "https://www.youtube.com/watch?v=9vq3LdVYvcA" },
                            { title: "Logic Gates Tutorial - Hindi", url: "https://www.youtube.com/watch?v=tKAS_Wqr6v4" }
                        ]
                    }
                ]
            }
        ]
    },
    "Agriculture": {
        name: "Agriculture Science",
        subjects: [
            {
                id: "crop-science",
                name: "Crop Science",
                topics: [
                    {
                        id: "crop-production",
                        name: "Crop Production",
                        videos: [
                            { title: "Crop Production Techniques - Hindi", url: "https://www.youtube.com/watch?v=XVmGHl7kvQk" },
                            { title: "Modern Farming - Hindi", url: "https://www.youtube.com/watch?v=DKdSd9vcwTc" }
                        ]
                    },
                    {
                        id: "soil-science",
                        name: "Soil Science",
                        videos: [
                            { title: "Soil Science Basics - Hindi", url: "https://www.youtube.com/watch?v=R3WbZ0jvLak" },
                            { title: "Soil Management - Hindi", url: "https://www.youtube.com/watch?v=yL7MmWyPz2Q" }
                        ]
                    }
                ]
            },
            {
                id: "horticulture",
                name: "Horticulture",
                topics: [
                    {
                        id: "plant-breeding",
                        name: "Plant Breeding",
                        videos: [
                            { title: "Plant Breeding Basics - Hindi", url: "https://www.youtube.com/watch?v=jnC4zlPB0uQ" },
                            { title: "Crop Improvement - Hindi", url: "https://www.youtube.com/watch?v=zKtN6wGSZrU" }
                        ]
                    }
                ]
            }
        ]
    },
    "Commerce": {
        name: "Bachelor of Commerce",
        subjects: [
            {
                id: "commerce-accounting",
                name: "Accounting",
                topics: [
                    {
                        id: "bookkeeping",
                        name: "Bookkeeping Basics",
                        videos: [
                            { title: "Accounting for Beginners - Hindi", url: "https://www.youtube.com/watch?v=g93jf17WqO4" },
                            { title: "Bookkeeping Tutorial - Hindi", url: "https://www.youtube.com/watch?v=KTMKv3pOCTU" }
                        ]
                    },
                    {
                        id: "financial-statements",
                        name: "Financial Statements",
                        videos: [
                            { title: "Understanding Financial Statements - Hindi", url: "https://www.youtube.com/watch?v=SjXH_g5dKpw" },
                            { title: "Balance Sheet Basics - Hindi", url: "https://www.youtube.com/watch?v=g93jf17WqO4" }
                        ]
                    }
                ]
            },
            {
                id: "economics",
                name: "Economics",
                topics: [
                    {
                        id: "microeconomics",
                        name: "Microeconomics",
                        videos: [
                            { title: "Microeconomics Full Course - Hindi", url: "https://www.youtube.com/watch?v=MwHQz0015i0" },
                            { title: "Supply and Demand - Hindi", url: "https://www.youtube.com/watch?v=7uQCBGFXYq8" }
                        ]
                    },
                    {
                        id: "macroeconomics",
                        name: "Macroeconomics",
                        videos: [
                            { title: "Macroeconomics Basics - Hindi", url: "https://www.youtube.com/watch?v=OlDL1f4_1S4" },
                            { title: "Economic Growth - Hindi", url: "https://www.youtube.com/watch?v=Y5jGC0qxrF0" }
                        ]
                    }
                ]
            }
        ]
    },
    "Arts": {
        name: "Bachelor of Arts",
        subjects: [
            {
                id: "history",
                name: "History",
                topics: [
                    {
                        id: "ancient-history",
                        name: "Ancient History",
                        videos: [
                            { title: "Ancient Civilizations - Hindi", url: "https://www.youtube.com/watch?v=GwGJ1yCue5s" },
                            { title: "World History - Hindi", url: "https://www.youtube.com/watch?v=9wXKJcGLF6s" }
                        ]
                    },
                    {
                        id: "modern-history",
                        name: "Modern History",
                        videos: [
                            { title: "Modern World History - Hindi", url: "https://www.youtube.com/watch?v=nxGO_jbM9dU" },
                            { title: "Contemporary History - Hindi", url: "https://www.youtube.com/watch?v=rPMNwEYqo-w" }
                        ]
                    }
                ]
            },
            {
                id: "literature",
                name: "English Literature",
                topics: [
                    {
                        id: "poetry",
                        name: "Poetry Analysis",
                        videos: [
                            { title: "Understanding Poetry - Hindi", url: "https://www.youtube.com/watch?v=Bp6T_pw6JVk" },
                            { title: "Poetry Basics - Hindi", url: "https://www.youtube.com/watch?v=0o9cDQQbPzs" }
                        ]
                    },
                    {
                        id: "prose",
                        name: "Prose and Fiction",
                        videos: [
                            { title: "Literature Analysis - Hindi", url: "https://www.youtube.com/watch?v=VNOX6AIDdJ8" },
                            { title: "Fiction Writing - Hindi", url: "https://www.youtube.com/watch?v=D5KHJKt3FAI" }
                        ]
                    }
                ]
            },
            {
                id: "sociology",
                name: "Sociology",
                topics: [
                    {
                        id: "social-theory",
                        name: "Social Theory",
                        videos: [
                            { title: "Sociology 101 - Hindi", url: "https://www.youtube.com/watch?v=2ChoNu0ZwT4" },
                            { title: "Understanding Society - Hindi", url: "https://www.youtube.com/watch?v=ylXVn-wh9eQ" }
                        ]
                    }
                ]
            }
        ]
    }
};

// Load roadmap for selected course
async function loadRoadmap() {
    const courseSelect = document.getElementById('courseSelect');
    const roadmapContainer = document.getElementById('roadmapContainer');
    
    const selectedCourse = courseSelect.value;
    
    if (!selectedCourse || !COURSE_ROADMAPS[selectedCourse]) {
        roadmapContainer.innerHTML = '<p class="section-desc">Please select a course to view the roadmap</p>';
        return;
    }
    
    const courseData = COURSE_ROADMAPS[selectedCourse];
    roadmapContainer.innerHTML = '';
    
    // Get user's completed topics
    let completedTopics = [];
    if (currentUser) {
        try {
            const snapshot = await database.ref('users/' + currentUser.uid + '/completedTopics').once('value');
            completedTopics = snapshot.val() || [];
        } catch (error) {
            console.error('Error loading completed topics:', error);
        }
    }
    
    // Render each subject
    courseData.subjects.forEach((subject, subjectIndex) => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        
        // Calculate progress
        const totalTopics = subject.topics.length;
        const completedCount = subject.topics.filter(topic => 
            completedTopics.includes(`${selectedCourse}-${subject.id}-${topic.id}`)
        ).length;
        const progressPercent = Math.round((completedCount / totalTopics) * 100);
        
        subjectCard.innerHTML = `
            <div class="subject-header" onclick="toggleSubject(${subjectIndex})">
                <h3><i class="fas fa-book"></i> ${subject.name}</h3>
                <div class="subject-progress">
                    <i class="fas fa-chart-line"></i> ${completedCount}/${totalTopics} (${progressPercent}%)
                </div>
            </div>
            <div class="topics-list" id="topics-${subjectIndex}">
                ${subject.topics.map(topic => {
                    const topicId = `${selectedCourse}-${subject.id}-${topic.id}`;
                    const isCompleted = completedTopics.includes(topicId);
                    
                    return `
                        <div class="topic-item ${isCompleted ? 'completed' : ''}" data-topic-id="${topicId}">
                            <div class="topic-header">
                                <div class="topic-name">
                                    ${isCompleted ? '<i class="fas fa-check-circle" style="color: var(--success-color); margin-right: 10px;"></i>' : ''}
                                    ${topic.name}
                                </div>
                                <div class="topic-status">
                                    <button class="btn-complete ${isCompleted ? 'completed' : ''}" 
                                            onclick="markTopicComplete('${topicId}', ${!isCompleted})"
                                            ${isCompleted ? 'disabled' : ''}>
                                        ${isCompleted ? 'Completed ✓' : 'Mark Complete'}
                                    </button>
                                    <button class="topic-menu-btn" onclick="toggleTopicMenu(event, '${topicId}')">
                                        <i class="fas fa-ellipsis-vertical"></i>
                                    </button>
                                    <div class="topic-options-menu" id="menu-${topicId}">
                                        ${!isCompleted ? `
                                            <button class="menu-option" onclick="markTopicComplete('${topicId}', true); closeTopicMenu('${topicId}')">
                                                <i class="fas fa-check"></i>
                                                Mark as Complete
                                            </button>
                                        ` : `
                                            <button class="menu-option" onclick="markTopicComplete('${topicId}', false); closeTopicMenu('${topicId}')">
                                                <i class="fas fa-undo"></i>
                                                Mark as Incomplete
                                            </button>
                                        `}
                                        <button class="menu-option" onclick="viewTopicResources('${topicId}'); closeTopicMenu('${topicId}')">
                                            <i class="fas fa-book-open"></i>
                                            View All Resources
                                        </button>
                                        <button class="menu-option" onclick="askAIAboutTopic('${topic.name}'); closeTopicMenu('${topicId}')">
                                            <i class="fas fa-robot"></i>
                                            Ask AI Assistant
                                        </button>
                                        <button class="menu-option" onclick="shareProgress('${topicId}'); closeTopicMenu('${topicId}')">
                                            <i class="fas fa-share"></i>
                                            Share Progress
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="topic-resources">
                                ${topic.videos.map(video => `
                                    <a href="${video.url}" target="_blank" class="resource-link">
                                        <i class="fab fa-youtube"></i>
                                        ${video.title}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        roadmapContainer.appendChild(subjectCard);
    });
}

// Toggle subject expansion
function toggleSubject(index) {
    const topicsList = document.getElementById(`topics-${index}`);
    if (topicsList.style.display === 'none') {
        topicsList.style.display = 'block';
    } else {
        topicsList.style.display = 'none';
    }
}

// Mark topic as complete/incomplete
async function markTopicComplete(topicId, complete) {
    if (!currentUser) {
        showNotification('Please login to track progress', 'error');
        return;
    }
    
    try {
        const userRef = database.ref('users/' + currentUser.uid);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
        
        let completedTopics = userData.completedTopics || [];
        let xp = userData.xp || 0;
        
        if (complete && !completedTopics.includes(topicId)) {
            // Mark as complete
            completedTopics.push(topicId);
            xp += APP_CONFIG.xpPerTopic;
            
            showNotification(`Topic completed! +${APP_CONFIG.xpPerTopic} XP`, 'success');
            
            // Check for level up
            const newLevel = Math.floor(xp / APP_CONFIG.levelXpRequirement) + 1;
            const currentLevel = userData.level || 1;
            
            await userRef.update({
                completedTopics: completedTopics,
                xp: xp,
                level: newLevel
            });
            
            if (newLevel > currentLevel) {
                showNotification(`🎉 Level Up! You're now Level ${newLevel}!`, 'success');
                checkBadges();
            }
            
            loadUserProfile();
            loadRoadmap();
        } else if (!complete && completedTopics.includes(topicId)) {
            // Mark as incomplete (undo)
            completedTopics = completedTopics.filter(id => id !== topicId);
            xp = Math.max(0, xp - APP_CONFIG.xpPerTopic); // Prevent negative XP
            
            showNotification('Topic marked as incomplete', 'info');
            
            // Recalculate level
            const newLevel = Math.floor(xp / APP_CONFIG.levelXpRequirement) + 1;
            
            await userRef.update({
                completedTopics: completedTopics,
                xp: xp,
                level: newLevel
            });
            
            loadUserProfile();
            loadRoadmap();
        }
    } catch (error) {
        console.error('Error updating topic:', error);
        showNotification('Error updating progress', 'error');
    }
}

// Check and award badges
async function checkBadges() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        const badges = userData.badges || [];
        
        // Check various badge criteria
        const completedCount = userData.completedTopics ? userData.completedTopics.length : 0;
        
        const badgeCriteria = [
            { id: 'first-topic', name: 'First Steps', condition: completedCount >= 1 },
            { id: 'ten-topics', name: 'Rising Star', condition: completedCount >= 10 },
            { id: 'fifty-topics', name: 'Knowledge Seeker', condition: completedCount >= 50 },
            { id: 'level-5', name: 'Expert Learner', condition: userData.level >= 5 },
            { id: 'streak-7', name: 'Week Warrior', condition: userData.streak >= 7 },
            { id: 'streak-30', name: 'Dedication Master', condition: userData.streak >= 30 }
        ];
        
        const newBadges = [];
        badgeCriteria.forEach(badge => {
            if (badge.condition && !badges.includes(badge.id)) {
                newBadges.push(badge.id);
                showNotification(`🏆 New Badge: ${badge.name}!`, 'success');
            }
        });
        
        if (newBadges.length > 0) {
            await database.ref('users/' + currentUser.uid + '/badges').set([...badges, ...newBadges]);
        }
    } catch (error) {
        console.error('Error checking badges:', error);
    }
}

// Initialize roadmap on page load
window.addEventListener('load', () => {
    if (currentUser) {
        setTimeout(loadRoadmap, 1000);
    }
});

// Three-Dots Menu Functions
let currentOpenMenu = null;
let menuOverlay = null;

// Toggle topic options menu
function toggleTopicMenu(event, topicId) {
    event.stopPropagation();
    
    const menu = document.getElementById(`menu-${topicId}`);
    
    // Close currently open menu if different
    if (currentOpenMenu && currentOpenMenu !== menu) {
        currentOpenMenu.classList.remove('active');
    }
    
    // Toggle the clicked menu
    menu.classList.toggle('active');
    
    if (menu.classList.contains('active')) {
        currentOpenMenu = menu;
        
        // Create overlay to detect clicks outside
        if (!menuOverlay) {
            menuOverlay = document.createElement('div');
            menuOverlay.className = 'menu-overlay';
            menuOverlay.onclick = closeAllMenus;
            document.body.appendChild(menuOverlay);
        }
        menuOverlay.classList.add('active');
    } else {
        currentOpenMenu = null;
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
    }
}

// Close specific menu
function closeTopicMenu(topicId) {
    const menu = document.getElementById(`menu-${topicId}`);
    if (menu) {
        menu.classList.remove('active');
    }
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
    }
    currentOpenMenu = null;
}

// Close all menus
function closeAllMenus() {
    if (currentOpenMenu) {
        currentOpenMenu.classList.remove('active');
        currentOpenMenu = null;
    }
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
    }
}

// View all resources for a topic
function viewTopicResources(topicId) {
    const topicItem = document.querySelector(`[data-topic-id="${topicId}"]`);
    if (topicItem) {
        const resources = topicItem.querySelector('.topic-resources');
        if (resources) {
            // Scroll to the topic and highlight it
            topicItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            topicItem.style.transform = 'scale(1.02)';
            topicItem.style.transition = 'transform 0.3s';
            setTimeout(() => {
                topicItem.style.transform = 'scale(1)';
            }, 500);
        }
    }
}

// Ask AI about a topic
function askAIAboutTopic(topicName) {
    // Switch to AI Assistant section
    showSection('ai-assistant');
    
    // Pre-fill the AI input with the topic
    setTimeout(() => {
        const aiInput = document.getElementById('aiInput');
        if (aiInput) {
            aiInput.value = `Explain ${topicName} in detail with examples`;
            aiInput.focus();
        }
    }, 300);
}

// Share progress (future feature)
function shareProgress(topicId) {
    const shareText = `I just completed a topic on Learnify! 🎓✨`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Learnify Progress',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Progress text copied to clipboard!', 'success');
        }).catch(err => {
            showNotification('Could not share progress', 'error');
        });
    }
}

// Close menus when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.topic-status') && currentOpenMenu) {
        closeAllMenus();
    }
});
