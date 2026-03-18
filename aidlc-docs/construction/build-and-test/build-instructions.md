# Build Instructions - Unit 5: 관리자 대시보드

## Prerequisites
- **Java**: 17+
- **Gradle**: 8.x (wrapper 포함)
- **Node.js**: 18+
- **npm**: 9+

## Build Steps

### 1. Backend 빌드
```bash
cd table-order/backend
./gradlew build
```

### 2. Frontend 의존성 설치 및 빌드
```bash
cd table-order/frontend
npm install
npm run build
```

### 3. 빌드 확인
- Backend: `table-order/backend/build/libs/` 에 JAR 파일 생성
- Frontend: `table-order/frontend/dist/` 에 빌드 결과물 생성

## 실행

### Backend 실행
```bash
cd table-order/backend
./gradlew bootRun
```
서버: http://localhost:8080

### Frontend 개발 서버 실행
```bash
cd table-order/frontend
npm run dev
```
개발 서버: http://localhost:5173

## Troubleshooting

### Gradle 빌드 실패
- Java 17+ 설치 확인: `java -version`
- Gradle wrapper 권한: `chmod +x gradlew`

### npm install 실패
- Node.js 18+ 확인: `node -v`
- node_modules 삭제 후 재설치: `rm -rf node_modules && npm install`
