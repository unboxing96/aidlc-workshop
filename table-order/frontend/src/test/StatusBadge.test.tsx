import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusBadge from '@/components/StatusBadge';

describe('StatusBadge', () => {
  it('PENDING 상태를 대기중으로 표시', () => {
    render(<StatusBadge status="PENDING" />);
    expect(screen.getByText('대기중')).toBeDefined();
  });

  it('PREPARING 상태를 준비중으로 표시', () => {
    render(<StatusBadge status="PREPARING" />);
    expect(screen.getByText('준비중')).toBeDefined();
  });

  it('COMPLETED 상태를 완료로 표시', () => {
    render(<StatusBadge status="COMPLETED" />);
    expect(screen.getByText('완료')).toBeDefined();
  });
});
