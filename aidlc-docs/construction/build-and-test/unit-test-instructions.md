# Unit Test Execution - Unit 5

## Backend Unit Tests

### 실행
```bash
cd table-order/backend
./gradlew test
```

### 테스트 목록
| 클래스 | 테스트 | 검증 내용 |
|---|---|---|
| DashboardServiceTest | getDashboard_returnsTableCards | 대시보드 조회 |
| | changeOrderStatus_success | 상태 변경 성공 |
| | changeOrderStatus_sameStatus_throws | 동일 상태 변경 차단 |
| | changeOrderStatus_notFound_throws | 존재하지 않는 주문 |
| | deleteOrder_success | 주문 삭제 성공 |
| | completeTableSession_success | 이용 완료 성공 |
| | completeTableSession_incompleteOrders_throws | 미완료 주문 차단 |
| | completeTableSession_noSession_throws | 세션 없음 차단 |
| DashboardControllerTest | getDashboard_returns200 | API 200 응답 |
| | getTableOrders_returns200 | API 200 응답 |
| | changeOrderStatus_returns200 | API 200 응답 |
| | deleteOrder_returns200 | API 200 응답 |
| | completeTableSession_returns200 | API 200 응답 |
| | getOrderHistory_returns200 | API 200 응답 |

### 예상 결과
- **총 테스트**: 14개 (Service 8 + Controller 6)
- **리포트**: `table-order/backend/build/reports/tests/test/index.html`

## Frontend Unit Tests

### 실행
```bash
cd table-order/frontend
npm test
```

### 테스트 목록
| 파일 | 테스트 | 검증 내용 |
|---|---|---|
| dashboardApi.test.ts | getDashboard calls correct endpoint | API 호출 검증 |
| | getTableOrders calls correct endpoint | API 호출 검증 |
| | changeOrderStatus calls correct endpoint | API 호출 검증 |
| | deleteOrder calls correct endpoint | API 호출 검증 |
| | completeTableSession calls correct endpoint | API 호출 검증 |
| | getOrderHistory calls with date params | 날짜 파라미터 검증 |
| useOrderSSE.test.ts | connects to SSE endpoint | SSE 연결 검증 |
| | calls onOrderCreated handler | 이벤트 핸들러 검증 |
| | closes EventSource on unmount | 정리 검증 |
| AdminDashboardPage.test.tsx | renders dashboard page | 페이지 렌더링 |
| | renders filter buttons | 필터 버튼 렌더링 |

### 예상 결과
- **총 테스트**: 11개 (API 6 + SSE 3 + Page 2)
