# Learnify - Complete Learning Platform

## 🔒 SECURITY UPDATE: API Keys Now Protected!

**Your Firebase config and Gemini API key are now secure!**  
👉 **[Read Security Quick Start](./SECURITY_QUICKSTART.md)** to deploy safely.

---

## 🎓 Overview
Learnify is a comprehensive web-based learning platform designed to help students track their progress, learn through curated resources, compete with peers, and get AI-powered study assistance.

---

## 🚀 Features

### ✅ Implemented Features

1. **User Authentication**
   - Email/Password login and signup
   - Password reset functionality
   - User profile management
   - Secure session handling with Firebase Auth

2. **Course Roadmap System**
   - Dynamic roadmap structure for 6 courses (BCA, BBA, B.Tech, Agriculture, Commerce, Arts)
   - Each subject broken into topics
   - Each topic includes 2+ YouTube video links
   - Progress tracking with "Mark Complete" functionality
   - Visual progress indicators per subject

3. **AI Study Assistant**
   - Integration with Google Gemini AI API (free tier)
   - Multiple modes: Explain, Generate Notes, Examples, Summarize
   - Interactive chat interface
   - Personalized study suggestions based on progress

4. **Gamification System**
   - XP points for completing topics (10 XP per topic)
   - XP for quiz completion (up to 50 XP based on score)
   - Level-up system (100 XP per level)
   - 12 unique badges/achievements
   - Daily streak tracking with bonus XP

5. **Leaderboard**
   - Global rankings by XP
   - Course-based filtering
   - Monthly top learners
   - Real-time rank updates

6. **Quiz System**
   - Topic-wise quizzes
   - Subject-wise assessments
   - Random challenge mode
   - Detailed result analysis
   - Quiz history tracking
   - Average accuracy calculation

7. **Resources Section**
   - YouTube video embeds
   - Searchable and filterable resources
   - Tagged by subject and difficulty
   - Easy-to-add new resources

8. **Community Features**
   - Discussion boards per subject
   - Q&A section with voting
   - Study group creation and joining
   - Reply and interaction system

9. **Progress Tracking**
   - Dashboard with key statistics
   - Progress charts (using Chart.js)
   - Weekly goal setting
   - AI-generated next steps
   - Completed topics counter

10. **Motivation Features**
    - Daily rotating motivational quotes
    - Streak counter with fire emoji
    - Level-up celebrations
    - Badge unlock notifications
    - Goal tracking system

---

## 📁 Project Structure

```
learnify/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling
├── js/
│   ├── config.js          # Firebase & API configuration
│   ├── auth.js            # Authentication logic
│   ├── roadmap.js         # Course roadmap & progress
│   ├── ai-assistant.js    # AI integration
│   ├── gamification.js    # XP, levels, badges
│   ├── quiz.js            # Quiz system
│   ├── leaderboard.js     # Rankings
│   ├── community.js       # Discussions, Q&A
│   └── app.js             # Main app coordination
├── README.md              # This file
└── SETUP.md              # Setup instructions
```

---

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend/Database**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Hosting**: Firebase Hosting (or Netlify)
- **AI API**: Google Gemini API (free tier)
- **Charts**: Chart.js
- **Icons**: Font Awesome 6.4.0

---

## 🎯 Course Structure

### Currently Supported Courses:

1. **BCA (Bachelor of Computer Applications)**
   - Programming Fundamentals
   - Web Development
   - Database Management

2. **BBA (Bachelor of Business Administration)**
   - Principles of Management
   - Marketing Management
   - Financial Accounting

3. **B.Tech (Bachelor of Technology)**
   - Engineering Mathematics
   - Object-Oriented Programming
   - Digital Electronics

4. **Agriculture**
   - Crop Science
   - Horticulture

5. **Commerce**
   - Accounting
   - Economics

6. **Arts**
   - History
   - English Literature
   - Sociology

### Adding New Courses

The roadmap is designed to be fully dynamic. To add new courses:

1. Open `js/roadmap.js`
2. Find the `COURSE_ROADMAPS` object
3. Add your new course following this structure:

```javascript
"CourseName": {
    name: "Full Course Name",
    subjects: [
        {
            id: "subject-id",
            name: "Subject Name",
            topics: [
                {
                    id: "topic-id",
                    name: "Topic Name",
                    videos: [
                        { title: "Video Title", url: "https://youtube.com/..." },
                        { title: "Another Video", url: "https://youtube.com/..." }
                    ]
                }
            ]
        }
    ]
}
```

---

## 🏆 Gamification Details

### XP System
- Complete a topic: **10 XP**
- Complete a quiz: **Up to 50 XP** (based on score)
- Daily login streak: **5 XP**
- Unlock a badge: **25 XP bonus**

### Level System
- Level 1: 0-99 XP
- Level 2: 100-199 XP
- Level 3: 200-299 XP
- And so on... (100 XP per level)

### Badges
1. **First Steps** - Complete 1 topic
2. **Rising Star** - Complete 10 topics
3. **Knowledge Seeker** - Complete 50 topics
4. **Master Learner** - Complete 100 topics
5. **Expert Learner** - Reach Level 5
6. **Legendary Scholar** - Reach Level 10
7. **Week Warrior** - 7-day streak
8. **Dedication Master** - 30-day streak
9. **Quiz Novice** - Complete first quiz
10. **Quiz Master** - Score 100% on 5 quizzes
11. **Community Helper** - Help 10 peers
12. **Top Learner** - Reach top 10 on leaderboard

---

## 🤖 AI Integration

The platform uses **Google Gemini API** (free tier) for AI assistance.

### AI Features:
- **Explain Topics**: Get clear explanations of concepts
- **Generate Notes**: Create bullet-point study notes
- **Get Examples**: Receive code or real-world examples
- **Summarize**: Condense long content

### Alternative AI Options:
If you prefer not to use Gemini, the code includes support for:
- Hugging Face API (commented out in `ai-assistant.js`)
- OpenRouter (can be added similarly)
- Any OpenAI-compatible API

---

## 📊 Data Structure

### Firebase Database Structure:
```
learnify-db/
├── users/
│   └── {userId}/
│       ├── name
│       ├── email
│       ├── course
│       ├── xp
│       ├── level
│       ├── badges: []
│       ├── completedTopics: []
│       ├── streak
│       ├── lastLoginDate
│       ├── weeklyGoal/
│       ├── quizResults/
│       └── dailyProgress/
├── discussions/
├── discussionReplies/
├── questions/
├── studyGroups/
└── leaderboard/
```

---

## 🎨 Customization

### Changing Colors
Edit `css/style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #ec4899;    /* Accent color */
    --success-color: #10b981;      /* Success messages */
    --warning-color: #f59e0b;      /* Warnings */
    --danger-color: #ef4444;       /* Errors */
}
```

### Adding Motivational Quotes
Edit `js/config.js` and add to the `motivationalQuotes` array.

---

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first design
- Collapsible sidebar on mobile
- Touch-friendly buttons
- Optimized layouts for all screen sizes

---

## 🔒 Security Features

- ✅ **API Keys Protected** - Keys stored securely on backend server
- ✅ **Backend Proxy** - Client never sees API keys
- ✅ **Environment Variables** - Secrets in `.env` file (not committed)
- ✅ **Firebase Authentication** - Secure login system
- ✅ **Database Security Rules** - User data protection
- ✅ **CORS Protection** - Cross-origin request security

### 🚀 Deploy Securely:
- **[Security Quick Start](./SECURITY_QUICKSTART.md)** - 3-minute setup
- **[Complete Security Guide](./SECURITY_GUIDE.md)** - Full documentation
- **[Firebase Rules](./FIREBASE_SECURITY_RULES.md)** - Database protection
- **[Node.js Setup](./SETUP_NODEJS.md)** - Local server installation
- Database security rules (configure in Firebase Console)
- Password reset via email
- Session management
- No sensitive data stored in localStorage

---

## 📈 Performance

- Lazy loading of sections
- Efficient database queries
- Optimized images and assets
- CDN for libraries (Chart.js, Font Awesome)
- Service Worker support (optional)

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

To extend this platform:

1. **Add new quiz questions**: Edit `QUIZ_QUESTIONS` in `quiz.js`
2. **Add new courses**: Edit `COURSE_ROADMAPS` in `roadmap.js`
3. **Add new badges**: Edit `BADGES` in `gamification.js`
4. **Customize UI**: Modify `style.css`

---

## 📞 Support

For issues or questions:
1. Check the setup guide in `SETUP.md`
2. Review Firebase documentation
3. Check browser console for errors

---

## 📝 License

This project is open-source and free to use for educational purposes.

---

## 🎉 Credits

- **Icons**: Font Awesome
- **Charts**: Chart.js
- **Backend**: Firebase
- **AI**: Google Gemini
- **Design**: Custom CSS with modern gradients

---

## 🚀 What's Next?

Future enhancements could include:
- PDF upload and viewer
- Voice-based AI assistant
- Live video sessions
- Collaborative study rooms
- Mobile app (React Native/Flutter)
- Certificate generation
- Email notifications
- Calendar integration
- Pomodoro timer
- Dark/Light theme toggle

---

**Built with ❤️ for learners everywhere**
