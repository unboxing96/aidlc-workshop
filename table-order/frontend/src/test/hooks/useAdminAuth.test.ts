// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { adminAuthApi } from '../../services/adminAuthApi';

vi.mock('../../services/adminAuthApi', () => ({
  adminAuthApi: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

const mockStorage: Record<string, string> = {};
vi.stubGlobal('localStorage', {
  getItem: (key: string) => mockStorage[key] ?? null,
  setItem: (key: string, val: string) => { mockStorage[key] = val; },
  removeItem: (key: string) => { delete mockStorage[key]; },
});

describe('useAdminAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
  });

  it('login 성공 시 JWT 저장', async () => {
    vi.mocked(adminAuthApi.login).mockResolvedValue({
      data: { token: 'jwt-123' },
    } as any);

    const { result } = renderHook(() => useAdminAuth());
    let ok: boolean = false;
    await act(async () => {
      ok = await result.current.login('admin', 'pass1234');
    });

    expect(ok).toBe(true);
    expect(mockStorage['adminToken']).toBe('jwt-123');
  });

  it('login 실패 시 error 설정', async () => {
    vi.mocked(adminAuthApi.login).mockRejectedValue({
      response: { data: { message: '인증 실패' } },
    });

    const { result } = renderHook(() => useAdminAuth());
    await act(async () => {
      await result.current.login('admin', 'wrong');
    });

    expect(result.current.error).toBe('인증 실패');
  });

  it('register 성공', async () => {
    vi.mocked(adminAuthApi.register).mockResolvedValue({ data: { message: '성공' } } as any);

    const { result } = renderHook(() => useAdminAuth());
    let ok: boolean = false;
    await act(async () => {
      ok = await result.current.register('newuser', 'pass1234');
    });

    expect(ok).toBe(true);
  });

  it('register 실패 시 error 설정', async () => {
    vi.mocked(adminAuthApi.register).mockRejectedValue({
      response: { data: { message: '중복 사용자' } },
    });

    const { result } = renderHook(() => useAdminAuth());
    await act(async () => {
      await result.current.register('admin', 'pass');
    });

    expect(result.current.error).toBe('중복 사용자');
  });
});
