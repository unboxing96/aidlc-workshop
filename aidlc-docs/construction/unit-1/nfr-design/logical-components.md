# Unit 1: Logical Components

## Backend 컴포넌트 구조

```
com.tableorder/
├── config/
│   ├── SecurityConfig.java        [수정] 필터 체인 + 엔드포인트 권한
│   ├── JwtUtil.java               [기존] 그대로 사용
│   └── WebConfig.java             [기존] 그대로 사용
├── auth/
│   ├── JwtAuthFilter.java         [신규] JWT 인증 필터
│   ├── TableTokenFilter.java      [신규] 테이블 토큰 필터
│   ├── LoginAttemptService.java   [신규] 로그인 시도 제한
│   ├── AdminAuthController.java   [신규] 회원가입/로그인 API
│   ├── AdminAuthService.java      [신규] 인증 비즈니스 로직
│   ├── AdminRepository.java       [신규] JPA Repository
│   └── dto/
│       ├── AdminRegisterRequest.java
│       ├── AdminLoginRequest.java
│       └── AdminLoginResponse.java
├── table/
│   ├── TableController.java       [신규] 테이블 관리 API
│   ├── TableService.java          [신규] 테이블 비즈니스 로직
│   ├── TableRepository.java       [신규] JPA Repository
│   ├── OrderRepository.java       [신규] 이용 완료 시 주문 조회/삭제
│   ├── OrderHistoryRepository.java [신규] 이용 완료 시 히스토리 저장
│   └── dto/
│       ├── CreateTableRequest.java
│       ├── TableAuthRequest.java
│       ├── TableResponse.java
│       ├── TableAuthResponse.java
│       ├── OrderHistoryResponse.java
│       └── MessageResponse.java
├── entity/                        [기존] Unit 0
└── common/                        [기존] Unit 0
```

## Frontend 컴포넌트 구조

```
src/
├── services/
│   ├── api.ts                     [기존] Axios 인스턴스
│   ├── tableApi.ts                [신규]
│   └── adminAuthApi.ts            [신규]
├── hooks/
│   ├── useTableAuth.ts            [신규]
│   └── useAdminAuth.ts            [신규]
├── pages/
│   ├── customer/
│   │   └── CustomerSetupPage.tsx  [신규]
│   └── admin/
│       └── AdminLoginPage.tsx     [신규]
├── types/index.ts                 [수정] LoginRequest/Response 타입 추가
└── App.tsx                        [수정] 실제 컴포넌트 연결
```

## 컴포넌트 간 의존 관계

```
AdminAuthController → AdminAuthService → AdminRepository, LoginAttemptService, JwtUtil, PasswordEncoder
TableController → TableService → TableRepository, OrderRepository, OrderHistoryRepository
JwtAuthFilter → JwtUtil
TableTokenFilter → TableRepository
SecurityConfig → JwtAuthFilter, TableTokenFilter
```
