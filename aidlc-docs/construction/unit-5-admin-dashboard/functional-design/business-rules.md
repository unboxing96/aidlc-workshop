# Business Rules - Unit 5: 관리자 대시보드

## BR-01: 주문 상태 전이 (양방향)
- 허용: PENDING ↔ PREPARING ↔ COMPLETED
- 불가: 동일 상태로 변경 (PENDING → PENDING)
- 위반 시: InvalidStatusTransitionException

## BR-02: 주문 삭제
- 모든 상태의 주문 삭제 가능
- 삭제 시 확인 팝업 필수 (프론트엔드)
- 삭제 후 테이블 총 주문액 자동 재계산

## BR-03: 이용 완료 조건
- 모든 주문이 COMPLETED 상태여야 이용 완료 가능
- PENDING 또는 PREPARING 주문이 1건이라도 있으면 차단
- 위반 시: BusinessException ("미완료 주문 N건이 있어 이용 완료할 수 없습니다")

## BR-04: 이용 완료 처리
- 현재 세션 주문 → OrderHistory로 이동
- 테이블 currentSessionId → null
- 현재 주문 목록 전체 삭제

## BR-05: 과거 내역 조회
- 기본 날짜 범위: 최근 10일
- 시간 역순 정렬
- 테이블별 조회

## BR-06: 대시보드 미리보기
- 테이블 카드당 최신 5개 주문 표시
- itemSummary 형식: "첫 번째 메뉴명 외 N건" (항목 2개 이상일 때) 또는 "메뉴명 1개" (항목 1개일 때)

## BR-07: 대시보드 필터링
- 주문 상태별 필터: 대기중 있는 테이블, 준비중 있는 테이블, 주문 없는 테이블 숨기기
- 기본: 전체 테이블 표시
