import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CustomerOrderPage from '@/pages/customer/CustomerOrderPage';
import { useCart } from '@/stores/cartStore';

beforeEach(() => {
  useCart.getState().clearCart();
  localStorage.setItem('tableId', '1');
  localStorage.setItem('tableNumber', '5');
});

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={['/table/test-token/order']}>
      <Routes>
        <Route path="/table/:token/order" element={<CustomerOrderPage />} />
        <Route path="/table/:token/cart" element={<div>Cart Page</div>} />
        <Route path="/table/:token" element={<div>Menu Page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('CustomerOrderPage', () => {
  it('테이블 번호와 주문 항목 표시', () => {
    useCart.getState().addItem({ menuId: 1, menuName: '치킨', unitPrice: 18000, imageUrl: null });
    renderWithRouter();
    expect(screen.getByTestId('order-table-number').textContent).toContain('5번');
    expect(screen.getByText('치킨')).toBeDefined();
    expect(screen.getByTestId('order-total').textContent).toContain('18,000');
  });

  it('예상 대기 시간 표시', () => {
    useCart.getState().addItem({ menuId: 1, menuName: '치킨', unitPrice: 18000, imageUrl: null });
    renderWithRouter();
    expect(screen.getByText(/15~20분/)).toBeDefined();
  });

  it('주문 확정 버튼 존재', () => {
    useCart.getState().addItem({ menuId: 1, menuName: '치킨', unitPrice: 18000, imageUrl: null });
    renderWithRouter();
    expect(screen.getByTestId('order-confirm-button')).toBeDefined();
  });
});
