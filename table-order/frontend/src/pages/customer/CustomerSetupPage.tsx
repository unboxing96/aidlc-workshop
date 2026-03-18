import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTableAuth } from '../../hooks/useTableAuth';

export default function CustomerSetupPage() {
  const [token, setToken] = useState('');
  const { loading, error, authenticate, checkAuth } = useTableAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth().then((info) => {
      if (info) navigate(`/table/${localStorage.getItem('tableToken')}`);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const info = await authenticate(token.trim());
    if (info) navigate(`/table/${token.trim()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">테이블 설정</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="테이블 토큰을 입력하세요"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            aria-label="테이블 토큰"
          />
          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '인증 중...' : '연결'}
          </button>
        </form>
      </div>
    </div>
  );
}
