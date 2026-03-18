# Unit 3 NFR Requirements Questions

Unit 3(장바구니 및 주문)의 NFR 요구사항을 위한 질문입니다.
각 질문의 [Answer]: 태그 뒤에 선택지 문자를 입력해주세요.

---

## Question 1
주문 생성 API의 목표 응답 시간은?

A) 1초 이내
B) 2초 이내
C) 500ms 이내
D) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
같은 테이블에서 동시에 여러 주문이 들어올 경우 처리 방식은?

A) 모두 허용 (각각 별도 주문으로 생성)
B) 직렬 처리 (한 번에 하나씩)
C) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
SSE 이벤트 발행이 실패했을 때 주문 자체는 어떻게 처리해야 하나요?

A) 주문은 성공 처리 (SSE 실패는 무시)
B) 주문도 롤백 (SSE 발행 필수)
C) Other (please describe after [Answer]: tag below)

[Answer]: C. A와 B에 어떤 영향이 있나요?

## Question 4
주문 내역 조회 시 한 번에 반환할 최대 주문 수는?

A) 제한 없음 (현재 세션 전체)
B) 최대 50건 (페이징)
C) 최대 100건 (페이징)
D) Other (please describe after [Answer]: tag below)

[Answer]: B
