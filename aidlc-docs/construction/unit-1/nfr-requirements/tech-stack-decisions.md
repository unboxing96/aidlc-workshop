# Unit 1: Tech Stack Decisions

## 기존 결정 (Unit 0에서 확정, 변경 없음)

| 영역 | 기술 | 근거 |
|------|------|------|
| JWT 라이브러리 | jjwt 0.12.5 | build.gradle.kts에 이미 포함 |
| 비밀번호 해싱 | Spring Security BCryptPasswordEncoder | SecurityConfig에 Bean 정의됨 |
| DB | H2 file-based | application.yml에 설정됨 |
| ORM | Spring Data JPA | 기존 Entity 구조 활용 |

## Unit 1 추가 결정

| 영역 | 결정 | 근거 |
|------|------|------|
| 인증 필터 | OncePerRequestFilter 상속 | Spring Security 표준 패턴 |
| 로그인 시도 관리 | ConcurrentHashMap (인메모리) | PoC 수준, 서버 재시작 시 초기화 허용 |
| 트랜잭션 관리 | Spring @Transactional | 이용 완료 원자성 보장 |
| Validation | jakarta.validation 어노테이션 | spring-boot-starter-validation 이미 포함 |
