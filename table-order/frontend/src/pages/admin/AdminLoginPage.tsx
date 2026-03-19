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
        setSuccessMsg('회원가입 성공! 로그인해주세요.');
        setIsRegisterMode(false);
        setPassword('');
      }
    } else {
      const ok = await login(username, password);
      if (ok) navigate('/admin/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-xl font-bold">
          {isRegisterMode ? '관리자 회원가입' : '관리자 로그인'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자명"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}
          <button
            type="submit"
            disabled={loading || !username.trim() || !password.trim()}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '처리 중...' : isRegisterMode ? '회원가입' : '로그인'}
          </button>
        </form>
        <button
          onClick={() => { setIsRegisterMode(!isRegisterMode); setSuccessMsg(null); }}
          className="mt-4 w-full text-center text-sm text-blue-600 hover:underline"
        >
          {isRegisterMode ? '로그인으로 전환' : '회원가입으로 전환'}
        </button>
      </div>
    </div>
  );
}
