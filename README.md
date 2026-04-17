# 바르셀로나 여행 꿀팁 가이드 2025

> **라이브 URL**: https://galaxy821.github.io/barcelona-travel/
> **정보 기준일**: 2025년 12월

sangsang.park이 직접 다녀온 바르셀로나 여행 경험을 기반으로 만든 추천 가이드 웹사이트입니다.

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | [Astro 6](https://astro.build/) (Static Site Generation) |
| UI | React Islands (`client:visible` lazy hydration) |
| 스타일 | Vanilla CSS (Custom Properties / Design Tokens) |
| 지도 | [MapLibre GL JS v5](https://maplibre.org/) + [OpenFreeMap](https://openfreemap.org/) (무료, API키 불필요) |
| 아이콘 | Font Awesome 6.5.1 (CDN) |
| 폰트 | Google Fonts – Noto Sans KR, Playfair Display |
| 이미지 | `public/images/` 저장소 내 직접 호스팅 (19장) |
| 배포 | GitHub Actions → GitHub Pages |

---

## 주요 기능

- **7개 탭** : 숙소 / 가볼만한 곳 / 식당 / 쇼핑 / 근교 투어 / 축제 / 🗺️ 지도
- **2.5D 인터랙티브 지도** : MapLibre GL JS, pitch 48° 시점, 3D 건물, 카테고리별 핀 (40곳), 클릭 팝업
- **Pinterest Masonry 레이아웃** : JS + Flexbox 기반, iOS Safari 완벽 호환
- **카테고리 핀 필터** : 가우디 🏛️ / 명소 📍 / 맛집 🍽️ / 디저트 🍰 / 쇼핑 🛍️ / 근교 🚌 토글
- **접이식 Google Maps** : 카드 내 지도 버튼 클릭 시 확장/축소 (CSS height transition)
- **방문 배지** : 직접 다녀온 장소에 `✓` 표시
- **반응형 디자인** : 모바일 1열 / 태블릿 2열 / 데스크톱 3열
- **세비야 여행 가이드 링크** : Hero CTA 버튼 → https://galaxy821.github.io/sevilla-travel/

---

## 프로젝트 구조

```text
travel/
├── public/
│   └── images/               # 로컬 호스팅 이미지 (19장)
├── src/
│   ├── components/
│   │   ├── Card.jsx           # 정보 카드 + 접이식 Google Maps
│   │   ├── MapInteractive.jsx # 2.5D 인터랙티브 지도 (MapLibre GL JS)
│   │   └── MasonryGrid.jsx    # JS 기반 Masonry 레이아웃
│   ├── data/
│   │   ├── accommodations.js  # 숙소 (2곳)
│   │   ├── attractions.js     # 관광 명소 (12곳)
│   │   ├── daytrips.js        # 근교 투어 (3곳)
│   │   ├── festivals.js       # 축제
│   │   ├── mapLocations.js    # 지도 핀 좌표 데이터 (40곳)
│   │   ├── restaurants.js     # 식당
│   │   └── shopping.js        # 쇼핑 (4개 카테고리)
│   ├── layouts/
│   │   └── Layout.astro       # 공통 레이아웃 (Hero, 탭 네비, Footer)
│   ├── pages/
│   │   ├── index.astro        # 숙소
│   │   ├── attractions.astro  # 가볼만한 곳
│   │   ├── restaurants.astro  # 식당
│   │   ├── shopping.astro     # 쇼핑
│   │   ├── daytrips.astro     # 근교 투어
│   │   ├── festivals.astro    # 축제
│   │   ├── map.astro          # 인터랙티브 지도
│   │   └── 404.astro          # 커스텀 404
│   └── styles/
│       └── global.css
├── .github/workflows/deploy.yml
├── astro.config.mjs
└── package.json
```

---

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:4321/barcelona-travel/
npm run build
npm run preview
```

---

## 업데이트 이력

| 날짜 | 내용 |
|------|------|
| 2026-04-17 | **2.5D 인터랙티브 지도 페이지 추가** – MapLibre GL JS + OpenFreeMap, 40개 장소 핀, 카테고리 필터, 팝업 카드, 3D 건물 레이어 |
| 2026-04-17 | 이미지 로컬 호스팅 전환 – wsrv.nl 외부 프록시 제거, `public/images/` 19장 직접 저장 |
| 2026-04-17 | Torrons Vicens 이미지 교체 – 세로 인물형→가로 매장 외관 사진 |
| 2026-04-17 | Hero 영역에 세비야 여행 가이드 CTA 버튼 추가 |
| 2026-04-17 | **iOS Safari Masonry 레이아웃 수정** – CSS `columns` 제거, JS + Flexbox 기반 `MasonryGrid.jsx` 도입 |
| 2026-04-17 | 깨진 이미지 URL 일괄 수정 (Wikimedia hash 경로 정확화) |
| 2026-04-17 | 각 카드에 대표 이미지 추가 |
| 2026-04-17 | 접이식 Google Maps 추가 – `Card.jsx` 내 토글 지도 |
| 2026-04-17 | 방문 장소 배지 + 커스텀 404 페이지 추가 |
| 2026-04-17 | **Astro 6 + React Islands 프레임워크 전환** – 바닐라 HTML/CSS/JS에서 마이그레이션 |

---

> 가격·운영시간은 2025년 12월 기준이며 방문 전 Google Maps에서 재확인을 권장합니다.

Created by **sangsang.park**
