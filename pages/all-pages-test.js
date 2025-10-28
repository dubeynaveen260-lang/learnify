import Head from 'next/head';
import Link from 'next/link';

export default function AllPagesTest() {
  const pages = [
    { name: 'Dashboard', path: '/' },
    { name: 'Course Roadmap', path: '/roadmap' },
    { name: 'Resources', path: '/resources' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Community', path: '/community' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'CGPA Calculator', path: '/cgpa-calculator' },
    { name: 'Firebase Test', path: '/firebase-test' },
    { name: 'API Test', path: '/api-test' }
  ];

  return (
    <div>
      <Head>
        <title>All Pages Test</title>
        <meta name="description" content="Test all pages of Learnify" />
      </Head>

      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>All Pages Test</h1>
        <p>Click on any link below to test navigation to that page:</p>
        
        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          {pages.map((page, index) => (
            <Link 
              key={index} 
              href={page.path}
              style={{
                display: 'block',
                padding: '1rem',
                background: '#1a1a2e',
                border: '1px solid #3a3a4e',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#e8e8e8',
                transition: 'all 0.2s ease',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#2a2a3e';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#1a1a2e';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {page.name}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}