import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { adminAuthApi } from '../../services/adminAuthApi';

vi.mock('../../services/adminAuthApi');

describe('useAdminAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('login 성공 시 토큰 저장', async () => {
    vi.mocked(adminAuthApi.login).mockResolvedValue({
      data: { token: 'jwt-token' },
    } as any);

    const { result } = renderHook(() => useAdminAuth());
    let ok: boolean;
    await act(async () => {
      ok = await result.current.login('admin', '1234');
    });

    expect(ok!).toBe(true);
    expect(localStorage.getItem('adminToken')).toBe('jwt-token');
  });

  it('login 실패 시 에러 설정', async () => {
    vi.mocked(adminAuthApi.login).mockRejectedValue({
      response: { data: { message: '인증 실패' } },
    });

    const { result } = renderHook(() => useAdminAuth());
    await act(async () => {
      await result.current.login('admin', 'wrong');
    });

    expect(result.current.error).toBe('인증 실패');
    expect(localStorage.getItem('adminToken')).toBeNull();
  });

  it('register 성공', async () => {
    vi.mocked(adminAuthApi.register).mockResolvedValue({
      data: { message: '완료' },
    } as any);

    const { result } = renderHook(() => useAdminAuth());
    let ok: boolean;
    await act(async () => {
      ok = await result.current.register('admin', '1234');
    });

    expect(ok!).toBe(true);
  });

  it('logout 시 토큰 제거', () => {
    localStorage.setItem('adminToken', 'jwt-token');
    // mock window.location
    const original = window.location.href;
    Object.defineProperty(window, 'location', { value: { href: '' }, writable: true });

    const { result } = renderHook(() => useAdminAuth());
    act(() => { result.current.logout(); });

    expect(localStorage.getItem('adminToken')).toBeNull();
    // restore
    Object.defineProperty(window, 'location', { value: { href: original }, writable: true });
  });
});
