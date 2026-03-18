import api from './api';
import type { TableAuthResponse, TableResponse, OrderHistory, MessageResponse } from '../types';

export const tableApi = {
  authenticateToken: (accessToken: string) =>
    api.post<TableAuthResponse>('/tables/auth', { accessToken }),

  createTable: (tableNumber: number) =>
    api.post<TableResponse>('/tables', { tableNumber }),

  getAllTables: () =>
    api.get<TableResponse[]>('/tables'),

  completeSession: (tableId: number) =>
    api.post<MessageResponse>(`/tables/${tableId}/complete`),

  getOrderHistory: (tableId: number) =>
    api.get<OrderHistory[]>(`/tables/${tableId}/history`),
};
