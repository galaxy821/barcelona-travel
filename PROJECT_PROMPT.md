# 바르셀로나 여행 꿀팁 가이드 – 프로젝트 문서

> **라이브 URL**: https://galaxy821.github.io/barcelona-travel/
> **레포지토리**: https://github.com/galaxy821/barcelona-travel
> **정보 기준일**: 2025년 12월

---

## 프로젝트 개요

스페인 바르셀로나 여행 경험을 기반으로 한 **여행 꿀팁 가이드 웹사이트**.
방문자가 실용적인 여행 정보를 깔끔하고 직관적으로 탐색할 수 있도록 최신 UX/UI 트렌드를 반영.
Astro 6 + React Islands 아키텍처 기반, GitHub Pages로 정적 호스팅.

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | Astro 6 (Static Site Generation) |
| UI | React 18 Islands (`client:visible` lazy hydration) |
| 스타일 | Vanilla CSS – Custom Properties(디자인 토큰), Flexbox, CSS Grid |
| 지도 | MapLibre GL JS v5 + OpenFreeMap 타일 (무료, API키 불필요) |
| 아이콘 | Font Awesome 6.5.1 (CDN) |
| 폰트 | Google Fonts – Noto Sans KR, Playfair Display |
| 이미지 | `public/images/` 로컬 저장소 직접 호스팅 |
| 배포 | GitHub Actions → GitHub Pages (push to main 자동 트리거) |

---

## 디자인 컨셉

### 컬러 시스템

| 토큰 | 색상 | 용도 |
|------|------|------|
| `--c-primary` | #C65D3E (테라코타) | 메인 액션, 인디케이터, 강조 |
| `--c-accent` | #D4A04A (골드/앰버) | 보조 강조, 팁 아이콘 |
| `--c-navy` | #1C2B4A (다크 네이비) | 제목, 카드 네임, Hero 배경 |
| `--c-bg` | #F8F4F0 (웜 베이지) | 페이지 배경 |
| `--c-card` | #FFFFFF | 카드 배경 |

### UX/UI 패턴

1. **Glassmorphism 탭바** – `backdrop-filter: blur(18px)`, 스크롤 시 그림자 추가
2. **Sliding Tab Indicator** – 탭 전환 시 하단 인디케이터가 슬라이딩
3. **Masonry Grid (JS Flexbox)** – CSS `columns` 제거, round-robin 배분으로 iOS Safari 호환
4. **Micro-interactions** – 카드 호버 `translateY(-3px)` + 그림자 확대, 핀 호버 `scale(1.15)`
5. **Collapsible Map** – 카드 내 Google Maps, 버튼 클릭 시 CSS height transition 토글
6. **2.5D Map View** – MapLibre GL JS pitch 48°, 3D 건물 레이어, 카테고리별 HTML 마커

---

## 파일 구조

```
travel/
├── public/
│   └── images/                  # 로컬 호스팅 이미지 (19장)
│       ├── placa-reial.jpg
│       ├── barcelona-cathedral.jpg
│       ├── palau-musica.jpg
│       ├── casa-batllo.jpg
│       ├── casa-mila.jpg
│       ├── park-guell.jpg
│       ├── sagrada-familia.jpg
│       ├── palau-guell.jpg
│       ├── font-magica.jpg
│       ├── castell-montjuic.jpg
│       ├── tibidabo.jpg
│       ├── casa-vicens.jpg
│       ├── boqueria.jpg
│       ├── cereria-subira.jpg
│       ├── torrons-vicens.jpg
│       ├── el-corte-ingles.jpg
│       ├── montserrat.jpg
│       ├── girona.jpg
│       └── sitges.jpg
├── src/
│   ├── components/
│   │   ├── Card.jsx             # 정보 카드 컴포넌트
│   │   ├── MapInteractive.jsx   # 2.5D 인터랙티브 지도
│   │   └── MasonryGrid.jsx      # JS 기반 Masonry 레이아웃
│   ├── data/
│   │   ├── accommodations.js    # 숙소 데이터 (2곳)
│   │   ├── attractions.js       # 관광 명소 (12곳)
│   │   ├── daytrips.js          # 근교 투어 (3곳)
│   │   ├── festivals.js         # 크리스마스 축제
│   │   ├── mapLocations.js      # 지도 핀 데이터 (40곳, 좌표 포함)
│   │   ├── restaurants.js       # 식당 (3개 섹션)
│   │   └── shopping.js          # 쇼핑 (4개 카테고리)
│   ├── layouts/
│   │   └── Layout.astro         # 공통 레이아웃
│   ├── pages/
│   │   ├── index.astro          # 숙소 탭
│   │   ├── attractions.astro    # 가볼만한 곳 탭
│   │   ├── restaurants.astro    # 식당 탭
│   │   ├── shopping.astro       # 쇼핑 탭
│   │   ├── daytrips.astro       # 근교 투어 탭
│   │   ├── festivals.astro      # 축제 탭
│   │   ├── map.astro            # 인터랙티브 지도 탭
│   │   └── 404.astro            # 커스텀 404
│   └── styles/
│       └── global.css           # 전체 스타일시트
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages 자동 배포
├── astro.config.mjs
└── package.json
```

---

## 페이지 구조

### 공통 레이아웃 (Layout.astro)

```
┌──────────────────────────────────────────┐
│  HERO (그라데이션 배경, floating orbs)       │
│  🇪🇸 SPAIN · BARCELONA                    │
│  Barcelona Travel Information : 2025 ver  │
│  [🍊 세비야 여행 가이드 →]                  │
├──────────────────────────────────────────┤
│  TAB NAV (Sticky, Glassmorphism)          │
│  🏨숙소 📍명소 🍽️식당 🛍️쇼핑 🚌근교 🎄축제 🗺️지도 │
├──────────────────────────────────────────┤
│  <slot /> (페이지 콘텐츠)                   │
├──────────────────────────────────────────┤
│  FOOTER + 스크롤 탑 버튼                    │
└──────────────────────────────────────────┘
```

### 탭 구성 (7개)

| 탭 ID | 경로 | 콘텐츠 |
|-------|------|--------|
| `accommodation` | `/` | 추천 숙소 2곳 |
| `attractions` | `/attractions/` | 관광 명소 12곳 (가우디 5곳 포함) |
| `restaurants` | `/restaurants/` | 맛집 + 사그라다 파밀리아 주변 + 디저트 |
| `shopping` | `/shopping/` | 올리브·스킨케어·수공예 / 패션 / 식품·마트·백화점 / 약국 |
| `daytrips` | `/daytrips/` | 몬세라트 / 지로나 / 시제스 |
| `festivals` | `/festivals/` | 크리스마스 마켓 3곳 + 기타 이벤트 |
| `map` | `/map/` | 2.5D 인터랙티브 지도 (40개 핀) |

---

## 컴포넌트 상세

### Card.jsx

카드 UI 컴포넌트. 데이터 구조에 따라 배지, 이미지, 주소, 루트, 정보 행, 섹션, 하이라이트, 지도를 렌더링.

- **배지 타입**: `rec` (추천), `star` (별점), `free` (무료), `gaudi` (가우디), `visited` (방문)
- **정보 아이콘**: `tip` (💡), `warn` (⚠️), `price` (💰), `menu` (🍽️), `note` (📝), `time` (⏰), `phone` (📞)
- **LazyMap**: 토글 버튼으로 Google Maps iframe 확장/축소 (`useRef` + CSS height transition)

### MasonryGrid.jsx

iOS Safari 호환 Pinterest 스타일 레이아웃.

- `ResizeObserver` (= `window.addEventListener('resize')`) 로 열 수 결정
- 모바일: 1열 / 태블릿(768px+): 2열 / 데스크톱(1024px+, `wide`): 3열
- 아이템을 round-robin으로 각 열에 배분 → `flexbox column` 으로 렌더

### MapInteractive.jsx

MapLibre GL JS 기반 2.5D 인터랙티브 지도.

```
카테고리        색상      핀 이모지
──────────────────────────────────
gaudi          #9B59B6   🏛️ (가우디 유적 6곳)
attraction     #3A6EC4   📍 (일반 명소 7곳)
restaurant     #E74C3C   🍽️ (맛집 10곳)
dessert        #E67E22   🍰 (디저트 4곳)
shopping       #D4A04A   🛍️ (쇼핑 6곳)
daytrip        #27AE60   🚌 (근교 3곳)
```

- **초기 시점**: center `[2.1734, 41.3851]`, zoom 13.2, pitch 48°, bearing -8°
- **3D 건물**: `fill-extrusion` 레이어, zoom 14 이상에서 표시
- **핀 클릭**: `flyTo` 애니메이션 + 팝업 카드 (이름, 가격, 주소, 설명, Google Maps 링크)
- **카테고리 필터**: 토글 버튼, 근교만 선택 시 `fitBounds`로 자동 줌 아웃
- **CSS 동적 주입**: `maplibre-gl.css` CDN을 `useEffect`에서 `<link>` 삽입

---

## 데이터 구조

### 공통 장소 데이터 구조

```js
{
  name: '사그라다 파밀리아',          // 한국어 이름
  nameEn: 'Basílica de la Sagrada Família',
  image: '/barcelona-travel/images/sagrada-familia.jpg',
  visited: true,                    // 방문 배지 여부
  badge: { type: 'gaudi', icon: 'fa-palette', text: '가우디' },
  address: 'Carrer de Mallorca, 401, Eixample',
  route: {                          // (선택) 교통 루트
    title: '추천 루트',
    steps: [{ icon: 'fa-train-subway', text: '역 이름' }, ...],
  },
  info: [                           // 정보 행 배열
    { icon: 'tip', faIcon: 'fa-lightbulb', html: '<strong>...</strong>' },
    { icon: 'price', faIcon: 'fa-coins', html: '...' },
  ],
  sections: [                       // (선택) 서브 섹션
    { title: '섹션명', icon: 'fa-...', info: [...] },
  ],
  highlight: { html: '...' },       // (선택) 강조 박스
  schedule: [                       // (선택) 시간표
    { season: '하절기', days: '수~일', time: '21:30~22:30' },
  ],
  map: { q: '검색어', link: 'https://maps.app.goo.gl/...' },
}
```

### mapLocations.js 데이터 구조

```js
{
  id: 'sagrada-familia',
  name: '사그라다 파밀리아',
  nameEn: 'Basílica de la Sagrada Família',
  category: 'gaudi',              // 카테고리 키
  coords: [2.1744, 41.4036],      // [경도, 위도] (GeoJSON 표준)
  address: '...',
  visited: true,
  desc: '핵심 설명 (팝업에 표시)',
  price: '약 26유로~',
  mapLink: 'https://maps.app.goo.gl/...',
}
```

---

## 반응형 브레이크포인트

| 디바이스 | 너비 | 카드 그리드 | 탭 스타일 |
|---------|------|-----------|----------|
| 모바일 | ~767px | 1열 | 아이콘+텍스트, 11px |
| 태블릿 | 768px+ | 2열 | 가로 레이아웃, 13.5px |
| 데스크톱 | 1024px+ | 2열 (wide: 3열) | 가로 |

---

## 배포 파이프라인

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    - actions/checkout@v4
    - setup-node (Node 22)
    - npm ci && npm run build    # dist/ 생성
    - actions/upload-pages-artifact (dist/)
    - actions/deploy-pages
```

`astro.config.mjs`의 `base: '/barcelona-travel'`로 GitHub Pages 서브 경로 대응.

---

## 업데이트 이력

| 날짜 | 커밋 | 내용 |
|------|------|------|
| 2026-04-17 | `4519fd4` | **2.5D 인터랙티브 지도 추가** – MapLibre GL JS, 40개 핀, 카테고리 필터, 팝업, 3D 건물 |
| 2026-04-17 | `cecba8b` | Torrons Vicens 이미지 교체 (세로→가로 매장 외관) |
| 2026-04-17 | `19388fc` | **이미지 로컬 전환** – wsrv.nl 제거, `public/images/` 19장 |
| 2026-04-17 | `df1a4b6` | 쇼핑/식당 카테고리 키 바르셀로나 구조로 수정 |
| 2026-04-17 | `93fc243` | 데이터 파일 바르셀로나 원본 복구, activities 탭 제거 |
| 2026-04-17 | `0989a09` | Hero 타이틀 바르셀로나 2025년 12월로 원복 |
| 2026-04-17 | `a3d4933` | Hero 영역 세비야 여행 가이드 CTA 버튼 추가 |
| 2026-04-17 | `9ca65a6` | README.md 초안 작성 |
| 2026-04-17 | `6f690c0` | **iOS Safari Masonry 수정** – CSS columns → JS Flexbox MasonryGrid |
| 2026-04-17 | `e1603e2` | wsrv.nl 인코딩 문제 해결, 이미지 URL 수정 |
| 2026-04-17 | `2d576b4` | 접이식 Google Maps 추가, wsrv.nl 이미지 프록시 적용 |
| 2026-04-17 | `3bd78ec` | 이미지 URL Wikimedia Special:FilePath 형식으로 변경 |
| 2026-04-17 | `f1c36e3` | 각 카드 대표 이미지 추가 |
| 2026-04-17 | `b228473` | Masonry 카드 간 여백 추가 |
| 2026-04-17 | `b60c66b` | Pinterest 스타일 Masonry 레이아웃 도입 |
| 2026-04-17 | `9ea5fe7` | 방문 장소 배지 추가, 타이틀 변경 |
| 2026-04-17 | `ccc22f1` | 커스텀 404 페이지, Footer 작성자 표기 |
| 2026-04-17 | `0882db1` | Astro 6 + React Islands 초기 구조 완성 |
