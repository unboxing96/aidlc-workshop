# Unit 1: Code Generation Plan

## Backend (순서: Repository → Service → Filter → Controller → Config 수정)

### Step 1: Repository
- [x] 1-1. `auth/AdminRepository.java` — findByUsername
- [x] 1-2. `table/TableRepository.java` — findByAccessToken, findByTableNumber, existsByTableNumber
- [x] 1-3. `table/OrderRepository.java` — findByTableIdAndSessionId, deleteByTableIdAndSessionId
- [x] 1-4. `table/OrderHistoryRepository.java` — findByTableIdOrderByCompletedAtDesc

### Step 2: DTO
- [x] 2-1. `auth/dto/AdminRegisterRequest.java` — @NotBlank username, @NotBlank @Size(min=4) password
- [x] 2-2. `auth/dto/AdminLoginRequest.java` — @NotBlank username, @NotBlank password
- [x] 2-3. `auth/dto/AdminLoginResponse.java` — token
- [x] 2-4. `table/dto/CreateTableRequest.java` — @Min(1) tableNumber
- [x] 2-5. `table/dto/TableAuthRequest.java` — @NotBlank accessToken
- [x] 2-6. `table/dto/TableResponse.java` — id, tableNumber, accessToken, currentSessionId, createdAt
- [x] 2-7. `table/dto/TableAuthResponse.java` — tableId, tableNumber
- [x] 2-8. `table/dto/OrderHistoryResponse.java` — id, orderNumber, tableNumber, sessionId, totalAmount, items, orderedAt, completedAt
- [x] 2-9. `table/dto/MessageResponse.java` — message

### Step 3: Service
- [x] 3-1. `auth/LoginAttemptService.java` — isBlocked, recordFailure, resetAttempts
- [x] 3-2. `auth/AdminAuthService.java` — register, login (의존: AdminRepository, LoginAttemptService, JwtUtil, PasswordEncoder)
- [x] 3-3. `table/TableService.java` — createTable, authenticateByToken, getAllTables, completeTableSession, getOrderHistory (의존: TableRepository, OrderRepository, OrderHistoryRepository)

### Step 4: Filter
- [x] 4-1. `auth/JwtAuthFilter.java` — Bearer 토큰 추출 → JwtUtil 검증 → SecurityContext 설정
- [x] 4-2. `auth/TableTokenFilter.java` — X-Table-Token 추출 → TableRepository 조회 → request attribute 설정

### Step 5: Controller
- [x] 5-1. `auth/AdminAuthController.java` — POST /api/admin/register, POST /api/admin/login
- [x] 5-2. `table/TableController.java` — POST /api/tables, GET /api/tables, POST /api/tables/auth, POST /api/tables/{id}/complete, GET /api/tables/{id}/history

### Step 6: Config 수정
- [x] 6-1. `config/SecurityConfig.java` 수정 — 필터 체인 등록 + 엔드포인트별 권한 설정

### Step 7: Backend Unit Tests
- [x] 7-1. `AdminAuthServiceTest.java` — register 성공/중복, login 성공/실패/잠금
- [x] 7-2. `LoginAttemptServiceTest.java` — 실패 기록, 잠금 판정, 리셋
- [x] 7-3. `TableServiceTest.java` — createTable 성공/중복, authenticateByToken 성공/실패, completeTableSession 성공/세션없음
- [x] 7-4. `JwtAuthFilterTest.java` — 유효 토큰/무효 토큰/토큰 없음

---

## Frontend (순서: Types → API → Hooks → Pages → Router)

### Step 8: Types 수정
- [x] 8-1. `types/index.ts` 수정 — LoginRequest, RegisterRequest 타입 추가

### Step 9: API Services
- [x] 9-1. `services/adminAuthApi.ts` — register, login
- [x] 9-2. `services/tableApi.ts` — authenticateToken, createTable, getAllTables, completeSession, getOrderHistory

### Step 10: Hooks
- [x] 10-1. `hooks/useTableAuth.ts` — authenticate, checkAuth, tableInfo 상태
- [x] 10-2. `hooks/useAdminAuth.ts` — login, register, logout, isAuthenticated 상태

### Step 11: Pages
- [x] 11-1. `pages/customer/CustomerSetupPage.tsx` — 토큰 입력/자동인증/리다이렉트
- [x] 11-2. `pages/admin/AdminLoginPage.tsx` — 로그인/회원가입 전환 폼

### Step 12: Router 수정
- [x] 12-1. `App.tsx` 수정 — /setup, /admin/login에 실제 컴포넌트 연결

### Step 13: Frontend Unit Tests
- [x] 13-1. `test/hooks/useTableAuth.test.ts`
- [x] 13-2. `test/hooks/useAdminAuth.test.ts`
- [x] 13-3. `test/services/adminAuthApi.test.ts`
- [x] 13-4. `test/services/tableApi.test.ts`

---

## 의존 관계 요약

```
Backend:
  Repository (독립) → DTO (독립) → Service (Repository+DTO) → Filter (JwtUtil+Repository) → Controller (Service) → SecurityConfig (Filter)

Frontend:
  Types (독립) → API (Types+axios) → Hooks (API) → Pages (Hooks) → Router (Pages)
```
