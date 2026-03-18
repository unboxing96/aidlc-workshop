import { describe, it, expect, beforeEach } from 'vitest';
import { useCart } from '@/stores/cartStore';
import { act } from 'react';

describe('cartStore', () => {
  beforeEach(() => {
    const { clearCart } = useCart.getState();
    act(() => clearCart());
  });

  it('adds item to cart', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 8000, imageUrl: null });
    });
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(1);
  });

  it('increments quantity for existing item', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 8000, imageUrl: null });
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 8000, imageUrl: null });
    });
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(2);
  });

  it('updates quantity', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 8000, imageUrl: null });
      useCart.getState().updateQuantity(1, 5);
    });
    expect(useCart.getState().items[0].quantity).toBe(5);
  });

  it('removes item when quantity is 0', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 8000, imageUrl: null });
      useCart.getState().updateQuantity(1, 0);
    });
    expect(useCart.getState().items).toHaveLength(0);
  });

  it('calculates total amount', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 8000, imageUrl: null });
      useCart.getState().addItem({ menuId: 2, menuName: '된장찌개', unitPrice: 7000, imageUrl: null });
      useCart.getState().updateQuantity(1, 2);
    });
    expect(useCart.getState().totalAmount()).toBe(23000); // 8000*2 + 7000*1
  });

  it('clears cart', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 8000, imageUrl: null });
      useCart.getState().clearCart();
    });
    expect(useCart.getState().items).toHaveLength(0);
  });
});
