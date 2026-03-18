# Unit 1: NFR Design Patterns

## 1. JwtAuthFilter (OncePerRequestFilter)

**적용 경로**: /api/tables/**, /api/admin/** 중 JWT 보호 엔드포인트

**처리 흐름**:
```
Request → Authorization 헤더 확인
  → 없거나 "Bearer " 아님 → chain.doFilter (다음 필터로 위임)
  → "Bearer " 추출 → JwtUtil.isValid(token)
    → 유효 → extractUsername → UsernamePasswordAuthenticationToken 생성 → SecurityContextHolder 설정 → chain.doFilter
    → 무효 → chain.doFilter (SecurityContext 미설정 → Spring Security가 403/401 처리)
```

**설계 원칙**:
- 필터 자체에서 401을 직접 반환하지 않음 — SecurityContext 미설정으로 Spring Security에 위임
- 공개 API(/api/admin/register, /api/admin/login)는 SecurityConfig에서 permitAll 처리

## 2. TableTokenFilter (OncePerRequestFilter)

**적용 경로**: 고객 API (향후 Unit 2, 3에서 사용하는 /api/menus, /api/orders 등)

**처리 흐름**:
```
Request → X-Table-Token 헤더 확인
  → 없음 → chain.doFilter (다음 필터로 위임)
  → 있음 → TableRepository.findByAccessToken(token)
    → 존재 → request attribute에 tableId, tableNumber 설정 → chain.doFilter
    → 미존재 → 401 Unauthorized 응답 직접 반환
```

**설계 원칙**:
- 테이블 토큰은 JWT가 아닌 UUID이므로 DB 조회 필요
- request.setAttribute("tableId", ...) 로 컨트롤러에서 접근 가능

## 3. SecurityConfig 필터 체인

```
SecurityFilterChain:
  csrf: disabled (REST API)
  sessionManagement: STATELESS
  
  필터 순서:
    JwtAuthFilter → UsernamePasswordAuthenticationFilter 앞
    TableTokenFilter → JwtAuthFilter 앞
  
  권한 설정:
    permitAll:
      POST /api/admin/register
      POST /api/admin/login
      POST /api/tables/auth
      /h2-console/**
    
    authenticated (JWT):
      POST /api/tables
      GET /api/tables
      POST /api/tables/{id}/complete
      GET /api/tables/{id}/history
    
    나머지: permitAll (다른 Unit의 고객 API는 TableTokenFilter에서 처리)
```

## 4. LoginAttemptService 패턴

**데이터 구조**:
```java
ConcurrentHashMap<String, LoginAttempt>
  LoginAttempt: { int attempts, LocalDateTime lastFailure }
```

**잠금 판정**:
```
isBlocked(username):
  attempt = map.get(username)
  if attempt == null → false
  if attempt.attempts < 5 → false
  if now - attempt.lastFailure > 15분 → map.remove(username), false
  → true (잠금)
```

**스레드 안전성**: ConcurrentHashMap + 불변 판정 로직으로 동시 접근 안전

## 5. 에러 응답 패턴

| 상황 | HTTP Status | Error Code | Message |
|------|------------|------------|---------|
| JWT 없음/무효 (보호 API) | 401 | UNAUTHORIZED | 인증이 필요합니다 |
| 테이블 토큰 무효 | 401 | INVALID_TABLE_TOKEN | 유효하지 않은 테이블 토큰입니다 |
| 계정 잠금 | 423 | ACCOUNT_LOCKED | 로그인 시도 초과. 15분 후 재시도하세요 |
| 로그인 실패 | 401 | AUTH_FAILED | 사용자명 또는 비밀번호가 올바르지 않습니다 |
| 활성 세션 없음 | 400 | NO_ACTIVE_SESSION | 활성 세션이 없습니다 |
