---
inclusion: always
---
# Git Branch Strategy

## Branch 구조

```
main                          # 프로덕션 브랜치
├── develop                   # 통합 개발 브랜치
│   ├── feature/unit-0        # Unit 0: 공통 기반
│   ├── feature/unit-1        # Unit 1: 테이블/인증
│   ├── feature/unit-2        # Unit 2: 메뉴
│   ├── feature/unit-3        # Unit 3: 장바구니/주문
│   ├── feature/unit-4        # Unit 4: SSE
│   └── feature/unit-5        # Unit 5: 관리자 대시보드
```

## 규칙

### Branch 네이밍
- Feature: `feature/unit-{N}` (Unit별 작업)
- Bugfix: `bugfix/{간단한-설명}`
- Hotfix: `hotfix/{간단한-설명}`

### 워크플로우
1. `main` → `develop` 브랜치 생성
2. `develop` → `feature/unit-0` 생성 → Unit 0 작업 → `develop`에 PR/merge
3. `develop` → `feature/unit-{1~5}` 5개 동시 생성 → 병렬 작업 → 각각 `develop`에 PR/merge
4. 통합 테스트 완료 후 `develop` → `main` merge

### Commit 메시지
- `feat:` 새 기능
- `fix:` 버그 수정
- `chore:` 설정, 문서 등
- `refactor:` 리팩토링
- `test:` 테스트 추가/수정

### 병렬 작업 시 충돌 방지
- 각 Unit은 자기 도메인 패키지만 수정 (Unit 0 공통 코드는 수정 금지)
- 공통 코드 수정 필요 시 `develop`에서 별도 브랜치로 작업 후 merge, 각 feature 브랜치에서 rebase
