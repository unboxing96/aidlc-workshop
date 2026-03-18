# NFR Design Patterns - Unit 3: 장바구니 및 주문

## 1. 트랜잭션 패턴

### 주문 생성 트랜잭션
```
@Transactional
OrderService.createOrder(tableId, items):
  1. TableEntity 조회 (accessToken 검증은 Controller/Filter 레벨)
  2. currentSessionId null이면 → 새 UUID 생성, TableEntity 업데이트
  3. 각 item의 menuId로 MenuEntity 조회 → menuName, price 스냅샷
  4. totalAmount = sum(quantity * price) 서버 재계산
  5. OrderEntity 생성 + OrderItemEntity 목록 생성 → save
  6. (트랜잭션 외부) SSE 이벤트 발행 시도
```
- 1~5는 하나의 트랜잭션으로 원자성 보장
- SSE 발행은 트랜잭션 커밋 후 실행 (실패해도 주문 유지)

## 2. SSE 재시도 패턴

```
주문 저장 성공 후:
  for (attempt = 1; attempt <= 5; attempt++):
    try:
      sseEmitterService.broadcastToAdmin(ORDER_CREATED, orderResponse)
      sseEmitterService.sendToTable(tableId, ORDER_CREATED, orderResponse)
      break  // 성공 시 종료
    catch:
      if (attempt == 5):
        log.warn("SSE 발행 최종 실패: orderId={}", orderId)
      else:
        Thread.sleep(100 * attempt)  // 간단한 백오프
```
- 주문 트랜잭션과 분리 (SSE 실패가 주문에 영향 없음)
- 최대 5회 재시도, 간단한 선형 백오프 (100ms, 200ms, 300ms, 400ms, 500ms)

## 3. 페이징 패턴

### 주문 내역 조회
```
GET /api/orders/table/{tableId}?page=0&size=50

OrderRepository:
  Page<OrderEntity> findByTableIdAndSessionIdOrderByCreatedAtAsc(
    Long tableId, String sessionId, Pageable pageable)
```
- Spring Data Pageable 사용
- 기본 size: 50, 최대 size: 50
- createdAt 오름차순 정렬

## 4. Frontend 에러 처리 패턴

### 주문 실패 시
```
try:
  await orderApi.createOrder(tableId, items)
  clearCart()
  // 성공 화면 표시 → 5초 후 리다이렉트
catch (error):
  // 장바구니 유지 (clearCart 호출 안 함)
  // 에러 메시지 표시 (toast 또는 alert)
  // 사용자가 재시도 가능
```
