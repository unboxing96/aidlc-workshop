# Construction Phase 실행 계획 - Unit 4: 실시간 통신 (SSE)

## Unit 정보
- **Stories**: US-C11, US-A04 (2개)
- **담당**: 1명
- **의존**: Unit 0 (공통 기반)

---

## Stage 1: Functional Design

### 비즈니스 로직
- 관리자 SSE 연결: 관리자가 대시보드 접속 시 SSE 연결 생성, 모든 테이블 이벤트 수신
- 고객 SSE 연결: 고객이 주문 내역 화면 접속 시 SSE 연결 생성, 해당 테이블 이벤트만 수신
- 이벤트 브로드캐스트: 주문 생성/상태변경/삭제/세션완료 시 해당 emitter에 이벤트 전송
- 연결 관리: 타임아웃(30분), 에러, 완료 시 자동 정리

### 이벤트 흐름
```
OrderService (Unit 3) → SseEmitterService.broadcastToAdmin() + sendToTable()
TableService (Unit 1) → SseEmitterService.broadcastToAdmin() + sendToTable()
```

### 도메인 규칙
- 관리자: 모든 이벤트 수신
- 고객: 자기 테이블 이벤트만 수신
- 이벤트 전달: 2초 이내
- 연결 끊김 시 프론트엔드 자동 재연결

---

## Stage 2: NFR Requirements
- SSE 타임아웃: 30분
- 자동 재연결: EventSource 기본 동작 활용
- 동시 연결 수: 매장 규모 (테이블 수 + 관리자 수)

## Stage 3: NFR Design
- ConcurrentHashMap으로 emitter 관리
- adminEmitters: CopyOnWriteArrayList<SseEmitter>
- tableEmitters: ConcurrentHashMap<Long, CopyOnWriteArrayList<SseEmitter>>
- 이벤트 전송 실패 시 해당 emitter 자동 제거

---

## Stage 4: Code Generation Plan

### Backend
- [ ] OrderSseController (GET /api/sse/orders/admin, GET /api/sse/orders/table/{tableId})
- [ ] SseEmitterService (createAdminEmitter, createTableEmitter, broadcastToAdmin, sendToTable, removeEmitter)
- [ ] Unit Tests: SseEmitterService (emitter 생성, 이벤트 전송, 정리)

### Frontend
- [ ] useOrderSSE hook (EventSource 연결, 이벤트 파싱, 자동 재연결, 정리)
- [ ] SSE 이벤트 핸들러 (이벤트 타입별 상태 업데이트 로직)
- [ ] Unit Tests: useOrderSSE hook (연결, 이벤트 수신, 재연결)
