import { describe, it, expect, beforeEach } from 'vitest';
import { useCart } from '../stores/cartStore';
import { act } from '@testing-library/react';

describe('cartStore', () => {
  beforeEach(() => {
    act(() => useCart.getState().clearCart());
  });

  it('addItem adds new item with quantity 1', () => {
    act(() => useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 9000, imageUrl: null }));
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(1);
  });

  it('addItem increments quantity for existing item', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 9000, imageUrl: null });
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 9000, imageUrl: null });
    });
    expect(useCart.getState().items[0].quantity).toBe(2);
  });

  it('removeItem removes item', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 9000, imageUrl: null });
      useCart.getState().removeItem(1);
    });
    expect(useCart.getState().items).toHaveLength(0);
  });

  it('totalAmount calculates correctly', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 9000, imageUrl: null });
      useCart.getState().addItem({ menuId: 2, menuName: '된장찌개', unitPrice: 8000, imageUrl: null });
    });
    expect(useCart.getState().totalAmount()).toBe(17000);
  });

  it('clearCart empties all items', () => {
    act(() => {
      useCart.getState().addItem({ menuId: 1, menuName: '김치찌개', unitPrice: 9000, imageUrl: null });
      useCart.getState().clearCart();
    });
    expect(useCart.getState().items).toHaveLength(0);
  });
});
