import { useState } from 'react';
import { OrderDetailItem, dashboardApi } from '../services/dashboardApi';
import { OrderStatus } from '../types';
import ConfirmDialog from './ConfirmDialog';

interface OrderDetailModalProps {
  tableNumber: number;
  orders: OrderDetailItem[];
  onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
  onDelete: (orderId: number) => void;
  onClose: () => void;
}

const statusLabels: Record<OrderStatus, string> = {
  PENDING: '대기중',
  PREPARING: '준비중',
  COMPLETED: '완료',
};

const statusColors: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PREPARING: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

const allStatuses: OrderStatus[] = ['PENDING', 'PREPARING', 'COMPLETED'];

export default function OrderDetailModal({ tableNumber, orders, onStatusChange, onDelete, onClose }: OrderDetailModalProps) {
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-testid="order-detail-modal">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">테이블 {tableNumber} 주문 상세</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl" data-testid="modal-close">&times;</button>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-500">주문이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.orderId} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{order.orderNumber}</span>
                  <span className={`px-2 py-1 rounded text-sm ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>

                <ul className="text-sm text-gray-600 mb-3">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{item.menuName} x{item.quantity}</span>
                      <span>{(item.unitPrice * item.quantity).toLocaleString()}원</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <span className="font-semibold">{order.totalAmount.toLocaleString()}원</span>
                  <div className="flex gap-2">
                    {allStatuses.filter((s) => s !== order.status).map((s) => (
                      <button
                        key={s}
                        onClick={() => onStatusChange(order.orderId, s)}
                        className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
                        data-testid={`status-change-${order.orderId}-${s.toLowerCase()}`}
                      >
                        {statusLabels[s]}
                      </button>
                    ))}
                    <button
                      onClick={() => setDeleteTarget(order.orderId)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      data-testid={`delete-order-${order.orderId}`}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="주문 삭제"
        message="이 주문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        onConfirm={() => { if (deleteTarget) { onDelete(deleteTarget); setDeleteTarget(null); } }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
