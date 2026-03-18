# Build and Test Summary - Unit 3: 장바구니 및 주문

## Backend Build & Test

### Build
- **Command**: `cd table-order/backend && ./gradlew build`
- **Result**: ✅ BUILD SUCCESSFUL
- **Java**: OpenJDK 21, Spring Boot 3.2.5, Gradle 8.7

### Unit Tests
| Test Class | Tests | Result |
|-----------|-------|--------|
| OrderServiceTest | 5 | ✅ All Passed |
| OrderControllerTest | 3 | ✅ All Passed |
| JwtUtilTest (Unit 0) | - | ✅ Passed |
| GlobalExceptionHandlerTest (Unit 0) | - | ✅ Passed |

### Test Details - OrderServiceTest
- ✅ createOrder_성공_세션자동시작
- ✅ createOrder_존재하지않는테이블
- ✅ createOrder_존재하지않는메뉴
- ✅ getOrdersByTable_세션없으면빈결과
- ✅ getOrdersByTable_성공

### Test Details - OrderControllerTest
- ✅ createOrder_성공 (201 Created)
- ✅ createOrder_빈항목_400 (Validation)
- ✅ getOrdersByTable_성공 (200 OK)

---

## Frontend Build & Test

### Test
- **Command**: `cd table-order/frontend && npx vitest run`
- **Result**: ✅ 7 test files, 25 tests passed

### Unit Tests
| Test File | Tests | Result |
|-----------|-------|--------|
| cartStore.test.ts (Unit 0) | 6 | ✅ All Passed |
| CartItem.test.tsx | 5 | ✅ All Passed |
| StatusBadge.test.tsx | 3 | ✅ All Passed |
| CustomerCartPage.test.tsx | 3 | ✅ All Passed |
| CustomerOrderPage.test.tsx | 3 | ✅ All Passed |
| CustomerOrderHistoryPage.test.tsx | 3 | ✅ All Passed |
| orderApi.test.ts | 2 | ✅ All Passed |

---

## Summary
| Layer | Build | Tests | Passed | Failed |
|-------|-------|-------|--------|--------|
| Backend | ✅ | 8+ | 8+ | 0 |
| Frontend | ✅ | 25 | 25 | 0 |
| **Total** | **✅** | **33+** | **33+** | **0** |
