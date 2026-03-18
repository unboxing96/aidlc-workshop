# Business Logic Model - Unit 0: 공통 기반

Unit 0는 비즈니스 로직을 직접 구현하지 않습니다.
공통 기반으로서 다음을 제공합니다:

## 제공 항목
1. **공통 Entity**: 7개 Entity + 1개 Enum (domain-entities.md 참조)
2. **공통 Business Rules**: 검증 규칙, 상태 전이, 에러 코드 (business-rules.md 참조)
3. **프로젝트 설정**: Spring Boot + React 초기화, 의존성, CORS, H2, Security
4. **공통 DTO/Response**: API 요청/응답 객체
5. **공통 예외 처리**: GlobalExceptionHandler, 커스텀 예외 클래스
6. **SSE 이벤트 타입**: 4개 이벤트 타입 enum
7. **Frontend 공통 타입**: TypeScript 인터페이스, API 클라이언트 설정
