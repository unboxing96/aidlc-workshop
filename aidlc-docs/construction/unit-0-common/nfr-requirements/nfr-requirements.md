# NFR Requirements - Unit 0: 공통 기반

## 성능
- H2 파일 기반 모드 (데이터 영속성 보장)
- SSE 연결 타임아웃: 30분 (자동 재연결)
- SSE 이벤트 전달: 2초 이내

## 인증
- 관리자: JWT 토큰 (16시간 만료)
- 태블릿: accessToken (UUID, 만료 없음)
- 비밀번호: bcrypt 해싱
- 로그인 시도 제한: 5회 실패 시 15분 잠금

## 데이터 무결성
- 주문 금액 서버 측 재계산 (클라이언트 값 신뢰하지 않음)
- 주문 항목 스냅샷 (메뉴 변경 시 기존 주문 영향 없음)
- 주문 상태 정방향 전이만 허용

## 에러 처리
- GlobalExceptionHandler로 공통 에러 응답 형식
- 프로덕션 에러 응답에 스택 트레이스 미포함

## CORS
- 프론트엔드 origin 허용 (localhost:5173)
- 관리자 API: JWT 인증 필수
- 고객 API: accessToken 인증
