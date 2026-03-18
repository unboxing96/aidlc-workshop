# NFR Requirements - Unit 3: 장바구니 및 주문

## 성능
| 항목 | 기준 |
|------|------|
| 주문 생성 API 응답 시간 | 1초 이내 |
| 주문 내역 조회 API 응답 시간 | 1초 이내 |
| 장바구니 조작 (Frontend) | 즉시 (로컬 상태) |

## 동시성
- 같은 테이블 동시 주문: 모두 허용 (각각 별도 주문 생성)
- 주문 번호 유일성: DB unique constraint로 보장

## 데이터 무결성
- totalAmount 서버 측 재계산 (클라이언트 값 무시)
- 주문 항목 스냅샷 (menuName, unitPrice 주문 시점 고정)
- @Transactional로 주문 + 주문항목 + 세션 시작 원자성 보장

## 에러 처리 및 복원력
- 주문 실패 시 장바구니 유지 (Frontend)
- SSE 이벤트 발행: 주문은 성공 처리 + SSE 재시도 5회. 최종 실패 시 로그 기록, 주문은 유지.

## 페이징
- 주문 내역 조회: 최대 50건 페이징 (page, size 파라미터)

## Tech Stack
- Unit 0 공통 tech stack 그대로 사용 (Spring Boot 3.x, JPA, H2, React 18, Zustand, Axios)
- 추가 의존성 없음
