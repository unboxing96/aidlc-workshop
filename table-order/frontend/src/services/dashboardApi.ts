import api from './api';
import { Order, OrderHistory, OrderStatus } from '../types';

export interface DashboardTableCard {
  tableId: number;
  tableNumber: number;
  currentSessionId: string | null;
  totalAmount: number;
  orderCount: number;
  recentOrders: OrderSummaryItem[];
  hasNewOrder: boolean;
}

export interface OrderSummaryItem {
  orderId: number;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  itemSummary: string;
  createdAt: string;
}

export interface OrderDetailItem {
  orderId: number;
  orderNumber: string;
  tableNumber: number;
  totalAmount: number;
  status: OrderStatus;
  items: { menuName: string; quantity: number; unitPrice: number }[];
  createdAt: string;
}

export const dashboardApi = {
  getDashboard: () =>
    api.get<DashboardTableCard[]>('/admin/dashboard').then((r) => r.data),

  getTableOrders: (tableId: number) =>
    api.get<OrderDetailItem[]>(`/admin/tables/${tableId}/orders`).then((r) => r.data),

  changeOrderStatus: (orderId: number, status: OrderStatus) =>
    api.patch(`/admin/orders/${orderId}/status`, { status }),

  deleteOrder: (orderId: number) =>
    api.delete(`/admin/orders/${orderId}`),

  completeTableSession: (tableId: number) =>
    api.post(`/admin/tables/${tableId}/complete`),

  getOrderHistory: (tableId: number, startDate?: string, endDate?: string) =>
    api.get<OrderHistory[]>(`/admin/tables/${tableId}/history`, {
      params: { startDate, endDate },
    }).then((r) => r.data),
};
