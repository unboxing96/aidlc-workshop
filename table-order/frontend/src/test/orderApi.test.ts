import { describe, it, expect, vi } from 'vitest';
import api from '@/services/api';
import { orderApi } from '@/services/orderApi';

vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('orderApi', () => {
  it('createOrder 호출', async () => {
    const mockOrder = { id: 1, orderNumber: 'ORD-001' };
    vi.mocked(api.post).mockResolvedValue({ data: mockOrder });

    const result = await orderApi.createOrder({ tableId: 1, items: [{ menuId: 1, quantity: 2 }] });
    expect(api.post).toHaveBeenCalledWith('/orders', { tableId: 1, items: [{ menuId: 1, quantity: 2 }] });
    expect(result).toEqual(mockOrder);
  });

  it('getOrdersByTable 호출', async () => {
    const mockPage = { content: [], totalElements: 0 };
    vi.mocked(api.get).mockResolvedValue({ data: mockPage });

    const result = await orderApi.getOrdersByTable(1, 0, 50);
    expect(api.get).toHaveBeenCalledWith('/orders/table/1', { params: { page: 0, size: 50 } });
    expect(result).toEqual(mockPage);
  });
});
