# Component Dependencies

## Frontend → Backend API 통신

```
+------------------+         +------------------+
|   React App      |  HTTP   |  Spring Boot     |
|   (Vite + TS)    |-------->|  REST API        |
|                  |  SSE    |                  |
|                  |<--------|  SSE Endpoints   |
+------------------+         +------------------+
        |                            |
        | localStorage               | JPA
        v                            v
  +----------+                 +----------+
  | Browser  |                 | H2 DB    |
  | Storage  |                 | (File)   |
  +----------+                 +----------+
```

## Backend 내부 의존성

```
+-------------------+
|   Controllers     |
+-------------------+
| TableController   |---> TableService
| MenuController    |---> MenuService
| OrderController   |---> OrderService
| OrderSseController|---> SseEmitterService
| AdminAuthController|---> AdminAuthService
| ImageController   |---> ImageService
+-------------------+
         |
         v
+-------------------+
|   Services        |
+-------------------+
| OrderService      |---> SseEmitterService (이벤트 발행)
| TableService      |---> OrderService (이용 완료 시 주문 이력 이동)
| AdminAuthService  |---> (독립)
| MenuService       |---> (독립)
| ImageService      |---> (독립)
| SseEmitterService |---> (독립, 이벤트 브로드캐스트)
+-------------------+
         |
         v
+-------------------+
|   Repositories    |
+-------------------+
| TableRepository   |
| MenuRepository    |
| CategoryRepository|
| OrderRepository   |
| OrderItemRepository|
| OrderHistoryRepository|
| AdminRepository   |
+-------------------+
```

## 의존성 매트릭스

| Component | 의존 대상 | 의존 유형 |
|-----------|----------|----------|
| OrderService | SseEmitterService | 이벤트 발행 (주문 생성/변경/삭제 시) |
| OrderService | OrderRepository, OrderItemRepository | 데이터 접근 |
| TableService | OrderService | 이용 완료 시 주문 이력 처리 |
| TableService | OrderHistoryRepository | 이력 데이터 접근 |
| TableService | TableRepository | 데이터 접근 |
| MenuService | MenuRepository, CategoryRepository | 데이터 접근 |
| AdminAuthService | AdminRepository | 데이터 접근 |
| SseEmitterService | (없음) | 독립, ConcurrentHashMap으로 emitter 관리 |

## Frontend 내부 의존성

| Component | 의존 대상 | 의존 유형 |
|-----------|----------|----------|
| CustomerMenuPage | menuApi, useCart, useTableAuth | API 호출, 상태 관리 |
| CustomerCartPage | useCart | 장바구니 상태 |
| CustomerOrderPage | orderApi, useCart, useTableAuth | 주문 생성, 장바구니 비우기 |
| CustomerOrderHistoryPage | orderApi, useOrderSSE, useTableAuth | 주문 조회, 실시간 업데이트 |
| AdminDashboardPage | orderApi, tableApi, useOrderSSE, useAdminAuth | 대시보드 데이터, 실시간 |
| AdminTableManagePage | tableApi, useAdminAuth | 테이블 관리 |
| AdminMenuManagePage | menuApi, imageApi, useAdminAuth | 메뉴 CRUD |
