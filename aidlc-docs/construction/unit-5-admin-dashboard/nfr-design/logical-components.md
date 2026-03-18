# Logical Components - Unit 5: 관리자 대시보드

## Backend

```
+--------------------------------------------------+
|          Unit 5: Dashboard Module                |
|                                                  |
|  +--------------------------------------------+ |
|  |        DashboardController                  | |
|  |  GET  /api/admin/dashboard                  | |
|  |  GET  /api/admin/tables/{id}/orders         | |
|  |  PATCH /api/admin/orders/{id}/status        | |
|  |  DELETE /api/admin/orders/{id}              | |
|  |  POST /api/admin/tables/{id}/complete       | |
|  |  GET  /api/admin/tables/{id}/history        | |
|  +--------------------------------------------+ |
|                    |                             |
|  +--------------------------------------------+ |
|  |        DashboardService                     | |
|  |  - getDashboard()                           | |
|  |  - getTableOrders()                         | |
|  |  - changeOrderStatus()                      | |
|  |  - deleteOrder()                            | |
|  |  - completeTableSession()                   | |
|  |  - getOrderHistory()                        | |
|  +--------------------------------------------+ |
|              |              |                    |
|  +-----------+--+  +-------+---------+          |
|  | OrderRepo    |  | OrderHistory    |          |
|  | (Unit 0)     |  | Repository      |          |
|  +--------------+  +-----------------+          |
+--------------------------------------------------+
```

## Frontend

```
+--------------------------------------------------+
|          Unit 5: Admin Dashboard UI              |
|                                                  |
|  +--------------------------------------------+ |
|  |  AdminDashboardPage                         | |
|  |  ├── DashboardFilter                        | |
|  |  ├── TableCard (x30 max)                    | |
|  |  ├── OrderDetailModal                       | |
|  |  └── useOrderSSE hook ←── SSE EventSource   | |
|  +--------------------------------------------+ |
|                                                  |
|  +--------------------------------------------+ |
|  |  AdminTableManagePage                       | |
|  |  ├── ConfirmDialog                          | |
|  |  └── OrderHistoryModal                      | |
|  +--------------------------------------------+ |
|                                                  |
|  +--------------------------------------------+ |
|  |  dashboardApi.ts                            | |
|  |  → Axios instance (Unit 0) 사용             | |
|  +--------------------------------------------+ |
+--------------------------------------------------+
```
