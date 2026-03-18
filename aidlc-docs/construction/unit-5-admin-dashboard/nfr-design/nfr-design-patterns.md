# NFR Design Patterns - Unit 5: 관리자 대시보드

## 상속: Unit 0 공통 패턴 전체 적용 (인증, 에러 처리, SSE, 데이터 접근)

## Unit 5 특화 패턴

### SSE 구독 패턴 (Frontend)
- useOrderSSE hook에서 EventSource API 사용
- 연결 끊김 시 1초 후 즉시 재연결
- 이벤트 타입별 핸들러 분기 (ORDER_CREATED, ORDER_STATUS_CHANGED, ORDER_DELETED, TABLE_SESSION_COMPLETED)
- 컴포넌트 언마운트 시 EventSource.close()로 정리

### 대시보드 상태 관리 패턴
- SSE 이벤트 수신 시 로컬 상태 직접 업데이트 (서버 재조회 없이 즉시 반영)
- ORDER_CREATED: 해당 테이블 카드에 주문 추가 + hasNewOrder 플래그
- ORDER_STATUS_CHANGED: 해당 주문 상태 업데이트
- ORDER_DELETED: 해당 주문 제거 + 총액 재계산
- TABLE_SESSION_COMPLETED: 해당 테이블 카드 리셋

### 이용 완료 트랜잭션 패턴
- @Transactional로 원자성 보장
- 순서: 미완료 주문 검증 → OrderHistory 저장 → 주문 삭제 → 세션 리셋 → SSE 발행
- 실패 시 전체 롤백

### 확인 팝업 패턴
- 파괴적 작업(삭제, 이용 완료)에 ConfirmDialog 필수
- 확인 후에만 API 호출
- 성공/실패 토스트 피드백
