# Services

## Backend Service Orchestration

### 주문 생성 흐름
```
OrderController.createOrder()
  → OrderService.createOrder(tableId, items)
    → TableService.authenticateByToken() (토큰 검증)
    → OrderRepository.save() (주문 저장)
    → OrderItemRepository.saveAll() (주문 항목 저장)
    → SseEmitterService.broadcastToAdmin() (관리자에게 실시간 알림)
```

### 주문 상태 변경 흐름
```
OrderController.updateOrderStatus()
  → OrderService.updateOrderStatus(orderId, status)
    → OrderRepository.save() (상태 업데이트)
    → SseEmitterService.broadcastToAdmin() (관리자 대시보드 업데이트)
    → SseEmitterService.sendToTable(tableId) (고객 화면 업데이트)
```

### 테이블 이용 완료 흐름
```
TableController.completeTableSession()
  → TableService.completeTableSession(tableId)
    → OrderService.getOrdersByTable(tableId) (현재 주문 조회)
    → OrderHistoryRepository.saveAll() (이력으로 이동)
    → OrderRepository.deleteByTableAndSession() (현재 주문 삭제)
    → SseEmitterService.broadcastToAdmin() (대시보드 업데이트)
    → SseEmitterService.sendToTable(tableId) (고객 화면 리셋)
```

### 주문 삭제 흐름
```
OrderController.deleteOrder()
  → OrderService.deleteOrder(orderId)
    → OrderRepository.delete() (주문 삭제)
    → SseEmitterService.broadcastToAdmin() (대시보드 업데이트)
    → SseEmitterService.sendToTable(tableId) (고객 화면 업데이트)
```

---

## SSE 이벤트 설계

### 이벤트 타입
| Event Type | Payload | Target |
|------------|---------|--------|
| ORDER_CREATED | OrderResponse | Admin + 해당 Table |
| ORDER_STATUS_CHANGED | {orderId, status} | Admin + 해당 Table |
| ORDER_DELETED | {orderId} | Admin + 해당 Table |
| TABLE_SESSION_COMPLETED | {tableId} | Admin + 해당 Table |

### SSE 연결 관리
- 관리자: 단일 SSE 연결로 모든 테이블 이벤트 수신
- 고객: 테이블별 SSE 연결로 해당 테이블 이벤트만 수신
- 연결 타임아웃: 30분 (자동 재연결)
- SseEmitter 저장: ConcurrentHashMap으로 관리

---

## Frontend Service Layer

### API 클라이언트 구조 (Axios)
- baseURL 설정 (`http://localhost:8080/api`)
- 관리자 요청: Authorization 헤더에 JWT 토큰 자동 첨부 (Axios interceptor)
- 고객 요청: 테이블 토큰을 쿼리 파라미터 또는 헤더로 전송
- 에러 핸들링: Axios interceptor로 공통 에러 처리
