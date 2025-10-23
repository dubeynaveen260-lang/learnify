// AI Assistant Module
// Integrates with Google Gemini API for study assistance

let currentAIMode = 'explain';

// Set AI mode (explain, notes, examples, summarize)
function setAIMode(mode) {
    currentAIMode = mode;
    
    // Highlight selected button
    document.querySelectorAll('.ai-feature-btn').forEach(btn => {
        btn.style.borderColor = 'var(--border-color)';
        btn.style.background = 'var(--card-bg)';
    });
    
    event.target.closest('.ai-feature-btn').style.borderColor = 'var(--primary-color)';
    event.target.closest('.ai-feature-btn').style.background = 'var(--primary-color)';
    
    // Add system message
    addAIMessage(`Mode changed to: ${mode}. How can I help you?`, 'bot');
}

// Handle Enter key in AI input
function handleAIEnter(event) {
    if (event.key === 'Enter') {
        sendAIMessage();
    }
}

// Send message to AI
async function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addAIMessage(message, 'user');
    input.value = '';
    
    // Show loading indicator
    const loadingId = addAIMessage('Thinking... 🤔', 'bot');
    
    try {
        // Construct prompt based on mode
        let prompt = constructPrompt(message, currentAIMode);
        
        // Call Gemini API
        const response = await callGeminiAPI(prompt);
        
        // Remove loading message
        removeAIMessage(loadingId);
        
        // Add AI response
        addAIMessage(response, 'bot');
        
    } catch (error) {
        console.error('AI Error:', error);
        removeAIMessage(loadingId);
        
        let errorMessage = 'Sorry, I encountered an error. ';
        
        if (error.message.includes('API key')) {
            errorMessage += 'Please check your Gemini API key configuration. Get a free key at https://makersuite.google.com/app/apikey';
        } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
            errorMessage += 'API rate limit reached. Please wait a moment and try again.';
        } else if (error.message.includes('Network')) {
            errorMessage += 'Please check your internet connection and try again.';
        } else {
            errorMessage += 'Please try again in a moment.';
        }
        
        addAIMessage(errorMessage, 'bot');
    }
}

// Construct prompt based on mode
function constructPrompt(userMessage, mode) {
    let systemPrompt = '';
    
    switch(mode) {
        case 'explain':
            systemPrompt = 'You are a helpful study assistant. Explain the following topic in a clear, concise way that a student can understand. Use simple language and examples when helpful. Keep the explanation under 150 words.';
            break;
        case 'notes':
            systemPrompt = 'You are a study notes generator. Create short, bullet-point study notes for the following topic. Focus on key concepts, definitions, and important points. Format as clear bullet points.';
            break;
        case 'examples':
            systemPrompt = 'You are a coding and concept example generator. Provide 2-3 clear, practical examples for the following topic. If it\'s a programming topic, include code examples. If it\'s a theory topic, provide real-world examples.';
            break;
        case 'summarize':
            systemPrompt = 'You are a text summarizer. Summarize the following content in a brief, clear manner. Extract the main points and key takeaways. Keep it concise and focused.';
            break;
        default:
            systemPrompt = 'You are a helpful study assistant. Answer the following question clearly and concisely.';
    }
    
    return `${systemPrompt}\n\nUser Query: ${userMessage}`;
}

// Call Google Gemini API (through secure backend proxy)
async function callGeminiAPI(prompt) {
    console.log('🤖 Calling AI with prompt:', prompt.substring(0, 50) + '...');
    
    // Check if we're using the backend server or direct API
    const isUsingServer = GEMINI_API_URL === '/api/ai/chat';
    
    if (isUsingServer) {
        console.log('📡 Using backend proxy server');
        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });
            
            if (!response.ok) {
                // Server not available, fall back to direct API
                console.warn('⚠️ Backend server not available, using direct API');
                return await callGeminiDirectAPI(prompt);
            }
            
            const data = await response.json();
            
            if (data.response) {
                console.log('✅ AI response received from server');
                return data.response;
            } else {
                throw new Error('No response from AI');
            }
        } catch (error) {
            console.error('❌ Server error:', error.message);
            console.log('🔄 Trying direct API...');
            return await callGeminiDirectAPI(prompt);
        }
    } else {
        // Using direct API URL
        return await callGeminiDirectAPI(prompt);
    }
}

// Direct API call (fallback when server is not running)
async function callGeminiDirectAPI(prompt) {
    console.log('🔑 Using direct Gemini API');
    
    // Use the API key from config if available
    const apiKey = window.GEMINI_API_KEY_FALLBACK || '';
    
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        throw new Error('API key not configured. Please add your Gemini API key. Get a free key from https://makersuite.google.com/app/apikey');
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
    
    const requestBody = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        },
        safetySettings: [
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ Gemini API Error:', errorData);
            
            if (response.status === 400) {
                if (errorData.error?.message?.includes('API key')) {
                    throw new Error('Invalid API key. Please check your Gemini API key.');
                }
                throw new Error('Invalid request. Please try a different question.');
            } else if (response.status === 403) {
                throw new Error('API key invalid or quota exceeded. Get a new key from https://makersuite.google.com/app/apikey');
            } else if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please wait a moment and try again.');
            } else {
                throw new Error(`API error (${response.status}). Please try again.`);
            }
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            console.log('✅ AI response received from Gemini');
            return data.candidates[0].content.parts[0].text;
        } else if (data.candidates && data.candidates[0]?.finishReason === 'SAFETY') {
            throw new Error('Response blocked due to safety filters. Please rephrase your question.');
        } else {
            throw new Error('No valid response from AI. Please try again.');
        }
    } catch (error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
    }
}

// Add message to chat
function addAIMessage(message, sender) {
    const chatContainer = document.getElementById('aiChat');
    const messageId = 'msg-' + Date.now();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender}`;
    messageDiv.id = messageId;
    
    const icon = sender === 'bot' 
        ? '<i class="fas fa-robot"></i>' 
        : '<i class="fas fa-user"></i>';
    
    messageDiv.innerHTML = `
        ${icon}
        <div class="message-content">
            <p>${formatMessage(message)}</p>
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return messageId;
}

// Remove message (for loading indicators)
function removeAIMessage(messageId) {
    const message = document.getElementById(messageId);
    if (message) {
        message.remove();
    }
}

// Format message (convert markdown-like syntax to HTML)
function formatMessage(message) {
    // Convert **bold** to <strong>
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *italic* to <em>
    message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert code blocks
    message = message.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
    
    // Convert inline code
    message = message.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Convert line breaks
    message = message.replace(/\n/g, '<br>');
    
    // Convert bullet points
    message = message.replace(/^- (.+)$/gm, '<li>$1</li>');
    if (message.includes('<li>')) {
        message = '<ul>' + message + '</ul>';
    }
    
    return message;
}

// Pre-defined quick prompts for common study topics
const QUICK_PROMPTS = {
    'programming': [
        'Explain variables and data types',
        'What are functions in programming?',
        'Explain loops and iteration',
        'What is object-oriented programming?'
    ],
    'web-development': [
        'How does HTML work?',
        'What is CSS used for?',
        'Explain JavaScript basics',
        'What is responsive design?'
    ],
    'database': [
        'What is SQL?',
        'Explain database normalization',
        'What are primary and foreign keys?',
        'How do joins work in SQL?'
    ],
    'general': [
        'How can I study more effectively?',
        'Tips for exam preparation',
        'How to manage study time?',
        'Best practices for note-taking'
    ]
};

// Add quick prompt buttons (can be triggered from roadmap or resources)
function showQuickPrompts(category = 'general') {
    const prompts = QUICK_PROMPTS[category] || QUICK_PROMPTS['general'];
    
    const promptsHTML = prompts.map(prompt => 
        `<button class="quick-prompt-btn" onclick="useQuickPrompt('${prompt}')">${prompt}</button>`
    ).join('');
    
    addAIMessage(`Quick questions about ${category}:<br><br>${promptsHTML}`, 'bot');
}

// Use a quick prompt
function useQuickPrompt(prompt) {
    document.getElementById('aiInput').value = prompt;
    sendAIMessage();
}

// Generate personalized study suggestions based on user progress
async function generateStudySuggestions() {
    if (!currentUser) return;
    
    try {
        const snapshot = await database.ref('users/' + currentUser.uid).once('value');
        const userData = snapshot.val();
        
        const completedTopics = userData.completedTopics || [];
        const course = userData.course || 'BCA';
        
        let suggestions = [];
        
        if (completedTopics.length === 0) {
            suggestions.push('Start with the basics - complete your first topic!');
            suggestions.push('Watch the introductory videos in your course roadmap');
        } else if (completedTopics.length < 5) {
            suggestions.push('Great start! Try to complete at least 5 topics this week');
            suggestions.push('Take short quizzes to test your understanding');
        } else {
            suggestions.push('You\'re making good progress! Consider taking subject-wise quizzes');
            suggestions.push('Review completed topics to reinforce learning');
            suggestions.push('Try helping others in the community discussion boards');
        }
        
        // Add suggestions to dashboard
        const nextStepsDiv = document.getElementById('nextSteps');
        if (nextStepsDiv) {
            nextStepsDiv.innerHTML = suggestions.map(suggestion => `
                <div class="next-step-item">
                    <i class="fas fa-lightbulb"></i>
                    <p>${suggestion}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error generating suggestions:', error);
    }
}

// Alternative: Use Hugging Face API (free alternative)
async function callHuggingFaceAPI(prompt) {
    // This is an alternative if you want to use Hugging Face instead of Gemini
    const HF_API_KEY = 'YOUR_HUGGINGFACE_API_KEY_HERE';
    const HF_MODEL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
    
    const response = await fetch(HF_MODEL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: prompt
        })
    });
    
    const data = await response.json();
    return data[0].generated_text;
}

// PDF Text Extraction (basic client-side approach)
async function extractTextFromPDF(file) {
    // This would require PDF.js library for full functionality
    // For now, return a placeholder
    return 'PDF text extraction requires additional setup. Please paste the text you want summarized.';
}

// Initialize AI suggestions when user loads dashboard
window.addEventListener('load', () => {
    if (currentUser) {
        setTimeout(generateStudySuggestions, 2000);
    }
});

// Add CSS for quick prompt buttons
const aiStyle = document.createElement('style');
aiStyle.textContent = `
    .quick-prompt-btn {
        display: inline-block;
        margin: 5px;
        padding: 8px 15px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.3s;
    }
    
    .quick-prompt-btn:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
    }
    
    .message-content code {
        background: var(--darker-bg);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
    }
    
    .message-content pre {
        background: var(--darker-bg);
        padding: 15px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 10px 0;
    }
    
    .message-content pre code {
        background: transparent;
        padding: 0;
    }
    
    .message-content ul {
        margin: 10px 0;
        padding-left: 20px;
    }
    
    .message-content li {
        margin: 5px 0;
    }
`;
document.head.appendChild(aiStyle);
