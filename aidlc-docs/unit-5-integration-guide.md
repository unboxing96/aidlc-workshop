# Unit 5: 관리자 대시보드 - 통합 가이드

## 1. 개요

Unit 5(관리자 대시보드)는 Unit 1, 3, 4와 통합이 필요합니다.
이 문서는 통합 담당자 및 각 Unit 담당자가 참고할 가이드입니다.

## 2. 통합 항목 요약

| 우선순위 | 항목 | Unit 5 파일 | 통합 대상 Unit | 작업 내용 |
|---|---|---|---|---|
| 1 | OrderRepository | `dashboard/OrderRepository.java` | Unit 3 (주문) | 삭제 후 Unit 3 Repository import |
| 2 | TableRepository | `dashboard/TableRepository.java` | Unit 1 (테이블) | 삭제 후 Unit 1 Repository import |
| 3 | SSE 이벤트 발행 | `dashboard/DashboardService.java` | Unit 4 (SSE) | TODO 주석을 실제 코드로 교체 |

## 3. 통합 상세

### 3.1 OrderRepository 통합 (Unit 3)

**현재 상태**: `com.tableorder.dashboard.OrderRepository` (임시)

**통합 작업**:
1. `dashboard/OrderRepository.java` 삭제
2. `DashboardService.java`에서 import 변경:
```java
// 변경 전
import com.tableorder.dashboard.OrderRepository;
// 변경 후
import com.tableorder.order.OrderRepository;  // Unit 3 패키지
```
3. Unit 3의 OrderRepository에 아래 메서드가 있는지 확인:
```java
List<OrderEntity> findBySessionIdOrderByCreatedAtDesc(String sessionId);
List<OrderEntity> findByTableIdAndSessionIdOrderByCreatedAtDesc(Long tableId, String sessionId);
```
4. 없으면 Unit 3 담당자에게 추가 요청

### 3.2 TableRepository 통합 (Unit 1)

**현재 상태**: `com.tableorder.dashboard.TableRepository` (임시)

**통합 작업**:
1. `dashboard/TableRepository.java` 삭제
2. `DashboardService.java`에서 import 변경:
```java
// 변경 전
import com.tableorder.dashboard.TableRepository;
// 변경 후
import com.tableorder.table.TableRepository;  // Unit 1 패키지
```
3. Unit 1의 TableRepository에 아래 메서드가 있는지 확인:
```java
List<TableEntity> findAllByOrderByTableNumberAsc();
```
4. 없으면 Unit 1 담당자에게 추가 요청

### 3.3 SSE 이벤트 발행 통합 (Unit 4)

**현재 상태**: `DashboardService.java`에 TODO 주석 3곳

**통합 작업**:
1. `DashboardService.java`에 SseEmitterService 주입 추가:
```java
// 추가
private final SseEmitterService sseEmitterService;
```

2. TODO 주석 3곳을 실제 코드로 교체:

**changeOrderStatus 메서드**:
```java
// TODO 주석 삭제 후:
sseEmitterService.broadcast(SseEvent.of(SseEventType.ORDER_STATUS_CHANGED, order));
```

**deleteOrder 메서드**:
```java
// TODO 주석 삭제 후:
sseEmitterService.broadcast(SseEvent.of(SseEventType.ORDER_DELETED, orderId));
```

**completeTableSession 메서드**:
```java
// TODO 주석 삭제 후:
sseEmitterService.broadcast(SseEvent.of(SseEventType.TABLE_SESSION_COMPLETED, tableId));
```

## 4. TODO 검색 방법

프로젝트 전체에서 통합 필요 항목을 찾으려면:
```bash
grep -rn "TODO: \[통합\]" table-order/backend/src/
```

## 5. 통합 후 검증

### 체크리스트
- [ ] dashboard/OrderRepository.java 삭제됨
- [ ] dashboard/TableRepository.java 삭제됨
- [ ] DashboardService import 경로 변경됨
- [ ] SSE 이벤트 발행 3곳 연결됨
- [ ] Backend 빌드 성공 (`./gradlew build`)
- [ ] Backend 테스트 통과 (`./gradlew test`)
- [ ] Frontend 빌드 성공 (`npm run build`)
- [ ] Frontend 테스트 통과 (`npm test`)

### 통합 테스트 시나리오
1. 고객 주문 생성 → 대시보드에 실시간 표시 (2초 이내)
2. 관리자 상태 변경 → 고객 화면에 실시간 반영
3. 이용 완료 → 테이블 리셋 + 과거 이력 이동
