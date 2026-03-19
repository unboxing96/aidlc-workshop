# Unit 1: 도메인 엔티티

## Unit 1이 사용하는 엔티티 (Unit 0에서 정의됨)

### AdminEntity
- id(Long PK), username(String UNIQUE), password(String), createdAt(LocalDateTime)
- Unit 1 사용: 회원가입 저장, 로그인 조회

### TableEntity
- id(Long PK), tableNumber(int UNIQUE), accessToken(String UNIQUE), currentSessionId(String nullable), createdAt(LocalDateTime)
- Unit 1 사용: 테이블 등록, 토큰 인증, 세션 리셋

### OrderEntity (읽기/수정/삭제 — Unit 1에서 이용 완료 시)
- 이용 완료 시 해당 테이블+세션의 주문 조회, 상태 변경, 삭제

### OrderHistoryEntity (쓰기 — Unit 1에서 이용 완료 시)
- 이용 완료 시 주문 데이터를 히스토리로 변환 저장

## 엔티티 관계 (Unit 1 관점)

```
AdminEntity (독립)

TableEntity --1:N--> OrderEntity (tableId + sessionId로 조회)
TableEntity --1:N--> OrderHistoryEntity (tableId로 조회)
OrderEntity --> OrderHistoryEntity (이용 완료 시 변환)
```

## 테이블 세션 상태 전이

```
[세션 없음] --첫 주문(Unit 3)--> [세션 활성: currentSessionId = UUID]
[세션 활성] --이용 완료(Unit 1)--> [세션 없음: currentSessionId = null]
```
