# Tech Stack Decisions - Unit 0: 공통 기반

## Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| Java | 17+ | 런타임 |
| Spring Boot | 3.x | 프레임워크 |
| Spring Web | - | REST API |
| Spring Data JPA | - | ORM |
| Spring Security | - | 인증/인가 |
| H2 Database | - | 데이터베이스 (파일 모드) |
| jjwt | 0.12.x | JWT 토큰 |
| Lombok | - | 보일러플레이트 감소 |
| BCrypt (Spring Security) | - | 비밀번호 해싱 |

## Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18.x | UI 프레임워크 |
| TypeScript | 5.x | 타입 안전성 |
| Vite | 5.x | 빌드 도구 |
| React Router | 6.x | 라우팅 |
| Zustand | 4.x | 상태 관리 |
| Axios | 1.x | HTTP 클라이언트 |
| Tailwind CSS | 3.x | 스타일링 |
| shadcn/ui | latest | UI 컴포넌트 |

## 빌드 도구
| 기술 | 용도 |
|------|------|
| Gradle (Kotlin DSL) | Backend 빌드 |
| npm | Frontend 패키지 관리 |
