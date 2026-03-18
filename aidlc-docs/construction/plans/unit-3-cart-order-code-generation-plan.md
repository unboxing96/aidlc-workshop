# Code Generation Plan - Unit 3: 장바구니 및 주문

## Unit Context
- **Unit**: Unit 3 - 장바구니 및 주문
- **Stories**: US-C05, US-C06, US-C07, US-C08, US-C09, US-C10
- **Dependencies**: Unit 0 (Entity, DTO, 설정, cartStore), Unit 4 통합 시 SseEmitterService
- **Code Location**: `table-order/backend/`, `table-order/frontend/`

## Stories Checklist
- [x] US-C05: 장바구니에 메뉴 추가
- [x] US-C06: 장바구니 수량 조절 및 삭제
- [x] US-C07: 장바구니 데이터 유지
- [x] US-C08: 장바구니 비우기
- [x] US-C09: 주문 확정
- [x] US-C10: 현재 세션 주문 내역 조회

## Steps

### Step 1: Backend DTO 생성
- [x] OrderCreateRequest, OrderItemRequest
- [x] OrderResponse, OrderItemResponse

### Step 2: Backend Repository 생성
- [x] OrderRepository
- [x] OrderItemRepository

### Step 3: Backend Service 생성
- [x] OrderService

### Step 4: Backend Controller 생성
- [x] OrderController

### Step 5: Backend Unit Tests
- [x] OrderServiceTest (5 tests)
- [x] OrderControllerTest (3 tests)

### Step 6: Frontend orderApi Service
- [x] orderApi

### Step 7: Frontend 공유 컴포넌트
- [x] CartItem
- [x] StatusBadge

### Step 8: Frontend CustomerCartPage
- [x] CustomerCartPage

### Step 9: Frontend CustomerOrderPage
- [x] CustomerOrderPage

### Step 10: Frontend CustomerOrderHistoryPage
- [x] CustomerOrderHistoryPage

### Step 11: Frontend 라우팅 업데이트
- [x] App.tsx 업데이트

### Step 12: Frontend Unit Tests
- [x] CartItem.test.tsx (5 tests)
- [x] StatusBadge.test.tsx (3 tests)
- [x] CustomerCartPage.test.tsx (3 tests)
- [x] CustomerOrderPage.test.tsx (3 tests)
- [x] CustomerOrderHistoryPage.test.tsx (3 tests)
- [x] orderApi.test.ts (2 tests)

### Step 13: Documentation
- [x] code-summary.md
