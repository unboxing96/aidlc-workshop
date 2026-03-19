# Construction Phase 실행 계획 - Unit 3: 장바구니 및 주문

## Unit 정보
- **Stories**: US-C05, US-C06, US-C07, US-C08, US-C09, US-C10 (6개)
- **담당**: 1명
- **의존**: Unit 0 (공통 기반)

---

## Stage 1: Functional Design

### 비즈니스 로직
- 장바구니 추가: 메뉴 정보로 장바구니 항목 추가 (이미 있으면 수량 +1)
- 장바구니 수량 조절: 수량 변경, 0이면 삭제
- 장바구니 비우기: 전체 항목 삭제
- 장바구니 데이터 유지: Zustand persist → localStorage
- 주문 생성: 장바구니 항목 → OrderCreateRequest → 서버 전송 → 주문 번호 수신
  - 서버: 테이블 토큰 검증 → sessionId 확인 (없으면 새 세션 생성) → 주문 저장 → totalAmount 서버 재계산 → SSE 이벤트 발행 (Unit 4 인터페이스)
- 주문 내역 조회: tableId + 현재 sessionId로 필터링, 시간 순 정렬
- 주문 성공 후: 주문 번호 5초 표시 → 메뉴 화면 리다이렉트 → 장바구니 비우기

### 도메인 규칙
- 주문 항목 최소 1개
- totalAmount = sum(quantity * unitPrice) 서버 재계산
- menuName, unitPrice는 주문 시점 스냅샷
- 현재 세션 주문만 조회 (이전 세션 제외)

---

## Stage 2: NFR Requirements
- 장바구니: 클라이언트 전용 (서버 저장 없음)
- 주문 생성 응답 시간: 1초 이내

## Stage 3: NFR Design
- useCart (Zustand + persist middleware): localStorage 자동 동기화
- OrderService: @Transactional로 주문 + 주문항목 원자성 보장
- SSE 이벤트 발행: SseEmitterService 인터페이스 호출 (Unit 4 구현)

---

## Stage 4: Code Generation Plan

### Backend
- [ ] OrderController (POST /api/orders, GET /api/orders/table/{tableId}, PUT /api/orders/{id}/status, DELETE /api/orders/{id})
- [ ] OrderService (createOrder, getOrdersByTable, updateOrderStatus, deleteOrder)
- [ ] OrderRepository, OrderItemRepository
- [ ] Unit Tests: OrderService (주문 생성, 조회, 상태 변경, 삭제, 금액 재계산)

### Frontend
- [ ] CustomerCartPage (장바구니 목록, 수량 조절, 총액, 주문 버튼)
- [ ] CustomerOrderPage (주문 확인 → 확정 → 성공 화면 5초 → 리다이렉트)
- [ ] CustomerOrderHistoryPage (현재 세션 주문 목록, 상태 표시)
- [ ] CartItem component (메뉴명, 수량 +/-, 단가, 소계, 삭제)
- [ ] StatusBadge component (대기중/준비중/완료 뱃지)
- [ ] useCart store (Zustand + persist)
- [ ] orderApi service
- [ ] Unit Tests: useCart store, CartItem, OrderPage flow
