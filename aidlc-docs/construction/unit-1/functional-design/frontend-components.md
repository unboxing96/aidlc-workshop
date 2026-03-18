# Unit 1: 프론트엔드 컴포넌트 설계

## 1. CustomerSetupPage (/setup)

**역할**: 관리자가 태블릿에 토큰을 1회 입력하는 초기 설정 페이지

**동작 흐름**:
1. 진입 시 localStorage에 tableToken 존재 확인
2. 있으면 → /api/tables/auth로 검증 → 성공 시 메뉴 페이지로 리다이렉트
3. 없으면 → 토큰 입력 폼 표시
4. 토큰 입력 → /api/tables/auth 호출 → 성공 시 localStorage 저장 + 메뉴 리다이렉트
5. 실패 시 에러 메시지 표시

**상태**: token(string), error(string|null), loading(boolean)

## 2. AdminLoginPage (/admin/login)

**역할**: 관리자 로그인 + 회원가입 전환 폼

**동작 흐름**:
- 로그인 모드: username/password 입력 → /api/admin/login → JWT localStorage 저장 → /admin/dashboard 리다이렉트
- 회원가입 모드: username/password 입력 → /api/admin/register → 성공 메시지 → 로그인 모드 전환
- 진입 시 localStorage에 adminToken 있으면 → 대시보드 리다이렉트

**상태**: isRegisterMode(boolean), username(string), password(string), error(string|null), loading(boolean)

## 3. Hooks

### useTableAuth
- `authenticate(token)`: POST /api/tables/auth → localStorage 저장
- `checkAuth()`: localStorage 토큰 존재 + 유효성 확인
- `tableInfo`: { tableId, tableNumber } | null

### useAdminAuth
- `login(username, password)`: POST /api/admin/login → JWT 저장
- `register(username, password)`: POST /api/admin/register
- `logout()`: localStorage 제거 + /admin/login 리다이렉트
- `isAuthenticated`: boolean

## 4. API Services

### tableApi
- `authenticateToken(token)` → POST /api/tables/auth
- `createTable(tableNumber)` → POST /api/tables
- `getAllTables()` → GET /api/tables
- `completeSession(tableId)` → POST /api/tables/{id}/complete
- `getOrderHistory(tableId)` → GET /api/tables/{id}/history

### adminAuthApi
- `register(username, password)` → POST /api/admin/register
- `login(username, password)` → POST /api/admin/login
