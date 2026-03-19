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
    const info = await authenticate(token.trim());
    if (info) navigate('/menu');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-xl font-bold">테이블 설정</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="테이블 토큰을 입력하세요"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '인증 중...' : '인증'}
          </button>
        </form>
      </div>
    </div>
  );
}
