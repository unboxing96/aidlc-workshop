# NFR Design Patterns - Unit 0: 공통 기반

## 인증 패턴
- **관리자**: JWT Filter → SecurityFilterChain에 등록, `/api/admin/**` 및 관리자 전용 엔드포인트 보호
- **태블릿**: accessToken을 `X-Table-Token` 헤더로 전송, 커스텀 필터로 검증
- **공개 API**: 메뉴 조회 등 인증 불필요 엔드포인트는 permitAll

## 에러 처리 패턴
- `@RestControllerAdvice` GlobalExceptionHandler
- 커스텀 예외: BusinessException (base), NotFoundException, DuplicateException, InvalidStatusTransitionException
- 공통 에러 응답: `{ code, message, timestamp }`

## SSE 패턴
- SseEmitter를 ConcurrentHashMap으로 관리
- 관리자 emitter: `adminEmitters` (Set)
- 테이블 emitter: `tableEmitters` (Map<Long, Set>)
- 연결 해제 시 자동 정리 (onCompletion, onTimeout, onError 콜백)

## 데이터 접근 패턴
- Spring Data JPA Repository 인터페이스
- `@Transactional` 서비스 레이어에서 트랜잭션 관리
- 테이블 세션 완료 시 트랜잭션으로 원자성 보장 (주문 이력 이동 + 주문 삭제 + 세션 리셋)
