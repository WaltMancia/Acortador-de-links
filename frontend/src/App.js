import React, { useState } from 'react';
import './index.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validar URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Sanitizar input
  const sanitizeInput = (input) => {
    return input.replace(/[<>"]/g, '');
  };

  const handleShorten = async () => {
    setError('');
    setShortUrl('');

    if (!url || !isValidUrl(url)) {
      setError('Por favor ingresa una URL válida');
      return;
    }

    const cleanUrl = sanitizeInput(url);

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/shorten`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: cleanUrl }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al acortar URL');
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('URL copiada al portapapeles');
  };

  return (
    <div style={styles.container}>
      <h1>🔗 URL Shortener</h1>

      <div style={styles.card}>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleShorten}
          style={styles.button}
          disabled={loading}
        >
          {loading ? <span style={styles.loader}></span> : 'Acortar URL'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {shortUrl && (
          <div style={styles.result}>
            <p>URL corta:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button onClick={copyToClipboard} style={styles.copyBtn}>
              Copiar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#0f172a',
    color: 'white',
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '2rem',
    borderRadius: '10px',
    width: '320px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: 'none',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '15px',
  },
  error: {
    color: '#ef4444',
  },
  copyBtn: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'white',
  },
  loader: {
    display: 'inline-block',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    animation: 'spin 1s linear infinite',
  },
};

export default App;