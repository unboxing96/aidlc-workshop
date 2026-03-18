# Application Design - 통합 문서

## 기술 스택 확정

| 영역 | 기술 | 결정 근거 |
|------|------|----------|
| Frontend | React (Vite + TypeScript) | SPA, 태블릿 전용 |
| UI Library | shadcn/ui + Tailwind CSS | 재사용 컴포넌트 + 유틸리티 |
| State Management | Zustand | 경량, 간결한 API |
| HTTP Client | Axios | interceptor 지원, 에러 핸들링 |
| Backend | Java + Spring Boot | 3-Layer Architecture |
| Database | H2 (File-based) | 로컬 실행, Spring Boot 내장 |
| Real-time | SSE (Server-Sent Events) | 단방향 실시간 통신 |
| Auth | JWT | 관리자 인증 |
| Image Storage | Local File System | 로컬 배포 |

## 아키텍처 개요

```
+------------------------------------------+
|            Frontend (React SPA)          |
|  +----------+  +----------------------+ |
|  | Customer |  |       Admin          | |
|  | Pages    |  | Pages                | |
|  +----------+  +----------------------+ |
|  | Zustand Store | Axios API Services  | |
+------------------------------------------+
          |  HTTP/REST        | SSE
          v                   v
+------------------------------------------+
|         Backend (Spring Boot)            |
|  +------------------------------------+ |
|  |          Controllers               | |
|  +------------------------------------+ |
|  |          Services                  | |
|  |  +----------+  +----------------+ | |
|  |  | Business |  | SseEmitter     | | |
|  |  | Logic    |  | Service        | | |
|  |  +----------+  +----------------+ | |
|  +------------------------------------+ |
|  |          Repositories (JPA)        | |
+------------------------------------------+
          |
          v
+------------------------------------------+
|         H2 Database (File-based)         |
+------------------------------------------+
```

## 컴포넌트 요약

- **Backend**: 6 Controllers, 6 Services, 7 Repositories
- **Frontend**: 9 Pages, 6 Shared Components, 4 Hooks, 5 API Services
- **SSE Events**: 4 이벤트 타입 (ORDER_CREATED, ORDER_STATUS_CHANGED, ORDER_DELETED, TABLE_SESSION_COMPLETED)

## 핵심 설계 결정

1. **고객 인증 없음**: 토큰 기반 태블릿 연결, 고객 로그인 절차 없음
2. **SSE 양방향 적용**: 관리자(전체 이벤트) + 고객(테이블별 이벤트)
3. **장바구니 클라이언트 관리**: Zustand + localStorage persist
4. **테이블 세션 독립**: 인증 토큰과 테이블 세션(주문 그룹화) 분리

## 상세 문서 참조
- [components.md](components.md) — 컴포넌트 정의
- [component-methods.md](component-methods.md) — 메서드 시그니처
- [services.md](services.md) — 서비스 오케스트레이션
- [component-dependency.md](component-dependency.md) — 의존성 관계
