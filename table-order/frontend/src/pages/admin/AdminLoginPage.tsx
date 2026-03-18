import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export default function AdminLoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { isAuthenticated, loading, error, login, register } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    if (isRegister) {
      const ok = await register(username, password);
      if (ok) {
        setSuccessMsg('회원가입 완료! 로그인해주세요.');
        setIsRegister(false);
        setPassword('');
      }
    } else {
      const ok = await login(username, password);
      if (ok) navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegister ? '관리자 회원가입' : '관리자 로그인'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자명"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            aria-label="사용자명"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            aria-label="비밀번호"
          />
          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
          {successMsg && <p className="text-green-600 text-sm" role="status">{successMsg}</p>}
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '처리 중...' : isRegister ? '가입' : '로그인'}
          </button>
        </form>
        <button
          onClick={() => { setIsRegister(!isRegister); setSuccessMsg(''); }}
          className="w-full mt-4 text-sm text-blue-600 hover:underline"
        >
          {isRegister ? '로그인으로 돌아가기' : '회원가입'}
        </button>
      </div>
    </div>
  );
}
