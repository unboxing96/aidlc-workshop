import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTableAuth } from '../../hooks/useTableAuth';

export default function CustomerSetupPage() {
  const [token, setToken] = useState('');
  const { loading, error, authenticate, checkAuth } = useTableAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth().then((info) => {
      if (info) navigate('/menu');
    });
  }, [checkAuth, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting token:', token.trim());
    const info = await authenticate(token.trim());
    console.log('Auth result:', info);
    if (info) {
      navigate('/menu');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '24rem', borderRadius: '0.5rem', backgroundColor: 'white', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>Table Setup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter table token"
            style={{ width: '100%', borderRadius: '0.25rem', border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', boxSizing: 'border-box' }}
            disabled={loading}
          />
          {error && <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !token.trim()}
            style={{ width: '100%', borderRadius: '0.25rem', backgroundColor: loading || !token.trim() ? '#93c5fd' : '#2563eb', color: 'white', padding: '0.5rem', border: 'none', cursor: loading || !token.trim() ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>
      </div>
    </div>
  );
}
