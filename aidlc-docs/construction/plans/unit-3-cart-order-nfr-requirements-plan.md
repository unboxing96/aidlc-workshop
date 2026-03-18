# NFR Requirements Plan - Unit 3: 장바구니 및 주문

## Unit Context
- **Unit**: Unit 3 - 장바구니 및 주문
- **Functional Design**: 완료

## Steps

### Step 1: 성능 요구사항 분석
- [x] 주문 생성 API 응답 시간 기준 (1초 이내)
- [x] 주문 내역 조회 응답 시간 기준 (1초 이내)

### Step 2: 데이터 무결성 요구사항
- [x] 주문 금액 서버 측 재계산 정책
- [x] 동시 주문 처리 (모두 허용)

### Step 3: 에러 처리 및 복원력
- [x] 주문 실패 시 장바구니 유지 정책
- [x] SSE 이벤트 발행 실패 시 주문 처리 정책 (주문 성공 + SSE 재시도 5회)

### Step 4: Tech Stack 확인
- [x] Unit 0 tech stack 그대로 사용 확인
