# ShowU — 예술가 지망생과 예술 팬을 위한 통합 플랫폼

> 티켓 판매, 공간 대여, 굿즈/경매 쇼핑, VOD 스트리밍, 커뮤니티를 통합한 예술 특화 플랫폼 — 백엔드

## 📌 핵심 구현

### 1. 동시 예약 Race Condition 해결
동시 200명 요청 시 중복 예약 9건 발생 → MongoDB Unique Index + Mongoose 트랜잭션 적용으로 0건 달성

- `seatSchema`에 `{ showId, date, time, seatNumbers }` 복합 Unique Index 추가
- `mongoose.startSession()`으로 트랜잭션 세션 내 `find()` + `save()` 처리
- `WriteConflict(code: 112)` catch 처리로 500 → 400 반환

### 2. Seat/Rental 트랜잭션 원자성 보장
Seat 저장 성공 후 Rental 저장 실패 시 부분 저장 발생 → 두 컬렉션 저장을 단일 트랜잭션으로 묶어 부분 저장 케이스 제거

### 3. Toss Payments 서버사이드 검증
클라이언트 금액 위변조 가능성 → `/v1/payments/confirm` 서버사이드 검증 후 DB 저장
- Postman 재현: 340,000원 → 1,000원 조작 시 `FORBIDDEN_REQUEST(403)` 반환 확인

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| Runtime | Node.js |
| Framework | Express 4.21 |
| ODM | Mongoose 8.9 |
| Database | MongoDB Atlas |
| 인증 | Passport.js, JWT |
| 결제 | Toss Payments SDK 2.3 |
| 부하테스트 | k6 0.55.0 |

## 📂 프로젝트 구조

```
Back_ShowU/
├── auth/
│   └── auth.js                     # Passport.js 인증 전략 (JWT, 소셜 로그인)
├── connect/
│   └── connect.js                  # MongoDB 연결
├── controller/
│   ├── admin/                      # 관리자 (팀, 등급 업그레이드)
│   ├── auth/                       # 인증
│   ├── community/                  # 커뮤니티 (오디션, 게시판, 댓글)
│   ├── mypage/                     # 마이페이지
│   ├── reservation/                # ✅ 담당 — 예약 도메인
│   │   ├── seatController.js       # 좌석 예약 (Race Condition 해결)
│   │   ├── rentalController.js     # 공간 대여 (트랜잭션 원자성)
│   │   ├── ticketPaymentController.js  # 티켓 결제 (서버사이드 검증)
│   │   ├── rentalPaymentController.js  # 공간 결제 (서버사이드 검증)
│   │   ├── eventsController.js     # 공연/공간 조회
│   │   ├── likeController.js       # 찜하기
│   │   └── commentController.js    # 댓글 CRUD
│   ├── shop/                       # ✅ 담당 — 경매/굿즈 결제
│   │   ├── auctionTossPaymentController.js  # 경매 결제 (서버사이드 검증)
│   │   └── mdTossPaymentController.js       # 굿즈 결제 (서버사이드 검증)
│   ├── showu/                      # ShowU 팀 기능
│   ├── user/                       # 회원
│   └── vod/                        # VOD 스트리밍
├── models/
│   ├── reservation/                # ✅ 담당 — 예약 스키마
│   │   ├── seatSchema.js           # Unique Index 적용
│   │   ├── rentalSchema.js
│   │   ├── ticketPaymentSchema.js
│   │   ├── rentalPaymentSchema.js
│   │   ├── showSchema.js
│   │   └── spaceSchema.js
│   ├── shop/                       # 경매/굿즈 스키마
│   ├── community/                  # 커뮤니티 스키마
│   ├── users/                      # 회원 스키마
│   └── vod/                        # VOD 스키마
├── routes/                         # API 라우터
├── uploads/                        # 업로드 파일 저장소
├── utils/
│   └── utils.js                    # 유틸 함수
├── race_condition_test.js          # k6 부하테스트 스크립트
└── app.js
```

## ⚙️ 실행 방법

```bash
# 의존성 설치
npm install

# MongoDB 서비스 시작 (Windows)
net start MongoDB

# 서버 실행
nodemon app

# 샘플 데이터 삽입
node dataInsert.js

# 부하테스트 실행
k6 run race_condition_test.js
```

## 🔑 환경변수

```env
MONGODB_URI=your_mongodb_atlas_uri
SECRET_KEY=your_jwt_secret
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
KAKAO_REST_API=your_kakao_rest_api
NAVER_ID=your_naver_client_id
NAVER_SECRET=your_naver_client_secret
```

## 📊 부하테스트 결과 (k6, 동시 200명)

| 항목 | 개선 전 | 개선 후 |
|------|---------|---------|
| 중복 예약 | 9건 ❌ | 0건 ✅ |
| TPS | 60.8/s | 43.4/s |
| 평균 응답시간 | 315ms | 664ms |
| P95 응답시간 | 1.4s | 3.4s |

> 트랜잭션 적용으로 TPS와 응답시간이 증가했지만, 티켓 예매 도메인 특성상 성능보다 데이터 정합성을 우선해 트레이드오프를 감수했습니다.

## 🔗 관련 링크

- 프론트엔드 레포지토리: [front-showu](https://github.com/byungwook-dev/front-showu)
- 포트폴리오: https://app.notion.com/p/by-Byungwook-dev-36505e05fc2f80cd831cd45ef9059112
