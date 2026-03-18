import { useState, useCallback } from 'react';
import { tableApi } from '../services/tableApi';
import type { TableAuthResponse } from '../types';

export function useTableAuth() {
  const [tableInfo, setTableInfo] = useState<TableAuthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await tableApi.authenticateToken(token);
      localStorage.setItem('tableToken', token);
      setTableInfo(data);
      return data;
    } catch (e: any) {
      const msg = e.response?.data?.message || '인증에 실패했습니다';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('tableToken');
    if (!token) return null;
    return authenticate(token);
  }, [authenticate]);

  return { tableInfo, loading, error, authenticate, checkAuth };
}
