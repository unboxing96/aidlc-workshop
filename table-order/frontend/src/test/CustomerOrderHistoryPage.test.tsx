import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CustomerOrderHistoryPage from '@/pages/customer/CustomerOrderHistoryPage';
import { orderApi } from '@/services/orderApi';

vi.mock('@/services/orderApi', () => ({
  orderApi: {
    getOrdersByTable: vi.fn(),
  },
}));

beforeEach(() => {
  localStorage.setItem('tableId', '1');
});

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={['/table/test-token/orders']}>
      <Routes>
        <Route path="/table/:token/orders" element={<CustomerOrderHistoryPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('CustomerOrderHistoryPage', () => {
  it('주문 내역이 없으면 빈 메시지 표시', async () => {
    vi.mocked(orderApi.getOrdersByTable).mockResolvedValue({
      content: [], totalElements: 0, totalPages: 0, number: 0, size: 50,
    });
    renderWithRouter();
    await waitFor(() => expect(screen.getByTestId('order-history-empty')).toBeDefined());
  });

  it('주문 내역 표시', async () => {
    vi.mocked(orderApi.getOrdersByTable).mockResolvedValue({
      content: [{
        id: 1, orderNumber: 'ORD-20260318-0001', tableId: 1, sessionId: 's1',
        totalAmount: 18000, status: 'PENDING', createdAt: '2026-03-18T15:00:00',
        items: [{ id: 1, menuName: '치킨', quantity: 1, unitPrice: 18000 }],
      }],
      totalElements: 1, totalPages: 1, number: 0, size: 50,
    });
    renderWithRouter();
    await waitFor(() => expect(screen.getByTestId('order-card-1')).toBeDefined());
    expect(screen.getByText('ORD-20260318-0001')).toBeDefined();
    expect(screen.getByTestId('status-badge').textContent).toBe('대기중');
  });

  it('필터 탭 표시', async () => {
    vi.mocked(orderApi.getOrdersByTable).mockResolvedValue({
      content: [], totalElements: 0, totalPages: 0, number: 0, size: 50,
    });
    renderWithRouter();
    await waitFor(() => expect(screen.getByTestId('filter-tab-ALL')).toBeDefined());
    expect(screen.getByTestId('filter-tab-PENDING')).toBeDefined();
    expect(screen.getByTestId('filter-tab-PREPARING')).toBeDefined();
    expect(screen.getByTestId('filter-tab-COMPLETED')).toBeDefined();
  });
});
