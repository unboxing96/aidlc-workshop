# Frontend Components - Unit 5: 관리자 대시보드

## 라우트
- `/admin/dashboard` → AdminDashboardPage
- `/admin/tables` → AdminTableManagePage (이용 완료, 과거 내역)

## 1. AdminDashboardPage

### 구조
```
AdminDashboardPage
├── DashboardFilter (상태별 필터)
├── TableCardGrid
│   └── TableCard (반복)
│       ├── 테이블 번호, 총 주문액
│       ├── OrderPreviewList (최신 5개)
│       └── 신규 주문 강조 (애니메이션)
└── OrderDetailModal
    ├── 주문 목록 (전체)
    ├── StatusChangeButton (상태 변경)
    └── DeleteOrderButton (주문 삭제)
```

### TableCard Props
- tableId: number
- tableNumber: number
- totalAmount: number
- recentOrders: OrderSummary[]
- hasNewOrder: boolean
- onClick: () => void

### DashboardFilter Props
- currentFilter: 'ALL' | 'HAS_PENDING' | 'HAS_PREPARING' | 'HAS_ORDER'
- onFilterChange: (filter) => void

### OrderDetailModal Props
- tableId: number
- tableNumber: number
- orders: Order[]
- onStatusChange: (orderId, newStatus) => void
- onDelete: (orderId) => void
- onClose: () => void

## 2. AdminTableManagePage

### 구조
```
AdminTableManagePage
├── TableList
│   └── TableRow (반복)
│       ├── 테이블 번호, 세션 상태
│       ├── CompleteSessionButton (이용 완료)
│       └── ViewHistoryButton (과거 내역)
├── ConfirmDialog (이용 완료 확인)
└── OrderHistoryModal
    ├── DateFilter (날짜 범위)
    └── HistoryList
        └── HistoryItem (반복)
```

### ConfirmDialog Props
- open: boolean
- title: string
- message: string
- onConfirm: () => void
- onCancel: () => void

### OrderHistoryModal Props
- tableId: number
- tableNumber: number
- onClose: () => void

## 3. API 연동

| Component | Endpoint | Method |
|---|---|---|
| AdminDashboardPage | /api/admin/dashboard | GET |
| OrderDetailModal | /api/admin/tables/{id}/orders | GET |
| StatusChangeButton | /api/admin/orders/{id}/status | PATCH |
| DeleteOrderButton | /api/admin/orders/{id} | DELETE |
| CompleteSessionButton | /api/admin/tables/{id}/complete | POST |
| OrderHistoryModal | /api/admin/tables/{id}/history | GET |

## 4. SSE 연동
- AdminDashboardPage에서 SSE 구독
- ORDER_CREATED: 해당 테이블 카드 업데이트 + 신규 주문 강조
- ORDER_STATUS_CHANGED: 해당 주문 상태 반영
- ORDER_DELETED: 해당 주문 제거 + 총액 재계산
- TABLE_SESSION_COMPLETED: 해당 테이블 카드 리셋
