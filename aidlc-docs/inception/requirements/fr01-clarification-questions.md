# FR-01 구체화 질문: 테이블 태블릿 자동 로그인 및 세션 관리

FR-01의 인증/세션 흐름을 구체화하기 위해 아래 질문에 답변해 주세요.

---

## Question 1
테이블 태블릿의 초기 설정은 어디서 수행하나요?

A) 관리자 대시보드(관리자 UI)에서 테이블을 등록하면, 태블릿에서는 테이블 번호 + 비밀번호만 입력하여 로그인
B) 태블릿 자체에서 매장 식별자 + 테이블 번호 + 비밀번호를 모두 입력하여 초기 설정
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 2
"매장 식별자"는 어떤 형태인가요? (단일 매장이지만 테이블 인증 시 매장을 식별하는 값)

A) 매장 코드 (예: "STORE001" 같은 문자열, 관리자가 회원가입 시 설정)
B) 매장 식별자 불필요 (단일 매장이므로 테이블 번호 + 비밀번호만으로 인증)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 3
테이블 비밀번호는 누가 설정하나요?

A) 관리자가 관리자 UI에서 테이블 등록 시 비밀번호를 설정
B) 시스템이 테이블 등록 시 자동 생성
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 4
태블릿 자동 로그인의 토큰 관리 방식은?

A) JWT 토큰 발급 → localStorage 저장 → 만료 시 저장된 credentials로 자동 재로그인
B) JWT 토큰 발급 → localStorage 저장 → 만료 시 수동 재로그인 필요
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 5
테이블 세션(주문 그룹화용)과 인증 세션(로그인 유지용)의 관계는?

A) 독립적 — 인증 세션은 16시간 유지, 테이블 세션은 관리자가 "이용 완료" 시 종료. 인증은 유지되면서 새 테이블 세션 시작 가능
B) 연동 — 테이블 세션 종료 시 인증 세션도 함께 종료
X) Other (please describe after [Answer]: tag below)

[Answer]: A
