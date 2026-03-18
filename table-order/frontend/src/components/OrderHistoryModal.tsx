import { useState, useEffect } from 'react';
import { dashboardApi } from '../services/dashboardApi';
import { OrderHistory } from '../types';

interface OrderHistoryModalProps {
  tableId: number;
  tableNumber: number;
  onClose: () => void;
}

export default function OrderHistoryModal({ tableId, tableNumber, onClose }: OrderHistoryModalProps) {
  const [history, setHistory] = useState<OrderHistory[]>([]);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 10);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dashboardApi.getOrderHistory(tableId, startDate, endDate)
      .then(setHistory)
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [tableId, startDate, endDate]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-testid="order-history-modal">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">테이블 {tableNumber} 과거 내역</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl" data-testid="history-modal-close">&times;</button>
        </div>

        <div className="flex gap-3 mb-4" data-testid="date-filter">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-1 text-sm" data-testid="date-start" />
          <span className="self-center">~</span>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-1 text-sm" data-testid="date-end" />
        </div>

        {loading ? (
          <p className="text-gray-500">로딩 중...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-500">과거 내역이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="border rounded-lg p-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{h.orderNumber}</span>
                  <span className="text-gray-500">{new Date(h.orderedAt).toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {(() => { try { return JSON.parse(h.items).map((item: { menuName: string; quantity: number }) => `${item.menuName} x${item.quantity}`).join(', '); } catch { return h.items; } })()}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{h.totalAmount.toLocaleString()}원</span>
                  <span className="text-gray-400">완료: {new Date(h.completedAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
