# Unit 1: NFR Requirements

## 보안

| ID | 요구사항 | 기준 |
|----|---------|------|
| NFR-SEC-01 | JWT 토큰 만료 | 16시간 (57,600,000ms) |
| NFR-SEC-02 | JWT 서명 알고리즘 | HS256 (HMAC-SHA256) |
| NFR-SEC-03 | 비밀번호 해싱 | bcrypt, strength 10 (기본값) |
| NFR-SEC-04 | 로그인 시도 제한 | 5회 연속 실패 시 15분 잠금 |
| NFR-SEC-05 | 로그인 시도 저장 | 인메모리 (ConcurrentHashMap) — PoC 수준 |
| NFR-SEC-06 | 관리자 API 보호 | JWT Bearer 토큰 필수 (/api/tables, /api/tables/{id}/complete, /api/tables/{id}/history) |
| NFR-SEC-07 | 고객 API 보호 | X-Table-Token 헤더 필수 (/api/tables/auth는 예외 — 토큰 검증 자체이므로) |
| NFR-SEC-08 | 공개 API | /api/admin/register, /api/admin/login, /api/tables/auth |

## 성능

| ID | 요구사항 | 기준 |
|----|---------|------|
| NFR-PERF-01 | 토큰 인증 응답 시간 | < 200ms (H2 로컬 DB) |
| NFR-PERF-02 | 로그인 응답 시간 | < 500ms (bcrypt 해싱 포함) |
| NFR-PERF-03 | 이용 완료 트랜잭션 | < 1s (주문 이동 + 삭제 + 세션 리셋 원자성) |

## 신뢰성

| ID | 요구사항 | 기준 |
|----|---------|------|
| NFR-REL-01 | 이용 완료 원자성 | @Transactional — 주문 이력 이동, 주문 삭제, 세션 리셋이 하나의 트랜잭션 |
| NFR-REL-02 | JWT 검증 실패 처리 | 401 Unauthorized 반환, 프론트엔드에서 로그인 페이지 리다이렉트 |
| NFR-REL-03 | 테이블 토큰 검증 실패 | 401 Unauthorized 반환 |

## 유지보수성

| ID | 요구사항 | 기준 |
|----|---------|------|
| NFR-MAINT-01 | 필터 체인 구조 | JwtAuthFilter → TableTokenFilter 순서, SecurityConfig에서 관리 |
| NFR-MAINT-02 | 에러 코드 일관성 | Unit 0 GlobalExceptionHandler 활용, 커스텀 예외 사용 |
