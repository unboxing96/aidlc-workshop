# Code Summary - Unit 5: 관리자 대시보드

## 생성된 파일 목록

### Backend (10 files)
| 파일 | 용도 |
|---|---|
| `dashboard/dto/DashboardTableCard.java` | 대시보드 테이블 카드 DTO |
| `dashboard/dto/OrderSummary.java` | 주문 미리보기 DTO |
| `dashboard/dto/OrderDetailResponse.java` | 주문 상세 응답 DTO |
| `dashboard/dto/OrderItemResponse.java` | 주문 항목 응답 DTO |
| `dashboard/dto/OrderHistoryResponse.java` | 과거 내역 응답 DTO |
| `dashboard/dto/StatusChangeRequest.java` | 상태 변경 요청 DTO |
| `dashboard/OrderHistoryRepository.java` | 과거 내역 Repository |
| `dashboard/OrderRepository.java` | 주문 Repository (TODO: Unit 3 통합) |
| `dashboard/TableRepository.java` | 테이블 Repository (TODO: Unit 1 통합) |
| `dashboard/DashboardService.java` | 비즈니스 로직 |
| `dashboard/DashboardController.java` | REST API 6개 엔드포인트 |

### Backend Test (2 files)
| 파일 | 테스트 수 |
|---|---|
| `dashboard/DashboardServiceTest.java` | 7개 |
| `dashboard/DashboardControllerTest.java` | 6개 |

### Frontend (10 files)
| 파일 | 용도 |
|---|---|
| `services/dashboardApi.ts` | API 클라이언트 |
| `hooks/useOrderSSE.ts` | SSE 연결 관리 hook |
| `components/ConfirmDialog.tsx` | 확인 팝업 |
| `components/DashboardFilter.tsx` | 상태별 필터 |
| `components/TableCard.tsx` | 테이블 카드 |
| `components/OrderDetailModal.tsx` | 주문 상세 모달 |
| `components/OrderHistoryModal.tsx` | 과거 내역 모달 |
| `pages/admin/AdminDashboardPage.tsx` | 대시보드 페이지 |
| `pages/admin/AdminTableManagePage.tsx` | 테이블 관리 페이지 |
| `App.tsx` | 라우트 업데이트 (수정) |

### Frontend Test (3 files)
| 파일 | 테스트 수 |
|---|---|
| `test/dashboardApi.test.ts` | 6개 |
| `test/useOrderSSE.test.ts` | 3개 |
| `test/AdminDashboardPage.test.tsx` | 2개 |

## 통합 시 TODO
- `dashboard/OrderRepository.java` → Unit 3의 `order/OrderRepository`로 교체
- `dashboard/TableRepository.java` → Unit 1의 `table/TableRepository`로 교체
- `DashboardService.java` 내 SSE 발행 주석 → Unit 4의 `SseEmitterService` 연결

## Story 구현 현황
- ✅ US-A03: 테이블별 주문 대시보드 조회
- ✅ US-A05: 주문 상태 변경
- ✅ US-A07: 주문 삭제
- ✅ US-A09: 과거 주문 내역 조회
