# Functional Design Plan - Unit 3: 장바구니 및 주문

## Unit Context
- **Unit**: Unit 3 - 장바구니 및 주문
- **Stories**: US-C05, US-C06, US-C07, US-C08, US-C09, US-C10 (6개, 모두 고객 페르소나)
- **책임**: 장바구니 관리(Frontend Zustand), 주문 생성(Backend API), 주문 내역 조회

## Steps

### Step 1: 장바구니 비즈니스 로직 상세 설계
- [x] 장바구니 추가/수량변경/삭제/비우기 로직
- [x] localStorage 영속성 (Zustand persist)
- [x] 총 금액 계산 로직

### Step 2: 주문 생성 비즈니스 로직 상세 설계
- [x] 주문 번호 생성 규칙 (ORD-{yyyyMMdd}-{sequence})
- [x] 테이블 세션 자동 시작 로직
- [x] 주문 항목 스냅샷 (menuName, unitPrice 시점 고정)
- [x] totalAmount 서버 측 재계산
- [x] 주문 생성 후 SSE 이벤트 발행

### Step 3: 주문 내역 조회 비즈니스 로직 상세 설계
- [x] 현재 세션 주문만 필터링
- [x] 시간순 정렬

### Step 4: Frontend 컴포넌트 설계
- [x] CustomerCartPage 컴포넌트 구조
- [x] CustomerOrderPage 컴포넌트 구조
- [x] CustomerOrderHistoryPage 컴포넌트 구조
- [x] CartItem, StatusBadge 공유 컴포넌트

### Step 5: 비즈니스 규칙 문서화
- [x] 주문 검증 규칙
- [x] 장바구니 검증 규칙
- [x] 에러 시나리오 정의
