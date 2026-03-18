# Logical Components - Unit 3: 장바구니 및 주문

## Backend Components

```
+--------------------------------------------------+
|              Unit 3: Order Domain                 |
|                                                   |
|  +---------------------------------------------+ |
|  |          OrderController                     | |
|  |  POST /api/orders                            | |
|  |  GET  /api/orders/table/{tableId}            | |
|  +---------------------------------------------+ |
|                      |                            |
|                      v                            |
|  +---------------------------------------------+ |
|  |          OrderService                        | |
|  |  createOrder() [@Transactional]              | |
|  |  getOrdersByTable() [Pageable]               | |
|  |  + SSE 재시도 로직 (5회)                       | |
|  +---------------------------------------------+ |
|                      |                            |
|          +-----------+-----------+                |
|          v                       v                |
|  +----------------+   +-------------------+       |
|  | OrderRepository|   | OrderItemRepository|      |
|  +----------------+   +-------------------+       |
|                                                   |
|  의존 (Unit 0):                                    |
|  - TableRepository (세션 확인/시작)                  |
|  - MenuRepository (스냅샷 조회)                     |
|  - SseEmitterService (이벤트 발행) [Unit 4 통합]    |
+--------------------------------------------------+
```

## Frontend Components

```
+--------------------------------------------------+
|              Unit 3: Cart & Order UI              |
|                                                   |
|  Pages:                                           |
|  +---------------------------------------------+ |
|  | CustomerCartPage     (/table/:token/cart)    | |
|  | CustomerOrderPage    (/table/:token/order)   | |
|  | CustomerOrderHistoryPage (/table/:token/orders)| |
|  +---------------------------------------------+ |
|                                                   |
|  Shared Components:                               |
|  +---------------------------------------------+ |
|  | CartItem      | StatusBadge                  | |
|  +---------------------------------------------+ |
|                                                   |
|  State:                                           |
|  +---------------------------------------------+ |
|  | useCart (Zustand + localStorage persist)      | |
|  +---------------------------------------------+ |
|                                                   |
|  API Service:                                     |
|  +---------------------------------------------+ |
|  | orderApi (Axios)                             | |
|  |  createOrder() -> POST /api/orders           | |
|  |  getOrdersByTable() -> GET /api/orders/...   | |
|  +---------------------------------------------+ |
+--------------------------------------------------+
```
