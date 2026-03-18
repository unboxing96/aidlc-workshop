# Frontend Components - Unit 3: 장바구니 및 주문

## 페이지 컴포넌트

### CustomerCartPage (`/table/:token/cart`)
- **역할**: 장바구니 관리
- **State**: useCart (Zustand store)
- **표시**: CartItem 목록, 총 금액, 주문하기 버튼, 장바구니 비우기 버튼
- **API**: 없음 (로컬 상태만)

### CustomerOrderPage (`/table/:token/order`)
- **역할**: 주문 최종 확인 및 확정
- **State**: useCart (장바구니 데이터), 로컬 state (주문 결과)
- **표시**: 테이블 번호, 메뉴/수량/단가/소계, 총 금액, 예상 대기 시간, 확정/뒤로가기 버튼
- **API**: POST /api/orders
- **성공 후**: 주문 번호 표시 → 5초 후 메뉴 화면 리다이렉트 + clearCart()

### CustomerOrderHistoryPage (`/table/:token/orders`)
- **역할**: 현재 세션 주문 내역 조회
- **State**: 로컬 state (orders 목록, 필터 상태)
- **표시**: 상태 필터 탭, 주문 카드 목록 (번호, 시각, 메뉴, 금액, 상태)
- **API**: GET /api/orders/table/{tableId}

## 공유 컴포넌트

### CartItem
- **Props**: item (CartItem), onUpdateQuantity, onRemove
- **표시**: 메뉴명, 이미지, 단가, 수량 +/- 버튼, 소계, 삭제 버튼

### StatusBadge
- **Props**: status (OrderStatus)
- **표시**: 상태별 색상 뱃지 (PENDING=노랑, PREPARING=파랑, COMPLETED=초록)

## API Service

### orderApi
- `createOrder(tableId, items)` → POST /api/orders
- `getOrdersByTable(tableId)` → GET /api/orders/table/{tableId}
