import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function APITest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/test');
      const result = await response.json();
      
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>API Test</title>
        <meta name="description" content="API integration test" />
      </Head>

      <main style={{ padding: '2rem' }}>
        <h1>API Integration Test</h1>
        
        {loading && <p>Loading...</p>}
        
        {error && (
          <div>
            <p style={{ color: 'red' }}>Error: {error}</p>
            <button onClick={fetchData}>Retry</button>
          </div>
        )}
        
        {data && (
          <div>
            <h2>API Response:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button onClick={fetchData}>Refresh</button>
          </div>
        )}
      </main>
    </div>
  );
}