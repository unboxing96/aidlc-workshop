import { describe, it, expect, vi, beforeEach } from 'vitest';
import { adminAuthApi } from '../../services/adminAuthApi';
import api from '../../services/api';

vi.mock('../../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('adminAuthApi', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('register 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { message: '성공' } });
    await adminAuthApi.register({ username: 'user', password: 'pass' });
    expect(api.post).toHaveBeenCalledWith('/admin/register', { username: 'user', password: 'pass' });
  });

  it('login 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { token: 'jwt' } });
    await adminAuthApi.login({ username: 'user', password: 'pass' });
    expect(api.post).toHaveBeenCalledWith('/admin/login', { username: 'user', password: 'pass' });
  });
});
