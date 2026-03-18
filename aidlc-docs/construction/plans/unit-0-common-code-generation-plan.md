# Code Generation Plan - Unit 0: 공통 기반

## Unit Context
- **Unit**: Unit 0 - 공통 기반
- **Stories**: 없음 (인프라 설정)
- **목적**: 프로젝트 초기화, 공통 Entity/DTO, 설정, 예외 처리

## Steps

### Step 1: Backend 프로젝트 초기화
- [ ] Spring Boot 프로젝트 생성 (Gradle Kotlin DSL)
- [ ] build.gradle.kts 의존성 설정
- [ ] application.yml 설정 (H2, JPA, 서버 포트)

### Step 2: Backend 공통 Entity
- [ ] OrderStatus enum
- [ ] AdminEntity
- [ ] TableEntity
- [ ] CategoryEntity
- [ ] MenuEntity
- [ ] OrderEntity + OrderItemEntity
- [ ] OrderHistoryEntity

### Step 3: Backend 공통 DTO
- [ ] 공통 에러 응답 DTO (ErrorResponse)
- [ ] API 요청/응답 DTO (각 도메인별)

### Step 4: Backend 공통 예외 처리
- [ ] BusinessException (base)
- [ ] NotFoundException, DuplicateException, InvalidStatusTransitionException
- [ ] GlobalExceptionHandler

### Step 5: Backend 공통 설정
- [ ] SecurityConfig (JWT + TableToken 필터 체인)
- [ ] CorsConfig
- [ ] JwtUtil (토큰 생성/검증)
- [ ] WebConfig (이미지 리소스 핸들러)

### Step 6: Backend SSE 이벤트 타입
- [ ] SseEventType enum
- [ ] SseEvent DTO

### Step 7: Backend Unit Tests
- [ ] Entity 생성 테스트
- [ ] JwtUtil 테스트
- [ ] GlobalExceptionHandler 테스트

### Step 8: Frontend 프로젝트 초기화
- [ ] Vite + React + TypeScript 프로젝트 생성
- [ ] Tailwind CSS + shadcn/ui 설정
- [ ] package.json 의존성

### Step 9: Frontend 공통 타입
- [ ] TypeScript 인터페이스 (Menu, Order, Table, Admin 등)
- [ ] API 응답 타입
- [ ] SSE 이벤트 타입

### Step 10: Frontend 공통 설정
- [ ] Axios 인스턴스 설정 (baseURL, interceptors)
- [ ] React Router 라우팅 구조
- [ ] Zustand cart store 기본 구조

### Step 11: Frontend Unit Tests
- [ ] 공통 타입 검증 테스트
- [ ] Axios 인스턴스 설정 테스트
- [ ] Cart store 테스트
