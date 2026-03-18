import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
// @ts-ignore
import * as _dashboardApiModule from '../services/dashboardApi';

vi.mock('../services/dashboardApi', () => ({
  dashboardApi: {
    getDashboard: vi.fn().mockResolvedValue([]),
    getTableOrders: vi.fn().mockResolvedValue([]),
    changeOrderStatus: vi.fn().mockResolvedValue({}),
    deleteOrder: vi.fn().mockResolvedValue({}),
    completeTableSession: vi.fn().mockResolvedValue({}),
    getOrderHistory: vi.fn().mockResolvedValue([]),
  },
}));

vi.mock('../hooks/useOrderSSE', () => ({
  useOrderSSE: () => ({ connected: true }),
}));

describe('AdminDashboardPage', () => {
  it('renders dashboard page', async () => {
    render(<BrowserRouter><AdminDashboardPage /></BrowserRouter>);
    expect(await screen.findByText('주문 대시보드')).toBeDefined();
  });

  it('renders filter buttons', async () => {
    render(<BrowserRouter><AdminDashboardPage /></BrowserRouter>);
    expect(await screen.findByText('전체')).toBeDefined();
    expect(screen.getByText('대기중')).toBeDefined();
    expect(screen.getByText('준비중')).toBeDefined();
  });
});
