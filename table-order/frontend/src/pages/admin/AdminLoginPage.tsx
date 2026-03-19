import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export default function AdminLoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { isAuthenticated, loading, error, login, register } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    if (isRegisterMode) {
      const ok = await register(username, password);
      if (ok) {
        setSuccessMsg('Registration successful! Please login.');
        setIsRegisterMode(false);
        setPassword('');
      }
    } else {
      const ok = await login(username, password);
      if (ok) navigate('/admin/dashboard');
    }
  };

  const inputStyle = { width: '100%', borderRadius: '0.25rem', border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', boxSizing: 'border-box' as const };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '24rem', borderRadius: '0.5rem', backgroundColor: 'white', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
          {isRegisterMode ? 'Admin Register' : 'Admin Login'}
        </h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={inputStyle} disabled={loading} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={inputStyle} disabled={loading} />
          {error && <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{error}</p>}
          {successMsg && <p style={{ color: 'green', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{successMsg}</p>}
          <button
            type="submit"
            disabled={loading || !username.trim() || !password.trim()}
            style={{ width: '100%', borderRadius: '0.25rem', backgroundColor: '#2563eb', color: 'white', padding: '0.5rem', border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'Processing...' : isRegisterMode ? 'Register' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => { setIsRegisterMode(!isRegisterMode); setSuccessMsg(null); }}
          style={{ marginTop: '1rem', width: '100%', textAlign: 'center', fontSize: '0.875rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {isRegisterMode ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </div>
    </div>
  );
}
