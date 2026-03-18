# Unit 2: NFR Requirements + Design

## NFR Requirements
| ID | 요구사항 | 기준 |
|----|---------|------|
| NFR-IMG-01 | 이미지 파일 크기 | 최대 5MB (application.yml에 설정됨) |
| NFR-IMG-02 | 이미지 저장 경로 | ./uploads/images/ |
| NFR-IMG-03 | 이미지 서빙 | /api/images/** → 로컬 파일 (WebConfig에 설정됨) |
| NFR-MENU-01 | 메뉴/카테고리 조회 | 인증 불필요 (고객 접근) |
| NFR-MENU-02 | 메뉴/카테고리 CUD | JWT 필요 (관리자 전용) |

## NFR Design
- ImageService: UUID.randomUUID() + 원본 확장자로 파일명 생성
- SecurityConfig: GET /api/menus/**, GET /api/categories/** → permitAll 추가 필요
- 이미지 업로드: POST /api/images → authenticated
