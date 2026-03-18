import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../services/api';
import { tableApi } from '../../services/tableApi';

vi.mock('../../services/api');

describe('tableApi', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('authenticateToken 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { tableId: 1, tableNumber: 5 } });
    const res = await tableApi.authenticateToken('token-123');
    expect(api.post).toHaveBeenCalledWith('/tables/auth', { accessToken: 'token-123' });
    expect(res.data.tableId).toBe(1);
  });

  it('createTable 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { id: 1, tableNumber: 1 } });
    await tableApi.createTable(1);
    expect(api.post).toHaveBeenCalledWith('/tables', { tableNumber: 1 });
  });

  it('getAllTables 호출', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });
    await tableApi.getAllTables();
    expect(api.get).toHaveBeenCalledWith('/tables');
  });

  it('completeSession 호출', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { message: '완료' } });
    await tableApi.completeSession(1);
    expect(api.post).toHaveBeenCalledWith('/tables/1/complete');
  });

  it('getOrderHistory 호출', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });
    await tableApi.getOrderHistory(1);
    expect(api.get).toHaveBeenCalledWith('/tables/1/history');
  });
});
