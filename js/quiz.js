// Quiz Module
// Handles quizzes, challenges, and assessments

// Sample quiz questions database
const QUIZ_QUESTIONS = {
    'BCA': {
        'programming': [
            {
                question: 'What is a variable in programming?',
                options: ['A container for storing data', 'A type of loop', 'A function', 'A constant value'],
                correct: 0,
                explanation: 'A variable is a container for storing data values that can change during program execution.'
            },
            {
                question: 'Which of the following is a valid C data type?',
                options: ['string', 'int', 'number', 'text'],
                correct: 1,
                explanation: 'int (integer) is a basic data type in C programming.'
            },
            {
                question: 'What does the "for" loop do?',
                options: ['Conditional execution', 'Repeated execution', 'Function definition', 'Variable declaration'],
                correct: 1,
                explanation: 'A for loop is used for repeated execution of a block of code.'
            },
            {
                question: 'What is an array?',
                options: ['A single variable', 'A collection of similar data items', 'A function', 'A loop'],
                correct: 1,
                explanation: 'An array is a data structure that stores a collection of elements of the same type.'
            },
            {
                question: 'What is the purpose of a function?',
                options: ['To store data', 'To reuse code', 'To declare variables', 'To create loops'],
                correct: 1,
                explanation: 'Functions allow you to write reusable blocks of code that can be called multiple times.'
            }
        ],
        'web-development': [
            {
                question: 'What does HTML stand for?',
                options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
                correct: 0,
                explanation: 'HTML stands for Hyper Text Markup Language, used to structure web pages.'
            },
            {
                question: 'Which CSS property changes text color?',
                options: ['text-color', 'color', 'font-color', 'text-style'],
                correct: 1,
                explanation: 'The "color" property in CSS is used to change the text color.'
            },
            {
                question: 'What is JavaScript primarily used for?',
                options: ['Styling web pages', 'Making web pages interactive', 'Database management', 'Server configuration'],
                correct: 1,
                explanation: 'JavaScript is primarily used to add interactivity and dynamic behavior to web pages.'
            },
            {
                question: 'Which HTML tag is used for creating links?',
                options: ['<link>', '<a>', '<href>', '<url>'],
                correct: 1,
                explanation: 'The <a> (anchor) tag is used to create hyperlinks in HTML.'
            },
            {
                question: 'What does CSS stand for?',
                options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
                correct: 1,
                explanation: 'CSS stands for Cascading Style Sheets, used for styling HTML elements.'
            }
        ],
        'database': [
            {
                question: 'What does SQL stand for?',
                options: ['Structured Query Language', 'Simple Query Language', 'Standard Question Language', 'Sequential Query Language'],
                correct: 0,
                explanation: 'SQL stands for Structured Query Language, used for managing databases.'
            },
            {
                question: 'Which SQL command is used to retrieve data?',
                options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
                correct: 1,
                explanation: 'SELECT is the SQL command used to retrieve data from a database.'
            },
            {
                question: 'What is a primary key?',
                options: ['A foreign reference', 'A unique identifier for a record', 'An index', 'A constraint'],
                correct: 1,
                explanation: 'A primary key is a unique identifier for each record in a database table.'
            },
            {
                question: 'Which SQL statement is used to insert data?',
                options: ['ADD', 'INSERT INTO', 'PUT', 'APPEND'],
                correct: 1,
                explanation: 'INSERT INTO is used to add new records to a database table.'
            },
            {
                question: 'What is normalization in databases?',
                options: ['Making data faster', 'Organizing data to reduce redundancy', 'Encrypting data', 'Backing up data'],
                correct: 1,
                explanation: 'Normalization is the process of organizing data to minimize redundancy and dependency.'
            }
        ]
    },
    'BBA': {
        'management': [
            {
                question: 'What is management?',
                options: ['Only planning', 'Coordinating resources to achieve goals', 'Just controlling', 'Employee supervision'],
                correct: 1,
                explanation: 'Management is the process of coordinating and organizing resources to achieve organizational goals.'
            },
            {
                question: 'Who proposed the 14 Principles of Management?',
                options: ['Peter Drucker', 'Henri Fayol', 'Frederick Taylor', 'Elton Mayo'],
                correct: 1,
                explanation: 'Henri Fayol proposed the 14 Principles of Management.'
            },
            {
                question: 'What does SWOT stand for?',
                options: ['Success, Work, Opportunities, Threats', 'Strengths, Weaknesses, Opportunities, Threats', 'Strategy, Work, Organization, Time', 'System, Workflow, Operations, Training'],
                correct: 1,
                explanation: 'SWOT stands for Strengths, Weaknesses, Opportunities, and Threats - a strategic planning tool.'
            }
        ],
        'marketing': [
            {
                question: 'What are the 4 Ps of Marketing?',
                options: ['Product, Price, Place, Promotion', 'Planning, Product, Price, People', 'Profit, Price, Product, Place', 'People, Process, Product, Promotion'],
                correct: 0,
                explanation: 'The 4 Ps of Marketing are Product, Price, Place, and Promotion.'
            },
            {
                question: 'What is a target market?',
                options: ['Any customer', 'Specific group of potential customers', 'Competitors', 'Suppliers'],
                correct: 1,
                explanation: 'A target market is a specific group of consumers at which a company aims its products and services.'
            }
        ]
    },
    'BTech': {
        'engineering-math': [
            {
                question: 'What is the derivative of x²?',
                options: ['x', '2x', 'x²', '2'],
                correct: 1,
                explanation: 'Using the power rule, the derivative of x² is 2x.'
            },
            {
                question: 'What is a matrix?',
                options: ['A number', 'A rectangular array of numbers', 'A vector', 'An equation'],
                correct: 1,
                explanation: 'A matrix is a rectangular array of numbers arranged in rows and columns.'
            }
        ],
        'oop': [
            {
                question: 'What is encapsulation in OOP?',
                options: ['Hiding implementation details', 'Creating objects', 'Inheritance', 'Polymorphism'],
                correct: 0,
                explanation: 'Encapsulation is the bundling of data and methods, hiding implementation details from the user.'
            },
            {
                question: 'What is inheritance?',
                options: ['Creating new objects', 'Acquiring properties from parent class', 'Hiding data', 'Overloading methods'],
                correct: 1,
                explanation: 'Inheritance allows a class to acquire properties and methods from another class.'
            }
        ]
    }
};

let currentQuiz = null;
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];

// Start a quiz
function startQuiz(type) {
    if (!currentUser) {
        showNotification('Please login to take quizzes', 'error');
        return;
    }
    
    // Get user's course
    database.ref('users/' + currentUser.uid).once('value').then(snapshot => {
        const userData = snapshot.val();
        const course = userData.course || 'BCA';
        
        let questions = [];
        
        if (type === 'topic' || type === 'subject') {
            // Show subject selection
            showSubjectSelection(course, type);
        } else if (type === 'random') {
            // Mix questions from all subjects
            const courseQuestions = QUIZ_QUESTIONS[course];
            if (courseQuestions) {
                Object.keys(courseQuestions).forEach(subject => {
                    questions = questions.concat(courseQuestions[subject]);
                });
                
                // Shuffle and take 10 random questions
                questions = shuffleArray(questions).slice(0, 10);
                initializeQuiz(questions, 'Random Challenge');
            }
        } else if (type === 'compete') {
            showNotification('Multiplayer feature coming soon!', 'info');
        }
    });
}

// Show subject selection for quiz
function showSubjectSelection(course, quizType) {
    const courseQuestions = QUIZ_QUESTIONS[course];
    if (!courseQuestions) {
        showNotification('No quizzes available for this course yet', 'error');
        return;
    }
    
    const subjects = Object.keys(courseQuestions);
    const quizContainer = document.getElementById('quizContainer');
    
    quizContainer.style.display = 'block';
    quizContainer.innerHTML = `
        <div class="quiz-subject-selection">
            <h3>Select a Subject</h3>
            <div class="subject-buttons">
                ${subjects.map(subject => `
                    <button class="quiz-card" onclick="selectQuizSubject('${course}', '${subject}', '${quizType}')" style="display: inline-block; margin: 10px;">
                        <i class="fas fa-book"></i>
                        <h3>${subject.replace('-', ' ').toUpperCase()}</h3>
                    </button>
                `).join('')}
            </div>
            <button class="btn-primary" onclick="document.getElementById('quizContainer').style.display='none'" style="margin-top: 20px;">Cancel</button>
        </div>
    `;
}

// Select subject and start quiz
function selectQuizSubject(course, subject, quizType) {
    const questions = QUIZ_QUESTIONS[course][subject];
    if (!questions || questions.length === 0) {
        showNotification('No questions available for this subject', 'error');
        return;
    }
    
    initializeQuiz(questions, `${subject.replace('-', ' ').toUpperCase()} Quiz`);
}

// Initialize quiz
function initializeQuiz(questions, title) {
    currentQuiz = shuffleArray([...questions]); // Shuffle questions
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
    
    displayQuestion(title);
}

// Display current question
function displayQuestion(quizTitle) {
    if (currentQuestionIndex >= currentQuiz.length) {
        showQuizResults(quizTitle);
        return;
    }
    
    const question = currentQuiz[currentQuestionIndex];
    const quizContainer = document.getElementById('quizContainer');
    
    quizContainer.style.display = 'block';
    quizContainer.innerHTML = `
        <div class="quiz-active">
            <div class="quiz-header">
                <h3>${quizTitle}</h3>
                <div class="quiz-progress">
                    Question ${currentQuestionIndex + 1} of ${currentQuiz.length}
                </div>
            </div>
            
            <div class="quiz-question">
                <h4>${question.question}</h4>
            </div>
            
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="selectAnswer(${index})">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </button>
                `).join('')}
            </div>
            
            <div class="quiz-navigation">
                <button class="btn-primary" onclick="skipQuestion()">Skip</button>
            </div>
        </div>
    `;
}

// Select answer
function selectAnswer(selectedIndex) {
    const question = currentQuiz[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    quizAnswers.push({
        question: question.question,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect,
        explanation: question.explanation
    });
    
    if (isCorrect) {
        quizScore++;
        showNotification('Correct! ✓', 'success');
    } else {
        showNotification('Incorrect. ' + question.explanation, 'error');
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion('Quiz');
    }, 1500);
}

// Skip question
function skipQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    
    quizAnswers.push({
        question: question.question,
        selected: -1,
        correct: question.correct,
        isCorrect: false,
        explanation: question.explanation,
        skipped: true
    });
    
    currentQuestionIndex++;
    displayQuestion('Quiz');
}

// Show quiz results
async function showQuizResults(quizTitle) {
    const percentage = Math.round((quizScore / currentQuiz.length) * 100);
    const passed = percentage >= 60;
    
    // Award XP based on score
    const xpEarned = Math.round(APP_CONFIG.xpPerQuiz * (percentage / 100));
    
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <div class="result-score ${passed ? 'passed' : 'failed'}">
                <div class="score-circle">
                    <span class="score-value">${percentage}%</span>
                    <span class="score-label">Score</span>
                </div>
            </div>
            
            <div class="result-stats">
                <div class="stat">
                    <strong>${quizScore}</strong>
                    <span>Correct</span>
                </div>
                <div class="stat">
                    <strong>${currentQuiz.length - quizScore}</strong>
                    <span>Incorrect</span>
                </div>
                <div class="stat">
                    <strong>+${xpEarned}</strong>
                    <span>XP Earned</span>
                </div>
            </div>
            
            <div class="result-message">
                ${passed ? 
                    '<p style="color: var(--success-color);">🎉 Great job! You passed the quiz!</p>' : 
                    '<p style="color: var(--warning-color);">Keep practicing! You can do better!</p>'
                }
            </div>
            
            <div class="result-details">
                <h4>Question Review</h4>
                ${quizAnswers.map((answer, index) => `
                    <div class="answer-review ${answer.isCorrect ? 'correct' : 'incorrect'}">
                        <strong>Q${index + 1}: ${answer.question}</strong>
                        <p>${answer.skipped ? 'Skipped' : (answer.isCorrect ? '✓ Correct' : '✗ Incorrect')}</p>
                        ${!answer.isCorrect ? `<small>Explanation: ${answer.explanation}</small>` : ''}
                    </div>
                `).join('')}
            </div>
            
            <div class="result-actions">
                <button class="btn-primary" onclick="document.getElementById('quizContainer').style.display='none'; loadQuizHistory()">Done</button>
                <button class="btn-primary" onclick="startQuiz('random')">Take Another Quiz</button>
            </div>
        </div>
    `;
    
    // Save quiz result
    await saveQuizResult(quizTitle, quizScore, currentQuiz.length, percentage, xpEarned);
    
    // Award XP
    await awardXP(xpEarned, 'Quiz completed');
    
    // Check for perfect score badge
    if (percentage === 100) {
        updatePerfectQuizCount();
    }
}

// Save quiz result to database
async function saveQuizResult(title, score, total, percentage, xpEarned) {
    if (!currentUser) return;
    
    try {
        const resultRef = database.ref('users/' + currentUser.uid + '/quizResults').push();
        await resultRef.set({
            title: title,
            score: score,
            total: total,
            percentage: percentage,
            xpEarned: xpEarned,
            date: Date.now()
        });
        
        // Update quiz count
        const userRef = database.ref('users/' + currentUser.uid);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
        
        await userRef.update({
            quizzesTaken: (userData.quizzesTaken || 0) + 1
        });
        
        // Update average accuracy
        updateAverageAccuracy();
        
    } catch (error) {
        console.error('Error saving quiz result:', error);
    }
}

// Update perfect quiz count
async function updatePerfectQuizCount() {
    if (!currentUser) return;
    
    try {
        const userRef = database.ref('users/' + currentUser.uid);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
        
        await userRef.update({
            perfectQuizzes: (userData.perfectQuizzes || 0) + 1
        });
        
        checkAndAwardBadges();
        
    } catch (error) {
        console.error('Error updating perfect quiz count:', error);
    }
}

// Update average accuracy
async function updateAverageAccuracy() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid + '/quizResults').once('value');
        const results = snapshot.val();
        
        if (!results) return;
        
        const resultsArray = Object.values(results);
        const totalPercentage = resultsArray.reduce((sum, result) => sum + result.percentage, 0);
        const avgAccuracy = Math.round(totalPercentage / resultsArray.length);
        
        document.getElementById('avgAccuracy').textContent = avgAccuracy + '%';
        document.getElementById('quizzesTaken').textContent = resultsArray.length;
        
    } catch (error) {
        console.error('Error calculating average:', error);
    }
}

// Load quiz history
async function loadQuizHistory() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid + '/quizResults').once('value');
        const results = snapshot.val();
        
        const historyDiv = document.getElementById('quizHistory');
        if (!historyDiv) return;
        
        if (!results) {
            historyDiv.innerHTML = '<p style="color: var(--text-secondary);">No quiz history yet. Take your first quiz!</p>';
            return;
        }
        
        const resultsArray = Object.values(results).sort((a, b) => b.date - a.date);
        
        historyDiv.innerHTML = resultsArray.slice(0, 5).map(result => {
            const date = new Date(result.date);
            const passed = result.percentage >= 60;
            
            return `
                <div class="quiz-history-item">
                    <div class="quiz-history-header">
                        <strong>${result.title}</strong>
                        <span class="${passed ? 'passed' : 'failed'}">${result.percentage}%</span>
                    </div>
                    <div class="quiz-history-details">
                        <small>${result.score}/${result.total} correct • +${result.xpEarned} XP • ${date.toLocaleDateString()}</small>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading quiz history:', error);
    }
}

// Utility: Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Add quiz styles
const quizStyle = document.createElement('style');
quizStyle.textContent = `
    .quiz-active,
    .quiz-results,
    .quiz-subject-selection {
        background: var(--card-bg);
        padding: 30px;
        border-radius: 15px;
        max-width: 700px;
    }
    
    .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid var(--border-color);
    }
    
    .quiz-question {
        margin-bottom: 30px;
    }
    
    .quiz-question h4 {
        font-size: 20px;
        line-height: 1.6;
    }
    
    .quiz-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
    }
    
    .quiz-option {
        padding: 15px 20px;
        background: var(--darker-bg);
        border: 2px solid var(--border-color);
        border-radius: 10px;
        color: var(--text-primary);
        text-align: left;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 16px;
    }
    
    .quiz-option:hover {
        border-color: var(--primary-color);
        background: var(--primary-color);
        transform: translateX(5px);
    }
    
    .score-circle {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 30px auto;
    }
    
    .score-value {
        font-size: 48px;
        font-weight: bold;
        color: white;
    }
    
    .score-label {
        color: white;
        opacity: 0.9;
    }
    
    .result-stats {
        display: flex;
        justify-content: space-around;
        margin: 30px 0;
        padding: 20px;
        background: var(--darker-bg);
        border-radius: 10px;
    }
    
    .result-stats .stat {
        text-align: center;
    }
    
    .result-stats strong {
        display: block;
        font-size: 32px;
        color: var(--primary-color);
        margin-bottom: 5px;
    }
    
    .answer-review {
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 10px;
        background: var(--darker-bg);
    }
    
    .answer-review.correct {
        border-left: 4px solid var(--success-color);
    }
    
    .answer-review.incorrect {
        border-left: 4px solid var(--danger-color);
    }
    
    .result-actions {
        display: flex;
        gap: 15px;
        margin-top: 30px;
    }
    
    .quiz-history-item {
        padding: 15px;
        background: var(--darker-bg);
        border-radius: 10px;
        margin-bottom: 15px;
    }
    
    .quiz-history-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    
    .passed {
        color: var(--success-color);
        font-weight: 600;
    }
    
    .failed {
        color: var(--warning-color);
        font-weight: 600;
    }
`;
document.head.appendChild(quizStyle);

// Load quiz history on page load
window.addEventListener('load', () => {
    if (currentUser) {
        setTimeout(() => {
            loadQuizHistory();
            updateAverageAccuracy();
        }, 2000);
    }
});