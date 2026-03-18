# Business Rules - Unit 0: 공통 기반

## 공통 검증 규칙

### 테이블
- 테이블 번호는 양의 정수, 매장 내 유일
- accessToken은 UUID v4 형식, 시스템 자동 생성
- currentSessionId는 첫 주문 시 자동 생성 (UUID v4), 이용 완료 시 null로 리셋

### 관리자
- username: 2~50자, 영문/숫자, 매장 내 유일
- password: 최소 8자, bcrypt 해싱 저장
- 로그인 시도 제한: 5회 실패 시 15분 잠금

### 메뉴
- name: 1~50자, 필수
- price: 0 이상의 정수 (원 단위), 필수
- description: 최대 500자, 선택
- categoryId: 유효한 카테고리 참조 필수
- displayOrder: 0 이상의 정수

### 주문
- 주문 번호: `ORD-{yyyyMMdd}-{sequence}` 형식 자동 생성
- 주문 항목 최소 1개 이상
- totalAmount = sum(quantity * unitPrice) 서버 측 재계산
- 주문 항목의 menuName, unitPrice는 주문 시점 스냅샷 (메뉴 변경 영향 없음)

### 주문 상태 전이
```
PENDING → PREPARING → COMPLETED (정방향만 허용)
```
- 역방향 전이 불가
- 삭제는 모든 상태에서 가능 (관리자 직권)

### 테이블 세션
- 세션 시작: 해당 테이블의 첫 주문 생성 시 (currentSessionId가 null이면 새 UUID 생성)
- 세션 종료: 관리자가 "이용 완료" 처리 시
- 세션 종료 시: 현재 세션 주문 → OrderHistory로 이동, currentSessionId → null

## 공통 SSE 이벤트 타입

| Event Type | Payload | 발행 시점 |
|------------|---------|----------|
| ORDER_CREATED | OrderResponse | 주문 생성 시 |
| ORDER_STATUS_CHANGED | {orderId, status} | 주문 상태 변경 시 |
| ORDER_DELETED | {orderId, tableId} | 주문 삭제 시 |
| TABLE_SESSION_COMPLETED | {tableId} | 테이블 이용 완료 시 |

## 공통 에러 코드

| Code | HTTP Status | Description |
|------|------------|-------------|
| INVALID_INPUT | 400 | 입력값 검증 실패 |
| UNAUTHORIZED | 401 | 인증 실패 |
| FORBIDDEN | 403 | 권한 없음 |
| NOT_FOUND | 404 | 리소스 없음 |
| CONFLICT | 409 | 중복 (테이블 번호, username 등) |
| INTERNAL_ERROR | 500 | 서버 내부 오류 |
