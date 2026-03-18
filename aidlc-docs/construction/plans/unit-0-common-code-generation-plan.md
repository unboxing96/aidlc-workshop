# Code Generation Plan - Unit 0: 공통 기반

## Unit Context
- **Unit**: Unit 0 - 공통 기반
- **Stories**: 없음 (인프라 설정)
- **목적**: 프로젝트 초기화, 공통 Entity/DTO, 설정, 예외 처리

## Steps

### Step 1: Backend 프로젝트 초기화
- [x] Spring Boot 프로젝트 생성 (Gradle Kotlin DSL)
- [x] build.gradle.kts 의존성 설정
- [x] application.yml 설정 (H2, JPA, 서버 포트)

### Step 2: Backend 공통 Entity
- [x] OrderStatus enum
- [x] AdminEntity
- [x] TableEntity
- [x] CategoryEntity
- [x] MenuEntity
- [x] OrderEntity + OrderItemEntity
- [x] OrderHistoryEntity

### Step 3: Backend 공통 DTO
- [x] 공통 에러 응답 DTO (ErrorResponse)

### Step 4: Backend 공통 예외 처리
- [x] BusinessException (base)
- [x] NotFoundException, DuplicateException, InvalidStatusTransitionException
- [x] GlobalExceptionHandler

### Step 5: Backend 공통 설정
- [x] SecurityConfig (기본 설정)
- [x] WebConfig (CORS + 이미지 리소스 핸들러)
- [x] JwtUtil (토큰 생성/검증)

### Step 6: Backend SSE 이벤트 타입
- [x] SseEventType enum
- [x] SseEvent DTO

### Step 7: Backend Unit Tests
- [x] JwtUtil 테스트
- [x] GlobalExceptionHandler 테스트

### Step 8: Frontend 프로젝트 초기화
- [x] Vite + React + TypeScript 프로젝트 생성
- [x] Tailwind CSS 설정
- [x] package.json 의존성

### Step 9: Frontend 공통 타입
- [x] TypeScript 인터페이스 (Menu, Order, Table, Admin 등)
- [x] API 응답 타입
- [x] SSE 이벤트 타입

### Step 10: Frontend 공통 설정
- [x] Axios 인스턴스 설정 (baseURL, interceptors)
- [x] React Router 라우팅 구조
- [x] Zustand cart store 기본 구조

### Step 11: Frontend Unit Tests
- [x] Cart store 테스트
