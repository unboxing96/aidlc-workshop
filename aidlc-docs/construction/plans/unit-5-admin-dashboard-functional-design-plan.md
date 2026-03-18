# Functional Design Plan - Unit 5: 관리자 대시보드

## Unit 정보
- **Unit**: Unit 5 - 관리자 대시보드
- **담당 Stories**: US-A03, US-A05, US-A07, US-A09
- **책임**: 실시간 주문 모니터링, 테이블별 주문 관리, 주문 상태 변경, 주문 삭제, 이용 완료, 과거 내역 조회

## 실행 계획

- [x] Step 1: Domain Entity 설계 (OrderHistoryRepository, DTO 정의)
- [x] Step 2: Business Logic 설계 (주문 상태 변경, 주문 삭제, 이용 완료, 과거 내역)
- [x] Step 3: Business Rules 정의 (상태 전이 규칙, 삭제 조건, 세션 완료 조건)
- [x] Step 4: Frontend Component 설계 (대시보드, 테이블 관리 페이지)

## 명확화 질문

아래 질문의 `[Answer]:` 태그 뒤에 선택한 옵션 문자를 입력해 주세요.

### Question 1
대시보드에서 테이블 카드의 "최신 주문 n개 미리보기"에서 n은 몇 개가 적당합니까?

A) 2개
B) 3개
C) 5개
X) Other (please describe after [Answer]: tag below)

[Answer]: C

### Question 2
주문 상태 변경 시 순방향만 허용합니까? (대기중→준비중→완료만 가능, 역방향 불가)

A) 순방향만 허용 (대기중→준비중→완료, 되돌리기 불가)
B) 양방향 허용 (완료→준비중, 준비중→대기중 등 되돌리기 가능)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

### Question 3
이용 완료 처리 시, 아직 "대기중" 또는 "준비중" 상태인 주문이 있으면 어떻게 처리합니까?

A) 이용 완료 차단 - 모든 주문이 "완료" 상태여야만 이용 완료 가능
B) 강제 이용 완료 - 미완료 주문도 함께 과거 이력으로 이동
C) 경고 후 선택 - 미완료 주문이 있다고 경고하고, 관리자가 강제 진행 여부 선택
X) Other (please describe after [Answer]: tag below)

[Answer]: A (설명 요청 후 A 선택 - 이용 완료 차단, 모든 주문 완료 상태 필요)

### Question 4
과거 내역 조회에서 날짜 필터의 기본 범위는 어떻게 설정합니까?

A) 오늘 하루
B) 최근 7일
C) 최근 30일
X) Other (please describe after [Answer]: tag below)

[Answer]: X. 최근 10일.

### Question 5
대시보드에서 테이블 필터링은 어떤 방식으로 제공합니까?

A) 전체 테이블 표시 (필터 없음, 스크롤로 탐색)
B) 주문 상태별 필터 (대기중 있는 테이블만, 주문 없는 테이블 숨기기 등)
C) 테이블 번호 검색 + 상태별 필터 조합
X) Other (please describe after [Answer]: tag below)

[Answer]: B
