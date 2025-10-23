// Community Module
// Handles discussions, Q&A, and study groups

let currentCommunityTab = 'discussions';

// Show community tab
function showCommunityTab(tab) {
    currentCommunityTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.community-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide content
    document.querySelectorAll('.community-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tab + 'Tab').classList.add('active');
    
    // Load content for the tab
    if (tab === 'discussions') {
        loadDiscussions();
    } else if (tab === 'qa') {
        loadQuestions();
    } else if (tab === 'groups') {
        loadStudyGroups();
    }
}

// Create new discussion
function createNewDiscussion() {
    const discussionsList = document.getElementById('discussionsList');
    
    const form = `
        <div class="create-discussion-form" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h4>Start a New Discussion</h4>
            <input type="text" id="discussionTitle" placeholder="Discussion Title" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
            <select id="discussionSubject" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
                <option value="">Select Subject</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
                <option value="database">Database</option>
                <option value="general">General</option>
            </select>
            <textarea id="discussionContent" placeholder="What would you like to discuss?" rows="4" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px; font-family: inherit;"></textarea>
            <div style="display: flex; gap: 10px;">
                <button onclick="submitDiscussion()" class="btn-primary">Post Discussion</button>
                <button onclick="loadDiscussions()" class="btn-primary" style="background: var(--border-color);">Cancel</button>
            </div>
        </div>
    `;
    
    discussionsList.innerHTML = form + discussionsList.innerHTML;
}

// Submit new discussion
async function submitDiscussion() {
    if (!currentUser) {
        showNotification('Please login to post discussions', 'error');
        return;
    }
    
    const title = document.getElementById('discussionTitle').value.trim();
    const subject = document.getElementById('discussionSubject').value;
    const content = document.getElementById('discussionContent').value.trim();
    
    if (!title || !subject || !content) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    try {
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();
        
        const discussionRef = database.ref('discussions').push();
        await discussionRef.set({
            title: title,
            subject: subject,
            content: content,
            authorId: currentUser.uid,
            authorName: userData.name,
            authorCourse: userData.course,
            timestamp: Date.now(),
            replies: 0,
            likes: 0
        });
        
        showNotification('Discussion posted!', 'success');
        loadDiscussions();
        
    } catch (error) {
        console.error('Error posting discussion:', error);
        showNotification('Error posting discussion', 'error');
    }
}

// Load discussions
async function loadDiscussions() {
    const discussionsList = document.getElementById('discussionsList');
    if (!discussionsList) return;
    
    discussionsList.innerHTML = '<p style="text-align: center; padding: 20px;">Loading discussions...</p>';
    
    try {
        const snapshot = await database.ref('discussions').orderByChild('timestamp').once('value');
        const discussions = [];
        
        snapshot.forEach(childSnapshot => {
            discussions.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Sort by newest first
        discussions.reverse();
        
        if (discussions.length === 0) {
            discussionsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No discussions yet. Be the first to start one!</p>';
            return;
        }
        
        discussionsList.innerHTML = discussions.map(discussion => {
            const date = new Date(discussion.timestamp);
            const timeAgo = getTimeAgo(discussion.timestamp);
            
            return `
                <div class="discussion-card" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px; cursor: pointer;" onclick="viewDiscussion('${discussion.id}')">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div>
                            <span style="background: var(--primary-color); padding: 4px 12px; border-radius: 15px; font-size: 12px; margin-right: 10px;">${discussion.subject}</span>
                            <span style="color: var(--text-secondary); font-size: 13px;">${timeAgo}</span>
                        </div>
                    </div>
                    <h4 style="margin-bottom: 10px;">${discussion.title}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 15px;">${discussion.content.substring(0, 150)}${discussion.content.length > 150 ? '...' : ''}</p>
                    <div style="display: flex; gap: 20px; font-size: 13px; color: var(--text-secondary);">
                        <span><i class="fas fa-user"></i> ${discussion.authorName} (${discussion.authorCourse})</span>
                        <span><i class="fas fa-comments"></i> ${discussion.replies || 0} replies</span>
                        <span><i class="fas fa-heart"></i> ${discussion.likes || 0} likes</span>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading discussions:', error);
        discussionsList.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading discussions</p>';
    }
}

// View discussion details
async function viewDiscussion(discussionId) {
    const discussionsList = document.getElementById('discussionsList');
    
    try {
        const snapshot = await database.ref('discussions/' + discussionId).once('value');
        const discussion = snapshot.val();
        
        if (!discussion) return;
        
        const repliesSnapshot = await database.ref('discussionReplies/' + discussionId).once('value');
        const replies = [];
        
        repliesSnapshot.forEach(childSnapshot => {
            replies.push(childSnapshot.val());
        });
        
        discussionsList.innerHTML = `
            <div class="discussion-detail">
                <button onclick="loadDiscussions()" class="btn-primary" style="margin-bottom: 20px;">← Back to Discussions</button>
                
                <div style="background: var(--card-bg); padding: 25px; border-radius: 10px; margin-bottom: 20px;">
                    <div style="margin-bottom: 15px;">
                        <span style="background: var(--primary-color); padding: 6px 15px; border-radius: 15px; font-size: 13px;">${discussion.subject}</span>
                    </div>
                    <h2 style="margin-bottom: 15px;">${discussion.title}</h2>
                    <p style="margin-bottom: 20px; line-height: 1.6;">${discussion.content}</p>
                    <div style="padding-top: 15px; border-top: 1px solid var(--border-color); font-size: 14px; color: var(--text-secondary);">
                        <span><i class="fas fa-user"></i> ${discussion.authorName}</span> • 
                        <span>${new Date(discussion.timestamp).toLocaleString()}</span>
                    </div>
                </div>
                
                <div style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h4>Reply to this discussion</h4>
                    <textarea id="replyContent" rows="3" placeholder="Share your thoughts..." style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin: 15px 0; font-family: inherit;"></textarea>
                    <button onclick="submitReply('${discussionId}')" class="btn-primary">Post Reply</button>
                </div>
                
                <div>
                    <h4 style="margin-bottom: 20px;">${replies.length} Replies</h4>
                    ${replies.map(reply => `
                        <div style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                            <p style="margin-bottom: 15px;">${reply.content}</p>
                            <div style="font-size: 13px; color: var(--text-secondary);">
                                <span><i class="fas fa-user"></i> ${reply.authorName}</span> • 
                                <span>${new Date(reply.timestamp).toLocaleString()}</span>
                            </div>
                        </div>
                    `).join('') || '<p style="color: var(--text-secondary);">No replies yet. Be the first!</p>'}
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error viewing discussion:', error);
    }
}

// Submit reply to discussion
async function submitReply(discussionId) {
    if (!currentUser) {
        showNotification('Please login to reply', 'error');
        return;
    }
    
    const content = document.getElementById('replyContent').value.trim();
    
    if (!content) {
        showNotification('Please enter a reply', 'error');
        return;
    }
    
    try {
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();
        
        const replyRef = database.ref('discussionReplies/' + discussionId).push();
        await replyRef.set({
            content: content,
            authorId: currentUser.uid,
            authorName: userData.name,
            timestamp: Date.now()
        });
        
        // Update reply count
        const discussionRef = database.ref('discussions/' + discussionId);
        const discussionSnapshot = await discussionRef.once('value');
        const discussion = discussionSnapshot.val();
        
        await discussionRef.update({
            replies: (discussion.replies || 0) + 1
        });
        
        showNotification('Reply posted!', 'success');
        viewDiscussion(discussionId);
        
    } catch (error) {
        console.error('Error posting reply:', error);
        showNotification('Error posting reply', 'error');
    }
}

// Ask question (Q&A section)
function askQuestion() {
    const questionsList = document.getElementById('questionsList');
    
    const form = `
        <div class="ask-question-form" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h4>Ask a Question</h4>
            <input type="text" id="questionTitle" placeholder="Question Title" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
            <textarea id="questionDetails" placeholder="Describe your question in detail..." rows="4" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px; font-family: inherit;"></textarea>
            <div style="display: flex; gap: 10px;">
                <button onclick="submitQuestion()" class="btn-primary">Post Question</button>
                <button onclick="loadQuestions()" class="btn-primary" style="background: var(--border-color);">Cancel</button>
            </div>
        </div>
    `;
    
    questionsList.innerHTML = form + questionsList.innerHTML;
}

// Submit question
async function submitQuestion() {
    if (!currentUser) {
        showNotification('Please login to ask questions', 'error');
        return;
    }
    
    const title = document.getElementById('questionTitle').value.trim();
    const details = document.getElementById('questionDetails').value.trim();
    
    if (!title || !details) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    try {
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();
        
        const questionRef = database.ref('questions').push();
        await questionRef.set({
            title: title,
            details: details,
            authorId: currentUser.uid,
            authorName: userData.name,
            timestamp: Date.now(),
            answers: 0,
            votes: 0
        });
        
        showNotification('Question posted!', 'success');
        loadQuestions();
        
    } catch (error) {
        console.error('Error posting question:', error);
        showNotification('Error posting question', 'error');
    }
}

// Load questions
async function loadQuestions() {
    const questionsList = document.getElementById('questionsList');
    if (!questionsList) return;
    
    questionsList.innerHTML = '<p style="text-align: center; padding: 20px;">Loading questions...</p>';
    
    try {
        const snapshot = await database.ref('questions').orderByChild('timestamp').once('value');
        const questions = [];
        
        snapshot.forEach(childSnapshot => {
            questions.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        questions.reverse();
        
        if (questions.length === 0) {
            questionsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No questions yet. Ask the first one!</p>';
            return;
        }
        
        questionsList.innerHTML = questions.map(question => {
            const timeAgo = getTimeAgo(question.timestamp);
            
            return `
                <div class="question-card" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                    <h4 style="margin-bottom: 10px;">${question.title}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 15px;">${question.details.substring(0, 200)}${question.details.length > 200 ? '...' : ''}</p>
                    <div style="display: flex; gap: 20px; font-size: 13px; color: var(--text-secondary);">
                        <span><i class="fas fa-user"></i> ${question.authorName}</span>
                        <span><i class="fas fa-clock"></i> ${timeAgo}</span>
                        <span><i class="fas fa-comments"></i> ${question.answers || 0} answers</span>
                        <span><i class="fas fa-arrow-up"></i> ${question.votes || 0} votes</span>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading questions:', error);
        questionsList.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading questions</p>';
    }
}

// Create study group
function createStudyGroup() {
    const groupsList = document.getElementById('studyGroupsList');
    
    const form = `
        <div class="create-group-form" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h4>Create Study Group</h4>
            <input type="text" id="groupName" placeholder="Group Name" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
            <textarea id="groupDescription" placeholder="Group Description" rows="3" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px; font-family: inherit;"></textarea>
            <div style="display: flex; gap: 10px;">
                <button onclick="submitStudyGroup()" class="btn-primary">Create Group</button>
                <button onclick="loadStudyGroups()" class="btn-primary" style="background: var(--border-color);">Cancel</button>
            </div>
        </div>
    `;
    
    groupsList.innerHTML = form + groupsList.innerHTML;
}

// Submit study group
async function submitStudyGroup() {
    if (!currentUser) {
        showNotification('Please login to create groups', 'error');
        return;
    }
    
    const name = document.getElementById('groupName').value.trim();
    const description = document.getElementById('groupDescription').value.trim();
    
    if (!name || !description) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    try {
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();
        
        const groupRef = database.ref('studyGroups').push();
        await groupRef.set({
            name: name,
            description: description,
            creatorId: currentUser.uid,
            creatorName: userData.name,
            members: [currentUser.uid],
            timestamp: Date.now()
        });
        
        showNotification('Study group created!', 'success');
        loadStudyGroups();
        
    } catch (error) {
        console.error('Error creating group:', error);
        showNotification('Error creating group', 'error');
    }
}

// Load study groups
async function loadStudyGroups() {
    const groupsList = document.getElementById('studyGroupsList');
    if (!groupsList) return;
    
    groupsList.innerHTML = '<p style="text-align: center; padding: 20px;">Loading study groups...</p>';
    
    try {
        const snapshot = await database.ref('studyGroups').once('value');
        const groups = [];
        
        snapshot.forEach(childSnapshot => {
            groups.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        if (groups.length === 0) {
            groupsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No study groups yet. Create the first one!</p>';
            return;
        }
        
        groupsList.innerHTML = groups.map(group => {
            const memberCount = group.members ? group.members.length : 0;
            const isMember = currentUser && group.members && group.members.includes(currentUser.uid);
            
            return `
                <div class="group-card" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                    <h4 style="margin-bottom: 10px;">${group.name}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 15px;">${group.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-size: 13px; color: var(--text-secondary);">
                            <span><i class="fas fa-user"></i> ${group.creatorName}</span> • 
                            <span><i class="fas fa-users"></i> ${memberCount} members</span>
                        </div>
                        ${isMember ? 
                            '<button class="btn-primary" disabled style="opacity: 0.6;">Joined ✓</button>' :
                            `<button class="btn-primary" onclick="joinGroup('${group.id}')">Join Group</button>`
                        }
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading groups:', error);
        groupsList.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading study groups</p>';
    }
}

// Join study group
async function joinGroup(groupId) {
    if (!currentUser) {
        showNotification('Please login to join groups', 'error');
        return;
    }
    
    try {
        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();
        
        const members = group.members || [];
        if (!members.includes(currentUser.uid)) {
            members.push(currentUser.uid);
            await groupRef.update({ members: members });
            showNotification('Joined study group!', 'success');
            loadStudyGroups();
        }
        
    } catch (error) {
        console.error('Error joining group:', error);
        showNotification('Error joining group', 'error');
    }
}

// Utility: Get time ago string
function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

// Load community content on page load
window.addEventListener('load', () => {
    if (currentUser) {
        setTimeout(() => {
            loadDiscussions();
            loadQuestions();
            loadStudyGroups();
        }, 3000);
    }
});
