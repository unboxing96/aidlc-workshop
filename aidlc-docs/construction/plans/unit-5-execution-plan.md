# Construction Phase 실행 계획 - Unit 5: 관리자 대시보드

## Unit 정보
- **Stories**: US-A03, US-A05, US-A07, US-A09 (4개)
- **담당**: 1명
- **의존**: Unit 0 (공통 기반)

---

## Stage 1: Functional Design

### 비즈니스 로직
- 대시보드 조회: 전체 테이블 목록 + 각 테이블의 현재 주문 요약 (총 주문액, 최신 주문 n개)
- 주문 상태 변경: PENDING → PREPARING → COMPLETED (정방향만)
  - 상태 변경 시 SSE 이벤트 발행 (Unit 4 인터페이스)
- 주문 삭제: 확인 팝업 → 삭제 → 테이블 총 주문액 재계산
  - 삭제 시 SSE 이벤트 발행 (Unit 4 인터페이스)
- 과거 주문 내역 조회: tableId로 OrderHistory 조회, 시간 역순, 날짜 필터링

### UI 레이아웃
- 그리드 형태 테이블별 카드
- 각 카드: 테이블 번호, 총 주문액, 최신 주문 미리보기
- 카드 클릭: 전체 주문 상세 (메뉴 목록, 상태 변경 버튼, 삭제 버튼)
- 신규 주문: 시각적 강조 (색상 변경, 애니메이션)

### 도메인 규칙
- 관리자 인증 필수 (JWT)
- 주문 상태 역방향 전이 불가
- 이용 완료 시 해당 테이블 카드 리셋

---

## Stage 2: NFR Requirements
- 대시보드 초기 로딩: 2초 이내
- SSE로 실시간 업데이트 (폴링 없음)
- 신규 주문 시각적 강조: CSS 애니메이션 (3초간)

## Stage 3: NFR Design
- SSE 이벤트 수신 → Zustand/state 업데이트 → React 리렌더링
- 대시보드 데이터: 초기 로딩은 REST API, 이후 SSE로 증분 업데이트
- 과거 내역: 모달/사이드패널로 표시, 닫기 시 대시보드 복귀

---

## Stage 4: Code Generation Plan

### Backend
- [ ] 대시보드 전용 API 없음 (Unit 1 테이블 API + Unit 3 주문 API 조합 사용)
- [ ] OrderHistory 조회 로직 (TableService 또는 별도 DashboardService)
- [ ] Unit Tests: OrderHistory 조회, 날짜 필터링

### Frontend
- [ ] AdminDashboardPage (테이블 그리드, SSE 연결, 실시간 업데이트)
- [ ] AdminTableManagePage (테이블 등록, 이용 완료)
- [ ] OrderCard component (테이블 카드: 번호, 총액, 주문 미리보기, 상태 변경)
- [ ] ConfirmDialog component (삭제/이용 완료 확인 팝업)
- [ ] 과거 내역 모달 (날짜 필터, 주문 목록)
- [ ] Unit Tests: OrderCard, ConfirmDialog, Dashboard 상태 관리
