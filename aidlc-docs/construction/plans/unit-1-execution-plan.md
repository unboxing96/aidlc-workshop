# Construction Phase 실행 계획 - Unit 1: 테이블 및 인증

## Unit 정보
- **Stories**: US-C01, US-A01, US-A02, US-A06, US-A08 (5개)
- **담당**: 1명
- **의존**: Unit 0 (공통 기반)

---

## Stage 1: Functional Design

### 비즈니스 로직
- 테이블 등록: tableNumber 유일성 검증 → accessToken(UUID) 자동 생성 → 저장
- 토큰 인증: accessToken으로 TableEntity 조회 → 테이블 정보 반환
- 테이블 이용 완료: 현재 세션 주문 → OrderHistory 이동 → 주문 삭제 → sessionId null 리셋
- 관리자 회원가입: username 중복 검증 → bcrypt 해싱 → 저장
- 관리자 로그인: username/password 검증 → JWT 발급 (16시간 만료)
- 로그인 시도 제한: 5회 실패 시 15분 잠금

### 도메인 규칙
- 테이블 세션 시작: 첫 주문 시 sessionId 자동 생성 (Unit 3에서 처리, 인터페이스 계약)
- 테이블 세션 종료: 이용 완료 시 트랜잭션으로 원자성 보장

---

## Stage 2: NFR Requirements
- JWT 토큰 만료: 16시간
- bcrypt 해싱 강도: 기본값 (strength 10)
- 로그인 시도 제한: 인메모리 카운터 (H2 환경)

## Stage 3: NFR Design
- JwtAuthFilter: Authorization 헤더에서 Bearer 토큰 추출 → 검증 → SecurityContext 설정
- TableTokenFilter: X-Table-Token 헤더에서 토큰 추출 → 검증
- LoginAttemptService: ConcurrentHashMap으로 실패 횟수 관리

---

## Stage 4: Code Generation Plan

### Backend
- [ ] TableController (POST /api/tables, POST /api/tables/auth, POST /api/tables/{id}/complete, GET /api/tables, GET /api/tables/{id}/history)
- [ ] TableService (createTable, authenticateByToken, completeTableSession, getAllTables, getOrderHistory)
- [ ] TableRepository
- [ ] AdminAuthController (POST /api/admin/register, POST /api/admin/login)
- [ ] AdminAuthService (register, login, validateToken)
- [ ] AdminRepository
- [ ] JwtAuthFilter, TableTokenFilter
- [ ] LoginAttemptService
- [ ] Unit Tests: TableService, AdminAuthService, JwtUtil, LoginAttemptService

### Frontend
- [ ] CustomerSetupPage (토큰 입력 → localStorage 저장 → 메뉴 리다이렉트)
- [ ] AdminLoginPage (로그인 폼 + 회원가입 폼 전환)
- [ ] useTableAuth hook (토큰 인증, 상태 관리)
- [ ] useAdminAuth hook (로그인, 회원가입, 로그아웃, JWT 관리)
- [ ] tableApi, adminAuthApi services
- [ ] Unit Tests: useTableAuth, useAdminAuth, API services
