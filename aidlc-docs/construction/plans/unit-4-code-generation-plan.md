# Unit 4: 실시간 통신 (SSE) - Code Generation Plan

## Unit Context
- **Stories**: US-C11 (주문 상태 실시간 업데이트), US-A04 (실시간 신규 주문 수신)
- **의존**: Unit 0 (공통 Entity, SseEventType, SseEvent)
- **인터페이스**: Unit 3 OrderService에서 SseEmitterService 호출, Unit 5 대시보드에서 SSE 수신

## Code Location
- **Backend**: `table-order/backend/src/main/java/com/tableorder/sse/`
- **Backend Tests**: `table-order/backend/src/test/java/com/tableorder/sse/`
- **Frontend**: `table-order/frontend/src/hooks/`
- **Frontend Tests**: `table-order/frontend/src/test/`

---

## Execution Steps

### Step 1: Backend - SseEmitterService
- [x] `SseEmitterService.java` 생성
  - ConcurrentHashMap으로 adminEmitters, tableEmitters 관리
  - createAdminEmitter(): 관리자 SSE 연결 생성
  - createTableEmitter(tableId): 고객 SSE 연결 생성
  - broadcastToAdmin(SseEvent): 모든 관리자에게 이벤트 전송
  - sendToTable(tableId, SseEvent): 특정 테이블에 이벤트 전송
  - onCompletion/onTimeout/onError 콜백으로 자동 정리
  - 타임아웃: 30분

### Step 2: Backend - OrderSseController
- [x] `OrderSseController.java` 생성
  - GET `/api/sse/orders/admin` → 관리자 SSE 연결
  - GET `/api/sse/orders/table/{tableId}` → 고객 SSE 연결
  - produces = MediaType.TEXT_EVENT_STREAM_VALUE

### Step 3: Backend - Unit Tests
- [x] `SseEmitterServiceTest.java` 생성
  - emitter 생성 테스트
  - broadcastToAdmin 이벤트 전송 테스트
  - sendToTable 이벤트 전송 테스트
  - emitter 정리(timeout/error) 테스트

### Step 4: Frontend - useOrderSSE hook
- [x] `useOrderSSE.ts` 생성
  - EventSource 연결 관리
  - 이벤트 타입별 콜백 처리
  - 자동 재연결 로직
  - cleanup on unmount

### Step 5: Frontend - Unit Tests
- [x] `useOrderSSE.test.ts` 생성
  - SSE 연결 생성 테스트
  - 이벤트 수신 및 콜백 호출 테스트
  - cleanup 테스트

### Step 6: Documentation
- [x] `aidlc-docs/construction/unit-4-sse/code/code-summary.md` 생성

---

## Story Traceability
| Step | Stories |
|------|---------|
| Step 1 | US-C11, US-A04 |
| Step 2 | US-C11, US-A04 |
| Step 3 | US-C11, US-A04 |
| Step 4 | US-C11, US-A04 |
| Step 5 | US-C11, US-A04 |
| Step 6 | US-C11, US-A04 |
