# Domain Entities - Unit 3: 장바구니 및 주문

## Unit 3이 소유하는 Entity
Unit 0에서 정의된 공통 Entity를 사용합니다. Unit 3은 새 Entity를 추가하지 않습니다.

### 사용 Entity
| Entity | 소유 | Unit 3 역할 |
|--------|------|-------------|
| OrderEntity | Unit 0 정의 | 주문 생성, 조회 |
| OrderItemEntity | Unit 0 정의 | 주문 항목 생성 |
| TableEntity | Unit 0 정의 | 세션 확인/시작 (currentSessionId) |
| MenuEntity | Unit 0 정의 | 메뉴 정보 스냅샷 조회 |

## Unit 3 DTO

### OrderCreateRequest
```
tableId: Long (필수)
items: List<OrderItemRequest> (필수, 최소 1개)
```

### OrderItemRequest
```
menuId: Long (필수)
quantity: int (필수, 1 이상)
```

### OrderResponse
```
id: Long
orderNumber: String
tableId: Long
sessionId: String
totalAmount: int
status: OrderStatus
items: List<OrderItemResponse>
createdAt: String
```

### OrderItemResponse
```
id: Long
menuName: String
quantity: int
unitPrice: int
```
