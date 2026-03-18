import api from './api';
import type { Order } from '@/types';

interface OrderCreatePayload {
  tableId: number;
  items: { menuId: number; quantity: number }[];
}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const orderApi = {
  createOrder: (payload: OrderCreatePayload) =>
    api.post<Order>('/orders', payload).then((res) => res.data),

  getOrdersByTable: (tableId: number, page = 0, size = 50) =>
    api.get<PageResponse<Order>>(`/orders/table/${tableId}`, { params: { page, size } }).then((res) => res.data),
};
