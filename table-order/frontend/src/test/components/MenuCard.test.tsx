import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MenuCard from '../../components/MenuCard';

describe('MenuCard', () => {
  const menu = { id: 1, name: '김치찌개', price: 9000, description: '매운 김치찌개', imageUrl: null, categoryId: 1, displayOrder: 0 };

  it('메뉴 정보 표시', () => {
    render(<MenuCard menu={menu} />);
    expect(screen.getByText('김치찌개')).toBeDefined();
    expect(screen.getByText('9,000원')).toBeDefined();
    expect(screen.getByText('매운 김치찌개')).toBeDefined();
  });

  it('이미지 없으면 플레이스홀더', () => {
    render(<MenuCard menu={menu} />);
    expect(screen.getByText('이미지 없음')).toBeDefined();
  });

  it('onAdd 있으면 담기 버튼 표시', () => {
    render(<MenuCard menu={menu} onAdd={() => {}} />);
    expect(screen.getByText('담기')).toBeDefined();
  });
});
