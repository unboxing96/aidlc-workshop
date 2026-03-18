# Code Generation Plan - Unit 5: 관리자 대시보드

## Unit 정보
- **Unit**: Unit 5 - 관리자 대시보드
- **Stories**: US-A03 (대시보드 조회), US-A05 (상태 변경), US-A07 (주문 삭제), US-A09 (과거 내역)
- **의존**: Unit 0 (공통 Entity, Config, SSE), Unit 1 (테이블 API), Unit 3 (주문 API), Unit 4 (SSE)

## 코드 위치
- **Backend**: `table-order/backend/src/main/java/com/tableorder/dashboard/`
- **Backend Test**: `table-order/backend/src/test/java/com/tableorder/dashboard/`
- **Frontend**: `table-order/frontend/src/`

## 실행 계획

### Step 1: Backend DTO 생성
- [ ] `dashboard/dto/DashboardTableCard.java`
- [ ] `dashboard/dto/OrderSummary.java`
- [ ] `dashboard/dto/OrderDetailResponse.java`
- [ ] `dashboard/dto/OrderItemResponse.java`
- [ ] `dashboard/dto/OrderHistoryResponse.java`
- [ ] `dashboard/dto/StatusChangeRequest.java`

### Step 2: Backend Repository 생성
- [ ] `dashboard/OrderHistoryRepository.java`

### Step 3: Backend Service 생성
- [ ] `dashboard/DashboardService.java` (US-A03, US-A05, US-A07, US-A09)

### Step 4: Backend Controller 생성
- [ ] `dashboard/DashboardController.java` (6개 API 엔드포인트)

### Step 5: Backend Unit Test 생성
- [ ] `dashboard/DashboardServiceTest.java`
- [ ] `dashboard/DashboardControllerTest.java`

### Step 6: Frontend API Service 생성
- [ ] `services/dashboardApi.ts`

### Step 7: Frontend 공통 컴포넌트 생성
- [ ] `components/ConfirmDialog.tsx`
- [ ] `components/DashboardFilter.tsx`
- [ ] `components/TableCard.tsx`
- [ ] `components/OrderDetailModal.tsx`
- [ ] `components/OrderHistoryModal.tsx`

### Step 8: Frontend 페이지 생성
- [ ] `pages/admin/AdminDashboardPage.tsx` (US-A03, US-A05, US-A07)
- [ ] `pages/admin/AdminTableManagePage.tsx` (US-A09)

### Step 9: Frontend SSE Hook 생성
- [ ] `hooks/useOrderSSE.ts`

### Step 10: Frontend App.tsx 라우트 업데이트
- [ ] `App.tsx` placeholder를 실제 컴포넌트로 교체

### Step 11: Frontend Unit Test 생성
- [ ] `test/dashboardApi.test.ts`
- [ ] `test/useOrderSSE.test.ts`
- [ ] `test/AdminDashboardPage.test.tsx`

### Step 12: Documentation
- [ ] `aidlc-docs/construction/unit-5-admin-dashboard/code/code-summary.md`

## Story 추적
- [ ] US-A03: 테이블별 주문 대시보드 조회 (Step 1-4, 6-8)
- [ ] US-A05: 주문 상태 변경 (Step 3-4, 7-8)
- [ ] US-A07: 주문 삭제 (Step 3-4, 7-8)
- [ ] US-A09: 과거 주문 내역 조회 (Step 2-4, 6-8)
