# Unit 5: 관리자 대시보드 - 개발 보고서

## 1. 개요

| 항목 | 내용 |
|---|---|
| **Unit** | Unit 5 - 관리자 대시보드 |
| **담당자** | Lucas-one |
| **브랜치** | feature/unit-5 |
| **작업 기간** | 2026-03-18 |
| **상태** | ✅ 개발 완료 (통합 대기) |

## 2. 담당 User Stories

| Story ID | Story Name | 상태 |
|---|---|---|
| US-A03 | 테이블별 주문 대시보드 조회 | ✅ 완료 |
| US-A05 | 주문 상태 변경 | ✅ 완료 |
| US-A07 | 주문 삭제 | ✅ 완료 |
| US-A09 | 과거 주문 내역 조회 | ✅ 완료 |

## 3. 설계 결정사항

### 명확화 질문 답변 요약
| 질문 | 결정 |
|---|---|
| 대시보드 미리보기 주문 수 | 최신 5개 |
| 주문 상태 변경 방향 | 양방향 허용 (PENDING ↔ PREPARING ↔ COMPLETED) |
| 이용 완료 시 미완료 주문 | 차단 (모든 주문 COMPLETED 필요) |
| 과거 내역 기본 날짜 범위 | 최근 10일 |
| 대시보드 필터링 | 주문 상태별 필터 |
| 대시보드 로딩 시간 | 1초 이내 |
| SSE 재연결 | 즉시 (1초) |
| 최대 테이블 수 | 30개 |

### 핵심 비즈니스 규칙
- BR-01: 주문 상태 양방향 전이 허용, 동일 상태 변경 불가
- BR-02: 모든 상태의 주문 삭제 가능, 확인 팝업 필수
- BR-03: 이용 완료 시 미완료 주문 있으면 차단
- BR-04: 이용 완료 → OrderHistory 이동 → 주문 삭제 → 세션 리셋 (트랜잭션)

## 4. 생성된 파일 목록

### Backend (12 files)
```
table-order/backend/src/main/java/com/tableorder/dashboard/
├── dto/
│   ├── DashboardTableCard.java
│   ├── OrderSummary.java
│   ├── OrderDetailResponse.java
│   ├── OrderItemResponse.java
│   ├── OrderHistoryResponse.java
│   └── StatusChangeRequest.java
├── OrderHistoryRepository.java
├── OrderRepository.java          ← TODO: Unit 3 통합
├── TableRepository.java          ← TODO: Unit 1 통합
├── DashboardService.java
└── DashboardController.java
```

### Backend Test (2 files)
```
table-order/backend/src/test/java/com/tableorder/dashboard/
├── DashboardServiceTest.java     (8 tests)
└── DashboardControllerTest.java  (6 tests)
```

### Frontend (10 files)
```
table-order/frontend/src/
├── services/dashboardApi.ts
├── hooks/useOrderSSE.ts
├── components/
│   ├── ConfirmDialog.tsx
│   ├── DashboardFilter.tsx
│   ├── TableCard.tsx
│   ├── OrderDetailModal.tsx
│   └── OrderHistoryModal.tsx
├── pages/admin/
│   ├── AdminDashboardPage.tsx
│   └── AdminTableManagePage.tsx
└── App.tsx                        (수정 - 라우트 연결)
```

### Frontend Test (3 files)
```
table-order/frontend/src/test/
├── dashboardApi.test.ts          (6 tests)
├── useOrderSSE.test.ts           (3 tests)
└── AdminDashboardPage.test.tsx   (2 tests)
```

## 5. API 엔드포인트

| Method | Endpoint | 설명 |
|---|---|---|
| GET | /api/admin/dashboard | 대시보드 전체 조회 |
| GET | /api/admin/tables/{id}/orders | 테이블 주문 상세 |
| PATCH | /api/admin/orders/{id}/status | 주문 상태 변경 |
| DELETE | /api/admin/orders/{id} | 주문 삭제 |
| POST | /api/admin/tables/{id}/complete | 이용 완료 |
| GET | /api/admin/tables/{id}/history | 과거 내역 조회 |

## 6. 테스트 현황

| 영역 | 테스트 수 | 상태 |
|---|---|---|
| Backend Service | 8 | 실행 대기 |
| Backend Controller | 6 | 실행 대기 |
| Frontend API | 6 | 실행 대기 |
| Frontend SSE Hook | 3 | 실행 대기 |
| Frontend Page | 2 | 실행 대기 |
| **합계** | **25** | |

## 7. 통합 대기 항목

| TODO | 현재 | 통합 대상 |
|---|---|---|
| OrderRepository | dashboard/ 패키지 임시 | Unit 3 (order/) |
| TableRepository | dashboard/ 패키지 임시 | Unit 1 (table/) |
| SSE 이벤트 발행 | 주석 처리 | Unit 4 (SseEmitterService) |
