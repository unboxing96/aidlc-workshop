# Business Rules - Unit 3: 장바구니 및 주문

## 장바구니 규칙
| Rule | Description |
|------|-------------|
| CART-01 | 장바구니 메뉴 종류 수 제한 없음 |
| CART-02 | 단일 메뉴 수량 제한 없음 |
| CART-03 | 수량 0 이하 시 자동 삭제 |
| CART-04 | 총 금액 = sum(unitPrice * quantity), 실시간 계산 |
| CART-05 | localStorage 영속성 (새로고침 유지) |

## 주문 생성 규칙
| Rule | Description |
|------|-------------|
| ORD-01 | 주문 항목 최소 1개 이상 필수 |
| ORD-02 | 주문 번호: `ORD-{yyyyMMdd}-{sequence}` 자동 생성 |
| ORD-03 | totalAmount 서버 측 재계산 (클라이언트 값 무시) |
| ORD-04 | menuName, unitPrice는 주문 시점 스냅샷 |
| ORD-05 | 테이블 세션 없으면 자동 생성 (UUID) |
| ORD-06 | 주문 초기 상태: PENDING |
| ORD-07 | 주문 성공 시 SSE ORDER_CREATED 이벤트 발행 |
| ORD-08 | 주문 성공 후 5초 뒤 메뉴 화면 리다이렉트 + 장바구니 비우기 |

## 주문 내역 조회 규칙
| Rule | Description |
|------|-------------|
| HIST-01 | 현재 테이블 세션 주문만 표시 |
| HIST-02 | createdAt 시간순 정렬 |
| HIST-03 | 상태별 필터 탭: 전체/대기중/준비중/완료 |

## 에러 시나리오
| Scenario | HTTP Status | Error Code | Message |
|----------|------------|------------|---------|
| 빈 장바구니로 주문 시도 | 400 | INVALID_INPUT | 주문 항목이 비어있습니다 |
| 존재하지 않는 메뉴 ID | 404 | NOT_FOUND | 메뉴를 찾을 수 없습니다 |
| 존재하지 않는 테이블 | 404 | NOT_FOUND | 테이블을 찾을 수 없습니다 |
| 유효하지 않은 테이블 토큰 | 401 | UNAUTHORIZED | 유효하지 않은 테이블 토큰입니다 |
