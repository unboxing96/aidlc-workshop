import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../services/api';
import { adminAuthApi } from '../../services/adminAuthApi';

vi.mock('../../services/api');

describe('adminAuthApi', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('register 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { message: '완료' } });
    const res = await adminAuthApi.register({ username: 'admin', password: '1234' });
    expect(api.post).toHaveBeenCalledWith('/admin/register', { username: 'admin', password: '1234' });
    expect(res.data.message).toBe('완료');
  });

  it('login 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { token: 'jwt-token' } });
    const res = await adminAuthApi.login({ username: 'admin', password: '1234' });
    expect(api.post).toHaveBeenCalledWith('/admin/login', { username: 'admin', password: '1234' });
    expect(res.data.token).toBe('jwt-token');
  });
});
