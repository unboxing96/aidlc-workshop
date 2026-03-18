import { useState, useCallback, useMemo } from 'react';
import { adminAuthApi } from '../services/adminAuthApi';

export function useAdminAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useMemo(() => !!localStorage.getItem('adminToken'), []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await adminAuthApi.login({ username, password });
      localStorage.setItem('adminToken', data.token);
      return true;
    } catch (e: any) {
      setError(e.response?.data?.message || '로그인에 실패했습니다');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await adminAuthApi.register({ username, password });
      return true;
    } catch (e: any) {
      setError(e.response?.data?.message || '회원가입에 실패했습니다');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  }, []);

  return { isAuthenticated, loading, error, login, register, logout };
}
