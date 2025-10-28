import Head from 'next/head';

export default function Test() {
  return (
    <div>
      <Head>
        <title>Test Page</title>
        <meta name="description" content="Test page for Learnify" />
      </Head>

      <main>
        <h1>Test Page</h1>
        <p>This is a test page to verify the Next.js setup is working correctly.</p>
      </main>
    </div>
  );
}