import { DashboardTableCard, OrderSummaryItem } from '../services/dashboardApi';
import { OrderStatus } from '../types';

interface TableCardProps {
  card: DashboardTableCard;
  onClick: () => void;
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PREPARING: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

export default function TableCard({ card, onClick }: TableCardProps) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
        card.hasNewOrder ? 'ring-2 ring-blue-500 animate-pulse' : ''
      }`}
      data-testid={`table-card-${card.tableNumber}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">테이블 {card.tableNumber}</h3>
        <span className="text-lg font-semibold text-blue-600">
          {card.totalAmount.toLocaleString()}원
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-2">주문 {card.orderCount}건</p>

      {card.recentOrders.length > 0 ? (
        <ul className="space-y-1">
          {card.recentOrders.map((order: OrderSummaryItem) => (
            <li key={order.orderId} className="flex justify-between items-center text-sm">
              <span className="truncate flex-1">{order.itemSummary}</span>
              <span className={`ml-2 px-2 py-0.5 rounded text-xs ${statusColors[order.status]}`}>
                {order.status === 'PENDING' ? '대기' : order.status === 'PREPARING' ? '준비중' : '완료'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">주문 없음</p>
      )}
    </div>
  );
}
