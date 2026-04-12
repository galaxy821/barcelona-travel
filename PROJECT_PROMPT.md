# 바르셀로나 여행 꿀팁 블로그 - 프로젝트 프롬프트

## 프로젝트 개요

스페인 바르셀로나 여행 경험을 기반으로 한 **여행 꿀팁 블로그 포스팅 웹페이지**를 제작한다.
방문자가 실용적인 여행 정보를 깔끔하고 직관적으로 탐색할 수 있도록 최신 UX/UI 트렌드를 반영한 단일 페이지(SPA 스타일) 웹사이트를 구현한다.

---

## 기술 스택

- HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- 최신 CSS 기능 활용 (Flexbox, Grid, Custom Properties)
- CSS Custom Properties (디자인 토큰)
- CSS Grid + Flexbox 기반 반응형 레이아웃
- Google Maps Embed API (iframe 인라인 지도)
- Font Awesome (CDN) + 이모지 아이콘 활용
- Google Fonts (Noto Sans KR)

---

## 디자인 컨셉

### 전체 톤 & 무드

- **웜톤 지중해 감성**: 바르셀로나의 따뜻한 햇살, 가우디 건축의 컬러감을 반영
- 메인 컬러: 테라코타/산호색 계열 + 화이트 + 다크 네이비
- 액센트: 골드/앰버 (스페인 감성)
- 깔끔한 여백, 부드러운 라운드 카드 UI
- 타이포그래피: Noto Sans KR (Google Fonts) + 시스템 폰트 스택
- 아이콘: 이모지 + Font Awesome (CDN)

### UX/UI 트렌드 반영 사항

1. **Bento Grid 레이아웃**: 각 장소 카드를 벤토 그리드 스타일로 배치
2. **Glassmorphism 헤더**: 스크롤 시 반투명 글래스 효과 상단 네비게이션
3. **Smooth Tab Transition**: 탭 전환 시 부드러운 애니메이션
4. **Micro-interactions**: 카드 호버 시 살짝 떠오르는 효과, 탭 인디케이터 슬라이딩
5. **Sticky Tab Navigation**: 스크롤해도 탭 메뉴가 상단에 고정
6. **카드 기반 UI**: 각 장소 정보를 카드 형태로 구성
7. **인라인 미니맵**: 각 카드 내 Google Maps iframe 삽입 (클릭 시 구글 지도 이동)

---

## 페이지 구조

### 1. 히어로 섹션

- 바르셀로나 테마 그라데이션 배경 + 타이포그래피
- 블로그 제목: "Barcelona Travel Information : 2025 ver"
- 부제: "2025년 12월 기준 | 실제 여행 경험 기반"
- 간단한 인트로 텍스트

### 2. 탭 네비게이션 (Sticky)

4개 탭으로 구성:
| 탭 | 아이콘 | 내용 |
|---|---|---|
| 숙소 | 🏨 | 추천 숙소 2곳 |
| 가볼만한 곳 | 📍 | 관광 명소 11곳+ |
| 식당 | 🍽️ | 추천 식당 12곳+ |
| 쇼핑 | 🛍️ | 쇼핑 스팟 5곳 |

### 3. 콘텐츠 영역 (탭별)

#### 각 장소 카드 구성요소:

```
┌─────────────────────────────────────┐
│  [장소 이름]            [카테고리 뱃지] │
│  ───────────────────────────────── │
│  📍 주소                            │
│  ───────────────────────────────── │
│  💡 꿀팁 / 추천 포인트                │
│  💰 가격 정보 (해당 시)               │
│  ⏰ 운영시간 / 휴무일 (해당 시)        │
│  ───────────────────────────────── │
│  ┌─────────────────────────────┐   │
│  │    Google Maps 미니맵        │   │
│  │    (iframe embed)           │   │
│  │    클릭 → 구글 지도 열기      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 반응형 브레이크포인트

| 디바이스 | 너비         | 카드 그리드     |
| -------- | ------------ | --------------- |
| 모바일   | ~767px       | 1열 (세로 스택) |
| 태블릿   | 768px~1023px | 2열 그리드      |
| 데스크톱 | 1024px~      | 2~3열 그리드    |

---

## 콘텐츠 상세 데이터

### 탭 1: 숙소 (2곳)

#### 호스텔 베니돔 (Hostel Benidorm)

- **주소**: Rambla dels Caputxins, 37, Ciutat Vella, 08002 Barcelona
- **구글 지도**: https://maps.app.goo.gl/mAUC6m1oohFHbh2o9
- **꿀팁**:
  - 트윈룸 크기는 크지 않지만 깔끔하고 체크인 수월
  - 도시세 22유로 별도
  - Liceu 역 근처, 카탈루냐 광장·구시가지·해변 도보 이동 가능
  - 바르셀로나 도보 여행 베이스캠프로 최적

#### 오스탈 이즈나하르 바르셀로나 (Hostal Iznajar Barcelona)

- **주소**: Carrer del Carme, 38, Ciutat Vella, 08001 Barcelona
- **구글 지도**: https://maps.app.goo.gl/hsy6zSpK21sDJg1z9
- **꿀팁**:
  - 트윈룸 크기 작고, 숙소1보다 오래된 느낌
  - 체크인 수월
  - Liceu 역 근처, 라보케리아 시장이 바로 코앞
  - 까르푸 근처, 카탈루냐 광장·구시가지·해변 도보 이동 가능

---

### 탭 2: 가볼만한 곳 (11곳)

#### 1. 에스파냐 광장 (Plaça Reial)

- **주소**: Pl. Reial, 10, Ciutat Vella, 08002 Barcelona
- **구글 지도**: https://maps.app.goo.gl/Vy94BoweoUtxaYsV7
- **포인트**: 가우디의 가로등 작품 감상
- **주의**: 광장 내 식당은 가격이 비싸서 비추천
- **입장료**: 무료

#### 2. 바르셀로나 대성당 (Cathedral of Barcelona)

- **주소**: Pla de la Seu, s/n, Ciutat Vella, 08002 Barcelona
- **구글 지도**: https://maps.app.goo.gl/ruj7SfydoB28Hsfx6
- **포인트**: 고딕 양식의 웅장한 대성당
- **입장료**: 무료 (특별 구역 유료, 약 9유로)

#### 3. 카탈루냐 음악당 (Palau de la Música Catalana)

- **주소**: C/ Palau de la Música, 4-6, Ciutat Vella, 08003 Barcelona
- **구글 지도**: https://maps.app.goo.gl/sgN3tda35TogsMoPA
- **포인트**: 유네스코 세계문화유산, 화려한 스테인드글라스
- **입장료**: 가이드 투어 약 20유로

#### 4. 카사 바트요 (Casa Batlló) - 가우디 작품

- **주소**: Pg. de Gràcia, 43, Eixample, 08007 Barcelona
- **구글 지도**: https://maps.app.goo.gl/wMD9o7pQkXgNDW6E9
- **포인트**: 투어 추천, 아침 일찍 입장하면 대기줄 없음
- **주의**: 기념품점 구경하기 좋지만 비싼 편
- **입장료**: 약 35유로~ (온라인 사전 예매 추천)

#### 5. 카사 밀라 (Casa Milà / La Pedrera) - 가우디 작품

- **주소**: Pg. de Gràcia, 92, Eixample, 08008 Barcelona
- **구글 지도**: https://maps.app.goo.gl/dVpC4BJR9XFpmCNeA
- **포인트**: 한국인 투어에서 내부 관람을 빼는 경우가 많으므로 개별 방문 추천
- **특이사항**: 옥상에서 사그라다 파밀리아 성당 조망 가능
- **입장료**: 약 25유로~ (온라인 사전 예매 추천)

#### 6. 구엘 공원 (Park Güell) - 가우디 작품

- **주소**: Gràcia, 08024 Barcelona
- **구글 지도**: https://maps.app.goo.gl/mYAFUvqUXgGzpuQs6
- **포인트**:
  - 버스로 한 번에 이동 가능 (투어 관광버스가 더 편함)
  - 공원이 넓어서 구석구석 돌아다니며 구경하기 좋음
  - 고지대라 바르셀로나 시내 전경 조망 가능
- **추가 추천**: 바르셀로나 시내를 완전히 내려다보고 싶다면 벙커(Turó de la Rovira) 추천
  - 주소: Carrer de Marià Labèrnia, s/n, Horta-Guinardó, 08032 Barcelona
  - https://maps.app.goo.gl/weR9UuegK71s7Bzx8
- **입장료**: 약 10유로 (온라인 사전 예매 필수)

#### 7. 사그라다 파밀리아 (Basílica de la Sagrada Família) - 가우디 작품

- **주소**: Carrer de Mallorca, 401, Eixample, 08013 Barcelona
- **구글 지도**: https://maps.app.goo.gl/6xEVkPi8RdEWawiq8
- **포인트**: 바르셀로나 필수 관광명소, 실내 구경 강력 추천
- **주의**: 사람이 매우 많음, 소매치기 주의! 투어에서 실내 미포함인 경우 많으므로 별도 티켓 예약 추천
- **입장료**: 약 26유로~ (온라인 사전 예매 필수, 타워 포함 시 36유로~)

#### 8. 구엘 저택 (Palau Güell) - 가우디 작품

- **주소**: Carrer Nou de la Rambla, 3-5, Ciutat Vella, 08001 Barcelona
- **구글 지도**: https://maps.app.goo.gl/d5VCkQEdvy35r4JV6
- **포인트**: 실내 구경 추천
- **입장료**: 약 12유로

#### 9. 몬주익 마법의 분수 (Font Màgica de Montjuïc)

- **주소**: Pl. de Carles Buïgas, Sants-Montjuïc, 08038 Barcelona
- **구글 지도**: https://maps.app.goo.gl/bGQB4sKj52jERU7B8
- **분수 쇼 일정 (2025년 기준)**:
  - 동절기 (11월~2월): 목·금·토 20:00~21:00 (15분 간격 공연)
  - 하절기 (6월~9월): 수·목·금·토·일 21:30~22:30
  - 춘추절기 (3월~5월, 10월): 목·금·토 21:00~22:00
  - ※ 시즌별 변동 가능, 바르셀로나 시 공식 사이트에서 사전 확인 권장
- **관람 팁**:
  - 무료 관람
  - 분수 정면 계단에서 보는 것이 가장 좋은 뷰
  - 일찍 도착하여 정면 자리 확보 추천 (최소 30분 전)
  - 음악과 조명에 맞춰 물줄기가 춤추는 공연 (약 15분)
  - 카메라보다 눈으로 감상 추천

#### 10. 몬주익 성 (Castell de Montjuïc)

- **주소**: Ctra. de Montjuïc, 66, Sants-Montjuïc, 08038 Barcelona
- **구글 지도**: https://maps.app.goo.gl/U9njvq2VXLhXgu8h6
- **케이블카 이용 방법**:
  - **텔레페릭 데 몬주익 (Teleféric de Montjuïc)**:
    - 몬주익 공원 중턱 → 몬주익 성 정상 구간 운행
    - 탑승장소: Parc de Montjuïc 역 (지하철 L3 Paral·lel역에서 푸니쿨라 환승 → 몬주익 푸니쿨라 상부역 도착 → 도보 이동 후 텔레페릭 탑승)
    - 운행시간: 10:00~19:00 (시즌별 변동)
    - 요금: 편도 약 9.40유로 / 왕복 약 14.20유로
  - **추천 루트**: 지하철 L3 Paral·lel역 → 푸니쿨라(무료, T-Casual 교통권 사용 가능) → 텔레페릭 → 몬주익 성
  - 내려올 때는 도보로 산책하며 내려오는 것도 추천
- **입장료**: 약 5유로 (일요일 15시 이후 무료, 매월 첫째 일요일 종일 무료)

#### 11. 티비다보 놀이공원 (Parc d'Atraccions Tibidabo)

- **주소**: Parc d'atraccions Tibidabo
- **구글 지도**: https://maps.app.goo.gl/cAs1dF7Egoexysy7A
- **포인트**: 시간 여유가 있다면 방문 추천, 바르셀로나 최고 전망
- **입장료**: 약 35유로

---

### 탭 3: 식당 (12곳)

#### 1. Bar Anxoita

- **주소**: Carrer de Mallorca, 250, Eixample, 08008 Barcelona
- **구글 지도**: https://maps.app.goo.gl/uP61JP4TgXXgwYA78
- **추천 메뉴**: 꿀대구 (Bacalao) 6~8유로
- **팁**: 점심시간 웨이팅 있을 수 있음

#### 2. Vinitus

- **주소**: Carrer del Consell de Cent, 333, Eixample, 08007 Barcelona
- **구글 지도**: https://maps.app.goo.gl/sjFgeEixxgW1U6HX6
- **추천 메뉴**: 꿀대구 (Bacalao)
- **팁**: 웨이팅 거의 필수

#### 3. 라보케리아 시장 (Mercat de la Boqueria)

- **주소**: La Rambla, 91, Ciutat Vella, 08001 Barcelona
- **구글 지도**: https://maps.app.goo.gl/8aPRMiDFt9rVd8cF7
- **포인트**: 바르셀로나 대표 재래시장, 신선한 과일·해산물·타파스

#### 4. Makamaka Barcelona

- **주소**: Pg. de Joan de Borbó, 76, Ciutat Vella, 08039 Barcelona
- **구글 지도**: https://maps.app.goo.gl/t3Cbb851z3nVT67BA
- **추천 메뉴**: 수제 버거
- **팁**: 바르셀로네타 해변 근처, 해변 갈 겸 들리기 좋음

#### 5. Oporto Restaurante ★

- **구글 지도**: https://goo.gl/maps/7gWvPPTQAMvVMVtk7
- **추천 메뉴**: 국물 빠에야(Arroz de marisco), 문어 세비체(Pulpo con salsa verde), 문어 구이(Pulpo a Lagareiro)
- **팁**: 포르투갈 음식, 식후주·포르투갈 껌 제공 / 화요일 휴무
- **전화**: 932 77 71 58

#### 6. El Glop Gaudi ★

- **구글 지도**: https://goo.gl/maps/LMGbpRSViqb33a3M8
- **추천 메뉴**: 빠에야 종류
- **팁**: 카탈루냐 광장 유명 식당의 새 체인점, 스페인 스파클링 와인 까바 한 잔
- **전화**: 934 87 00 97

#### 7. Puertecillo Sagrada Família ★

- **구글 지도**: https://goo.gl/maps/ezdQJ7HoKnHdWtAt5
- **추천 메뉴**: 오늘의 메뉴(Menu del Dia), 오징어, 맛조개, 토마토 홍합스튜
- **팁**: 해산물 체인점, 진열대에서 직접 재료 선택 가능, 스페인 식후주 / 월요일 휴무
- **전화**: 934 50 01 91

#### 8. XYG Malatang Spicy Hotpot ★

- **구글 지도**: https://maps.app.goo.gl/ikFxFD6FVWF9pN4D6
- **추천 메뉴**: 마라탕 (맵기 단계 선택 가능)
- **팁**: 뚝배기에 나와 따뜻한 국물, 음료 제공
- **전화**: 934 99 71 74

#### 9. Vietnam Authentic Restaurant ★

- **구글 지도**: https://maps.app.goo.gl/J9kyYY8XgkZTk9p17
- **추천 메뉴**: 쌀국수, 오늘의 메뉴
- **팁**: 추운 날 따뜻한 국물 추천, 환영음료 제공
- **전화**: 934 46 45 87

#### 10. Paisano Cafè ★

- **구글 지도**: https://goo.gl/maps/Lmto4DnWWGKr4F5E9
- **추천 메뉴**: 라자냐, 연어 훈제 토스트, 오늘의 파스타
- **팁**: '동포 카페'라는 이름의 친근한 이탈리아 카페 / 월요일 휴무
- **전화**: 935 25 04 71

#### 11. The Venue Steakhouse ★

- **구글 지도**: https://goo.gl/maps/uq9XabAj4PSKg1M99
- **추천 메뉴**: 티본 스테이크
- **팁**: 친절한 서비스 / 월·화요일 휴무
- **전화**: 936 39 96 75

#### 12. Bicos Restaurante ★

- **구글 지도**: https://g.page/bicosrestaurante?share
- **추천 메뉴**: 서버에게 음식 추천 요청
- **팁**: 갈리시아 레스토랑, 좋은 식재료·분위기·플레이팅 / 월요일 휴무
- **전화**: 936 11 82 27

---

### 탭 4: 쇼핑 (5곳)

#### 1. 사바테르 (Sabater - Fàbrica de sabons) - 천연비누

- **주소**: Plaça de Sant Felip Neri, 1, Ciutat Vella, 08002 Barcelona
- **구글 지도**: https://maps.app.goo.gl/acQGU6iYzaku9YHr7
- **포인트**: 고딕지구에 위치한 천연비누 전문점

#### 2. Cereria Subirà - 양초

- **주소**: Baixada de la Llibreteria, 7, Ciutat Vella, 08002 Barcelona
- **구글 지도**: https://maps.app.goo.gl/p8ogR6Rydsw5BMrr5
- **포인트**: 사그라다 파밀리아 성당에 양초를 납품하는 가게

#### 3. La Chinata - 올리브 오일 전문점

- **주소**: Carrer de la Diputació, 262, Eixample, 08007 Barcelona
- **구글 지도**: https://maps.app.goo.gl/WhtVYrYXUnvHtWFY6
- **추천 아이템**:
  - 올리브유: 직접 빵에 찍어 시식 가능, 프리미엄 올리브유 한국 대비 저렴
  - 올리브 립밤: 2유로대, 선물용으로 최적
  - 발사믹 소스: 화이트트러플맛 추천

#### 4. Mercadona - 스페인 국민마트

- **추천 아이템**:
  - 하몽맛 감자칩: 과자코너에서 감자칩+하몽 그림 과자
  - 올리브 크림(Crema Oliva): 화장품코너, 1유로대 바디크림
  - 꿀국화차(Manzanilla con Miel): Hacendado 자체브랜드

#### 5. El Corte Inglés Plaça de Catalunya - 백화점

- **주소**: Pl. de Catalunya, 14, Eixample, 08002 Barcelona
- **구글 지도**: https://maps.app.goo.gl/GyR7e82umZCMRwJ28
- **추천 아이템**:
  - 뚜론: 엘꼬르떼 잉글레스 자체브랜드가 비센스보다 저렴
  - 라비토스 로열 초콜렛(Rabitos Royal): 지하 고메마켓 초콜렛 코너, 달콤한 무화과 초콜렛

---

## 구현 세부 사항

### Google Maps 인라인 지도

- 각 장소 카드에 Google Maps Embed를 iframe으로 삽입
- 구글 지도 단축 URL에서 좌표를 추출하여 `maps.google.com/maps?q=좌표&output=embed` 형태로 임베드
- 또는 장소명을 쿼리로 사용: `maps.google.com/maps?q=장소명+바르셀로나&output=embed`
- 지도 위에 오버레이로 "구글 지도에서 보기" 버튼 배치 → 클릭 시 원본 구글 지도 링크로 이동
- 지도 높이: 모바일 180px / 데스크톱 200px

### 파일 구조

```
travel/
├── index.html          # 메인 HTML
├── css/
│   └── style.css       # 스타일시트
├── js/
│   └── app.js          # 탭 전환, 인터랙션 로직
└── PROJECT_PROMPT.md   # 이 문서
```

### 성능 최적화

- 이미지 없이 CSS 그라데이션/이모지/아이콘으로 비주얼 구성
- Google Maps iframe은 Intersection Observer로 lazy loading
- 시스템 폰트 스택 + Google Fonts (Noto Sans KR) 사용
- CSS/JS 최소화, 단일 페이지로 빠른 로딩

### 접근성

- 시맨틱 HTML (nav, main, section, article)
- ARIA 탭 패턴 적용
- 키보드 네비게이션 지원
- 충분한 색상 대비

---

## 추가 고려사항

- 정보 기준일(2025년 12월) 명시
- 가격 정보는 "약 ~유로" 형태로 변동 가능성 안내
- 소매치기 주의 등 안전 팁 강조 표시
- 각 장소의 휴무일 정보 명확히 표기
- 사그라다 파밀리아 주변 맛집은 별도 섹션 또는 뱃지로 그룹핑
