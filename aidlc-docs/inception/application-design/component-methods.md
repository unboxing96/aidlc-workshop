# Component Methods

## Backend API Endpoints

### TableController
| Method | Endpoint | Description | Input | Output |
|--------|----------|-------------|-------|--------|
| POST | /api/tables | 테이블 등록 | tableNumber: int | TableResponse (id, tableNumber, accessToken) |
| POST | /api/tables/auth | 토큰 인증 | accessToken: string | TableAuthResponse (tableId, tableNumber) |
| POST | /api/tables/{id}/complete | 이용 완료 | - | void |
| GET | /api/tables | 전체 테이블 목록 | - | List\<TableResponse\> |
| GET | /api/tables/{id}/history | 과거 주문 내역 | date?: string | List\<OrderHistoryResponse\> |

### MenuController
| Method | Endpoint | Description | Input | Output |
|--------|----------|-------------|-------|--------|
| GET | /api/menus | 메뉴 목록 (카테고리별) | category?: string | List\<MenuResponse\> |
| GET | /api/categories | 카테고리 목록 | - | List\<CategoryResponse\> |
| POST | /api/menus | 메뉴 등록 | MenuCreateRequest | MenuResponse |
| PUT | /api/menus/{id} | 메뉴 수정 | MenuUpdateRequest | MenuResponse |
| DELETE | /api/menus/{id} | 메뉴 삭제 | - | void |
| PUT | /api/menus/order | 메뉴 순서 변경 | List\<MenuOrderRequest\> | void |

### OrderController
| Method | Endpoint | Description | Input | Output |
|--------|----------|-------------|-------|--------|
| POST | /api/orders | 주문 생성 | OrderCreateRequest (tableId, items) | OrderResponse (orderId, orderNumber) |
| GET | /api/orders/table/{tableId} | 테이블별 현재 주문 조회 | - | List\<OrderResponse\> |
| PUT | /api/orders/{id}/status | 주문 상태 변경 | status: string | OrderResponse |
| DELETE | /api/orders/{id} | 주문 삭제 | - | void |

### OrderSseController
| Method | Endpoint | Description | Input | Output |
|--------|----------|-------------|-------|--------|
| GET | /api/sse/orders/admin | 관리자 SSE 연결 | - | SseEmitter |
| GET | /api/sse/orders/table/{tableId} | 고객 테이블별 SSE 연결 | - | SseEmitter |

### AdminAuthController
| Method | Endpoint | Description | Input | Output |
|--------|----------|-------------|-------|--------|
| POST | /api/admin/register | 회원가입 | username, password | AdminResponse |
| POST | /api/admin/login | 로그인 | username, password | TokenResponse (accessToken) |

### ImageController
| Method | Endpoint | Description | Input | Output |
|--------|----------|-------------|-------|--------|
| POST | /api/images | 이미지 업로드 | MultipartFile | ImageResponse (imageUrl) |
| GET | /api/images/{filename} | 이미지 서빙 | - | Resource (file) |

---

## Backend Service Methods

### TableService
- `createTable(tableNumber)` → TableEntity
- `authenticateByToken(accessToken)` → TableEntity
- `completeTableSession(tableId)` → void (주문 이력 이동, 리셋)
- `getAllTables()` → List\<TableEntity\>
- `getOrderHistory(tableId, date)` → List\<OrderHistoryEntity\>

### MenuService
- `getMenusByCategory(category)` → List\<MenuEntity\>
- `getCategories()` → List\<CategoryEntity\>
- `createMenu(request)` → MenuEntity
- `updateMenu(id, request)` → MenuEntity
- `deleteMenu(id)` → void
- `updateMenuOrder(orderRequests)` → void

### OrderService
- `createOrder(tableId, items)` → OrderEntity
- `getOrdersByTable(tableId)` → List\<OrderEntity\> (현재 세션만)
- `updateOrderStatus(orderId, status)` → OrderEntity
- `deleteOrder(orderId)` → void

### SseEmitterService
- `createAdminEmitter()` → SseEmitter
- `createTableEmitter(tableId)` → SseEmitter
- `broadcastToAdmin(event)` → void
- `sendToTable(tableId, event)` → void

### AdminAuthService
- `register(username, password)` → AdminEntity
- `login(username, password)` → String (JWT token)
- `validateToken(token)` → AdminEntity

---

## Frontend Hooks

### useCart (Zustand Store)
- `items` — 장바구니 항목 목록
- `addItem(menu)` — 메뉴 추가
- `removeItem(menuId)` — 메뉴 삭제
- `updateQuantity(menuId, quantity)` — 수량 변경
- `clearCart()` — 장바구니 비우기
- `totalAmount` — 총 금액 (computed)

### useOrderSSE
- `connect(tableId | 'admin')` — SSE 연결
- `disconnect()` — SSE 연결 해제
- `orders` — 실시간 주문 목록

### useAdminAuth
- `login(username, password)` — 로그인
- `register(username, password)` — 회원가입
- `logout()` — 로그아웃
- `isAuthenticated` — 인증 상태
- `token` — JWT 토큰

### useTableAuth
- `authenticate(token)` — 토큰 인증
- `isAuthenticated` — 인증 상태
- `tableInfo` — 테이블 정보
