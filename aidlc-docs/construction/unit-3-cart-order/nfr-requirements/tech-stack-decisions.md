# Tech Stack Decisions - Unit 3: 장바구니 및 주문

## 결정: Unit 0 공통 Tech Stack 그대로 사용

| Layer | 기술 | 용도 |
|-------|------|------|
| Backend | Spring Boot 3.x + JPA | 주문 API, 데이터 접근 |
| Database | H2 (파일 모드) | 주문/주문항목 저장 |
| Frontend | React 18 + TypeScript | 장바구니/주문 UI |
| State | Zustand (persist) | 장바구니 로컬 상태 |
| HTTP | Axios | API 호출 |
| Styling | Tailwind CSS | UI 스타일링 |

## 추가 의존성
- 없음 (Unit 0 기반으로 충분)
