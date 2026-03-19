// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTableAuth } from '../../hooks/useTableAuth';
import { tableApi } from '../../services/tableApi';

vi.mock('../../services/tableApi', () => ({
  tableApi: {
    authenticateToken: vi.fn(),
  },
}));

const mockStorage: Record<string, string> = {};
vi.stubGlobal('localStorage', {
  getItem: (key: string) => mockStorage[key] ?? null,
  setItem: (key: string, val: string) => { mockStorage[key] = val; },
  removeItem: (key: string) => { delete mockStorage[key]; },
});

describe('useTableAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
  });

  it('authenticate 성공 시 tableInfo 설정 및 localStorage 저장', async () => {
    vi.mocked(tableApi.authenticateToken).mockResolvedValue({
      data: { tableId: 1, tableNumber: 5 },
    } as any);

    const { result } = renderHook(() => useTableAuth());
    await act(async () => {
      await result.current.authenticate('valid-token');
    });

    expect(result.current.tableInfo).toEqual({ tableId: 1, tableNumber: 5 });
    expect(mockStorage['tableToken']).toBe('valid-token');
  });

  it('authenticate 실패 시 error 설정', async () => {
    vi.mocked(tableApi.authenticateToken).mockRejectedValue({
      response: { data: { message: '유효하지 않은 토큰' } },
    });

    const { result } = renderHook(() => useTableAuth());
    await act(async () => {
      await result.current.authenticate('bad-token');
    });

    expect(result.current.error).toBe('유효하지 않은 토큰');
    expect(result.current.tableInfo).toBeNull();
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
