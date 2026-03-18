import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryNav from '../../components/CategoryNav';

describe('CategoryNav', () => {
  const categories = [
    { id: 1, name: '한식', displayOrder: 0 },
    { id: 2, name: '양식', displayOrder: 1 },
  ];

  it('전체 + 카테고리 버튼 표시', () => {
    render(<CategoryNav categories={categories} selectedId={null} onSelect={() => {}} />);
    expect(screen.getByText('전체')).toBeDefined();
    expect(screen.getByText('한식')).toBeDefined();
    expect(screen.getByText('양식')).toBeDefined();
  });

  it('선택 시 onSelect 호출', () => {
    const onSelect = vi.fn();
    render(<CategoryNav categories={categories} selectedId={null} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('한식'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
