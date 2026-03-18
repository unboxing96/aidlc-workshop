# Components

## Backend Components (Spring Boot, 3-Layer)

### Controller Layer
| Component | Responsibility | Related Stories |
|-----------|---------------|-----------------|
| TableController | 테이블 등록, 토큰 인증, 테이블 세션 관리 | US-C01, US-A06, US-A08 |
| MenuController | 메뉴 CRUD, 카테고리별 조회 | US-C03, US-C04, US-A10~A14 |
| OrderController | 주문 생성, 조회, 상태 변경, 삭제 | US-C09, US-C10, US-A05, US-A07 |
| OrderSseController | SSE 연결 관리, 실시간 이벤트 전송 | US-C11, US-A03, US-A04 |
| AdminAuthController | 관리자 회원가입, 로그인 | US-A01, US-A02 |
| ImageController | 이미지 업로드, 서빙 | US-A11, US-A12 |

### Service Layer
| Component | Responsibility |
|-----------|---------------|
| TableService | 테이블 CRUD, 토큰 생성/검증, 세션 시작/종료 |
| MenuService | 메뉴 CRUD, 카테고리 관리, 노출 순서 관리 |
| OrderService | 주문 생성, 조회, 상태 변경, 삭제, 이력 관리 |
| SseEmitterService | SSE 연결 관리, 이벤트 브로드캐스트 |
| AdminAuthService | 관리자 회원가입, 로그인, JWT 발급/검증 |
| ImageService | 이미지 파일 저장/조회 |

### Repository Layer
| Component | Entity | Responsibility |
|-----------|--------|---------------|
| TableRepository | TableEntity | 테이블 데이터 접근 |
| MenuRepository | MenuEntity | 메뉴 데이터 접근 |
| CategoryRepository | CategoryEntity | 카테고리 데이터 접근 |
| OrderRepository | OrderEntity | 주문 데이터 접근 |
| OrderItemRepository | OrderItemEntity | 주문 항목 데이터 접근 |
| OrderHistoryRepository | OrderHistoryEntity | 과거 주문 이력 접근 |
| AdminRepository | AdminEntity | 관리자 계정 데이터 접근 |

---

## Frontend Components (React + Vite + TypeScript)

### Pages
| Component | Responsibility | Related Stories |
|-----------|---------------|-----------------|
| CustomerMenuPage | 고객 메뉴 조회 (기본 화면) | US-C03, US-C04 |
| CustomerCartPage | 장바구니 관리 | US-C05~C08 |
| CustomerOrderPage | 주문 확정 | US-C09 |
| CustomerOrderHistoryPage | 주문 내역 조회 | US-C10, US-C11 |
| CustomerSetupPage | 태블릿 토큰 입력 (초기 설정) | US-C01 |
| AdminLoginPage | 관리자 로그인/회원가입 | US-A01, US-A02 |
| AdminDashboardPage | 주문 모니터링 대시보드 | US-A03~A05 |
| AdminTableManagePage | 테이블 관리 | US-A06~A09 |
| AdminMenuManagePage | 메뉴 관리 | US-A10~A14 |

### Shared Components
| Component | Responsibility |
|-----------|---------------|
| MenuCard | 메뉴 카드 UI (이미지, 이름, 가격, 설명) |
| CartItem | 장바구니 항목 (수량 조절, 삭제) |
| OrderCard | 주문 카드 (테이블별, 상태 표시) |
| CategoryNav | 카테고리 네비게이션 |
| ConfirmDialog | 확인 팝업 (삭제, 이용 완료 등) |
| StatusBadge | 주문 상태 뱃지 (대기중/준비중/완료) |

### Hooks
| Hook | Responsibility |
|------|---------------|
| useCart | 장바구니 상태 관리 (Zustand store) |
| useOrderSSE | SSE 연결 및 주문 실시간 업데이트 |
| useAdminAuth | 관리자 인증 상태 관리 |
| useTableAuth | 테이블 토큰 인증 관리 |

### Services (API 클라이언트)
| Service | Responsibility |
|---------|---------------|
| menuApi | 메뉴 API 호출 (Axios) |
| orderApi | 주문 API 호출 (Axios) |
| tableApi | 테이블 API 호출 (Axios) |
| adminAuthApi | 관리자 인증 API 호출 (Axios) |
| imageApi | 이미지 업로드 API 호출 (Axios) |
