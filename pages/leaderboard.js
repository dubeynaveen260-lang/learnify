import Head from 'next/head';
import Link from 'next/link';

export default function Leaderboard() {
  return (
    <div id="mainApp">
      <Head>
        <title>Learnify - Leaderboard</title>
        <meta name="description" content="See how you rank among peers" />
      </Head>

      {/* Navigation */}
      <nav className="top-nav">
        <div className="nav-brand">
          <i className="fas fa-graduation-cap"></i>
          <span>Learnify</span>
        </div>
        
        <div className="nav-links">
          <Link href="/" className="nav-link">
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
          <Link href="/leaderboard" className="nav-link active">
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
            const themeIcon = document.getElementById('themeIcon');
            
            if (currentTheme === 'light') {
              html.setAttribute('data-theme', 'dark');
              themeIcon.className = 'fas fa-moon';
              localStorage.setItem('theme', 'dark');
            } else {
              html.setAttribute('data-theme', 'light');
              themeIcon.className = 'fas fa-sun';
              localStorage.setItem('theme', 'light');
            }
          }}>
            <i className="fas fa-moon" id="themeIcon"></i>
          </button>
          
          <button className="btn-login" onClick={() => {
            document.getElementById('loginScreen').style.display = 'flex';
          }}>
            <i className="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-section active">
          <h1>🏆 Leaderboard</h1>
          <p className="section-desc">See how you rank among peers</p>
          
          <div className="leaderboard-filters">
            <button className="filter-btn active">Global</button>
            <button className="filter-btn">My Course</button>
            <button className="filter-btn">This Month</button>
          </div>

          <div id="leaderboardContainer" className="leaderboard-container">
            <div className="leaderboard-item">
              <div className="rank top-1">1</div>
              <div className="user-avatar">A</div>
              <div className="leaderboard-user-info">
                <div className="user-name">Alex Johnson</div>
                <div className="user-course">BCA</div>
              </div>
              <div className="leaderboard-xp">2,450 XP</div>
              <div className="leaderboard-badges">
                <i className="fas fa-award"></i> 12
              </div>
            </div>
            
            <div className="leaderboard-item">
              <div className="rank top-2">2</div>
              <div className="user-avatar">M</div>
              <div className="leaderboard-user-info">
                <div className="user-name">Maria Garcia</div>
                <div className="user-course">BBA</div>
              </div>
              <div className="leaderboard-xp">2,320 XP</div>
              <div className="leaderboard-badges">
                <i className="fas fa-award"></i> 10
              </div>
            </div>
            
            <div className="leaderboard-item">
              <div className="rank top-3">3</div>
              <div className="user-avatar">S</div>
              <div className="leaderboard-user-info">
                <div className="user-name">Sam Wilson</div>
                <div className="user-course">BTech</div>
              </div>
              <div className="leaderboard-xp">2,180 XP</div>
              <div className="leaderboard-badges">
                <i className="fas fa-award"></i> 8
              </div>
            </div>
            
            <div className="leaderboard-item current-user">
              <div className="rank">15</div>
              <div className="user-avatar">Y</div>
              <div className="leaderboard-user-info">
                <div className="user-name">You</div>
                <div className="user-course">BCA</div>
              </div>
              <div className="leaderboard-xp">1,250 XP</div>
              <div className="leaderboard-badges">
                <i className="fas fa-award"></i> 5
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav">
        <Link href="/" className="bottom-nav-link">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link href="/roadmap" className="bottom-nav-link">
          <i className="fas fa-map"></i>
          <span>Roadmap</span>
        </Link>
        <Link href="/resources" className="bottom-nav-link">
          <i className="fas fa-book"></i>
          <span>Resources</span>
        </Link>
        <Link href="/quizzes" className="bottom-nav-link">
          <i className="fas fa-clipboard-question"></i>
          <span>Quizzes</span>
        </Link>
        <Link href="/leaderboard" className="bottom-nav-link active">
          <i className="fas fa-trophy"></i>
          <span>Leaderboard</span>
        </Link>
      </nav>

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