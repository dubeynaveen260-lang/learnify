import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function FirebaseTest() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate Firebase initialization
    const initFirebase = async () => {
      try {
        // In a real implementation, we would initialize Firebase here
        console.log('Initializing Firebase...');
        
        // Simulate a delay for initialization
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if we have a saved user in localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    initFirebase();
  }, []);

  const handleLogin = () => {
    // Simulate login
    const mockUser = {
      uid: 'test123',
      email: 'test@example.com',
      displayName: 'Test User'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const handleLogout = () => {
    // Simulate logout
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <div>
      <Head>
        <title>Firebase Test</title>
        <meta name="description" content="Firebase integration test" />
      </Head>

      <main style={{ padding: '2rem' }}>
        <h1>Firebase Integration Test</h1>
        
        {loading ? (
          <p>Loading Firebase...</p>
        ) : error ? (
          <div>
            <p style={{ color: 'red' }}>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : (
          <div>
            {user ? (
              <div>
                <h2>Welcome, {user.displayName}!</h2>
                <p>Email: {user.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>
                <p>Not logged in</p>
                <button onClick={handleLogin}>Login</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}