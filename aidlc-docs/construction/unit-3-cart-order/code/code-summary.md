# Code Summary - Unit 3: 장바구니 및 주문

## Backend 생성 파일

| 파일 | 경로 | 설명 |
|------|------|------|
| OrderCreateRequest | order/dto/ | 주문 생성 요청 DTO |
| OrderItemRequest | order/dto/ | 주문 항목 요청 DTO |
| OrderResponse | order/dto/ | 주문 응답 DTO |
| OrderItemResponse | order/dto/ | 주문 항목 응답 DTO |
| OrderRepository | order/ | 주문 JPA Repository |
| OrderItemRepository | order/ | 주문 항목 JPA Repository |
| OrderService | order/ | 주문 비즈니스 로직 |
| OrderController | order/ | 주문 REST API |
| TableRepository | table/ | 테이블 JPA Repository (Unit 3 의존) |
| MenuRepository | menu/ | 메뉴 JPA Repository (Unit 3 의존) |

## Backend 테스트

| 파일 | 테스트 수 | 설명 |
|------|----------|------|
| OrderServiceTest | 5 | 주문 생성, 세션 시작, 에러 케이스, 조회 |
| OrderControllerTest | 3 | API 엔드포인트 테스트 |

## Frontend 생성 파일

| 파일 | 경로 | 설명 |
|------|------|------|
| orderApi.ts | services/ | 주문 API 클라이언트 |
| CartItem.tsx | components/ | 장바구니 항목 컴포넌트 |
| StatusBadge.tsx | components/ | 주문 상태 뱃지 컴포넌트 |
| CustomerCartPage.tsx | pages/customer/ | 장바구니 페이지 |
| CustomerOrderPage.tsx | pages/customer/ | 주문 확정 페이지 |
| CustomerOrderHistoryPage.tsx | pages/customer/ | 주문 내역 페이지 |
| App.tsx | src/ | 라우팅 업데이트 (Unit 3 페이지 연결) |

## Frontend 테스트

| 파일 | 테스트 수 | 설명 |
|------|----------|------|
| CartItem.test.tsx | 5 | 표시, 수량 변경, 삭제, 이미지 |
| StatusBadge.test.tsx | 3 | 상태별 뱃지 표시 |
| CustomerCartPage.test.tsx | 3 | 빈 장바구니, 항목 표시, 비우기 |
| CustomerOrderPage.test.tsx | 3 | 테이블 번호, 대기 시간, 확정 버튼 |
| CustomerOrderHistoryPage.test.tsx | 3 | 빈 내역, 주문 표시, 필터 탭 |
| orderApi.test.ts | 2 | API 호출 테스트 |

## Story 커버리지

| Story | 구현 위치 |
|-------|----------|
| US-C05 장바구니 추가 | cartStore (Unit 0) + CartItem + CustomerCartPage |
| US-C06 수량 조절/삭제 | cartStore + CartItem |
| US-C07 데이터 유지 | cartStore (Zustand persist) |
| US-C08 장바구니 비우기 | cartStore + CustomerCartPage |
| US-C09 주문 확정 | OrderService + OrderController + CustomerOrderPage |
| US-C10 주문 내역 조회 | OrderService + OrderController + CustomerOrderHistoryPage |
