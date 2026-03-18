# Domain Entities - Unit 0: 공통 기반

## Entity Relationship Diagram

```
+----------------+       +----------------+
|    Admin       |       |    Table       |
+----------------+       +----------------+
| id: Long (PK)  |       | id: Long (PK)  |
| username: String|       | tableNumber: int|
| password: String|       | accessToken: String|
| createdAt: Time |       | currentSessionId: String|
+----------------+       | createdAt: Time |
                         +----------------+
                                |
                                | 1:N
                                v
+----------------+       +----------------+
|   Category     |       |    Order       |
+----------------+       +----------------+
| id: Long (PK)  |       | id: Long (PK)  |
| name: String   |       | orderNumber: String|
| displayOrder:int|       | tableId: Long (FK)|
| createdAt: Time |       | sessionId: String|
+----------------+       | totalAmount: int |
        |                 | status: OrderStatus|
        | 1:N             | createdAt: Time |
        v                 +----------------+
+----------------+               |
|     Menu       |               | 1:N
+----------------+               v
| id: Long (PK)  |       +----------------+
| name: String   |       |   OrderItem    |
| price: int     |       +----------------+
| description:   |       | id: Long (PK)  |
|   String       |       | orderId: Long(FK)|
| imageUrl:String|       | menuName: String|
| categoryId:    |       | quantity: int   |
|   Long (FK)    |       | unitPrice: int  |
| displayOrder:int|       +----------------+
| createdAt: Time |
+----------------+

+--------------------+
|   OrderHistory     |
+--------------------+
| id: Long (PK)      |
| orderNumber: String |
| tableId: Long       |
| tableNumber: int    |
| sessionId: String   |
| totalAmount: int    |
| items: JSON/String  |
| orderedAt: Time     |
| completedAt: Time   |
+--------------------+
```

## Entity 상세

### Admin
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| id | Long | PK, Auto | 관리자 ID |
| username | String | Unique, Not Null, Max 50 | 사용자명 |
| password | String | Not Null | bcrypt 해싱된 비밀번호 |
| createdAt | LocalDateTime | Not Null | 생성 시각 |

### TableEntity
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| id | Long | PK, Auto | 테이블 ID |
| tableNumber | int | Unique, Not Null | 테이블 번호 |
| accessToken | String | Unique, Not Null | 태블릿 인증 토큰 (UUID) |
| currentSessionId | String | Nullable | 현재 테이블 세션 ID (UUID, null이면 세션 없음) |
| createdAt | LocalDateTime | Not Null | 생성 시각 |

### Category
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| id | Long | PK, Auto | 카테고리 ID |
| name | String | Unique, Not Null, Max 30 | 카테고리명 |
| displayOrder | int | Not Null, Default 0 | 노출 순서 |
| createdAt | LocalDateTime | Not Null | 생성 시각 |

### Menu
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| id | Long | PK, Auto | 메뉴 ID |
| name | String | Not Null, Max 50 | 메뉴명 |
| price | int | Not Null, Min 0 | 가격 (원) |
| description | String | Nullable, Max 500 | 메뉴 설명 |
| imageUrl | String | Nullable | 이미지 경로 |
| categoryId | Long | FK → Category | 카테고리 |
| displayOrder | int | Not Null, Default 0 | 노출 순서 |
| createdAt | LocalDateTime | Not Null | 생성 시각 |

### Order
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| id | Long | PK, Auto | 주문 ID |
| orderNumber | String | Unique, Not Null | 주문 번호 (생성 시 자동 부여) |
| tableId | Long | FK → TableEntity, Not Null | 테이블 |
| sessionId | String | Not Null | 테이블 세션 ID |
| totalAmount | int | Not Null | 총 주문 금액 |
| status | OrderStatus | Not Null, Default PENDING | 주문 상태 |
| createdAt | LocalDateTime | Not Null | 주문 시각 |

### OrderItem
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| id | Long | PK, Auto | 주문 항목 ID |
| orderId | Long | FK → Order, Not Null | 주문 |
| menuName | String | Not Null | 메뉴명 (주문 시점 스냅샷) |
| quantity | int | Not Null, Min 1 | 수량 |
| unitPrice | int | Not Null, Min 0 | 단가 (주문 시점 스냅샷) |

### OrderHistory
| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| id | Long | PK, Auto | 이력 ID |
| orderNumber | String | Not Null | 주문 번호 |
| tableId | Long | Not Null | 테이블 ID |
| tableNumber | int | Not Null | 테이블 번호 |
| sessionId | String | Not Null | 세션 ID |
| totalAmount | int | Not Null | 총 금액 |
| items | String | Not Null | 주문 항목 JSON |
| orderedAt | LocalDateTime | Not Null | 원래 주문 시각 |
| completedAt | LocalDateTime | Not Null | 이용 완료 시각 |

## Enum

### OrderStatus
```
PENDING    → 대기중
PREPARING  → 준비중
COMPLETED  → 완료
```
