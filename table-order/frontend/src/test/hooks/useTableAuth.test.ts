import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTableAuth } from '../../hooks/useTableAuth';
import { tableApi } from '../../services/tableApi';

vi.mock('../../services/tableApi');

describe('useTableAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('authenticate 성공 시 tableInfo 설정 및 localStorage 저장', async () => {
    vi.mocked(tableApi.authenticateToken).mockResolvedValue({
      data: { tableId: 1, tableNumber: 5 },
    } as any);

    const { result } = renderHook(() => useTableAuth());
    await act(async () => {
      await result.current.authenticate('token-123');
    });

    expect(result.current.tableInfo).toEqual({ tableId: 1, tableNumber: 5 });
    expect(localStorage.getItem('tableToken')).toBe('token-123');
    expect(result.current.error).toBeNull();
  });

  it('authenticate 실패 시 에러 설정', async () => {
    vi.mocked(tableApi.authenticateToken).mockRejectedValue({
      response: { data: { message: '유효하지 않은 토큰' } },
    });

    const { result } = renderHook(() => useTableAuth());
    await act(async () => {
      await result.current.authenticate('invalid');
    });

    expect(result.current.tableInfo).toBeNull();
    expect(result.current.error).toBe('유효하지 않은 토큰');
  });

  it('checkAuth - 토큰 없으면 null 반환', async () => {
    const { result } = renderHook(() => useTableAuth());
    let res: any;
    await act(async () => {
      res = await result.current.checkAuth();
    });
    expect(res).toBeNull();
  });
});
