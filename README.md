# Barcelona Travel Guide 2025

sangsang.park의 실제 여행 경험과 추가 리서치를 바탕으로 만든 바르셀로나 추천 가이드 웹 애플리케이션입니다.

> **Local dev:** [http://127.0.0.1:4321/barcelona-travel](http://127.0.0.1:4321/barcelona-travel)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Astro 6](https://astro.build/) (Static Site Generation) |
| UI Components | React Islands |
| Styling | Vanilla CSS (Custom Properties / Design Tokens) |
| Image Proxy | [wsrv.nl](https://wsrv.nl/) |

## Features

- **6개 탭 구성** : 숙소 / 가볼만한 곳 / 식당 / 쇼핑 / 근교 투어 / 액티비티
- **Pinterest 스타일 Masonry 레이아웃** : JS + Flexbox 기반, iOS Safari 호환
- **반응형 디자인** : 모바일 1컬럼 / 태블릿 2컬럼 / 데스크톱 3컬럼
- **방문 장소 표시** : sangsang 방문 뱃지로 직접 다녀온 곳 표시
- **대표 이미지** : 각 카드 상단에 원격 이미지 기반 대표 사진
- **접이식 Google Maps** : 버튼 클릭 시 지도 확장/축소
- **Lazy Loading** : 이미지 및 지도 iframe 지연 로딩

## Project Structure

```text
src/
├── components/
│   ├── Card.jsx
│   └── MasonryGrid.jsx
├── data/
│   ├── accommodations.js
│   ├── activities.js
│   ├── attractions.js
│   ├── daytrips.js
│   ├── restaurants.js
│   └── shopping.js
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── 404.astro
│   ├── activities.astro
│   ├── attractions.astro
│   ├── daytrips.astro
│   ├── index.astro
│   ├── restaurants.astro
│   └── shopping.astro
└── styles/
    └── global.css
```

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Notes

- `astro.config.mjs`의 `base`는 기존 GitHub Pages 프로젝트 경로를 유지하기 위해 `/barcelona-travel`로 남겨두었습니다.
- 가격, 운영시간, 공연 여부는 2025년 12월 기준으로 정리했으며 방문 전 공식 페이지와 Google Maps에서 재확인하는 것을 권장합니다.

---

Created by **sangsang.park**
