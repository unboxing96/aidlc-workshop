# Unit of Work

## 분해 방식: 기능 도메인 기반 (Unit 0 + 5개 Unit, 5명 병렬 작업)

Unit 0(공통 기반)을 먼저 완료한 후, 5개 Unit이 병렬로 작업합니다.
각 Unit은 인터페이스 계약에 의존하므로 독립적으로 개발 가능합니다.

---

## Unit 0: 공통 기반 (선행 작업)

**책임**: 프로젝트 초기 설정, 공통 Entity/DTO, API 인터페이스 계약, 공통 설정

**Backend**:
- Spring Boot 프로젝트 초기화 (Gradle/Maven, 의존성)
- 공통 Entity 정의 (TableEntity, AdminEntity, MenuEntity, CategoryEntity, OrderEntity, OrderItemEntity, OrderHistoryEntity)
- 공통 DTO/Request/Response 정의
- 공통 예외 처리 (GlobalExceptionHandler)
- 설정 (CORS, Security 기본 설정, H2 설정)
- SSE 이벤트 타입 enum 정의

**Frontend**:
- Vite + React + TypeScript 프로젝트 초기화
- shadcn/ui + Tailwind CSS 설정
- Axios 인스턴스 설정 (baseURL, interceptors)
- 공통 TypeScript 타입 정의
- 라우팅 구조 설정 (React Router)
- Zustand 기본 설정

**산출물**: 모든 Unit이 의존하는 공통 코드 기반

---

## Unit 1: 테이블 및 인증

**담당**: 1명
**책임**: 테이블 등록/관리, 토큰 기반 태블릿 연결, 관리자 회원가입/로그인, JWT 인증

**Backend 컴포넌트**:
- TableController, TableService, TableRepository
- AdminAuthController, AdminAuthService, AdminRepository
- JWT 필터, 인증 설정

**Frontend 컴포넌트**:
- CustomerSetupPage (토큰 입력)
- AdminLoginPage (로그인/회원가입)
- useTableAuth, useAdminAuth hooks
- adminAuthApi, tableApi services

**인터페이스 계약**: JWT 토큰 형식, 테이블 인증 API 스펙 (다른 Unit이 참조)

---

## Unit 2: 메뉴

**담당**: 1명
**책임**: 메뉴 CRUD, 카테고리 관리, 이미지 업로드, 메뉴 노출 순서

**Backend 컴포넌트**:
- MenuController, MenuService, MenuRepository, CategoryRepository
- ImageController, ImageService

**Frontend 컴포넌트**:
- CustomerMenuPage (고객 메뉴 조회)
- AdminMenuManagePage (메뉴 관리)
- MenuCard, CategoryNav components
- menuApi, imageApi services

**인터페이스 계약**: 메뉴 조회 API 스펙 (Unit 3이 주문 시 메뉴 정보 참조)

---

## Unit 3: 장바구니 및 주문

**담당**: 1명
**책임**: 장바구니 관리, 주문 생성, 주문 내역 조회

**Backend 컴포넌트**:
- OrderController, OrderService, OrderRepository, OrderItemRepository

**Frontend 컴포넌트**:
- CustomerCartPage (장바구니)
- CustomerOrderPage (주문 확정)
- CustomerOrderHistoryPage (주문 내역)
- CartItem, StatusBadge components
- useCart (Zustand store)
- orderApi service

**인터페이스 계약**: 주문 생성/조회/삭제 API 스펙 (Unit 4, 5가 참조)

---

## Unit 4: 실시간 통신 (SSE)

**담당**: 1명
**책임**: SSE 연결 관리, 실시간 이벤트 브로드캐스트, 주문 상태 실시간 업데이트

**Backend 컴포넌트**:
- OrderSseController, SseEmitterService

**Frontend 컴포넌트**:
- useOrderSSE hook
- SSE 이벤트 핸들링 로직

**인터페이스 계약**: SSE 이벤트 타입/페이로드 스펙 (Unit 0에서 정의, Unit 3이 이벤트 발행, Unit 5가 수신)

**개발 방식**: Unit 0에서 정의된 이벤트 스펙 기반으로 SSE 인프라 구현. 통합 시 Unit 3의 OrderService에서 SseEmitterService 호출 연결.

---

## Unit 5: 관리자 대시보드

**담당**: 1명
**책임**: 실시간 주문 모니터링, 테이블별 주문 관리, 주문 상태 변경, 주문 삭제, 이용 완료, 과거 내역 조회

**Backend 컴포넌트**:
- OrderHistoryRepository (과거 내역 조회)
- 테이블 세션 완료 로직

**Frontend 컴포넌트**:
- AdminDashboardPage (주문 모니터링 대시보드)
- AdminTableManagePage (테이블 관리)
- OrderCard, ConfirmDialog components

**개발 방식**: Unit 0에서 정의된 API 스펙 기반으로 프론트엔드 구현. Mock API로 독립 개발 후 통합 시 실제 API 연결.

---

## 병렬 작업 전략

```
Phase 1 (선행):  Unit 0 — 공통 기반
                    |
                    v
Phase 2 (병렬):  Unit 1  Unit 2  Unit 3  Unit 4  Unit 5
                  (인증)  (메뉴)  (주문)  (SSE)  (대시보드)
                    |       |       |       |       |
                    v       v       v       v       v
Phase 3 (통합):  통합 테스트 및 연결
```

**통합 포인트**:
- Unit 3 → Unit 4: OrderService에서 SseEmitterService 호출 연결
- Unit 5 → Unit 1, 3, 4: API 호출 및 SSE 수신 연결
- 각 Unit은 공통 Entity/DTO를 공유하므로 데이터 모델 충돌 없음

---

## 코드 조직 구조 (Greenfield)

```
table-order/
├── backend/                          # Spring Boot
│   └── src/main/java/.../tableorder/
│       ├── config/                   # Unit 0: 설정
│       ├── common/                   # Unit 0: 공통 (예외, DTO, 이벤트 타입)
│       ├── entity/                   # Unit 0: 공통 Entity
│       ├── table/                    # Unit 1: 테이블
│       ├── auth/                     # Unit 1: 인증
│       ├── menu/                     # Unit 2: 메뉴
│       ├── image/                    # Unit 2: 이미지
│       ├── order/                    # Unit 3: 주문
│       ├── sse/                      # Unit 4: SSE
│       └── dashboard/                # Unit 5: 대시보드
├── frontend/                         # React (Vite + TS)
│   └── src/
│       ├── pages/
│       │   ├── customer/             # 고객 페이지
│       │   └── admin/                # 관리자 페이지
│       ├── components/               # 공유 컴포넌트
│       ├── hooks/                    # Custom hooks
│       ├── services/                 # API 클라이언트
│       ├── stores/                   # Zustand stores
│       └── types/                    # Unit 0: 공통 타입
└── aidlc-docs/                       # AI-DLC 문서
```
