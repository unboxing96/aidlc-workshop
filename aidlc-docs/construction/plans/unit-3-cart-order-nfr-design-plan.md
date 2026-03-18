# NFR Design Plan - Unit 3: 장바구니 및 주문

## Steps

### Step 1: 트랜잭션 패턴
- [x] 주문 생성 트랜잭션 설계 (Order + OrderItem + 세션 시작 원자성)

### Step 2: SSE 재시도 패턴
- [x] SSE 이벤트 발행 재시도 5회 + 로그 기록 설계

### Step 3: 페이징 패턴
- [x] 주문 내역 조회 페이징 설계 (Spring Data Pageable)

### Step 4: Frontend 에러 처리 패턴
- [x] 주문 실패 시 장바구니 유지 + 에러 메시지 표시
