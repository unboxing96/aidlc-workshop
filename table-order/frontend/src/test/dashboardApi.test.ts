import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../services/api';
import { dashboardApi } from '../services/dashboardApi';

vi.mock('../services/api', () => ({
  default: { get: vi.fn(), patch: vi.fn(), delete: vi.fn(), post: vi.fn() },
}));

describe('dashboardApi', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('getDashboard calls correct endpoint', async () => {
    (api.get as any).mockResolvedValue({ data: [] });
    const result = await dashboardApi.getDashboard();
    expect(api.get).toHaveBeenCalledWith('/admin/dashboard');
    expect(result).toEqual([]);
  });

  it('getTableOrders calls correct endpoint', async () => {
    (api.get as any).mockResolvedValue({ data: [] });
    await dashboardApi.getTableOrders(1);
    expect(api.get).toHaveBeenCalledWith('/admin/tables/1/orders');
  });

  it('changeOrderStatus calls correct endpoint', async () => {
    (api.patch as any).mockResolvedValue({});
    await dashboardApi.changeOrderStatus(1, 'PREPARING');
    expect(api.patch).toHaveBeenCalledWith('/admin/orders/1/status', { status: 'PREPARING' });
  });

  it('deleteOrder calls correct endpoint', async () => {
    (api.delete as any).mockResolvedValue({});
    await dashboardApi.deleteOrder(1);
    expect(api.delete).toHaveBeenCalledWith('/admin/orders/1');
  });

  it('completeTableSession calls correct endpoint', async () => {
    (api.post as any).mockResolvedValue({});
    await dashboardApi.completeTableSession(1);
    expect(api.post).toHaveBeenCalledWith('/admin/tables/1/complete');
  });

  it('getOrderHistory calls with date params', async () => {
    (api.get as any).mockResolvedValue({ data: [] });
    await dashboardApi.getOrderHistory(1, '2026-03-01', '2026-03-18');
    expect(api.get).toHaveBeenCalledWith('/admin/tables/1/history', {
      params: { startDate: '2026-03-01', endDate: '2026-03-18' },
    });
  });
});
