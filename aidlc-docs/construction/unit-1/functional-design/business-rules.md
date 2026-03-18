# Unit 1: 비즈니스 규칙

## 관리자 인증

| 규칙 | 설명 |
|------|------|
| BR-AUTH-01 | username은 고유해야 함 (중복 시 DuplicateException) |
| BR-AUTH-02 | password 최소 4자 이상 |
| BR-AUTH-03 | password는 bcrypt(strength 10)로 해싱 저장 |
| BR-AUTH-04 | 로그인 성공 시 JWT 발급 (16시간 만료) |
| BR-AUTH-05 | 로그인 5회 연속 실패 시 15분 계정 잠금 (인메모리) |
| BR-AUTH-06 | 로그인 성공 시 실패 카운터 초기화 |

## 테이블 관리

| 규칙 | 설명 |
|------|------|
| BR-TABLE-01 | tableNumber는 고유해야 함 (중복 시 DuplicateException) |
| BR-TABLE-02 | 테이블 등록 시 accessToken(UUID v4) 자동 생성 |
| BR-TABLE-03 | accessToken으로 테이블 인증 — 유효하면 tableId, tableNumber 반환 |
| BR-TABLE-04 | 이용 완료 시 활성 세션이 없으면 BusinessException |
| BR-TABLE-05 | 이용 완료 시 미완료 주문(PENDING/PREPARING)은 COMPLETED로 강제 변경 |
| BR-TABLE-06 | 이용 완료 시 모든 주문 → OrderHistory로 이동 후 주문 삭제 |
| BR-TABLE-07 | 이용 완료 후 currentSessionId = null로 리셋 |
| BR-TABLE-08 | 이용 완료 후 고객 화면은 메뉴 유지 (새 세션 자동 전환) |

## 검증 규칙

| 필드 | 검증 |
|------|------|
| username | @NotBlank |
| password | @NotBlank, @Size(min=4) |
| tableNumber | @Min(1) |
| accessToken | @NotBlank |
