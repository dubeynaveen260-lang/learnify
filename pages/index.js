import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalXP: 0,
    completedTopics: 0,
    quizzesTaken: 0,
    avgAccuracy: '0%'
  });

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      // This would be replaced with actual Firebase auth check
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };
    
    checkAuth();
  }, []);

  return (
    <div id="mainApp">
      <Head>
        <title>Learnify - Dashboard</title>
        <meta name="description" content="Your personalized learning dashboard" />
      </Head>

      {/* Navigation */}
      <nav className="top-nav">
        <div className="nav-brand">
          <i className="fas fa-graduation-cap"></i>
          <span>Learnify</span>
        </div>
        
        <div className="nav-links">
          <Link href="/" className="nav-link active">
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </Link>
          <Link href="/roadmap" className="nav-link">
            <i className="fas fa-map"></i>
            <span>Roadmap</span>
          </Link>
          <Link href="/resources" className="nav-link">
            <i className="fas fa-book"></i>
            <span>Resources</span>
          </Link>
          <Link href="/ai-assistant" className="nav-link">
            <i className="fas fa-robot"></i>
            <span>AI Assistant</span>
          </Link>
          <Link href="/quizzes" className="nav-link">
            <i className="fas fa-clipboard-question"></i>
            <span>Quizzes</span>
          </Link>
          <Link href="/leaderboard" className="nav-link">
            <i className="fas fa-trophy"></i>
            <span>Leaderboard</span>
          </Link>
          <Link href="/community" className="nav-link">
            <i className="fas fa-users"></i>
            <span>Community</span>
          </Link>
          <Link href="/achievements" className="nav-link">
            <i className="fas fa-award"></i>
            <span>Achievements</span>
          </Link>
          <Link href="/cgpa-calculator" className="nav-link">
            <i className="fas fa-calculator"></i>
            <span>CGPA Calculator</span>
          </Link>
        </div>
        
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'light') {
              html.setAttribute('data-theme', 'dark');
              localStorage.setItem('theme', 'dark');
            } else {
              html.setAttribute('data-theme', 'light');
              localStorage.setItem('theme', 'light');
            }
          }}>
            <i className="fas fa-moon" id="themeIcon"></i>
          </button>
          
          {user ? (
            <div className="user-profile">
              <div className="user-avatar">
                <i className="fas fa-user"></i>
              </div>
              <span className="user-name">{user.name || 'User'}</span>
            </div>
          ) : (
            <button className="btn-login" onClick={() => {
              // This would open the login modal
              document.getElementById('loginScreen').style.display = 'flex';
            }}>
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-section active">
          <h1>Welcome back, {user ? user.name : 'Student'}! 🎉</h1>
          
          {!user && (
            <div className="guest-notice">
              <div style={{background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', padding: '25px', borderRadius: '15px', marginBottom: '30px', textAlign: 'center'}}>
                <h2 style={{marginBottom: '15px'}}>👋 Welcome to Learnify!</h2>
                <p style={{marginBottom: '20px', opacity: '0.95'}}>You're browsing as a guest. Login or create an account to track your progress, earn XP, and unlock all features!</p>
                <button onClick={() => {
                  document.getElementById('loginScreen').style.display = 'flex';
                }} className="btn-primary" style={{background: 'white', color: 'var(--primary-color)', fontWeight: '600', padding: '12px 30px'}}>
                  <i className="fas fa-sign-in-alt"></i> Login or Sign Up
                </button>
              </div>
            </div>
          )}
          
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <i className="fas fa-star"></i>
              <div className="stat-value">{stats.totalXP}</div>
              <div className="stat-label">Total XP</div>
            </div>
            <div className="stat-card">
              <i className="fas fa-check-circle"></i>
              <div className="stat-value">{stats.completedTopics}</div>
              <div className="stat-label">Topics Completed</div>
            </div>
            <div className="stat-card">
              <i className="fas fa-clipboard-check"></i>
              <div className="stat-value">{stats.quizzesTaken}</div>
              <div className="stat-label">Quizzes Taken</div>
            </div>
            <div className="stat-card">
              <i className="fas fa-percentage"></i>
              <div className="stat-value">{stats.avgAccuracy}</div>
              <div className="stat-label">Avg Accuracy</div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="dashboard-grid">
            <div className="card">
              <h3>Your Progress</h3>
              <div style={{height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--darker-bg)', borderRadius: '10px'}}>
                <p>Progress visualization would appear here</p>
              </div>
            </div>
            <div className="card">
              <h3>Next Steps</h3>
              <div className="next-steps-list">
                <div className="next-step-item">
                  <i className="fas fa-lightbulb"></i>
                  <p>Complete your course roadmap to get personalized suggestions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Goal Section */}
          <div className="card">
            <h3>🎯 Goal of the Week</h3>
            <div className="goal-tracker">
              <input type="text" id="weeklyGoal" placeholder="Set your goal for this week..." />
              <button className="btn-primary">Save Goal</button>
            </div>
            <div id="currentGoal" className="current-goal"></div>
          </div>
        </div>
      </main>

      {/* Login Screen */}
      <div id="loginScreen" className="auth-screen" style={{display: 'none'}}>
        <div className="auth-container">
          <span className="close-auth" onClick={() => {
            document.getElementById('loginScreen').style.display = 'none';
          }}>&times;</span>
          <div className="auth-logo">
            <i className="fas fa-graduation-cap"></i>
            <h1>Learnify</h1>
            <p>Your personalized learning journey starts here</p>
          </div>
          
          <div className="auth-tabs">
            <button className="auth-tab active" onClick={() => {
              document.getElementById('loginForm').classList.add('active');
              document.getElementById('signupForm').classList.remove('active');
              document.querySelectorAll('.auth-tab')[0].classList.add('active');
              document.querySelectorAll('.auth-tab')[1].classList.remove('active');
            }}>Login</button>
            <button className="auth-tab" onClick={() => {
              document.getElementById('signupForm').classList.add('active');
              document.getElementById('loginForm').classList.remove('active');
              document.querySelectorAll('.auth-tab')[1].classList.add('active');
              document.querySelectorAll('.auth-tab')[0].classList.remove('active');
            }}>Sign Up</button>
          </div>

          {/* Login Form */}
          <form id="loginForm" className="auth-form active">
            <div className="form-group">
              <i className="fas fa-envelope"></i>
              <input type="email" id="loginEmail" placeholder="Email" required />
            </div>
            <div className="form-group">
              <i className="fas fa-lock"></i>
              <input type="password" id="loginPassword" placeholder="Password" required />
              <i className="fas fa-eye password-toggle" onClick={(e) => {
                const input = document.getElementById('loginPassword');
                if (input.type === 'password') {
                  input.type = 'text';
                  e.target.className = 'fas fa-eye-slash password-toggle';
                } else {
                  input.type = 'password';
                  e.target.className = 'fas fa-eye password-toggle';
                }
              }}></i>
            </div>
            <button type="submit" className="btn-primary">Login</button>
            <a href="#" className="forgot-password" onClick={(e) => {
              e.preventDefault();
              document.getElementById('loginScreen').style.display = 'none';
              document.getElementById('resetScreen').style.display = 'flex';
            }}>Forgot Password?</a>
          </form>

          {/* Signup Form */}
          <form id="signupForm" className="auth-form">
            <div className="form-group">
              <i className="fas fa-user"></i>
              <input type="text" id="signupName" placeholder="Full Name" required />
            </div>
            <div className="form-group">
              <i className="fas fa-envelope"></i>
              <input type="email" id="signupEmail" placeholder="Email" required />
            </div>
            <div className="form-group">
              <i className="fas fa-graduation-cap"></i>
              <select id="signupCourse" required>
                <option value="">Select Your Course</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="BTech">B.Tech</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
            <div className="form-group">
              <i className="fas fa-lock"></i>
              <input type="password" id="signupPassword" placeholder="Password (min 6 characters)" required />
              <i className="fas fa-eye password-toggle" onClick={(e) => {
                const input = document.getElementById('signupPassword');
                if (input.type === 'password') {
                  input.type = 'text';
                  e.target.className = 'fas fa-eye-slash password-toggle';
                } else {
                  input.type = 'password';
                  e.target.className = 'fas fa-eye password-toggle';
                }
              }}></i>
            </div>
            <button type="submit" className="btn-primary">Sign Up</button>
          </form>
        </div>
      </div>

      {/* Password Reset Screen */}
      <div id="resetScreen" className="auth-screen" style={{display: 'none'}}>
        <div className="auth-container">
          <span className="close-auth" onClick={() => {
            document.getElementById('resetScreen').style.display = 'none';
            document.getElementById('loginScreen').style.display = 'flex';
          }}>&times;</span>
          <div className="auth-logo">
            <i className="fas fa-key"></i>
            <h2>Reset Password</h2>
            <p>Enter your email to receive a reset link</p>
          </div>
          <form id="resetForm" className="auth-form active">
            <div className="form-group">
              <i className="fas fa-envelope"></i>
              <input type="email" id="resetEmail" placeholder="Email" required />
            </div>
            <button type="submit" className="btn-primary">Send Reset Link</button>
            <a href="#" className="back-to-login" onClick={(e) => {
              e.preventDefault();
              document.getElementById('resetScreen').style.display = 'none';
              document.getElementById('loginScreen').style.display = 'flex';
            }}>Back to Login</a>
          </form>
        </div>
      </div>
    </div>
  );
}