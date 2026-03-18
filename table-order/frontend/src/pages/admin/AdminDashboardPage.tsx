import { useState, useEffect, useCallback } from 'react';
import { dashboardApi, DashboardTableCard, OrderDetailItem } from '../../services/dashboardApi';
import { OrderStatus } from '../../types';
import { useOrderSSE } from '../../hooks/useOrderSSE';
import TableCard from '../../components/TableCard';
import DashboardFilter, { FilterType } from '../../components/DashboardFilter';
import OrderDetailModal from '../../components/OrderDetailModal';

export default function AdminDashboardPage() {
  const [cards, setCards] = useState<DashboardTableCard[]>([]);
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [selectedTableNumber, setSelectedTableNumber] = useState<number>(0);
  const [orders, setOrders] = useState<OrderDetailItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(() => {
    dashboardApi.getDashboard().then(setCards).finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  useOrderSSE({
    onOrderCreated: () => loadDashboard(),
    onOrderStatusChanged: () => { loadDashboard(); if (selectedTableId) loadTableOrders(selectedTableId); },
    onOrderDeleted: () => { loadDashboard(); if (selectedTableId) loadTableOrders(selectedTableId); },
    onTableSessionCompleted: () => { loadDashboard(); setSelectedTableId(null); },
  });

  const loadTableOrders = (tableId: number) => {
    dashboardApi.getTableOrders(tableId).then(setOrders);
  };

  const handleCardClick = (card: DashboardTableCard) => {
    setSelectedTableId(card.tableId);
    setSelectedTableNumber(card.tableNumber);
    loadTableOrders(card.tableId);
  };

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    await dashboardApi.changeOrderStatus(orderId, newStatus);
    loadDashboard();
    if (selectedTableId) loadTableOrders(selectedTableId);
  };

  const handleDelete = async (orderId: number) => {
    await dashboardApi.deleteOrder(orderId);
    loadDashboard();
    if (selectedTableId) loadTableOrders(selectedTableId);
  };

  const filteredCards = cards.filter((card) => {
    if (filter === 'ALL') return true;
    if (filter === 'HAS_ORDER') return card.orderCount > 0;
    if (filter === 'HAS_PENDING') return card.recentOrders.some((o) => o.status === 'PENDING');
    if (filter === 'HAS_PREPARING') return card.recentOrders.some((o) => o.status === 'PREPARING');
    return true;
  });

  if (loading) return <div className="p-6 text-gray-500">로딩 중...</div>;

  return (
    <div className="p-6" data-testid="admin-dashboard-page">
      <h1 className="text-2xl font-bold mb-4">주문 대시보드</h1>
      <DashboardFilter currentFilter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCards.map((card) => (
          <TableCard key={card.tableId} card={card} onClick={() => handleCardClick(card)} />
        ))}
      </div>

      {selectedTableId && (
        <OrderDetailModal
          tableNumber={selectedTableNumber}
          orders={orders}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onClose={() => setSelectedTableId(null)}
        />
      )}
    </div>
  );
}
