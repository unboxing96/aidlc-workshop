// === Entity Types ===
export interface Menu {
  id: number;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  categoryId: number;
  displayOrder: number;
}

export interface Category {
  id: number;
  name: string;
  displayOrder: number;
}

export interface Table {
  id: number;
  tableNumber: number;
  accessToken: string;
  currentSessionId: string | null;
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

export interface OrderItem {
  id: number;
  menuName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderHistory {
  id: number;
  orderNumber: string;
  tableNumber: number;
  sessionId: string;
  totalAmount: number;
  items: string;
  orderedAt: string;
  completedAt: string;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'COMPLETED';

// === Cart ===
export interface CartItem {
  menuId: number;
  menuName: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string | null;
}

// === Auth ===
export interface TableAuthResponse {
  tableId: number;
  tableNumber: number;
  token?: string;
}

export interface TableResponse {
  id: number;
  tableNumber: number;
  accessToken: string;
  currentSessionId: string | null;
}

export interface MessageResponse {
  message: string;
}

// === SSE ===
export type SseEventType = 'ORDER_CREATED' | 'ORDER_STATUS_CHANGED' | 'ORDER_DELETED' | 'TABLE_SESSION_COMPLETED';
