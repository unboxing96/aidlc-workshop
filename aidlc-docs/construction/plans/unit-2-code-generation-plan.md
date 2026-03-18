# Unit 2: Code Generation Plan

## Backend

### Step 1: Repository
- [ ] 1-1. `menu/MenuRepository.java` — findByCategoryIdOrderByDisplayOrderAsc, findAllByOrderByDisplayOrderAsc
- [ ] 1-2. `menu/CategoryRepository.java` — existsByName, findAllByOrderByDisplayOrderAsc

### Step 2: DTO
- [ ] 2-1. `menu/dto/CreateCategoryRequest.java`
- [ ] 2-2. `menu/dto/CategoryResponse.java`
- [ ] 2-3. `menu/dto/CreateMenuRequest.java`
- [ ] 2-4. `menu/dto/UpdateMenuRequest.java`
- [ ] 2-5. `menu/dto/MenuResponse.java`
- [ ] 2-6. `menu/dto/MenuOrderRequest.java`
- [ ] 2-7. `menu/dto/ImageUploadResponse.java`

### Step 3: Service
- [ ] 3-1. `menu/MenuService.java`
- [ ] 3-2. `menu/ImageService.java`

### Step 4: Controller
- [ ] 4-1. `menu/MenuController.java`
- [ ] 4-2. `menu/ImageController.java`

### Step 5: SecurityConfig 수정
- [ ] 5-1. GET /api/menus/**, GET /api/categories/**, /api/images/** permitAll 추가

### Step 6: Backend Unit Tests
- [ ] 6-1. `MenuServiceTest.java`
- [ ] 6-2. `ImageServiceTest.java`

## Frontend

### Step 7: API Services
- [ ] 7-1. `services/menuApi.ts`
- [ ] 7-2. `services/imageApi.ts`

### Step 8: Components
- [ ] 8-1. `components/MenuCard.tsx`
- [ ] 8-2. `components/CategoryNav.tsx`

### Step 9: Pages
- [ ] 9-1. `pages/customer/CustomerMenuPage.tsx`
- [ ] 9-2. `pages/admin/AdminMenuManagePage.tsx`

### Step 10: Router 수정
- [ ] 10-1. `App.tsx` — /table/:token, /admin/menus에 실제 컴포넌트 연결

### Step 11: Frontend Unit Tests
- [ ] 11-1. `test/components/MenuCard.test.tsx`
- [ ] 11-2. `test/components/CategoryNav.test.tsx`
- [ ] 11-3. `test/services/menuApi.test.ts`
