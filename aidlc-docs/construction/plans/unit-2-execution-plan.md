# Construction Phase 실행 계획 - Unit 2: 메뉴

## Unit 정보
- **Stories**: US-C03, US-C04, US-A10, US-A11, US-A12, US-A13, US-A14 (7개)
- **담당**: 1명
- **의존**: Unit 0 (공통 기반)

---

## Stage 1: Functional Design

### 비즈니스 로직
- 메뉴 조회: 카테고리별 필터링, displayOrder 순 정렬
- 카테고리 조회: displayOrder 순 정렬
- 메뉴 등록: 필수 필드 검증 + 가격 범위 검증 + 카테고리 존재 검증 → 저장
- 메뉴 수정: 존재 검증 → 필드 업데이트
- 메뉴 삭제: 존재 검증 → 삭제
- 메뉴 순서 변경: 메뉴 ID + displayOrder 목록 받아 일괄 업데이트
- 이미지 업로드: MultipartFile → 로컬 파일 시스템 저장 → URL 반환
- 이미지 서빙: 파일명으로 로컬 파일 조회 → Resource 반환

### 도메인 규칙
- 메뉴명: 1~50자, 필수
- 가격: 0 이상 정수, 필수
- 설명: 최대 500자, 선택
- 이미지: 선택, 없으면 플레이스홀더

---

## Stage 2: NFR Requirements
- 이미지 저장 경로: `./uploads/images/`
- 이미지 파일 크기 제한: 5MB
- 허용 이미지 형식: jpg, jpeg, png, gif, webp

## Stage 3: NFR Design
- ImageService: UUID 파일명으로 저장 (원본 파일명 충돌 방지)
- WebConfig: `/api/images/**` → 로컬 파일 리소스 핸들러 매핑

---

## Stage 4: Code Generation Plan

### Backend
- [ ] MenuController (GET /api/menus, GET /api/categories, POST /api/menus, PUT /api/menus/{id}, DELETE /api/menus/{id}, PUT /api/menus/order)
- [ ] MenuService (getMenusByCategory, getCategories, createMenu, updateMenu, deleteMenu, updateMenuOrder)
- [ ] MenuRepository, CategoryRepository
- [ ] ImageController (POST /api/images, GET /api/images/{filename})
- [ ] ImageService (upload, getImage)
- [ ] Unit Tests: MenuService, ImageService

### Frontend
- [ ] CustomerMenuPage (카테고리 탭 + 메뉴 카드 그리드)
- [ ] AdminMenuManagePage (메뉴 목록 + 등록/수정 폼 + 삭제 + 순서 변경)
- [ ] MenuCard component (이미지, 이름, 가격, 설명, 추가 버튼)
- [ ] CategoryNav component (카테고리 탭 네비게이션)
- [ ] menuApi, imageApi services
- [ ] Unit Tests: MenuCard, CategoryNav, API services
