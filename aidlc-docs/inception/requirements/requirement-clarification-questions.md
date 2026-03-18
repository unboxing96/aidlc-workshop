# Requirements Clarification Questions

답변 분석 결과, 아래 항목들에 대한 추가 명확화가 필요합니다.

---

## Ambiguity 1: 프론트엔드 기술 스택 (Q1)
A와 B 중 추천을 요청하셨습니다. 프로젝트 특성을 고려한 추천 의견을 드립니다:

- **React (Vite + TypeScript)**: 이 프로젝트에 더 적합합니다. 테이블오더는 SPA(Single Page Application)로 충분하며, SSR(Server-Side Rendering)이 필요 없습니다. Vite는 빌드가 빠르고 설정이 간단합니다. Spring Boot 백엔드와 완전 분리된 프론트엔드로 운영됩니다.
- **Next.js**: SSR/SSG가 필요한 SEO 중심 서비스에 적합하지만, 태블릿 전용 주문 시스템에는 과도한 구성입니다.

### Clarification Question 1
위 분석을 바탕으로 프론트엔드 기술 스택을 확정해 주세요.

A) React (Vite + TypeScript) — 추천: SPA로 충분, 간단한 구성
B) Next.js (TypeScript) — SSR이 필요한 경우
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

## Ambiguity 2: 로컬 데이터베이스 선택 (Q3)
"local DB"로 진행하겠다고 하셨습니다. Spring Boot와 함께 사용할 로컬 DB를 확정해 주세요.

### Clarification Question 2
어떤 로컬 데이터베이스를 사용하시겠습니까?

A) H2 Database (인메모리/파일 기반, Spring Boot 내장 지원, 개발/테스트에 최적)
B) SQLite (파일 기반, 경량)
C) PostgreSQL 로컬 설치
D) MySQL 로컬 설치
X) Other (please describe after [Answer]: tag below)

[Answer]: A
