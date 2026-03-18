# Unit 2: 메뉴 - Functional Design

## 1. API 엔드포인트

| Method | Path | Auth | 설명 |
|--------|------|------|------|
| GET | /api/categories | 없음 | 카테고리 목록 (displayOrder순) |
| POST | /api/categories | JWT | 카테고리 등록 |
| GET | /api/menus | 없음 | 전체 메뉴 (카테고리별 필터 가능) |
| POST | /api/menus | JWT | 메뉴 등록 |
| PUT | /api/menus/{id} | JWT | 메뉴 수정 |
| DELETE | /api/menus/{id} | JWT | 메뉴 삭제 |
| PUT | /api/menus/order | JWT | 메뉴 순서 변경 |
| POST | /api/images | JWT | 이미지 업로드 |

## 2. 비즈니스 로직

### MenuService
- **getCategories()**: 전체 카테고리 displayOrder순 반환
- **createCategory(name)**: 이름 중복 검증 → 저장 (displayOrder = 마지막+1)
- **getMenus(categoryId?)**: categoryId 있으면 필터, 없으면 전체. displayOrder순
- **createMenu(request)**: 카테고리 존재 검증 → 가격 검증 → 저장 (displayOrder = 해당 카테고리 마지막+1)
- **updateMenu(id, request)**: 존재 검증 → 필드 업데이트
- **deleteMenu(id)**: 존재 검증 → 삭제
- **updateMenuOrder(List<{id, displayOrder}>)**: 일괄 displayOrder 업데이트

### ImageService
- **upload(MultipartFile)**: 확장자 검증 → UUID 파일명 생성 → 로컬 저장 → URL 반환
- 서빙은 WebConfig의 ResourceHandler가 처리 (이미 Unit 0에서 설정됨)

## 3. DTO

### Request
- CreateCategoryRequest: @NotBlank name
- CreateMenuRequest: @NotBlank name, @Min(0) price, description(선택), imageUrl(선택), @NotNull categoryId
- UpdateMenuRequest: name(선택), price(선택), description(선택), imageUrl(선택), categoryId(선택)
- MenuOrderRequest: List<MenuOrderItem> — {id, displayOrder}

### Response
- CategoryResponse: id, name, displayOrder
- MenuResponse: id, name, price, description, imageUrl, categoryId, displayOrder
- ImageUploadResponse: imageUrl

## 4. 비즈니스 규칙

| 규칙 | 설명 |
|------|------|
| BR-MENU-01 | 메뉴명 1~50자, 필수 |
| BR-MENU-02 | 가격 0 이상 정수, 필수 |
| BR-MENU-03 | 설명 최대 500자, 선택 |
| BR-MENU-04 | 이미지 없으면 null (프론트에서 플레이스홀더 처리) |
| BR-MENU-05 | 카테고리 존재하지 않으면 NotFoundException |
| BR-MENU-06 | 메뉴 삭제 시 이미지 파일은 삭제하지 않음 (PoC) |
| BR-CAT-01 | 카테고리명 고유, 1~30자 |
| BR-IMG-01 | 허용 확장자: jpg, jpeg, png, gif, webp |
| BR-IMG-02 | 최대 5MB |
| BR-IMG-03 | UUID 파일명으로 저장 (충돌 방지) |

## 5. 프론트엔드 컴포넌트

### CustomerMenuPage (/table/:token)
- 카테고리 탭 네비게이션 (CategoryNav)
- 메뉴 카드 그리드 (MenuCard)
- 카테고리 선택 시 해당 메뉴 필터링
- 메뉴 카드에 장바구니 추가 버튼 (cartStore.addItem 호출)

### AdminMenuManagePage (/admin/menus)
- 카테고리 관리 (등록)
- 메뉴 목록 (카테고리별)
- 메뉴 등록/수정 폼 (모달 또는 인라인)
- 메뉴 삭제 (확인 팝업)
- 이미지 업로드
- 메뉴 순서 변경 (위/아래 버튼)

### Components
- MenuCard: 이미지, 이름, 가격, 설명, 추가 버튼
- CategoryNav: 카테고리 탭 목록, 선택 상태

### Hooks & Services
- menuApi: getCategories, createCategory, getMenus, createMenu, updateMenu, deleteMenu, updateMenuOrder
- imageApi: upload
