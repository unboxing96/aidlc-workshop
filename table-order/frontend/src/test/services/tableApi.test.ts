import { describe, it, expect, vi, beforeEach } from 'vitest';
import { tableApi } from '../../services/tableApi';
import api from '../../services/api';

vi.mock('../../services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('tableApi', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('authenticateToken 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { tableId: 1, tableNumber: 1 } });
    await tableApi.authenticateToken('token-123');
    expect(api.post).toHaveBeenCalledWith('/tables/auth', { accessToken: 'token-123' });
  });

  it('createTable 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: {} });
    await tableApi.createTable(5);
    expect(api.post).toHaveBeenCalledWith('/tables', { tableNumber: 5 });
  });

  it('getAllTables 호출', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });
    await tableApi.getAllTables();
    expect(api.get).toHaveBeenCalledWith('/tables');
  });

  it('completeSession 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: {} });
    await tableApi.completeSession(1);
    expect(api.post).toHaveBeenCalledWith('/tables/1/complete');
  });

  it('getOrderHistory 호출', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });
    await tableApi.getOrderHistory(1);
    expect(api.get).toHaveBeenCalledWith('/tables/1/history');
  });
});
