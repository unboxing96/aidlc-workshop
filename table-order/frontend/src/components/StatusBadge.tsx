import type { OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: '대기중', className: 'bg-yellow-100 text-yellow-800' },
  PREPARING: { label: '준비중', className: 'bg-blue-100 text-blue-800' },
  COMPLETED: { label: '완료', className: 'bg-green-100 text-green-800' },
};

interface Props {
  status: OrderStatus;
}

export default function StatusBadge({ status }: Props) {
  const config = statusConfig[status];
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`} data-testid="status-badge">
      {config.label}
    </span>
  );
}
