# Application Design Plan

## Questions

---

### Question 1
Spring Boot 백엔드의 레이어 구조는 어떻게 하시겠습니까?

A) 3-Layer: Controller → Service → Repository (표준 구조)
B) Hexagonal Architecture: Port/Adapter 패턴 (도메인 중심)
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

### Question 2
프론트엔드 상태 관리 방식은?

A) React Context API + useReducer (외부 라이브러리 없이 간결하게)
B) Zustand (경량 상태 관리 라이브러리)
C) Redux Toolkit (대규모 상태 관리)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

---

### Question 3
프론트엔드 HTTP 클라이언트는?

A) Axios
B) Fetch API (내장)
C) TanStack Query (React Query) + Fetch
X) Other (please describe after [Answer]: tag below)

[Answer]: A

---

### Question 4
프론트엔드 UI 컴포넌트 라이브러리는?

A) Tailwind CSS (유틸리티 기반, 커스텀 컴포넌트 직접 구현)
B) Material UI (MUI) (풍부한 기성 컴포넌트)
C) Ant Design (관리자 UI에 강점)
D) shadcn/ui + Tailwind CSS (재사용 가능한 컴포넌트 + 유틸리티)
X) Other (please describe after [Answer]: tag below)

[Answer]: D

---

## Execution Plan

### Phase 1: Component Identification
- [x] Backend 컴포넌트 식별 (Controller, Service, Repository 레이어별)
- [x] Frontend 컴포넌트 식별 (Pages, Components, Hooks, Services)
- [x] `components.md` 생성

### Phase 2: Component Methods
- [x] Backend API 엔드포인트 및 서비스 메서드 시그니처 정의
- [x] Frontend 주요 hooks/services 인터페이스 정의
- [x] `component-methods.md` 생성

### Phase 3: Service Layer Design
- [x] Backend 서비스 간 오케스트레이션 패턴 정의
- [x] SSE 이벤트 흐름 설계
- [x] `services.md` 생성

### Phase 4: Dependency & Communication
- [x] Frontend ↔ Backend API 통신 패턴
- [x] SSE 실시간 통신 흐름
- [x] 컴포넌트 간 의존성 매트릭스
- [x] `component-dependency.md` 생성

### Phase 5: Consolidation
- [x] `application-design.md` 통합 문서 생성
- [x] 설계 일관성 검증
