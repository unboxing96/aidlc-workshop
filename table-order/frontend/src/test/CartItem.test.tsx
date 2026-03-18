import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CartItem from '@/components/CartItem';

describe('CartItem', () => {
  const item = { menuId: 1, menuName: '치킨', unitPrice: 18000, quantity: 2, imageUrl: null };

  it('메뉴명, 수량, 소계를 표시한다', () => {
    render(<CartItem item={item} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText('치킨')).toBeDefined();
    expect(screen.getByTestId('cart-item-qty-1').textContent).toBe('2');
    expect(screen.getByText('36,000원')).toBeDefined();
  });

  it('+ 버튼 클릭 시 수량 증가 호출', () => {
    const onUpdate = vi.fn();
    render(<CartItem item={item} onUpdateQuantity={onUpdate} onRemove={vi.fn()} />);
    fireEvent.click(screen.getByTestId('cart-item-increase-1'));
    expect(onUpdate).toHaveBeenCalledWith(1, 3);
  });

  it('- 버튼 클릭 시 수량 감소 호출', () => {
    const onUpdate = vi.fn();
    render(<CartItem item={item} onUpdateQuantity={onUpdate} onRemove={vi.fn()} />);
    fireEvent.click(screen.getByTestId('cart-item-decrease-1'));
    expect(onUpdate).toHaveBeenCalledWith(1, 1);
  });

  it('삭제 버튼 클릭 시 삭제 호출', () => {
    const onRemove = vi.fn();
    render(<CartItem item={item} onUpdateQuantity={vi.fn()} onRemove={onRemove} />);
    fireEvent.click(screen.getByTestId('cart-item-remove-1'));
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it('이미지 없으면 플레이스홀더 표시', () => {
    render(<CartItem item={item} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText('No Image')).toBeDefined();
  });
});
