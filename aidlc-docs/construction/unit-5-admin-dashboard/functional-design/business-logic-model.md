# Business Logic Model - Unit 5: 관리자 대시보드

## 1. 대시보드 조회 (US-A03)

### getDashboard(storeId)
1. 해당 매장의 모든 테이블 조회
2. 각 테이블별로:
   - 현재 세션의 주문 목록 조회 (sessionId 기준)
   - 총 주문액 합산
   - 최신 5개 주문 미리보기 생성 (itemSummary: 첫 번째 메뉴명 + "외 N건")
3. DashboardTableCard 리스트 반환

### getTableOrderDetail(tableId)
1. 테이블의 현재 세션 주문 전체 조회
2. 각 주문의 OrderItem 포함하여 반환

## 2. 주문 상태 변경 (US-A05)

### changeOrderStatus(orderId, newStatus)
1. 주문 조회 (없으면 NotFoundException)
2. 상태 전이 유효성 검증 (양방향 허용, 단 동일 상태 변경 불가)
3. 상태 업데이트
4. SSE 이벤트 발행: ORDER_STATUS_CHANGED

## 3. 주문 삭제 (US-A07)

### deleteOrder(orderId)
1. 주문 조회 (없으면 NotFoundException)
2. 주문 삭제 (OrderItem cascade 삭제)
3. SSE 이벤트 발행: ORDER_DELETED

## 4. 테이블 이용 완료 (US-A08 - 세션 종료)

### completeTableSession(tableId)
1. 테이블 조회 (없으면 NotFoundException)
2. 현재 세션의 모든 주문 조회
3. **미완료 주문 검증**: PENDING 또는 PREPARING 상태 주문이 있으면 BusinessException 발생 ("미완료 주문이 있어 이용 완료할 수 없습니다")
4. 각 주문을 OrderHistoryEntity로 변환하여 저장:
   - items: OrderItem 목록을 JSON 문자열로 변환
   - completedAt: 현재 시각
5. 현재 세션의 모든 주문 삭제
6. 테이블의 currentSessionId를 null로 리셋
7. SSE 이벤트 발행: TABLE_SESSION_COMPLETED

## 5. 과거 내역 조회 (US-A09)

### getOrderHistory(tableId, startDate, endDate)
1. 기본 범위: endDate = 오늘, startDate = 10일 전
2. 날짜 필터 적용하여 OrderHistory 조회
3. 시간 역순 정렬하여 반환
