// Community Module
// Handles discussions, Q&A, and study groups

let currentCommunityTab = 'discussions';
let currentGroupId = null;
let currentGroupKey = null;
let currentDirectMessageUserId = null;
let currentDirectMessageKey = null;
let editingDiscussionId = null;

// Show community tab
function showCommunityTab(tab) {
    currentCommunityTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.community-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked tab
    const tabs = document.querySelectorAll('.community-tab');
    tabs.forEach(t => {
        if (t.textContent.toLowerCase().includes(tab)) {
            t.classList.add('active');
        }
    });
    
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
    } else if (tab === 'messages') {
        loadDirectMessages();
    }
}

// Create new discussion
function createNewDiscussion() {
    editingDiscussionId = null; // Reset editing mode
    const discussionsList = document.getElementById('discussionsList');
    
    const form = `
        <div class="create-discussion-form" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid var(--border-color);">
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

// Open edit discussion modal
function openEditDiscussionModal() {
    const discussionsList = document.getElementById('discussionsList');
    
    const form = `
        <div class="edit-discussion-form" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid var(--border-color);">
            <h4>Edit Discussion</h4>
            <p style="color: var(--text-secondary); margin-bottom: 15px;">Select a discussion to edit from the list below, then click the edit icon next to it.</p>
            <button onclick="loadDiscussions()" class="btn-primary" style="background: var(--border-color);">Close</button>
        </div>
    `;
    
    discussionsList.innerHTML = form + discussionsList.innerHTML;
}

// Edit a specific discussion
function editDiscussion(discussionId) {
    if (!currentUser) {
        showNotification('Please login to edit discussions', 'error');
        return;
    }
    
    editingDiscussionId = discussionId;
    
    // Load the discussion data
    database.ref('discussions/' + discussionId).once('value').then(snapshot => {
        const discussion = snapshot.val();
        
        if (!discussion) {
            showNotification('Discussion not found', 'error');
            return;
        }
        
        // Check if user is the author
        if (discussion.authorId !== currentUser.uid) {
            showNotification('You can only edit your own discussions', 'error');
            return;
        }
        
        const discussionsList = document.getElementById('discussionsList');
        
        const form = `
            <div class="edit-discussion-form" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid var(--border-color);">
                <h4>Edit Discussion</h4>
                <input type="text" id="discussionTitle" placeholder="Discussion Title" value="${discussion.title}" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
                <select id="discussionSubject" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
                    <option value="programming" ${discussion.subject === 'programming' ? 'selected' : ''}>Programming</option>
                    <option value="web-development" ${discussion.subject === 'web-development' ? 'selected' : ''}>Web Development</option>
                    <option value="database" ${discussion.subject === 'database' ? 'selected' : ''}>Database</option>
                    <option value="general" ${discussion.subject === 'general' ? 'selected' : ''}>General</option>
                </select>
                <textarea id="discussionContent" placeholder="What would you like to discuss?" rows="4" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px; font-family: inherit;">${discussion.content}</textarea>
                <div style="display: flex; gap: 10px;">
                    <button onclick="submitDiscussionEdit('${discussionId}')" class="btn-primary" style="background: var(--success-color);">Update Discussion</button>
                    <button onclick="loadDiscussions()" class="btn-primary" style="background: var(--border-color);">Cancel</button>
                </div>
            </div>
        `;
        
        discussionsList.innerHTML = form + discussionsList.innerHTML;
    }).catch(error => {
        console.error('Error loading discussion:', error);
        showNotification('Error loading discussion', 'error');
    });
}

// Submit discussion edit
async function submitDiscussionEdit(discussionId) {
    if (!currentUser) {
        showNotification('Please login to edit discussions', 'error');
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
        // Update the discussion
        await database.ref('discussions/' + discussionId).update({
            title: title,
            subject: subject,
            content: content,
            edited: true,
            editedTimestamp: Date.now()
        });
        
        showNotification('Discussion updated!', 'success');
        editingDiscussionId = null;
        loadDiscussions();
        
    } catch (error) {
        console.error('Error updating discussion:', error);
        showNotification('Error updating discussion', 'error');
    }
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

// Load discussions with edit option
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
            const isAuthor = currentUser && discussion.authorId === currentUser.uid;
            const editedText = discussion.edited ? ' (edited)' : '';
            
            return `
                <div class="discussion-card" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px; cursor: pointer; border: 1px solid var(--border-color);" onclick="viewDiscussion('${discussion.id}')">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div>
                            <span style="background: var(--primary-color); padding: 4px 12px; border-radius: 15px; font-size: 12px; margin-right: 10px;">${discussion.subject}</span>
                            <span style="color: var(--text-secondary); font-size: 13px;">${timeAgo}${editedText}</span>
                        </div>
                        ${isAuthor ? `<button class="btn-primary" style="background: var(--warning-color); padding: 5px 10px; font-size: 12px;" onclick="event.stopPropagation(); editDiscussion('${discussion.id}')"><i class="fas fa-edit"></i> Edit</button>` : ''}
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
            pendingMembers: [],
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
            const isCreator = currentUser && group.creatorId === currentUser.uid;
            const isPending = currentUser && group.pendingMembers && group.pendingMembers.includes(currentUser.uid);
            
            // If user is the creator, show management options
            if (isCreator) {
                return `
                    <div class="group-card" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <h4 style="margin-bottom: 10px;">${group.name} <span style="background: var(--warning-color); padding: 4px 8px; border-radius: 4px; font-size: 12px;">CREATOR</span></h4>
                                <p style="color: var(--text-secondary); margin-bottom: 15px;">${group.description}</p>
                                <div style="font-size: 13px; color: var(--text-secondary);">
                                    <span><i class="fas fa-user"></i> ${group.creatorName}</span> • 
                                    <span><i class="fas fa-users"></i> ${memberCount} members</span>
                                </div>
                            </div>
                            <button class="btn-primary" disabled style="opacity: 0.6;">Managing</button>
                        </div>
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
                            <button class="btn-primary" onclick="manageGroupRequests('${group.id}')" style="background: var(--success-color);">
                                <i class="fas fa-user-check"></i> Manage Requests
                            </button>
                        </div>
                    </div>
                `;
            }
            // If user is already a member
            else if (isMember) {
                return `
                    <div class="group-card" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="margin-bottom: 10px;">${group.name}</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 15px;">${group.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="font-size: 13px; color: var(--text-secondary);">
                                <span><i class="fas fa-user"></i> ${group.creatorName}</span> • 
                                <span><i class="fas fa-users"></i> ${memberCount} members</span>
                            </div>
                            <div style="display: flex; gap: 10px;">
                                <button class="btn-primary" onclick="openGroupChat('${group.id}')">
                                    <i class="fas fa-comments"></i> Chat
                                </button>
                                <button class="btn-primary" disabled style="opacity: 0.6;">Joined ✓</button>
                            </div>
                        </div>
                    </div>
                `;
            }
            // If user has a pending request
            else if (isPending) {
                return `
                    <div class="group-card" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="margin-bottom: 10px;">${group.name}</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 15px;">${group.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="font-size: 13px; color: var(--text-secondary);">
                                <span><i class="fas fa-user"></i> ${group.creatorName}</span> • 
                                <span><i class="fas fa-users"></i> ${memberCount} members</span>
                            </div>
                            <button class="btn-primary" disabled style="opacity: 0.6;">Request Pending...</button>
                        </div>
                    </div>
                `;
            }
            // If user is not a member and hasn't requested to join
            else {
                return `
                    <div class="group-card" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="margin-bottom: 10px;">${group.name}</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 15px;">${group.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="font-size: 13px; color: var(--text-secondary);">
                                <span><i class="fas fa-user"></i> ${group.creatorName}</span> • 
                                <span><i class="fas fa-users"></i> ${memberCount} members</span>
                            </div>
                            <button class="btn-primary" onclick="joinGroup('${group.id}')">Request to Join</button>
                        </div>
                    </div>
                `;
            }
        }).join('');
        
    } catch (error) {
        console.error('Error loading groups:', error);
        groupsList.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading study groups</p>';
    }
}

// Join study group (modified to request approval instead of immediate join)
async function joinGroup(groupId) {
    if (!currentUser) {
        showNotification('Please login to join groups', 'error');
        return;
    }
    
    try {
        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();
        
        // Check if group exists
        if (!group) {
            showNotification('Group not found', 'error');
            return;
        }
        
        // Check if user is already a member
        const members = group.members || [];
        if (members.includes(currentUser.uid)) {
            showNotification('You are already a member of this group', 'info');
            // Automatically open the chat since they're a member
            openGroupChat(groupId);
            return;
        }
        
        // Check if user has already requested to join
        const pendingMembers = group.pendingMembers || [];
        if (pendingMembers.includes(currentUser.uid)) {
            showNotification('You have already requested to join this group. Please wait for approval.', 'info');
            return;
        }
        
        // Add user to pending members list
        const updatedPendingMembers = [...pendingMembers];
        updatedPendingMembers.push(currentUser.uid);
        
        await groupRef.update({ 
            pendingMembers: updatedPendingMembers 
        });
        
        // Send notification to group creator
        const groupName = group.name;
        try {
            const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
            const userData = userSnapshot.val();
            const requesterName = userData ? userData.name : 'A user';
            
            // Only send notification if creator exists and is different from requester
            if (group.creatorId && group.creatorId !== currentUser.uid) {
                await sendUserNotification(
                    group.creatorId, 
                    `User "${requesterName}" has requested to join your group "${groupName}".`, 
                    'info'
                );
            }
        } catch (notificationError) {
            console.warn('Could not send notification to group creator:', notificationError);
            // Continue even if notification fails
        }
        
        showNotification('Join request sent! Please wait for the group creator to approve your request.', 'success');
        loadStudyGroups();
        
    } catch (error) {
        console.error('Error requesting to join group:', error);
        // More detailed error message
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. Please make sure you are logged in correctly and try again.', 'error');
        } else {
            showNotification('Error requesting to join group: ' + error.message, 'error');
        }
    }
}

// Manage group requests (for group creators)
async function manageGroupRequests(groupId) {
    if (!currentUser) return;
    
    try {
        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();
        
        // Check if current user is the group creator
        if (group.creatorId !== currentUser.uid) {
            showNotification('Only the group creator can manage requests', 'error');
            return;
        }
        
        const pendingMembers = group.pendingMembers || [];
        
        if (pendingMembers.length === 0) {
            showNotification('No pending requests', 'info');
            return;
        }
        
        // Fetch user data for pending members
        const pendingUsers = [];
        for (const userId of pendingMembers) {
            try {
                const userSnapshot = await database.ref('users/' + userId).once('value');
                const userData = userSnapshot.val();
                if (userData) {
                    pendingUsers.push({
                        id: userId,
                        name: userData.name,
                        course: userData.course
                    });
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        }
        
        // Display requests in a modal or update the UI
        showPendingRequests(groupId, group.name, pendingUsers);
        
    } catch (error) {
        console.error('Error managing group requests:', error);
        showNotification('Error managing requests', 'error');
    }
}

// Show pending requests UI
function showPendingRequests(groupId, groupName, pendingUsers) {
    const groupsList = document.getElementById('studyGroupsList');
    
    if (pendingUsers.length === 0) {
        groupsList.innerHTML = `
            <div style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3>Pending Requests for "${groupName}"</h3>
                <p>No pending requests at this time.</p>
                <button class="btn-primary" onclick="loadStudyGroups()">Back to Groups</button>
            </div>
        `;
        return;
    }
    
    groupsList.innerHTML = `
        <div style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3>Pending Requests for "${groupName}"</h3>
                <button class="btn-primary" onclick="loadStudyGroups()">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
            </div>
            
            <div style="margin-top: 20px;">
                ${pendingUsers.map(user => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: var(--darker-bg); border-radius: 8px; margin-bottom: 10px;">
                        <div>
                            <strong>${user.name}</strong>
                            <div style="font-size: 13px; color: var(--text-secondary);">${user.course}</div>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button class="btn-primary" style="background: var(--success-color);" onclick="approveMember('${groupId}', '${user.id}')">
                                <i class="fas fa-check"></i> Approve
                            </button>
                            <button class="btn-primary" style="background: var(--danger-color);" onclick="rejectMember('${groupId}', '${user.id}')">
                                <i class="fas fa-times"></i> Reject
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Approve member to join group
async function approveMember(groupId, userId) {
    if (!currentUser) return;
    
    try {
        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();
        
        // Verify user is group creator
        if (group.creatorId !== currentUser.uid) {
            showNotification('Only the group creator can approve members', 'error');
            return;
        }
        
        // Remove from pending members
        const pendingMembers = (group.pendingMembers || []).filter(id => id !== userId);
        
        // Add to members
        const members = group.members || [];
        if (!members.includes(userId)) {
            members.push(userId);
        }
        
        // Update group
        await groupRef.update({
            pendingMembers: pendingMembers,
            members: members
        });
        
        // Send notification to the approved user
        const groupName = group.name;
        await sendUserNotification(
            userId, 
            `Your request to join group "${groupName}" has been approved!`, 
            'success'
        );
        
        showNotification('Member approved!', 'success');
        
        // Refresh the requests view
        manageGroupRequests(groupId);
        
    } catch (error) {
        console.error('Error approving member:', error);
        showNotification('Error approving member', 'error');
    }
}

// Reject member request to join group
async function rejectMember(groupId, userId) {
    if (!currentUser) return;
    
    try {
        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();
        
        // Verify user is group creator
        if (group.creatorId !== currentUser.uid) {
            showNotification('Only the group creator can reject members', 'error');
            return;
        }
        
        // Remove from pending members
        const pendingMembers = (group.pendingMembers || []).filter(id => id !== userId);
        
        // Update group
        await groupRef.update({
            pendingMembers: pendingMembers
        });
        
        // Send notification to the rejected user
        const groupName = group.name;
        await sendUserNotification(
            userId, 
            `Your request to join group "${groupName}" has been rejected.`, 
            'error'
        );
        
        showNotification('Member request rejected', 'success');
        
        // Refresh the requests view
        manageGroupRequests(groupId);
        
    } catch (error) {
        console.error('Error rejecting member:', error);
        showNotification('Error rejecting member', 'error');
    }
}

// Open group chat
async function openGroupChat(groupId) {
    if (!currentUser) {
        showNotification('Please login to access group chat', 'error');
        return;
    }
    
    try {
        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();
        
        // Check if user is a member of the group
        const isMember = group.members && group.members.includes(currentUser.uid);
        if (!isMember) {
            showNotification('You must be a member of this group to access the chat', 'error');
            return;
        }
        
        currentGroupId = groupId;
        document.getElementById('chatGroupName').textContent = group.name + ' - Chat';
        document.getElementById('groupChatContainer').style.display = 'block';
        
        // Load chat messages
        loadGroupChatMessages(groupId);
        
        // Set up real-time listener for new messages
        setupChatListener(groupId);
        
    } catch (error) {
        console.error('Error opening group chat:', error);
        showNotification('Error accessing group chat: ' + error.message, 'error');
    }
}

// Close group chat
function closeGroupChat() {
    document.getElementById('groupChatContainer').style.display = 'none';
    currentGroupId = null;
    
    // Remove chat listener if it exists
    if (currentGroupKey) {
        database.ref('groupChats/' + currentGroupId).off('child_added', currentGroupKey);
        currentGroupKey = null;
    }
}

// Set up real-time listener for chat messages
function setupChatListener(groupId) {
    // Remove previous listener if it exists
    if (currentGroupKey) {
        database.ref('groupChats/' + currentGroupId).off('child_added', currentGroupKey);
    }
    
    // Set up new listener
    const messagesRef = database.ref('groupChats/' + groupId).orderByChild('timestamp');
    currentGroupKey = messagesRef.on('child_added', (snapshot) => {
        const message = snapshot.val();
        displayNewMessage(message);
        // Scroll to bottom of chat
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

// Load group chat messages
async function loadGroupChatMessages(groupId) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '<p style="text-align: center; padding: 20px;">Loading messages...</p>';
    
    try {
        const messagesRef = database.ref('groupChats/' + groupId).orderByChild('timestamp');
        const snapshot = await messagesRef.once('value');
        
        const messages = [];
        snapshot.forEach(childSnapshot => {
            messages.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        if (messages.length === 0) {
            chatMessages.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No messages yet. Start the conversation!</p>';
            return;
        }
        
        // Display messages
        chatMessages.innerHTML = '';
        messages.forEach(message => {
            displayNewMessage(message);
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
    } catch (error) {
        console.error('Error loading chat messages:', error);
        chatMessages.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading messages</p>';
    }
}

// Display a new message in the chat
function displayNewMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const isOwnMessage = message.senderId === currentUser.uid;
    
    // Decrypt message content if it's encrypted
    let content = message.content;
    try {
        const bytes = CryptoJS.AES.decrypt(message.content, currentGroupId);
        content = bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        // If decryption fails, display as is (might be unencrypted during transition)
        console.warn('Could not decrypt message:', e);
    }
    
    // Format timestamp
    const date = new Date(message.timestamp);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isOwnMessage ? 'message-sent' : 'message-received'}`;
    messageElement.innerHTML = `
        <div class="message-header">
            <strong>${isOwnMessage ? 'You' : message.senderName}</strong>
        </div>
        <div class="message-content">${escapeHtml(content)}</div>
        <div class="message-time">${timeString}</div>
    `;
    
    chatMessages.appendChild(messageElement);
}

// Send group message
async function sendGroupMessage() {
    if (!currentUser || !currentGroupId) return;
    
    const messageInput = document.getElementById('chatMessageInput');
    const content = messageInput.value.trim();
    
    if (!content) {
        showNotification('Please enter a message', 'error');
        return;
    }
    
    try {
        // Get user data
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();
        
        // Encrypt message content
        let encryptedContent = content;
        if (typeof CryptoJS !== 'undefined') {
            encryptedContent = CryptoJS.AES.encrypt(content, currentGroupId).toString();
        }
        
        // Save message to database
        const messageRef = database.ref('groupChats/' + currentGroupId).push();
        await messageRef.set({
            content: encryptedContent,
            senderId: currentUser.uid,
            senderName: userData.name,
            timestamp: Date.now()
        });
        
        // Clear input
        messageInput.value = '';
        
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Error sending message', 'error');
    }
}

// Handle Enter key press in chat input
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendGroupMessage();
    }
}

// Direct messaging functions
function openNewMessageModal() {
    const messagesList = document.getElementById('messagesList');
    
    const form = `
        <div class="new-message-form" style="background: var(--card-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid var(--border-color);">
            <h4>Send New Message</h4>
            <input type="text" id="messageRecipient" placeholder="Recipient's name or email" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
            <textarea id="messageContent" placeholder="Your message..." rows="3" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px; font-family: inherit;"></textarea>
            <div style="display: flex; gap: 10px;">
                <button onclick="sendNewMessage()" class="btn-primary">Send Message</button>
                <button onclick="loadDirectMessages()" class="btn-primary" style="background: var(--border-color);">Cancel</button>
            </div>
        </div>
    `;
    
    messagesList.innerHTML = form + messagesList.innerHTML;
}

// Send a new message to a user
async function sendNewMessage() {
    if (!currentUser) {
        showNotification('Please login to send messages', 'error');
        return;
    }
    
    const recipientInput = document.getElementById('messageRecipient');
    const contentInput = document.getElementById('messageContent');
    
    const recipient = recipientInput.value.trim();
    const content = contentInput.value.trim();
    
    if (!recipient || !content) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    try {
        // In a real implementation, you would look up the recipient by name/email
        // For now, we'll just show a notification that this is a demo
        showNotification('Message sending functionality would be implemented in a full version', 'info');
        loadDirectMessages();
        
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Error sending message: ' + error.message, 'error');
    }
}

// Load direct messages
async function loadDirectMessages() {
    const messagesList = document.getElementById('messagesList');
    if (!messagesList) return;
    
    if (!currentUser) {
        messagesList.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">Please login to view messages</p>';
        return;
    }
    
    messagesList.innerHTML = '<p style="text-align: center; padding: 20px;">Loading messages...</p>';
    
    try {
        // For simplicity, we'll show a list of users you can message
        // In a real app, you would fetch actual conversations
        const usersSnapshot = await database.ref('users').orderByChild('name').once('value');
        const users = [];
        
        usersSnapshot.forEach(childSnapshot => {
            const user = childSnapshot.val();
            if (childSnapshot.key !== currentUser.uid) { // Don't show current user
                users.push({
                    id: childSnapshot.key,
                    name: user.name || 'Anonymous User',
                    course: user.course || 'Unknown Course'
                });
            }
        });
        
        if (users.length === 0) {
            messagesList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No other users found. Be the first to connect!</p>';
            return;
        }
        
        messagesList.innerHTML = `
            <h4 style="margin-bottom: 20px;">Select a user to message:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
                ${users.map(user => `
                    <div class="user-card" style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color); cursor: pointer; transition: all 0.3s ease;" onclick="openDirectMessageChat('${user.id}', '${user.name.replace(/'/g, "\\'")}')">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); display: flex; align-items: center; justify-content: center; color: white;">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <div style="font-weight: 600;">${user.name}</div>
                                <div style="font-size: 13px; color: var(--text-secondary);">${user.course}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
    } catch (error) {
        console.error('Error loading users:', error);
        messagesList.innerHTML = `<p style="text-align: center; color: var(--danger-color);">Error loading users: ${error.message}</p>`;
    }
}

// Open direct message chat
async function openDirectMessageChat(userId, userName) {
    if (!currentUser) {
        showNotification('Please login to send messages', 'error');
        return;
    }
    
    if (!userId || !userName) {
        showNotification('Invalid user selection', 'error');
        return;
    }
    
    try {
        currentDirectMessageUserId = userId;
        document.getElementById('directMessageChatName').textContent = 'Chat with ' + userName;
        document.getElementById('directMessageChatContainer').style.display = 'block';
        
        // Load chat messages
        await loadDirectMessageChatMessages(userId);
        
        // Set up real-time listener for new messages
        setupDirectMessageListener(userId);
        
    } catch (error) {
        console.error('Error opening direct message chat:', error);
        showNotification('Error opening chat: ' + error.message, 'error');
        // Hide the chat container on error
        document.getElementById('directMessageChatContainer').style.display = 'none';
        currentDirectMessageUserId = null;
    }
}

// Close direct message chat
function closeDirectMessageChat() {
    document.getElementById('directMessageChatContainer').style.display = 'none';
    currentDirectMessageUserId = null;
    
    // Remove chat listener if it exists
    if (currentDirectMessageKey) {
        const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
        database.ref(chatPath).off('child_added', currentDirectMessageKey);
        currentDirectMessageKey = null;
    }
}

// Get direct message chat path (consistent for both users)
function getDirectMessageChatPath(userId1, userId2) {
    // Create a consistent path regardless of user order
    const userIDs = [userId1, userId2].sort();
    return 'directMessages/' + userIDs[0] + '_' + userIDs[1];
}

// Set up real-time listener for direct messages
function setupDirectMessageListener(userId) {
    // Remove previous listener if it exists
    if (currentDirectMessageKey) {
        const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
        database.ref(chatPath).off('child_added', currentDirectMessageKey);
    }
    
    // Set up new listener
    const chatPath = getDirectMessageChatPath(currentUser.uid, userId);
    const messagesRef = database.ref(chatPath).orderByChild('timestamp');
    currentDirectMessageKey = messagesRef.on('child_added', (snapshot) => {
        const message = snapshot.val();
        displayNewDirectMessage(message);
        // Scroll to bottom of chat
        const chatMessages = document.getElementById('directMessageChatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

// Load direct message chat messages
async function loadDirectMessageChatMessages(userId) {
    const chatMessages = document.getElementById('directMessageChatMessages');
    chatMessages.innerHTML = '<p style="text-align: center; padding: 20px;">Loading messages...</p>';
    
    try {
        const chatPath = getDirectMessageChatPath(currentUser.uid, userId);
        const messagesRef = database.ref(chatPath).orderByChild('timestamp');
        const snapshot = await messagesRef.once('value');
        
        const messages = [];
        snapshot.forEach(childSnapshot => {
            messages.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        if (messages.length === 0) {
            chatMessages.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No messages yet. Start the conversation!</p>';
            return;
        }
        
        // Display messages
        chatMessages.innerHTML = '';
        messages.forEach(message => {
            displayNewDirectMessage(message);
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
    } catch (error) {
        console.error('Error loading chat messages:', error);
        chatMessages.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading messages</p>';
    }
}

// Display a new direct message in the chat
function displayNewDirectMessage(message) {
    const chatMessages = document.getElementById('directMessageChatMessages');
    const isOwnMessage = message.senderId === currentUser.uid;
    
    // Decrypt message content if it's encrypted
    let content = message.content;
    try {
        const bytes = CryptoJS.AES.decrypt(message.content, currentGroupId);
        content = bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        // If decryption fails, display as is (might be unencrypted during transition)
        console.warn('Could not decrypt message:', e);
    }
    
    // Format timestamp
    const date = new Date(message.timestamp);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isOwnMessage ? 'message-sent' : 'message-received'}`;
    messageElement.innerHTML = `
        <div class="message-header">
            <strong>${isOwnMessage ? 'You' : message.senderName}</strong>
        </div>
        <div class="message-content">${escapeHtml(content)}</div>
        <div class="message-time">${timeString}</div>
    `;
    
    chatMessages.appendChild(messageElement);
}

// Send direct message
async function sendDirectMessage() {
    if (!currentUser || !currentDirectMessageUserId) return;
    
    const messageInput = document.getElementById('directMessageInput');
    const content = messageInput.value.trim();
    
    if (!content) {
        showNotification('Please enter a message', 'error');
        return;
    }
    
    try {
        // Get user data
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();
        
        // Encrypt message content
        let encryptedContent = content;
        if (typeof CryptoJS !== 'undefined') {
            encryptedContent = CryptoJS.AES.encrypt(content, currentGroupId).toString();
        }
        
        // Save message to database
        const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
        const messageRef = database.ref(chatPath).push();
        await messageRef.set({
            content: encryptedContent,
            senderId: currentUser.uid,
            senderName: userData.name,
            timestamp: Date.now()
        });
        
        // Clear input
        messageInput.value = '';
        
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Error sending message', 'error');
    }
}

// Handle Enter key press in direct message input
function handleDirectMessageKeyPress(event) {
    if (event.key === 'Enter') {
        sendDirectMessage();
    }
}

// Display a new direct message in the chat
function displayNewDirectMessage(message) {
    const chatMessages = document.getElementById('directMessageChatMessages');
    const isOwnMessage = message.senderId === currentUser.uid;
    
    // Format timestamp
    const date = new Date(message.timestamp);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isOwnMessage ? 'message-sent' : 'message-received'}`;
    messageElement.innerHTML = `
        <div class="message-header">
            <strong>${isOwnMessage ? 'You' : message.senderName}</strong>
        </div>
        <div class="message-content">${escapeHtml(message.content)}</div>
        <div class="message-time">${timeString}</div>
    `;
    
    chatMessages.appendChild(messageElement);
}

// Send direct message
async function sendDirectMessage() {
    if (!currentUser || !currentDirectMessageUserId) return;
    
    const messageInput = document.getElementById('directMessageInput');
    const content = messageInput.value.trim();
    
    if (!content) {
        showNotification('Please enter a message', 'error');
        return;
    }
    
    try {
        // Get user data
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();
        
        // Save message to database
        const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
        const messageRef = database.ref(chatPath).push();
        await messageRef.set({
            content: content,
            senderId: currentUser.uid,
            senderName: userData.name,
            timestamp: Date.now()
        });
        
        // Clear input
        messageInput.value = '';
        
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Error sending message', 'error');
    }
}

// Handle Enter key press in direct message input
function handleDirectMessageKeyPress(event) {
    if (event.key === 'Enter') {
        sendDirectMessage();
    }
}

// Refresh messages
function refreshMessages() {
    if (currentCommunityTab === 'messages') {
        loadDirectMessages();
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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

// Send notification to a user
async function sendUserNotification(userId, message, type = 'info') {
    // Don't send notification if user is trying to send to themselves
    if (!userId || userId === currentUser.uid) {
        return;
    }
    
    try {
        const notificationRef = database.ref('userNotifications/' + userId).push();
        await notificationRef.set({
            message: message,
            type: type,
            timestamp: Date.now(),
            read: false
        });
    } catch (error) {
        console.error('Error sending notification:', error);
        // Don't show notification error to user as it's not critical
    }
}

// Load user notifications
async function loadUserNotifications() {
    if (!currentUser) return [];
    
    try {
        const notificationsRef = database.ref('userNotifications/' + currentUser.uid)
            .orderByChild('timestamp')
            .limitToLast(10);
        const snapshot = await notificationsRef.once('value');
        
        const notifications = [];
        snapshot.forEach(childSnapshot => {
            notifications.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Sort by timestamp descending (newest first)
        notifications.reverse();
        
        return notifications;
    } catch (error) {
        console.error('Error loading notifications:', error);
        // Return empty array instead of throwing error
        return [];
    }
}

// Mark notification as read
async function markNotificationAsRead(notificationId) {
    if (!currentUser) return;
    
    try {
        await database.ref('userNotifications/' + currentUser.uid + '/' + notificationId)
            .update({ read: true });
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
}

// Display notifications in UI
async function displayNotifications() {
    const notifications = await loadUserNotifications();
    const notificationsContainer = document.getElementById('notificationsList');
    
    if (!notificationsContainer) return;
    
    if (notifications.length === 0) {
        notificationsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No notifications</p>';
        return;
    }
    
    notificationsContainer.innerHTML = notifications.map(notification => {
        const date = new Date(notification.timestamp);
        const timeAgo = getTimeAgo(notification.timestamp);
        
        return `
            <div class="notification-item" style="padding: 15px; border-bottom: 1px solid var(--border-color); background: ${notification.read ? 'var(--card-bg)' : 'var(--darker-bg)'};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="flex: 1;">
                        <p style="margin: 0 0 5px 0; ${notification.read ? '' : 'font-weight: bold;'}">${notification.message}</p>
                        <span style="font-size: 12px; color: var(--text-secondary);">${timeAgo}</span>
                    </div>
                    ${!notification.read ? 
                        `<button class="btn-primary" style="padding: 5px 10px; font-size: 12px; background: var(--success-color);" onclick="markNotificationAsRead('${notification.id}')">
                            Mark as Read
                        </button>` : 
                        ''
                    }
                </div>
            </div>
        `;
    }).join('');
}

// Add periodic notification check
function startNotificationChecker() {
    if (!currentUser) return;
    
    // Check for new notifications every 30 seconds
    setInterval(async () => {
        const notifications = await loadUserNotifications();
        const unreadCount = notifications.filter(n => !n.read).length;
        
        // Update notification badge if it exists
        const notificationBadge = document.getElementById('notificationBadge');
        if (notificationBadge) {
            notificationBadge.textContent = unreadCount;
            notificationBadge.style.display = unreadCount > 0 ? 'inline' : 'none';
        }
        
        // Show notification toast for new unread notifications
        if (unreadCount > 0) {
            const latestNotification = notifications[0];
            if (!latestNotification.read && !latestNotification.shown) {
                showNotification(latestNotification.message, latestNotification.type);
                // Mark as shown to prevent duplicate toasts
                await database.ref('userNotifications/' + currentUser.uid + '/' + latestNotification.id)
                    .update({ shown: true });
            }
        }
    }, 30000);
}

// Initialize notification checker when user logs in
window.addEventListener('load', () => {
    // Start notification checker after a delay to ensure auth is ready
    setTimeout(() => {
        if (currentUser) {
            startNotificationChecker();
        }
    }, 5000);
});

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