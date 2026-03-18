# Domain Entities - Unit 5: 관리자 대시보드

## 사용하는 기존 Entity (Unit 0 정의)
- **OrderEntity**: 주문 조회, 상태 변경, 삭제
- **OrderItemEntity**: 주문 항목 조회
- **OrderHistoryEntity**: 과거 이력 저장/조회
- **TableEntity**: 테이블 정보, 세션 관리
- **OrderStatus**: PENDING, PREPARING, COMPLETED

## Unit 5 신규 DTO

### DashboardTableCard
테이블별 대시보드 카드 표시용
- tableId: Long
- tableNumber: int
- currentSessionId: String (nullable)
- totalAmount: int
- orderCount: int
- recentOrders: List\<OrderSummary\> (최신 5개)
- hasNewOrder: boolean

### OrderSummary
주문 미리보기용
- orderId: Long
- orderNumber: String
- totalAmount: int
- status: OrderStatus
- itemSummary: String (예: "김치찌개 외 2건")
- createdAt: LocalDateTime

### OrderDetailResponse
주문 상세 조회용
- orderId: Long
- orderNumber: String
- tableNumber: int
- totalAmount: int
- status: OrderStatus
- items: List\<OrderItemResponse\>
- createdAt: LocalDateTime

### OrderItemResponse
- menuName: String
- quantity: int
- unitPrice: int

### StatusChangeRequest
- status: OrderStatus

### OrderHistoryResponse
과거 내역 조회용
- id: Long
- orderNumber: String
- tableNumber: int
- sessionId: String
- totalAmount: int
- items: String (JSON)
- orderedAt: LocalDateTime
- completedAt: LocalDateTime

## Repository (신규)

### OrderHistoryRepository
- findByTableIdAndCompletedAtBetween(tableId, startDate, endDate): List\<OrderHistoryEntity\>
- findByTableIdOrderByCompletedAtDesc(tableId): List\<OrderHistoryEntity\>
