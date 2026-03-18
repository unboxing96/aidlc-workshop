# Tech Stack Decisions - Unit 5: 관리자 대시보드

## 상속: Unit 0 전체 Tech Stack 사용

## Unit 5 추가 사용 기술

| 기술 | 용도 |
|------|------|
| EventSource API (브라우저 내장) | SSE 클라이언트 |
| React hooks (useEffect, useCallback) | SSE 연결 관리 |
| Tailwind CSS Grid | 대시보드 그리드 레이아웃 |
| shadcn/ui Dialog | 확인 팝업, 모달 |
| shadcn/ui Badge | 주문 상태 표시 |
| shadcn/ui Toast | 성공/실패 알림 |

## 신규 의존성 없음
Unit 0에서 정의된 기술 스택만으로 구현 가능. 추가 라이브러리 불필요.
