import Head from 'next/head';
import Link from 'next/link';

export default function CGPACalculator() {
  return (
    <div id="mainApp">
      <Head>
        <title>Learnify - CGPA Calculator</title>
        <meta name="description" content="Calculate your SGPA, CGPA, and equivalent percentage" />
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
          <Link href="/cgpa-calculator" className="nav-link active">
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
          <h1>🧮 CGPA Calculator</h1>
          <p className="section-desc">Calculate your SGPA, CGPA, and equivalent percentage</p>
          
          <div className="card" style={{textAlign: 'center', padding: '40px'}}>
            <h2 style={{marginBottom: '20px'}}>Full Screen CGPA Calculator</h2>
            <p style={{marginBottom: '30px', color: 'var(--text-secondary)'}}>For the best experience, use our full screen calculator</p>
            <button className="btn-primary" style={{padding: '15px 40px', fontSize: '18px'}}>
              <i className="fas fa-expand"></i> Open Full Screen Calculator
            </button>
            <p style={{marginTop: '30px', color: 'var(--text-secondary)', fontSize: '14px'}}>Or continue with the inline calculator below</p>
          </div>
          
          <div className="card">
            <div className="cgpa-calculator-container">
              <div className="semester-selector">
                <label htmlFor="numSemesters">Number of Semesters:</label>
                <select id="numSemesters">
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>

              <div id="semesterInputsContainer" className="semester-inputs-container">
                {/* Semester inputs will be generated here */}
              </div>

              <div className="cgpa-actions">
                <button className="btn-primary" style={{width: 'auto', padding: '12px 30px'}}>
                  <i className="fas fa-calculator"></i> Calculate
                </button>
                <button className="btn-primary" style={{width: 'auto', padding: '12px 30px', background: 'var(--warning-color)'}}>
                  <i className="fas fa-redo"></i> Reset
                </button>
              </div>

              <div id="cgpaResults" className="cgpa-results" style={{display: 'none'}}>
                <h3>📊 Results</h3>
                <div className="cgpa-result-grid">
                  <div className="result-card">
                    <div className="result-label">Overall CGPA</div>
                    <div className="result-value" id="overallCGPA">0.00</div>
                  </div>
                  <div className="result-card">
                    <div className="result-label">Equivalent Percentage</div>
                    <div className="result-value" id="equivalentPercentage">0.00%</div>
                  </div>
                </div>
                <div id="semesterWiseSGPA" className="semester-wise-sgpa">
                  {/* Semester-wise SGPA will be displayed here */}
                </div>
                <button className="btn-primary" style={{width: 'auto', padding: '12px 30px', marginTop: '20px'}}>
                  <i className="fas fa-download"></i> Download Result
                </button>
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
        <Link href="/cgpa-calculator" className="bottom-nav-link active">
          <i className="fas fa-calculator"></i>
          <span>CGPA Calc</span>
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