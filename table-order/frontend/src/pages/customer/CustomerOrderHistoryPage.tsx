import { useState, useEffect } from 'react';
import { orderApi } from '@/services/orderApi';
import StatusBadge from '@/components/StatusBadge';
import type { Order, OrderStatus } from '@/types';

const FILTER_TABS: { label: string; value: OrderStatus | 'ALL' }[] = [
  { label: '전체', value: 'ALL' },
  { label: '대기중', value: 'PENDING' },
  { label: '준비중', value: 'PREPARING' },
  { label: '완료', value: 'COMPLETED' },
];

export default function CustomerOrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [loading, setLoading] = useState(true);

  const tableId = Number(localStorage.getItem('tableId'));

  useEffect(() => {
    if (!tableId) return;
    setLoading(true);
    orderApi.getOrdersByTable(tableId).then((res) => {
      setOrders(res.content);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [tableId]);

  const filtered = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">주문 내역</h1>

      <div className="flex gap-2 mb-4" data-testid="order-filter-tabs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            data-testid={`filter-tab-${tab.value}`}
            className={`px-4 py-2 rounded-full text-sm ${filter === tab.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter(tab.value)}
          >{tab.label}</button>
        ))}
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-500">로딩 중...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-8 text-gray-500" data-testid="order-history-empty">주문 내역이 없습니다</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="border rounded-lg p-4" data-testid={`order-card-${order.id}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{order.orderNumber}</span>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-sm text-gray-500 mb-2">{new Date(order.createdAt).toLocaleString('ko-KR')}</p>
              <div className="space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.menuName} x{item.quantity}</span>
                    <span>{(item.unitPrice * item.quantity).toLocaleString()}원</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t flex justify-between font-medium">
                <span>합계</span>
                <span>{order.totalAmount.toLocaleString()}원</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
