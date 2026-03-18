# Requirements Verification Questions

테이블오더 서비스 요구사항을 분석한 결과, 아래 항목들에 대한 명확화가 필요합니다.
각 질문의 `[Answer]:` 태그 뒤에 선택지 알파벳을 입력해 주세요.

---

## Question 1
프론트엔드 기술 스택으로 무엇을 사용하시겠습니까?

A) React (Vite + TypeScript)
B) Next.js (TypeScript)
C) Vue.js (TypeScript)
D) Svelte/SvelteKit (TypeScript)
X) Other (please describe after [Answer]: tag below)

[Answer]: A와 B 중에 추천해서 선택해.

---

## Question 2
백엔드 기술 스택으로 무엇을 사용하시겠습니까?

A) Node.js + Express (TypeScript)
B) Node.js + NestJS (TypeScript)
C) Java + Spring Boot
D) Python + FastAPI
X) Other (please describe after [Answer]: tag below)

[Answer]: C

---

## Question 3
데이터베이스로 무엇을 사용하시겠습니까?

A) PostgreSQL
B) MySQL
C) Amazon DynamoDB
D) MongoDB
X) Other (please describe after [Answer]: tag below)

[Answer]: X. local DB로 진행.

---

## Question 4
배포 환경은 어떻게 하시겠습니까?

A) AWS (EC2/ECS + RDS 등 관리형 서비스)
B) AWS Serverless (Lambda + API Gateway + DynamoDB)
C) Docker Compose 기반 로컬/온프레미스
D) Kubernetes (EKS 또는 자체 클러스터)
X) Other (please describe after [Answer]: tag below)

[Answer]: X. local에 배포할 거야.

---

## Question 5
고객용 인터페이스와 관리자용 인터페이스를 어떻게 구성하시겠습니까?

A) 하나의 프론트엔드 앱에서 라우팅으로 분리
B) 별도의 프론트엔드 앱 2개 (고객용 + 관리자용)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 6
메뉴 이미지 관리는 어떻게 하시겠습니까? (요구사항에 이미지 URL이 명시되어 있습니다)

A) 외부 이미지 URL 직접 입력 (이미지 업로드 기능 없음)
B) 이미지 파일 업로드 → 클라우드 스토리지(S3 등) 저장 → URL 자동 생성
X) Other (please describe after [Answer]: tag below)

[Answer]: X. local 파일 시스템으로 진행.

---

## Question 7
매장(Store) 관리 범위는 어떻게 되나요? MVP에서 지원할 매장 수는?

A) 단일 매장만 지원 (1개 매장 전용)
B) 다중 매장 지원 (여러 매장이 각각 독립적으로 운영)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 8
관리자 계정 관리 범위는 어떻게 되나요?

A) 매장당 1개의 관리자 계정 (사전 생성, 회원가입 없음)
B) 매장당 다수의 관리자 계정 (회원가입 기능 포함)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

---

## Question 9
주문 상태 실시간 업데이트(고객 화면)에 대해 요구사항에 "선택사항"으로 명시되어 있습니다. MVP에 포함하시겠습니까?

A) 포함 (SSE로 고객 화면에서도 주문 상태 실시간 업데이트)
B) 제외 (고객은 페이지 새로고침으로 상태 확인)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 10
메뉴 관리 기능이 MVP 핵심 기능 목록에 명시되어 있지 않습니다. MVP에 메뉴 관리(CRUD)를 포함하시겠습니까?

A) 포함 (관리자가 UI에서 메뉴 CRUD 가능)
B) 제외 (초기 데이터는 DB seed로 투입, 메뉴 관리는 후속 개발)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Question 11: Security Extensions
이 프로젝트에 보안 extension 규칙을 적용하시겠습니까?

A) Yes — 모든 SECURITY 규칙을 blocking constraint로 적용 (프로덕션 수준 애플리케이션에 권장)
B) No — 모든 SECURITY 규칙 건너뜀 (PoC, 프로토타입, 실험적 프로젝트에 적합)
X) Other (please describe after [Answer]: tag below)

[Answer]: B
