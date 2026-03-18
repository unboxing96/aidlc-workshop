# Business Logic Model - Unit 3: 장바구니 및 주문

## 1. 장바구니 관리 (Frontend Only — Zustand + localStorage)

### 장바구니 추가
1. 메뉴 추가 버튼 클릭
2. 이미 존재하는 menuId → quantity + 1
3. 새 메뉴 → CartItem 생성 (menuId, menuName, unitPrice, imageUrl, quantity: 1)
4. Zustand persist → localStorage 자동 저장

### 수량 변경
1. +/- 버튼으로 quantity 변경
2. quantity <= 0 → 해당 항목 자동 삭제
3. 총 금액 실시간 재계산: sum(unitPrice * quantity)

### 삭제 / 비우기
- 개별 삭제: menuId로 항목 제거
- 전체 비우기: items = [], 총 금액 0원

### 데이터 유지
- Zustand persist middleware → localStorage key: `cart-storage`
- 새로고침 시 자동 복원

## 2. 주문 생성 (Backend)

### 주문 흐름
```
Client: POST /api/orders { tableId, items: [{menuId, quantity}] }
  → Server: X-Table-Token 헤더로 테이블 인증
  → Server: menuId로 Menu 조회 → menuName, price 스냅샷
  → Server: totalAmount = sum(quantity * price) 서버 측 재계산
  → Server: 테이블 세션 확인/생성
  → Server: Order + OrderItem 저장
  → Server: SSE 이벤트 발행 (ORDER_CREATED)
  → Client: 주문 번호 표시 → 5초 후 메뉴 화면 리다이렉트 + 장바구니 비우기
```

### 주문 번호 생성
- 형식: `ORD-{yyyyMMdd}-{sequence}`
- sequence: 당일 주문 순번 (DB 기반 auto-increment 또는 count+1)

### 테이블 세션 자동 시작
- TableEntity.currentSessionId가 null → 새 UUID 생성하여 세션 시작
- 이미 세션 존재 → 기존 sessionId 사용

### 주문 항목 스냅샷
- OrderItem.menuName = Menu.name (주문 시점)
- OrderItem.unitPrice = Menu.price (주문 시점)
- 이후 메뉴 가격 변경 시 기존 주문에 영향 없음

## 3. 주문 내역 조회 (Backend + Frontend)

### 조회 로직
- GET /api/orders/table/{tableId}
- 현재 세션(sessionId) 주문만 필터링
- createdAt 시간순 정렬 (오래된 순)
- 상태별 필터 탭: 전체 / PENDING / PREPARING / COMPLETED

### 표시 정보
- 주문 번호, 주문 시각, 메뉴/수량 목록, 금액, 상태 뱃지

## 4. 주문 확정 화면 (Frontend)

### 표시 정보
- 테이블 번호
- 메뉴명, 수량, 단가, 소계 (항목별)
- 총 금액
- 예상 대기 시간 (고정 텍스트: "약 15~20분")
- 최종 확정 버튼 / 뒤로가기 버튼
