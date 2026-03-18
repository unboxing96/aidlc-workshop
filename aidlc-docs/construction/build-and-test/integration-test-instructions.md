# Integration Test Instructions - Unit 5

## Purpose
Unit 5(대시보드)와 다른 Unit 간 통합 테스트. 통합 단계에서 실행.

## 통합 테스트 시나리오

### Scenario 1: Unit 3(주문) → Unit 5(대시보드)
- **설명**: 고객이 주문 생성 시 대시보드에 실시간 반영
- **Setup**: Backend 서버 실행, 테이블/메뉴 시드 데이터
- **Steps**:
  1. 관리자 로그인 → 대시보드 접속
  2. 고객 측에서 주문 생성 (POST /api/orders)
  3. 대시보드에서 해당 테이블 카드에 주문 표시 확인
- **Expected**: 2초 이내 대시보드에 신규 주문 표시

### Scenario 2: Unit 5(대시보드) → Unit 4(SSE)
- **설명**: 주문 상태 변경 시 SSE로 고객 화면에 실시간 반영
- **Steps**:
  1. 관리자가 주문 상태 변경 (PATCH /api/admin/orders/{id}/status)
  2. SSE 이벤트 ORDER_STATUS_CHANGED 발행 확인
  3. 고객 화면에서 상태 변경 반영 확인
- **Expected**: 상태 변경 즉시 SSE 이벤트 발행

### Scenario 3: Unit 5(이용 완료) → Unit 1(테이블)
- **설명**: 이용 완료 시 테이블 세션 리셋
- **Steps**:
  1. 모든 주문을 COMPLETED로 변경
  2. 이용 완료 실행 (POST /api/admin/tables/{id}/complete)
  3. 테이블 세션 null 확인
  4. 과거 내역에 이동 확인
- **Expected**: 주문 이력 이동, 테이블 리셋

## 실행 방법
```bash
# Backend 서버 실행
cd table-order/backend
./gradlew bootRun

# 별도 터미널에서 Frontend 실행
cd table-order/frontend
npm run dev

# 브라우저에서 수동 테스트
# 관리자: http://localhost:5173/admin/dashboard
# 고객: http://localhost:5173/table/{token}
```
