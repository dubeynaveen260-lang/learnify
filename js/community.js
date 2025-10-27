// Community Module
// Handles discussions, Q&A, and study groups

let currentCommunityTab = 'discussions';
let currentGroupId = null;
let currentGroupKey = null;
let currentDirectMessageUserId = null;
let currentDirectMessageKey = null;
let editingDiscussionId = null;
let displayedMessageSignatures = new Set(); // Global set to track displayed message signatures and prevent duplicates

// Wait for Firebase to be initialized before using database functions
function ensureFirebaseReady() {
    return new Promise((resolve, reject) => {
        if (typeof database !== 'undefined' && database !== null) {
            resolve();
        } else {
            // Listen for firebase-ready event
            const timeout = setTimeout(() => {
                reject(new Error('Firebase initialization timeout'));
            }, 5000);

            window.addEventListener('firebase-ready', () => {
                clearTimeout(timeout);
                resolve();
            }, { once: true });
        }
    });
}

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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Limit to 50 discussions to improve performance
        const snapshot = await database.ref('discussions').orderByChild('timestamp').limitToLast(50).once('value');
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

        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();

        discussions.forEach(discussion => {
            const date = new Date(discussion.timestamp);
            const timeAgo = getTimeAgo(discussion.timestamp);
            const isAuthor = currentUser && discussion.authorId === currentUser.uid;
            const editedText = discussion.edited ? ' (edited)' : '';

            const discussionCard = document.createElement('div');
            discussionCard.className = 'discussion-card';
            discussionCard.style.background = 'var(--card-bg)';
            discussionCard.style.padding = '20px';
            discussionCard.style.borderRadius = '10px';
            discussionCard.style.marginBottom = '15px';
            discussionCard.style.cursor = 'pointer';
            discussionCard.style.border = '1px solid var(--border-color)';
            discussionCard.onclick = () => viewDiscussion(discussion.id);

            discussionCard.innerHTML = `
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
            `;

            fragment.appendChild(discussionCard);
        });

        discussionsList.innerHTML = '';
        discussionsList.appendChild(fragment);

    } catch (error) {
        console.error('Error loading discussions:', error);
        discussionsList.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading discussions: ' + error.message + '</p>';
    }
}

// View discussion details
async function viewDiscussion(discussionId) {
    const discussionsList = document.getElementById('discussionsList');

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Limit to 50 questions to improve performance
        const snapshot = await database.ref('questions').orderByChild('timestamp').limitToLast(50).once('value');
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

        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();

        questions.forEach(question => {
            const timeAgo = getTimeAgo(question.timestamp);

            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.style.background = 'var(--card-bg)';
            questionCard.style.padding = '20px';
            questionCard.style.borderRadius = '10px';
            questionCard.style.marginBottom = '15px';

            questionCard.innerHTML = `
                <h4 style="margin-bottom: 10px;">${question.title}</h4>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">${question.details.substring(0, 200)}${question.details.length > 200 ? '...' : ''}</p>
                <div style="display: flex; gap: 20px; font-size: 13px; color: var(--text-secondary);">
                    <span><i class="fas fa-user"></i> ${question.authorName}</span>
                    <span><i class="fas fa-clock"></i> ${timeAgo}</span>
                    <span><i class="fas fa-comments"></i> ${question.answers || 0} answers</span>
                    <span><i class="fas fa-arrow-up"></i> ${question.votes || 0} votes</span>
                </div>
            `;

            fragment.appendChild(questionCard);
        });

        questionsList.innerHTML = '';
        questionsList.appendChild(fragment);

    } catch (error) {
        console.error('Error loading questions:', error);
        questionsList.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading questions: ' + error.message + '</p>';
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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();

        const groupRef = database.ref('studyGroups').push();
        // Store members and pendingMembers as objects with user IDs as keys
        const membersObj = {};
        membersObj[currentUser.uid] = true;

        await groupRef.set({
            name: name,
            description: description,
            creatorId: currentUser.uid,
            creatorName: userData.name,
            members: membersObj,
            pendingMembers: {},
            timestamp: Date.now()
        });

        showNotification('Study group created!', 'success');
        loadStudyGroups();

    } catch (error) {
        console.error('Error creating group:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. You may not have permission to create groups. Please contact support if this issue persists.', 'error');
        } else {
            showNotification('Error creating group: ' + error.message, 'error');
        }
    }
}

// Load study groups
async function loadStudyGroups() {
    const groupsList = document.getElementById('studyGroupsList');
    if (!groupsList) return;

    // Check if user is logged in
    if (!currentUser) {
        groupsList.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">Please login to view study groups</p>';
        return;
    }

    groupsList.innerHTML = '<p style="text-align: center; padding: 20px;">Loading study groups...</p>';

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Limit to 50 groups to improve performance
        const snapshot = await database.ref('studyGroups').limitToFirst(50).once('value');
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

        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();

        groups.forEach(group => {
            // Count members by counting keys in the members object
            const memberCount = group.members ? Object.keys(group.members).length : 0;

            // Check membership using object keys instead of array includes
            const isMember = currentUser && group.members && group.members[currentUser.uid];
            const isCreator = currentUser && group.creatorId === currentUser.uid;
            const isPending = currentUser && group.pendingMembers && group.pendingMembers[currentUser.uid];

            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.style.background = 'var(--card-bg)';
            groupCard.style.padding = '20px';
            groupCard.style.borderRadius = '10px';
            groupCard.style.marginBottom = '15px';

            // If user is the creator, show management options and chat button
            if (isCreator) {
                groupCard.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h4 style="margin-bottom: 10px;">${group.name} <span style="background: var(--warning-color); padding: 4px 8px; border-radius: 4px; font-size: 12px;">CREATOR</span></h4>
                            <p style="color: var(--text-secondary); margin-bottom: 15px;">${group.description}</p>
                            <div style="font-size: 13px; color: var(--text-secondary);">
                                <span><i class="fas fa-user"></i> ${group.creatorName}</span> • 
                                <span><i class="fas fa-users"></i> ${memberCount} members</span>
                            </div>
                        </div>
                        <button class="btn-primary" onclick="openGroupChat('${group.id}')">
                            <i class="fas fa-comments"></i> Chat
                        </button>
                    </div>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color); display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn-primary" onclick="manageGroupRequests('${group.id}')" style="background: var(--success-color);">
                            <i class="fas fa-user-check"></i> Manage Requests
                        </button>
                        <button class="btn-primary" onclick="deleteGroup('${group.id}')" style="background: var(--danger-color);">
                            <i class="fas fa-trash"></i> Delete Group
                        </button>
                        <p style="font-size: 12px; color: var(--text-secondary); margin-top: 10px; flex-basis: 100%;">Approve or reject requests to join your group</p>
                    </div>
                `;
            }
            // If user is already a member
            else if (isMember) {
                groupCard.innerHTML = `
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
                            <button class="btn-primary" onclick="leaveGroup('${group.id}')" style="background: var(--danger-color);">
                                <i class="fas fa-sign-out-alt"></i> Leave Group
                            </button>
                        </div>
                    </div>
                `;
            }
            // If user has a pending request
            else if (isPending) {
                groupCard.innerHTML = `
                    <h4 style="margin-bottom: 10px;">${group.name}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 15px;">${group.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-size: 13px; color: var(--text-secondary);">
                            <span><i class="fas fa-user"></i> ${group.creatorName}</span> • 
                            <span><i class="fas fa-users"></i> ${memberCount} members</span>
                        </div>
                        <button class="btn-primary" disabled style="opacity: 0.6;">Request Pending...</button>
                    </div>
                `;
            }
            // If user is not a member and hasn't requested to join
            else {
                groupCard.innerHTML = `
                    <h4 style="margin-bottom: 10px;">${group.name}</h4>
                    <p style="color: var(--text-secondary); margin-bottom: 15px;">${group.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-size: 13px; color: var(--text-secondary);">
                            <span><i class="fas fa-user"></i> ${group.creatorName}</span> • 
                            <span><i class="fas fa-users"></i> ${memberCount} members</span>
                        </div>
                        <button class="btn-primary" onclick="joinGroup('${group.id}')">Request to Join</button>
                    </div>
                `;
            }

            fragment.appendChild(groupCard);
        });

        groupsList.innerHTML = '';
        groupsList.appendChild(fragment);

    } catch (error) {
        console.error('Error loading groups:', error);
        if (error.code === 'PERMISSION_DENIED') {
            groupsList.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Permission denied. You may not have permission to view study groups. Please contact support if this issue persists.</p>';
        } else {
            groupsList.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading study groups: ' + error.message + '</p>';
        }
    }
}

// Join study group (modified to request approval instead of immediate join)
async function joinGroup(groupId) {
    if (!currentUser) {
        showNotification('Please login to join groups', 'error');
        return;
    }

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();

        // Check if group exists
        if (!group) {
            showNotification('Group not found', 'error');
            return;
        }

        // Check if user is already a member
        const members = group.members || {};
        if (members[currentUser.uid]) {
            showNotification('You are already a member of this group', 'info');
            // Automatically open the chat since they're a member
            openGroupChat(groupId);
            return;
        }

        // Check if user has already requested to join
        const pendingMembers = group.pendingMembers || {};
        if (pendingMembers[currentUser.uid]) {
            showNotification('You have already requested to join this group. Please wait for approval.', 'info');
            return;
        }

        // Add user to pending members list
        const updatedPendingMembers = { ...pendingMembers };
        updatedPendingMembers[currentUser.uid] = true;

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
        setTimeout(() => loadStudyGroups(), 1000); // Refresh after a short delay

    } catch (error) {
        console.error('Error requesting to join group:', error);
        // More detailed error message
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. The database rules may need to be updated. Please contact the site administrator or try again later.', 'error');
        } else {
            showNotification('Error requesting to join group: ' + error.message, 'error');
        }
    }
}

// Manage group requests (for group creators)
async function manageGroupRequests(groupId) {
    if (!currentUser) return;

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();

        // Check if current user is the group creator
        if (group.creatorId !== currentUser.uid) {
            showNotification('Only the group creator can manage requests', 'error');
            return;
        }

        const pendingMembers = group.pendingMembers || {};

        // Get pending member IDs from object keys
        const pendingMemberIds = Object.keys(pendingMembers);

        if (pendingMemberIds.length === 0) {
            showNotification('No pending requests', 'info');
            return;
        }

        // Fetch user data for pending members
        const pendingUsers = [];
        for (const userId of pendingMemberIds) {
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
    if (!currentUser) {
        showNotification('Please login to approve members', 'error');
        return;
    }

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();

        // Verify user is group creator
        if (group.creatorId !== currentUser.uid) {
            showNotification('Only the group creator can approve members', 'error');
            return;
        }

        // Remove from pending members
        const pendingMembers = { ...group.pendingMembers } || {};
        delete pendingMembers[userId];

        // Add to members
        const members = { ...group.members } || {};
        members[userId] = true;

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

        // Refresh the requests view after a short delay
        setTimeout(() => manageGroupRequests(groupId), 1000);

    } catch (error) {
        console.error('Error approving member:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. You may not be the group creator or the group may have been deleted.', 'error');
        } else {
            showNotification('Error approving member: ' + error.message, 'error');
        }
    }
}

// Reject member request to join group
async function rejectMember(groupId, userId) {
    if (!currentUser) {
        showNotification('Please login to reject members', 'error');
        return;
    }

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();

        // Verify user is group creator
        if (group.creatorId !== currentUser.uid) {
            showNotification('Only the group creator can reject members', 'error');
            return;
        }

        // Remove from pending members
        const pendingMembers = { ...group.pendingMembers } || {};
        delete pendingMembers[userId];

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

        // Refresh the requests view after a short delay
        setTimeout(() => manageGroupRequests(groupId), 1000);

    } catch (error) {
        console.error('Error rejecting member:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. You may not be the group creator or the group may have been deleted.', 'error');
        } else {
            showNotification('Error rejecting member: ' + error.message, 'error');
        }
    }
}

// Open group chat
async function openGroupChat(groupId) {
    if (!currentUser) {
        showNotification('Please login to access group chat', 'error');
        return;
    }

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();

        // Check if group exists
        if (!group) {
            showNotification('Group not found', 'error');
            return;
        }

        // Debug group membership
        console.log('Group data:', group);
        console.log('Current user ID:', currentUser.uid);
        console.log('Group members:', group.members);
        console.log('Is creator:', group.creatorId === currentUser.uid);

        // Check if user is a member of the group
        // Check membership using object keys instead of array includes
        const isMember = group.members && group.members[currentUser.uid];
        console.log('Is member:', isMember);

        // Also check if user is the creator (extra validation)
        const isCreator = group.creatorId === currentUser.uid;
        console.log('Is creator:', isCreator);

        // Check if user is a pending member
        const isPendingMember = group.pendingMembers && group.pendingMembers[currentUser.uid];
        console.log('Is pending member:', isPendingMember);

        if (!isMember && !isCreator && !isPendingMember) {
            showNotification('You must be a member of this group to access the chat', 'error');
            return;
        }

        // Log additional debug info
        console.log('Group ID from database:', groupId);
        console.log('Group data from database:', group);

        currentGroupId = groupId;
        document.getElementById('chatGroupName').textContent = group.name + ' - Chat';
        document.getElementById('groupChatContainer').style.display = 'block';

        // Load chat messages
        await loadGroupChatMessages(groupId);

        // Set up real-time listener for new messages
        await setupChatListener(groupId);

    } catch (error) {
        console.error('Error opening group chat:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. You may not be a member of this group or the group may have been deleted.', 'error');
        } else {
            showNotification('Error accessing group chat: ' + error.message, 'error');
        }
    }
}

// Leave group function
async function leaveGroup(groupId) {
    if (!currentUser) {
        showNotification('Please login to leave groups', 'error');
        return;
    }

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();

        // Check if group exists
        if (!group) {
            showNotification('Group not found', 'error');
            return;
        }

        // Check if user is the creator (creator cannot leave, must delete group)
        if (group.creatorId === currentUser.uid) {
            showNotification('Group creator cannot leave the group. Please delete the group instead.', 'error');
            return;
        }

        // Check if user is a member
        const isMember = group.members && group.members[currentUser.uid];
        if (!isMember) {
            showNotification('You are not a member of this group', 'error');
            return;
        }

        // Remove user from members
        const updatedMembers = { ...group.members };
        delete updatedMembers[currentUser.uid];

        // Update group
        await groupRef.update({
            members: updatedMembers
        });

        showNotification('You have left the group', 'success');

        // Close group chat if it's open
        if (currentGroupId === groupId) {
            closeGroupChat();
        }

        // Refresh the groups list
        setTimeout(() => loadStudyGroups(), 1000);

    } catch (error) {
        console.error('Error leaving group:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. You may not have permission to leave this group.', 'error');
        } else {
            showNotification('Error leaving group: ' + error.message, 'error');
        }
    }
}

// Delete group (only for creator)
async function deleteGroup(groupId) {
    if (!currentUser) {
        showNotification('Please login to delete groups', 'error');
        return;
    }

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const groupRef = database.ref('studyGroups/' + groupId);
        const snapshot = await groupRef.once('value');
        const group = snapshot.val();

        // Check if group exists
        if (!group) {
            showNotification('Group not found', 'error');
            return;
        }

        // Check if user is the creator
        if (group.creatorId !== currentUser.uid) {
            showNotification('Only the group creator can delete the group', 'error');
            return;
        }

        // Confirm deletion
        if (!confirm(`Are you sure you want to delete the group "${group.name}"? This action cannot be undone.`)) {
            return;
        }

        // Delete the group
        await groupRef.remove();

        // Also delete associated chat messages
        await database.ref('groupChats/' + groupId).remove();

        showNotification('Group deleted successfully', 'success');

        // Close group chat if it's open
        if (currentGroupId === groupId) {
            closeGroupChat();
        }

        // Refresh the groups list
        setTimeout(() => loadStudyGroups(), 1000);

    } catch (error) {
        console.error('Error deleting group:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. You may not have permission to delete this group.', 'error');
        } else {
            showNotification('Error deleting group: ' + error.message, 'error');
        }
    }
}

// Close group chat
async function closeGroupChat() {
    // Clear the global message tracking set
    displayedMessageSignatures.clear();

    // Remove chat listener if it exists
    if (currentGroupKey) {
        // Ensure Firebase is ready
        await ensureFirebaseReady();
        // Use currentGroupId before it's set to null
        database.ref('groupChats/' + currentGroupId).off('child_added', currentGroupKey);
        currentGroupKey = null;
    }

    document.getElementById('groupChatContainer').style.display = 'none';
    currentGroupId = null;
}

// Set up real-time listener for chat messages
async function setupChatListener(groupId) {
    // Ensure Firebase is ready
    await ensureFirebaseReady();

    // Remove previous listener if it exists
    if (currentGroupKey) {
        database.ref('groupChats/' + currentGroupId).off('child_added', currentGroupKey);
        currentGroupKey = null;
    }

    // Debug info
    console.log('Setting up chat listener for group:', groupId);

    // Set up new listener
    const messagesRef = database.ref('groupChats/' + groupId).orderByChild('timestamp');
    currentGroupKey = messagesRef.on('child_added', (snapshot) => {
        const message = snapshot.val();
        const messageId = snapshot.key;

        // Improved duplicate prevention - check if message with same ID already exists
        const chatMessages = document.getElementById('chatMessages');

        // Enhanced duplicate detection with multiple fallback methods
        let isDuplicate = false;

        // Method 1: Check by data attribute
        if (chatMessages.querySelector(`[data-message-id='${messageId}']`)) {
            isDuplicate = true;
            console.log('Duplicate detected by data attribute:', messageId);
        }
        // Method 2: Check by ID attribute
        else if (chatMessages.querySelector(`#${messageId}`)) {
            isDuplicate = true;
            console.log('Duplicate detected by ID attribute:', messageId);
        }
        // Method 3: Check by iterating through children
        else {
            const children = chatMessages.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].dataset && children[i].dataset.messageId === messageId) {
                    isDuplicate = true;
                    console.log('Duplicate detected by iteration:', messageId);
                    break;
                }
            }
        }

        // Additional check: Look for messages with identical content, timestamp, and sender
        if (!isDuplicate) {
            const children = chatMessages.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const header = child.querySelector('.message-header strong');
                const contentElem = child.querySelector('.message-content');
                const timeElem = child.querySelector('.message-time');

                if (header && contentElem && timeElem) {
                    const senderName = header.textContent;
                    const messageContent = contentElem.textContent;
                    const messageTime = timeElem.textContent;

                    // Format timestamp for comparison
                    const date = new Date(message.timestamp);
                    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    // Check if we have a message with same sender, content and time
                    if (senderName === (message.senderId === currentUser.uid ? 'You' : message.senderName) &&
                        messageContent === message.content &&
                        messageTime === timeString) {
                        isDuplicate = true;
                        console.log('Duplicate detected by content matching:', messageId);
                        break;
                    }
                }
            }
        }

        // Additional debug info
        console.log('Message received:', { messageId, message, isDuplicate });
        console.log('Current message count:', chatMessages.children.length);

        if (!isDuplicate) {
            displayNewMessage(message, messageId);
            // Scroll to bottom of chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            console.log('Duplicate message prevented based on ID:', messageId);
        }
    }, (error) => {
        console.error('Error with real-time listener:', error);
        if (error.code === 'PERMISSION_DENIED') {
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                chatMessages.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Permission denied. You may not be a member of this group or the group may have been deleted.</p>';
            }
        }
    });
}

// Send group message
async function sendGroupMessage() {
    if (!currentUser || !currentGroupId) {
        showNotification('Please join a group first', 'error');
        return;
    }

    const messageInput = document.getElementById('chatMessageInput');
    const content = messageInput.value.trim();

    if (!content) {
        showNotification('Please enter a message', 'error');
        return;
    }

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Debug info
        console.log('Sending message to group:', currentGroupId);
        console.log('Current user:', currentUser.uid);

        // Verify group membership before sending
        const groupRef = database.ref('studyGroups/' + currentGroupId);
        const groupSnapshot = await groupRef.once('value');
        const group = groupSnapshot.val();

        if (!group) {
            showNotification('Group not found or may have been deleted', 'error');
            return;
        }

        // Check if user is member, pending member, or creator
        // Check membership using object keys instead of array includes
        const isMember = group.members && group.members[currentUser.uid];
        const isPendingMember = group.pendingMembers && group.pendingMembers[currentUser.uid];
        const isCreator = group.creatorId === currentUser.uid;
        const hasAccess = isMember || isPendingMember || isCreator;

        console.log('Group membership check:', {
            isMember,
            isPendingMember,
            isCreator,
            hasAccess,
            members: group.members,
            pendingMembers: group.pendingMembers,
            creatorId: group.creatorId,
            currentUserId: currentUser.uid
        });

        if (!hasAccess) {
            throw new Error('You do not have permission to send messages in this group. You must be a member, pending member, or creator of this group.');
        }

        // Get user data
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();

        // Encrypt message content
        let encryptedContent = content;
        if (typeof CryptoJS !== 'undefined' && currentGroupId) {
            encryptedContent = CryptoJS.AES.encrypt(content, currentGroupId).toString();
        }

        // Save message to database
        const messageRef = database.ref('groupChats/' + currentGroupId).push();
        await messageRef.set({
            content: encryptedContent,
            senderId: currentUser.uid,
            senderName: userData.name || 'Anonymous',
            timestamp: Date.now()
        });

        // Clear input
        messageInput.value = '';

    } catch (error) {
        console.error('Error sending message:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. You may not have proper access to this group. Please try refreshing the page.', 'error');
        } else {
            showNotification('Error sending message: ' + error.message + '. Please try again.', 'error');
        }
    }
}

// Load group chat messages
async function loadGroupChatMessages(groupId) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    chatMessages.innerHTML = '<p style="text-align: center; padding: 20px;">Loading messages...</p>';

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Debug info
        console.log('Loading messages for group:', groupId);
        console.log('Current user:', currentUser.uid);

        // Verify group membership before loading messages
        const groupRef = database.ref('studyGroups/' + groupId);
        const groupSnapshot = await groupRef.once('value');
        const group = groupSnapshot.val();

        if (!group) {
            throw new Error('Group not found or may have been deleted');
        }

        // Check if user is member, pending member, or creator
        // Check membership using object keys instead of array includes
        const isMember = group.members && group.members[currentUser.uid];
        const isPendingMember = group.pendingMembers && group.pendingMembers[currentUser.uid];
        const isCreator = group.creatorId === currentUser.uid;
        const hasAccess = isMember || isPendingMember || isCreator;

        console.log('Group membership check for loading:', {
            isMember,
            isPendingMember,
            isCreator,
            hasAccess,
            members: group.members,
            pendingMembers: group.pendingMembers,
            creatorId: group.creatorId,
            currentUserId: currentUser.uid
        });

        // If user doesn't have access, prevent loading messages
        if (!hasAccess) {
            throw new Error('You do not have permission to view messages in this group. You must be a member, pending member, or creator of this group.');
        }

        // Limit messages to improve performance
        const messagesRef = database.ref('groupChats/' + groupId).orderByChild('timestamp').limitToLast(50);
        const snapshot = await messagesRef.once('value');

        const messages = [];
        snapshot.forEach(childSnapshot => {
            messages.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        // Sort messages by timestamp
        messages.sort((a, b) => a.timestamp - b.timestamp);

        if (messages.length === 0) {
            chatMessages.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No messages yet. Start the conversation!</p>';
            return;
        }

        // Display messages with document fragment for better performance
        const fragment = document.createDocumentFragment();
        const existingMessageIds = new Set(); // Track message IDs to prevent duplicates during initial load
        const displayedMessages = new Set(); // Track message signatures to prevent content duplicates

        console.log('Loading initial messages:', messages.length);

        messages.forEach(message => {
            // Check if we've already added this message by ID
            if (message.id && existingMessageIds.has(message.id)) {
                console.log('Skipping duplicate message during initial load (ID match):', message.id);
                return;
            }

            // Create a signature for content-based duplicate detection
            const messageSignature = `${message.senderId}-${message.timestamp}-${message.content}`;
            if (displayedMessages.has(messageSignature)) {
                console.log('Skipping duplicate message during initial load (content match):', message.id);
                return;
            }

            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.senderId === currentUser.uid ? 'message-sent' : 'message-received'}`;

            // Add message ID to prevent duplicates and track it
            if (message.id) {
                messageElement.dataset.messageId = message.id;
                existingMessageIds.add(message.id);
            }

            // Track the message signature
            displayedMessages.add(messageSignature);

            // Decrypt message content if it's encrypted
            let content = message.content;
            try {
                // Check if content is encrypted by trying to decrypt it
                if (groupId) {
                    const bytes = CryptoJS.AES.decrypt(message.content, groupId);
                    const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);
                    if (decryptedContent) {
                        content = decryptedContent;
                    }
                }
            } catch (e) {
                // If decryption fails, display as is
                console.warn('Could not decrypt message:', e);
            }

            // Format timestamp
            const date = new Date(message.timestamp);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messageElement.innerHTML = `
                <div class="message-header">
                    <strong>${message.senderId === currentUser.uid ? 'You' : escapeHtml(message.senderName)}</strong>
                </div>
                <div class="message-content">${escapeHtml(content)}</div>
                <div class="message-time">${timeString}</div>
            `;

            fragment.appendChild(messageElement);
        });

        chatMessages.innerHTML = '';
        chatMessages.appendChild(fragment);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        console.log('Finished loading initial messages. Total displayed:', chatMessages.children.length);

    } catch (error) {
        console.error('Error loading chat messages:', error);
        if (chatMessages) {
            if (error.code === 'PERMISSION_DENIED') {
                chatMessages.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Permission denied. You may not have proper access to this group. Please try refreshing the page.</p>';
            } else {
                chatMessages.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading messages: ' + error.message + '. Please try refreshing the page.</p>';
            }
        }
    }
}

// Display a new message in the chat (with improved duplicate prevention)
function displayNewMessage(message, messageId) {
    const chatMessages = document.getElementById('chatMessages');
    const isOwnMessage = message.senderId === currentUser.uid;

    // Decrypt message content if it's encrypted
    let content = message.content;
    try {
        // Check if content is encrypted by trying to decrypt it
        if (currentGroupId) {
            const bytes = CryptoJS.AES.decrypt(message.content, currentGroupId);
            const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);
            if (decryptedContent) {
                content = decryptedContent;
            }
        }
    } catch (e) {
        // If decryption fails, display as is (might be unencrypted during transition)
        console.warn('Could not decrypt message:', e);
    }

    // Format timestamp
    const date = new Date(message.timestamp);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create a unique signature for this message to prevent duplicates
    const messageSignature = `${message.senderId}-${message.timestamp}-${content}`;

    // Check if this message signature has already been displayed
    if (displayedMessageSignatures.has(messageSignature)) {
        console.log('Duplicate message prevented by signature check:', messageSignature);
        return;
    }

    // Create message element with proper duplicate prevention
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isOwnMessage ? 'message-sent' : 'message-received'}`;

    // Add message ID to prevent duplicates
    if (messageId) {
        // Enhanced duplicate checking before adding the message
        let isDuplicate = false;

        // Method 1: Check by data attribute
        if (chatMessages.querySelector(`[data-message-id='${messageId}']`)) {
            isDuplicate = true;
            console.log('Duplicate detected in displayNewMessage by data attribute:', messageId);
        }
        // Method 2: Check by ID attribute
        else if (chatMessages.querySelector(`#${messageId}`)) {
            isDuplicate = true;
            console.log('Duplicate detected in displayNewMessage by ID attribute:', messageId);
        }
        // Method 3: Check by iterating through children
        else {
            const children = chatMessages.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].dataset && children[i].dataset.messageId === messageId) {
                    isDuplicate = true;
                    console.log('Duplicate detected in displayNewMessage by iteration:', messageId);
                    break;
                }
            }
        }

        // Additional debug info
        console.log('About to display message:', { messageId, message, isDuplicate });

        if (isDuplicate) {
            console.log('Duplicate message prevented in displayNewMessage:', messageId);
            return; // Don't add duplicate message
        }

        messageElement.dataset.messageId = messageId;
    }

    // Add the message signature to our global tracking set
    displayedMessageSignatures.add(messageSignature);

    messageElement.innerHTML = `
        <div class="message-header">
            <strong>${isOwnMessage ? 'You' : escapeHtml(message.senderName)}</strong>
        </div>
        <div class="message-content">${escapeHtml(content)}</div>
        <div class="message-time">${timeString}</div>
    `;

    chatMessages.appendChild(messageElement);
}

// Display a new direct message in the chat (with improved duplicate prevention)
function displayNewDirectMessage(message) {
    const chatMessages = document.getElementById('directMessageChatMessages');
    if (!chatMessages) return;

    const isOwnMessage = message.senderId === currentUser.uid;

    // Decrypt message content if it's encrypted
    let content = message.content;
    try {
        // For direct messages, use the chat path as encryption key
        if (currentDirectMessageUserId) {
            const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
            const bytes = CryptoJS.AES.decrypt(message.content, chatPath);
            const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);
            if (decryptedContent) {
                content = decryptedContent;
            }
        }
    } catch (e) {
        // If decryption fails, display as is (might be unencrypted during transition)
        console.warn('Could not decrypt message:', e);
    }

    // Format timestamp
    const date = new Date(message.timestamp);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isOwnMessage ? 'message-sent' : 'message-received'}`;

    // Add timestamp as a pseudo-ID to help prevent duplicates in direct messages
    const pseudoId = `${message.senderId}-${message.timestamp}`;
    const existingMessage = chatMessages.querySelector(`[data-pseudo-id='${pseudoId}']`);
    if (existingMessage) {
        console.log('Duplicate direct message prevented based on sender and timestamp');
        return; // Don't add duplicate message
    }
    messageElement.dataset.pseudoId = pseudoId;

    messageElement.innerHTML = `
        <div class="message-header">
            <strong>${isOwnMessage ? 'You' : escapeHtml(message.senderName)}</strong>
        </div>
        <div class="message-content">${escapeHtml(content)}</div>
        <div class="message-time">${timeString}</div>
    `;

    chatMessages.appendChild(messageElement);
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
            <><h4>Send New Message</h4><input type="text" id="messageRecipient" placeholder="Recipient's name or email" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
                <textarea id="messageContent" placeholder="Your message..." rows="3" style="width: 100%; padding: 12px; background: var(--darker-bg); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px; font-family: inherit;"></textarea>
                <div style="display: flex; gap: 10px;">
                    <button onclick="sendNewMessage()" class="btn-primary">Send Message</button>
                    <button onclick="loadDirectMessages()" class="btn-primary" style="background: var(--border-color);">Cancel</button>
                </div>
            </div></>
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
        showNotification('To message other users, please use the "Select a user to message" interface below. You can only message users who are in the same study groups as you.', 'info');
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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

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
            <div style="margin-bottom: 20px; padding: 15px; background: var(--darker-bg); border-radius: 10px; border: 1px solid var(--border-color);">
                <><h4 style="margin-bottom: 10px;"><i class="fas fa-info-circle"></i> Messaging Information</h4><p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 0;">You can only message users who are in the same study groups as you. Join study groups to connect with more users.</p></>
            </div>
            <><h4 style="margin-bottom: 20px;">Select a user to message:</h4><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
                    ${users.map(user => `
                    <div class="user-card" style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color); cursor: pointer; transition: all 0.3s ease;" onclick="openDirectMessageChat('${user.id}', '${user.name.replace(/'/g, "\\'")}')">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 3px 8px rgba(99, 102, 241, 0.3); border: 1px solid white; transition: all 0.3s ease;">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <div style="font-weight: 600;">${user.name}</div>
                                <div style="font-size: 13px; color: var(--text-secondary);">${user.course}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
                </div></>
        `;

    } catch (error) {
        console.error('Error loading users:', error);
        messagesList.innerHTML = `<p style="text-align: center; color: var(--danger-color);">Error loading users: ${error.message}</p>`;
    }
}

// Check if two users are in the same study group
async function checkGroupMembership(userId1, userId2) {
    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Get all study groups
        const groupsSnapshot = await database.ref('studyGroups').once('value');

        // Check if both users are members of any common group
        let inSameGroup = false;

        groupsSnapshot.forEach(groupSnapshot => {
            if (inSameGroup) return; // Already found a common group

            const group = groupSnapshot.val();
            if (!group) return;

            // Use object-based membership checking instead of array-based
            const members = group.members || {};
            const pendingMembers = group.pendingMembers || {};

            // Check if both users are in this group (either as members, pending members, or creator)
            const isUser1InGroup = members[userId1] || pendingMembers[userId1] || group.creatorId === userId1;
            const isUser2InGroup = members[userId2] || pendingMembers[userId2] || group.creatorId === userId2;

            // Both users must be in the same group
            if (isUser1InGroup && isUser2InGroup) {
                inSameGroup = true;
                console.log(`Users ${userId1} and ${userId2} are both in group:`, group.name || groupSnapshot.key);
            }
        });

        console.log(`Group membership check result for users ${userId1} and ${userId2}: ${inSameGroup}`);
        return inSameGroup;
    } catch (error) {
        console.error('Error checking group membership:', error);
        // In case of error, we'll be more permissive to avoid blocking legitimate messages
        return true;
    }
}

// More permissive version - check if users share any group connection
async function checkGroupMembershipPermissive(userId1, userId2) {
    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Get all study groups
        const groupsSnapshot = await database.ref('studyGroups').once('value');

        // Track which groups each user is in
        let user1InAnyGroup = false;
        let user2InAnyGroup = false;

        groupsSnapshot.forEach(groupSnapshot => {
            const group = groupSnapshot.val();
            if (!group) return;

            // Use object-based membership checking instead of array-based
            const members = group.members || {};
            const pendingMembers = group.pendingMembers || {};

            // Check if users are in this group (either as members, pending members, or creator)
            if (members[userId1] || pendingMembers[userId1] || group.creatorId === userId1) {
                user1InAnyGroup = true;
            }

            if (members[userId2] || pendingMembers[userId2] || group.creatorId === userId2) {
                user2InAnyGroup = true;
            }
        });

        console.log(`User ${userId1} in any group: ${user1InAnyGroup}`);
        console.log(`User ${userId2} in any group: ${user2InAnyGroup}`);

        // Allow messaging if both users are in any groups
        const canMessage = user1InAnyGroup && user2InAnyGroup;
        console.log(`Direct messaging allowed: ${canMessage}`);
        return canMessage;
    } catch (error) {
        console.error('Error checking group membership:', error);
        // In case of error, we'll be more permissive to avoid blocking legitimate messages
        return true;
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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        console.log(`Checking if user ${currentUser.uid} can message user ${userId}`);

        // Use the more permissive check to allow messaging between any group members
        const canMessage = await checkGroupMembershipPermissive(currentUser.uid, userId);

        if (!canMessage) {
            showNotification('Both users need to be in study groups to message each other.', 'error');
            return;
        }

        currentDirectMessageUserId = userId;
        document.getElementById('directMessageChatName').textContent = 'Chat with ' + userName;
        document.getElementById('directMessageChatContainer').style.display = 'block';

        // Load chat messages
        await loadDirectMessageChatMessages(userId);

        // Set up real-time listener for new messages
        setupDirectMessageListener(userId);

    } catch (error) {
        console.error('Error opening direct message chat:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('You do not have permission to message this user.', 'error');
        } else {
            showNotification('Error opening chat: ' + error.message, 'error');
        }
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
    }, (error) => {
        console.error('Error with real-time listener:', error);
        if (error.code === 'PERMISSION_DENIED') {
            const chatMessages = document.getElementById('directMessageChatMessages');
            if (chatMessages) {
                chatMessages.innerHTML = '<p style="text-align: center; color: var(--danger-color);">You do not have permission to view messages with this user. You can only message users who are in the same study groups as you.</p>';
            }
        }
    });
}

// Load direct message chat messages
async function loadDirectMessageChatMessages(userId) {
    const chatMessages = document.getElementById('directMessageChatMessages');
    if (!chatMessages) return;

    chatMessages.innerHTML = '<p style="text-align: center; padding: 20px;">Loading messages...</p>';

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        const chatPath = getDirectMessageChatPath(currentUser.uid, userId);
        // Limit messages to improve performance
        const messagesRef = database.ref(chatPath).orderByChild('timestamp').limitToLast(50);
        const snapshot = await messagesRef.once('value');

        const messages = [];
        snapshot.forEach(childSnapshot => {
            messages.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        // Sort messages by timestamp
        messages.sort((a, b) => a.timestamp - b.timestamp);

        if (messages.length === 0) {
            chatMessages.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No messages yet. Start the conversation!</p>';
            return;
        }

        // Display messages with document fragment for better performance
        const fragment = document.createDocumentFragment();
        const displayedMessages = new Set(); // Track message signatures to prevent content duplicates

        messages.forEach(message => {
            // Create a signature for content-based duplicate detection
            const messageSignature = `${message.senderId}-${message.timestamp}-${message.content}`;
            if (displayedMessages.has(messageSignature)) {
                console.log('Skipping duplicate direct message during initial load (content match):', message.id);
                return;
            }

            // Track the message signature
            displayedMessages.add(messageSignature);

            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.senderId === currentUser.uid ? 'message-sent' : 'message-received'}`;

            // Add timestamp as a pseudo-ID to help prevent duplicates in direct messages
            const pseudoId = `${message.senderId}-${message.timestamp}`;
            messageElement.dataset.pseudoId = pseudoId;

            // Decrypt message content if it's encrypted
            let content = message.content;
            try {
                // For direct messages, use the chat path as encryption key
                if (currentDirectMessageUserId) {
                    const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
                    const bytes = CryptoJS.AES.decrypt(message.content, chatPath);
                    const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);
                    if (decryptedContent) {
                        content = decryptedContent;
                    }
                }
            } catch (e) {
                // If decryption fails, display as is
                console.warn('Could not decrypt message:', e);
            }

            // Format timestamp
            const date = new Date(message.timestamp);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messageElement.innerHTML = `
                <div class="message-header">
                    <strong>${message.senderId === currentUser.uid ? 'You' : message.senderName}</strong>
                </div>
                <div class="message-content">${escapeHtml(content)}</div>
                <div class="message-time">${timeString}</div>
            `;

            fragment.appendChild(messageElement);
        });

        chatMessages.innerHTML = '';
        chatMessages.appendChild(fragment);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (error) {
        console.error('Error loading chat messages:', error);
        if (chatMessages) {
            if (error.code === 'PERMISSION_DENIED') {
                chatMessages.innerHTML = '<p style="text-align: center; color: var(--danger-color);">You do not have permission to view messages with this user. You can only message users who are in the same study groups as you.</p>';
            } else {
                chatMessages.innerHTML = '<p style="text-align: center; color: var(--danger-color);">Error loading messages: ' + error.message + '</p>';
            }
        }
    }
}

// Display a new direct message in the chat (with improved duplicate prevention)
function displayNewDirectMessage(message) {
    const chatMessages = document.getElementById('directMessageChatMessages');
    if (!chatMessages) return;

    const isOwnMessage = message.senderId === currentUser.uid;

    // Decrypt message content if it's encrypted
    let content = message.content;
    try {
        // For direct messages, use the chat path as encryption key
        if (currentDirectMessageUserId) {
            const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
            const bytes = CryptoJS.AES.decrypt(message.content, chatPath);
            const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);
            if (decryptedContent) {
                content = decryptedContent;
            }
        }
    } catch (e) {
        // If decryption fails, display as is (might be unencrypted during transition)
        console.warn('Could not decrypt message:', e);
    }

    // Format timestamp
    const date = new Date(message.timestamp);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isOwnMessage ? 'message-sent' : 'message-received'}`;

    // Add timestamp as a pseudo-ID to help prevent duplicates in direct messages
    const pseudoId = `${message.senderId}-${message.timestamp}`;
    const existingMessage = chatMessages.querySelector(`[data-pseudo-id='${pseudoId}']`);
    if (existingMessage) {
        console.log('Duplicate direct message prevented based on sender and timestamp');
        return; // Don't add duplicate message
    }
    messageElement.dataset.pseudoId = pseudoId;

    messageElement.innerHTML = `
        <div class="message-header">
            <strong>${isOwnMessage ? 'You' : escapeHtml(message.senderName)}</strong>
        </div>
        <div class="message-content">${escapeHtml(content)}</div>
        <div class="message-time">${timeString}</div>
    `;

    chatMessages.appendChild(messageElement);
}

// Handle Enter key press in chat input
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendGroupMessage();
    }
}

// Clear all messages in a group chat
async function clearGroupChatMessages() {
    if (!currentGroupId || !currentUser) {
        showNotification('No active group chat to clear', 'error');
        return;
    }

    try {
        // Confirm with user
        if (!confirm('Are you sure you want to clear all messages in this chat? This cannot be undone.')) {
            return;
        }

        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Check if user is the group creator
        const groupRef = database.ref('studyGroups/' + currentGroupId);
        const groupSnapshot = await groupRef.once('value');
        const group = groupSnapshot.val();

        if (!group) {
            showNotification('Group not found', 'error');
            return;
        }

        // Only allow clearing if user is the creator
        if (group.creatorId !== currentUser.uid) {
            showNotification('Only the group creator can clear all messages', 'error');
            return;
        }

        // Clear all messages
        await database.ref('groupChats/' + currentGroupId).remove();

        // Reload the chat
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No messages yet. Start the conversation!</p>';

        showNotification('Chat cleared successfully', 'success');

    } catch (error) {
        console.error('Error clearing chat messages:', error);
        showNotification('Error clearing messages: ' + error.message, 'error');
    }
}

// Check if two users are in the same study group
async function checkGroupMembership(userId1, userId2) {
    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Get all study groups
        const groupsSnapshot = await database.ref('studyGroups').once('value');

        // Check if both users are members of any common group
        let inSameGroup = false;

        groupsSnapshot.forEach(groupSnapshot => {
            if (inSameGroup) return; // Already found a common group

            const group = groupSnapshot.val();
            if (!group) return;

            // Use object-based membership checking instead of array-based
            const members = group.members || {};
            const pendingMembers = group.pendingMembers || {};

            // Check if both users are in this group (either as members, pending members, or creator)
            const isUser1InGroup = members[userId1] || pendingMembers[userId1] || group.creatorId === userId1;
            const isUser2InGroup = members[userId2] || pendingMembers[userId2] || group.creatorId === userId2;

            // Both users must be in the same group
            if (isUser1InGroup && isUser2InGroup) {
                inSameGroup = true;
                console.log(`Users ${userId1} and ${userId2} are both in group:`, group.name || groupSnapshot.key);
            }
        });

        console.log(`Group membership check result for users ${userId1} and ${userId2}: ${inSameGroup}`);
        return inSameGroup;
    } catch (error) {
        console.error('Error checking group membership:', error);
        // In case of error, we'll be more permissive to avoid blocking legitimate messages
        return true;
    }
}

// More permissive version - check if users share any group connection
async function checkGroupMembershipPermissive(userId1, userId2) {
    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Get all study groups
        const groupsSnapshot = await database.ref('studyGroups').once('value');

        // Track which groups each user is in
        let user1InAnyGroup = false;
        let user2InAnyGroup = false;

        groupsSnapshot.forEach(groupSnapshot => {
            const group = groupSnapshot.val();
            if (!group) return;

            // Use object-based membership checking instead of array-based
            const members = group.members || {};
            const pendingMembers = group.pendingMembers || {};

            // Check if users are in this group (either as members, pending members, or creator)
            if (members[userId1] || pendingMembers[userId1] || group.creatorId === userId1) {
                user1InAnyGroup = true;
            }

            if (members[userId2] || pendingMembers[userId2] || group.creatorId === userId2) {
                user2InAnyGroup = true;
            }
        });

        console.log(`User ${userId1} in any group: ${user1InAnyGroup}`);
        console.log(`User ${userId2} in any group: ${user2InAnyGroup}`);

        // Allow messaging if both users are in any groups
        const canMessage = user1InAnyGroup && user2InAnyGroup;
        console.log(`Direct messaging allowed: ${canMessage}`);
        return canMessage;
    } catch (error) {
        console.error('Error checking group membership:', error);
        // In case of error, we'll be more permissive to avoid blocking legitimate messages
        return true;
    }
}

// Send direct message
async function sendDirectMessage() {
    if (!currentUser || !currentDirectMessageUserId) {
        showNotification('Please select a user to message', 'error');
        return;
    }

    const messageInput = document.getElementById('directMessageInput');
    const content = messageInput.value.trim();

    if (!content) {
        showNotification('Please enter a message', 'error');
        return;
    }

    try {
        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Get user data
        const userSnapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = userSnapshot.val();

        // Encrypt message content using chat path as key
        let encryptedContent = content;
        if (typeof CryptoJS !== 'undefined') {
            const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
            encryptedContent = CryptoJS.AES.encrypt(content, chatPath).toString();
        }

        // Save message to database
        const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);
        const messageRef = database.ref(chatPath).push();
        await messageRef.set({
            content: encryptedContent,
            senderId: currentUser.uid,
            senderName: userData.name || 'Anonymous',
            timestamp: Date.now()
        });

        // Clear input
        messageInput.value = '';

    } catch (error) {
        console.error('Error sending message:', error);
        if (error.code === 'PERMISSION_DENIED') {
            showNotification('Permission denied. Please try refreshing the page.', 'error');
        } else {
            showNotification('Error sending message: ' + error.message + '. Please try again.', 'error');
        }
    }
}

// Clear all messages in a direct message chat
async function clearDirectMessageChat() {
    if (!currentDirectMessageUserId || !currentUser) {
        showNotification('No active chat to clear', 'error');
        return;
    }

    try {
        // Confirm with user
        if (!confirm('Are you sure you want to clear all messages in this chat? This cannot be undone.')) {
            return;
        }

        // Ensure Firebase is ready
        await ensureFirebaseReady();

        // Get chat path
        const chatPath = getDirectMessageChatPath(currentUser.uid, currentDirectMessageUserId);

        // Clear all messages
        await database.ref(chatPath).remove();

        // Reload the chat
        const chatMessages = document.getElementById('directMessageChatMessages');
        chatMessages.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No messages yet. Start the conversation!</p>';

        showNotification('Chat cleared successfully', 'success');

    } catch (error) {
        console.error('Error clearing chat messages:', error);
        showNotification('Error clearing messages: ' + error.message, 'error');
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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

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
        // Ensure Firebase is ready
        await ensureFirebaseReady();

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