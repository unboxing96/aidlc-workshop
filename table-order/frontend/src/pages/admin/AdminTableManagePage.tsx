import { useState, useEffect } from 'react';
import { dashboardApi, DashboardTableCard } from '../../services/dashboardApi';
import ConfirmDialog from '../../components/ConfirmDialog';
import OrderHistoryModal from '../../components/OrderHistoryModal';

export default function AdminTableManagePage() {
  const [cards, setCards] = useState<DashboardTableCard[]>([]);
  const [completeTarget, setCompleteTarget] = useState<{ id: number; number: number } | null>(null);
  const [historyTarget, setHistoryTarget] = useState<{ id: number; number: number } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { dashboardApi.getDashboard().then(setCards); }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleComplete = async () => {
    if (!completeTarget) return;
    try {
      await dashboardApi.completeTableSession(completeTarget.id);
      showToast(`테이블 ${completeTarget.number} 이용 완료 처리되었습니다.`, 'success');
      dashboardApi.getDashboard().then(setCards);
    } catch (err: any) {
      showToast(err.response?.data?.message || '이용 완료 처리에 실패했습니다.', 'error');
    }
    setCompleteTarget(null);
  };

  return (
    <div className="p-6" data-testid="admin-table-manage-page">
      <h1 className="text-2xl font-bold mb-4">테이블 관리</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-3 text-left">테이블 번호</th>
              <th className="border p-3 text-left">세션 상태</th>
              <th className="border p-3 text-left">주문 수</th>
              <th className="border p-3 text-left">총 주문액</th>
              <th className="border p-3 text-left">관리</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.tableId} className="hover:bg-gray-50">
                <td className="border p-3 font-medium">테이블 {card.tableNumber}</td>
                <td className="border p-3">
                  <span className={`px-2 py-1 rounded text-sm ${card.currentSessionId ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {card.currentSessionId ? '이용중' : '비어있음'}
                  </span>
                </td>
                <td className="border p-3">{card.orderCount}건</td>
                <td className="border p-3">{card.totalAmount.toLocaleString()}원</td>
                <td className="border p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCompleteTarget({ id: card.tableId, number: card.tableNumber })}
                      disabled={!card.currentSessionId}
                      className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid={`complete-session-${card.tableNumber}`}
                    >
                      이용 완료
                    </button>
                    <button
                      onClick={() => setHistoryTarget({ id: card.tableId, number: card.tableNumber })}
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                      data-testid={`view-history-${card.tableNumber}`}
                    >
                      과거 내역
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={completeTarget !== null}
        title="이용 완료"
        message={`테이블 ${completeTarget?.number}의 이용을 완료하시겠습니까? 모든 주문이 완료 상태여야 합니다.`}
        onConfirm={handleComplete}
        onCancel={() => setCompleteTarget(null)}
      />

      {historyTarget && (
        <OrderHistoryModal
          tableId={historyTarget.id}
          tableNumber={historyTarget.number}
          onClose={() => setHistoryTarget(null)}
        />
      )}

      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} data-testid="toast">
          {toast.message}
        </div>
      )}
    </div>
  );
}
