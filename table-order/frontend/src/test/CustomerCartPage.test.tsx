import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CustomerCartPage from '@/pages/customer/CustomerCartPage';
import { useCart } from '@/stores/cartStore';

// Reset cart before each test
beforeEach(() => {
  useCart.getState().clearCart();
});

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={['/table/test-token/cart']}>
      <Routes>
        <Route path="/table/:token/cart" element={<CustomerCartPage />} />
        <Route path="/table/:token" element={<div>Menu Page</div>} />
        <Route path="/table/:token/order" element={<div>Order Page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('CustomerCartPage', () => {
  it('빈 장바구니 메시지 표시', () => {
    renderWithRouter();
    expect(screen.getByTestId('cart-empty')).toBeDefined();
  });

  it('장바구니 항목 표시', () => {
    useCart.getState().addItem({ menuId: 1, menuName: '치킨', unitPrice: 18000, imageUrl: null });
    renderWithRouter();
    expect(screen.getByText('치킨')).toBeDefined();
    expect(screen.getByTestId('cart-total').textContent).toContain('18,000');
  });

  it('장바구니 비우기', () => {
    useCart.getState().addItem({ menuId: 1, menuName: '치킨', unitPrice: 18000, imageUrl: null });
    renderWithRouter();
    fireEvent.click(screen.getByTestId('cart-clear-button'));
    expect(screen.getByTestId('cart-empty')).toBeDefined();
  });
});
