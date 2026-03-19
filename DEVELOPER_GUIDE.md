# 테이블오더 프로젝트 - 개발자 작업 가이드

## 1. 프로젝트 클론 및 초기 설정

```bash
git clone https://github.com/unboxing96/aidlc-workshop.git
cd aidlc-workshop
```

## 2. 자신의 Unit 브랜치로 이동

| 담당자 | 브랜치 | 작업 내용 |
|--------|--------|----------|
| 개발자 1 | feat/unit1 | 테이블 인증 & 관리자 로그인 |
| 개발자 2 | feat/unit2 | 메뉴/카테고리 관리 |
| 개발자 3 | feat/unit3 | 장바구니 & 주문 |
| 개발자 4 | feat/unit4 | SSE 실시간 통신 |
| 개발자 5 | feat/unit5 | 관리자 대시보드 |

```bash
# 자신의 브랜치로 이동 (예: unit1 담당자)
git checkout feat/unit1
```

## 3. 로컬 환경 확인

```bash
# Backend 빌드 확인 (Java 17+ 필요)
cd table-order/backend
./gradlew build

# Frontend 의존성 설치 및 빌드 확인 (Node 18+ 필요)
cd ../frontend
npm install
npm run build
```

## 4. 작업 범위 확인

자신의 Unit 설계 문서를 반드시 읽고 시작하세요:

```
aidlc-docs/construction/plans/unit-{N}-execution-plan.md     ← 실행 계획 (필독)
aidlc-docs/construction/plans/unit-{N}-*-plan.md             ← 세부 계획
aidlc-docs/construction/unit-{N}/                            ← 설계 문서
```

## 5. Git 작업 규칙 (충돌 방지 핵심)

### ⚠️ 절대 수정하지 말 것 (공통 영역)
- `entity/` 패키지 — 공통 Entity는 Unit 0에서 완료됨
- `common/` 패키지 — 공통 DTO, 예외 처리
- `config/SecurityConfig.java` — 수정 필요 시 팀 리드에게 요청
- `config/JwtUtil.java`, `config/WebConfig.java`
- `sse/SseEventType.java`, `sse/SseEvent.java`
- `frontend/src/types/index.ts` — 공통 타입
- `frontend/src/services/api.ts` — Axios 설정
- `frontend/src/stores/cartStore.ts` — 장바구니 store

### ✅ 자신의 작업 영역만 수정
- Backend: `{자기 패키지}/` 안에서만 파일 생성 (Controller, Service, Repository, DTO)
- Frontend: 자기 Unit의 pages, components, hooks, services만 생성
- 테스트: `src/test/` 아래 자기 Unit 테스트만 생성

### 커밋 컨벤션
```
feat: Unit {N} - {기능 설명}
fix: Unit {N} - {버그 수정 설명}
test: Unit {N} - {테스트 추가 설명}
```

## 6. 작업 완료 후 PR 생성

```bash
# 작업 커밋
git add -A
git commit -m "feat: Unit {N} - {설명}"

# 원격에 푸시
git push origin feat/unit{N}

# GitHub에서 PR 생성: feat/unit{N} → develop
```

### PR 체크리스트
- [ ] 자기 패키지 외 파일을 수정하지 않았는가?
- [ ] Backend `./gradlew build` 통과하는가?
- [ ] Frontend `npm run build` 통과하는가?
- [ ] 단위 테스트를 작성했는가?

## 7. develop 최신 반영 (다른 팀원 PR이 먼저 머지된 경우)

```bash
git checkout feat/unit{N}
git pull origin develop --rebase
# 충돌 발생 시 해결 후:
git add .
git rebase --continue
git push -f origin feat/unit{N}
```

## 8. 프로젝트 구조

```
table-order/
├── backend/src/main/java/com/tableorder/
│   ├── entity/          ← [공통] 수정 금지
│   ├── common/          ← [공통] 수정 금지
│   ├── config/          ← [공통] 수정 금지
│   ├── sse/             ← [공통] 수정 금지
│   ├── auth/            ← Unit 1 전용
│   ├── table/           ← Unit 1 전용
│   ├── menu/            ← Unit 2 전용
│   ├── order/           ← Unit 3 전용
│   └── dashboard/       ← Unit 5 전용
├── frontend/src/
│   ├── types/           ← [공통] 수정 금지
│   ├── services/api.ts  ← [공통] 수정 금지
│   ├── stores/          ← [공통] 수정 금지
│   ├── pages/customer/  ← Unit 1(Setup), 2(Menu), 3(Cart/Order)
│   ├── pages/admin/     ← Unit 1(Login), 2(MenuManage), 5(Dashboard)
│   ├── components/      ← 각 Unit에서 필요한 컴포넌트 생성
│   ├── hooks/           ← 각 Unit에서 필요한 hook 생성
│   └── services/        ← 각 Unit에서 필요한 API 서비스 생성
└── aidlc-docs/          ← 설계 문서 (읽기 전용)
```
