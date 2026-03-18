# Unit 4: 실시간 통신 (SSE) - Code Summary

## Stories Implemented
- US-C11: 주문 상태 실시간 업데이트
- US-A04: 실시간 신규 주문 수신

## Backend Files Created

| File | Description |
|------|-------------|
| `sse/SseEmitterService.java` | SSE emitter 관리 서비스 (생성, 전송, 정리) |
| `sse/OrderSseController.java` | SSE 엔드포인트 (관리자, 고객) |
| `sse/SseEmitterServiceTest.java` | SseEmitterService 단위 테스트 |

## Frontend Files Created

| File | Description |
|------|-------------|
| `hooks/useOrderSSE.ts` | EventSource 연결, 이벤트 처리, 자동 재연결 hook |
| `test/useOrderSSE.test.ts` | useOrderSSE hook 단위 테스트 |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/sse/orders/admin` | 관리자 SSE 구독 (모든 이벤트) |
| GET | `/api/sse/orders/table/{tableId}` | 고객 SSE 구독 (해당 테이블만) |

## Integration Points
- Unit 3 OrderService → `SseEmitterService.broadcastToAdmin()` + `sendToTable()` 호출
- Unit 5 AdminDashboard → `useOrderSSE` hook으로 실시간 이벤트 수신
- Unit 0 `SseEventType`, `SseEvent` 공통 타입 활용
