# Unit of Work Plan

## Questions

---

### Question 1
작업 단위(Unit of Work) 분해 방식은 어떻게 하시겠습니까?

이 프로젝트는 모놀리식 구조(Spring Boot 1개 + React 1개)입니다. Construction Phase에서 각 Unit별로 Functional Design → NFR → Code Generation을 순차 실행합니다.

A) 레이어 기반 — Unit 1: Backend (Spring Boot 전체), Unit 2: Frontend (React 전체). 백엔드를 먼저 완성한 후 프론트엔드 구현.
B) 기능 도메인 기반 — Unit 1: 테이블/인증, Unit 2: 메뉴, Unit 3: 주문/SSE, Unit 4: 관리자 대시보드. 각 도메인별로 BE+FE를 함께 구현.
C) 단일 Unit — 전체를 1개 Unit으로 처리. 한번에 설계하고 한번에 구현.
X) Other (please describe after [Answer]: tag below)

[Answer]: X. 5명의 Unit으로 분리해 줘. 각 도메인별로 BE+FE를 함께 구현 예정.

---

## Execution Plan

### Phase 1: Unit Definition
- [x] Unit 정의 및 책임 범위 설정
- [x] `unit-of-work.md` 생성

### Phase 2: Dependency Matrix
- [x] Unit 간 의존성 분석
- [x] 실행 순서 결정
- [x] `unit-of-work-dependency.md` 생성

### Phase 3: Story Mapping
- [x] 24개 User Story를 Unit에 매핑
- [x] 매핑 완전성 검증 (모든 스토리 할당 확인)
- [x] `unit-of-work-story-map.md` 생성
