# Unit 1: 비즈니스 로직 모델

## 1. AdminAuthService

### register(username, password)
1. username 중복 검증 → DuplicateException
2. password 길이 검증 (4자 이상) → BusinessException
3. bcrypt 해싱
4. AdminEntity 저장
5. 성공 응답 반환

### login(username, password)
1. LoginAttemptService로 계정 잠금 확인 → BusinessException("ACCOUNT_LOCKED")
2. username으로 AdminEntity 조회 → BusinessException("AUTH_FAILED")
3. bcrypt 비밀번호 검증 → 실패 시 LoginAttemptService.recordFailure() → BusinessException("AUTH_FAILED")
4. LoginAttemptService.resetAttempts()
5. JwtUtil.generateToken(username)
6. JWT 토큰 반환

## 2. LoginAttemptService

### isBlocked(username) → boolean
- ConcurrentHashMap에서 실패 기록 조회
- 5회 이상 실패 && 마지막 실패로부터 15분 미경과 → true

### recordFailure(username)
- 실패 횟수 증가, 마지막 실패 시각 기록

### resetAttempts(username)
- 해당 username 기록 삭제

## 3. TableService

### createTable(tableNumber)
1. tableNumber 중복 검증 → DuplicateException
2. UUID.randomUUID()로 accessToken 생성
3. TableEntity 저장
4. 테이블 정보 + accessToken 반환

### authenticateByToken(accessToken)
1. accessToken으로 TableEntity 조회 → NotFoundException
2. tableId, tableNumber 반환

### getAllTables()
1. 전체 TableEntity 목록 반환

### completeTableSession(tableId)
1. TableEntity 조회 → NotFoundException
2. currentSessionId null이면 → BusinessException("NO_ACTIVE_SESSION")
3. 해당 테이블+세션의 주문 조회
4. 미완료 주문(PENDING/PREPARING) 상태를 COMPLETED로 변경
5. 모든 주문 → OrderHistoryEntity로 변환 저장 (items는 JSON 문자열)
6. 주문 삭제
7. currentSessionId = null로 리셋
8. SSE 이벤트 발행: TABLE_SESSION_COMPLETED (Unit 4 통합 시)

### getOrderHistory(tableId)
1. TableEntity 존재 확인 → NotFoundException
2. 해당 tableId의 OrderHistoryEntity 목록 반환 (시간 역순)

## 4. API 엔드포인트

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| POST | /api/admin/register | 없음 | 관리자 회원가입 |
| POST | /api/admin/login | 없음 | 관리자 로그인 |
| POST | /api/tables | JWT | 테이블 등록 |
| GET | /api/tables | JWT | 테이블 목록 조회 |
| POST | /api/tables/auth | 없음 | 토큰 인증 (고객 태블릿) |
| POST | /api/tables/{id}/complete | JWT | 이용 완료 |
| GET | /api/tables/{id}/history | JWT | 과거 주문 내역 |

## 5. DTO 설계

### Request
- `AdminRegisterRequest`: username(String), password(String)
- `AdminLoginRequest`: username(String), password(String)
- `CreateTableRequest`: tableNumber(int)
- `TableAuthRequest`: accessToken(String)

### Response
- `AdminLoginResponse`: token(String)
- `TableResponse`: id(Long), tableNumber(int), accessToken(String), currentSessionId(String|null), createdAt(String)
- `TableAuthResponse`: tableId(Long), tableNumber(int) — 이미 Unit 0에 정의됨
- `OrderHistoryResponse`: id(Long), orderNumber(String), tableNumber(int), sessionId(String), totalAmount(int), items(String), orderedAt(String), completedAt(String)
- `MessageResponse`: message(String)
