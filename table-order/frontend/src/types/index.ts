// Domain Types

export interface Admin {
  id: number;
  username: string;
  createdAt: string;
}

export interface TableInfo {
  id: number;
  tableNumber: number;
  accessToken: string;
  currentSessionId: string | null;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  displayOrder: number;
}

export interface Menu {
  id: number;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  categoryId: number;
  displayOrder: number;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'COMPLETED';

export interface OrderItem {
  id: number;
  menuName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  tableId: number;
  sessionId: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderHistory {
  id: number;
  orderNumber: string;
  tableId: number;
  tableNumber: number;
  sessionId: string;
  totalAmount: number;
  items: string;
  orderedAt: string;
  completedAt: string;
}

// Cart Types
export interface CartItem {
  menuId: number;
  menuName: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string | null;
}

// SSE Event Types
export type SseEventType =
  | 'ORDER_CREATED'
  | 'ORDER_STATUS_CHANGED'
  | 'ORDER_DELETED'
  | 'TABLE_SESSION_COMPLETED';

export interface SseEvent {
  type: SseEventType;
  payload: unknown;
}

// API Response Types
export interface ErrorResponse {
  code: string;
  message: string;
  timestamp: string;
}

export interface TokenResponse {
  accessToken: string;
}

export interface TableAuthResponse {
  tableId: number;
  tableNumber: number;
}

// Auth Types
export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminRegisterRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
}

export interface MessageResponse {
  message: string;
}

export interface TableResponse {
  id: number;
  tableNumber: number;
  accessToken: string;
  currentSessionId: string | null;
  createdAt: string;
}
