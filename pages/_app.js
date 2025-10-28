import '../css/style.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    
    if (savedTheme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;