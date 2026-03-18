# Unit of Work

## 분해 방식: 기능 도메인 기반 (5개 Unit, 5명 병렬 작업)

각 Unit은 Backend(Controller + Service + Repository) + Frontend(Pages + Components + Hooks)를 함께 포함합니다.

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

**데이터 모델**: TableEntity, AdminEntity

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

**데이터 모델**: MenuEntity, CategoryEntity

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

**데이터 모델**: OrderEntity, OrderItemEntity

---

## Unit 4: 실시간 통신 (SSE)

**담당**: 1명
**책임**: SSE 연결 관리, 실시간 이벤트 브로드캐스트, 주문 상태 실시간 업데이트 (고객+관리자)

**Backend 컴포넌트**:
- OrderSseController, SseEmitterService

**Frontend 컴포넌트**:
- useOrderSSE hook
- SSE 이벤트 타입 정의 및 핸들링

**이벤트 타입**: ORDER_CREATED, ORDER_STATUS_CHANGED, ORDER_DELETED, TABLE_SESSION_COMPLETED

---

## Unit 5: 관리자 대시보드

**담당**: 1명
**책임**: 실시간 주문 모니터링, 테이블별 주문 관리, 주문 상태 변경, 주문 삭제, 이용 완료, 과거 내역 조회

**Backend 컴포넌트**:
- OrderHistoryRepository (과거 내역 조회)
- 테이블 세션 완료 로직 (TableService.completeTableSession)

**Frontend 컴포넌트**:
- AdminDashboardPage (주문 모니터링 대시보드)
- AdminTableManagePage (테이블 관리)
- OrderCard, ConfirmDialog components

**데이터 모델**: OrderHistoryEntity

---

## 코드 조직 구조 (Greenfield)

```
table-order/
├── backend/                          # Spring Boot
│   └── src/main/java/.../tableorder/
│       ├── config/                   # 설정 (Security, CORS, etc.)
│       ├── table/                    # Unit 1: 테이블
│       ├── auth/                     # Unit 1: 인증
│       ├── menu/                     # Unit 2: 메뉴
│       ├── image/                    # Unit 2: 이미지
│       ├── order/                    # Unit 3: 주문
│       ├── sse/                      # Unit 4: SSE
│       ├── dashboard/                # Unit 5: 대시보드 (이력 관련)
│       └── common/                   # 공통 (예외처리, DTO 등)
├── frontend/                         # React (Vite + TS)
│   └── src/
│       ├── pages/
│       │   ├── customer/             # 고객 페이지
│       │   └── admin/                # 관리자 페이지
│       ├── components/               # 공유 컴포넌트
│       ├── hooks/                    # Custom hooks
│       ├── services/                 # API 클라이언트
│       ├── stores/                   # Zustand stores
│       └── types/                    # TypeScript 타입
└── aidlc-docs/                       # AI-DLC 문서
```
