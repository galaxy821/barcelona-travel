# Barcelona Travel Guide 2025

sangsang.park이 직접 다녀온 바르셀로나 추천 가이드 웹 애플리케이션입니다.

> **Live Site:** [https://galaxy821.github.io/barcelona-travel](https://galaxy821.github.io/barcelona-travel)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Astro 6](https://astro.build/) (Static Site Generation) |
| UI Components | [React 19](https://react.dev/) (Islands Architecture) |
| Styling | Vanilla CSS (Custom Properties / Design Tokens) |
| Deployment | GitHub Pages + GitHub Actions (auto-deploy on push) |
| Image Proxy | [wsrv.nl](https://wsrv.nl/) (Wikimedia Commons images) |

## Features

- **6개 탭 구성** : 숙소 / 가볼만한 곳 / 식당 / 쇼핑 / 근교 투어 / 축제
- **Pinterest 스타일 Masonry 레이아웃** : JS + Flexbox 기반, iOS Safari 호환
- **반응형 디자인** : 모바일 1컬럼 / 태블릿 2컬럼 / 데스크톱 3컬럼
- **방문 장소 표시** : sangsang 방문 뱃지로 직접 다녀온 곳 표시
- **대표 이미지** : 각 카드 상단에 Wikimedia Commons 기반 대표 사진
- **접이식 Google Maps** : 버튼 클릭 시 부드러운 애니메이션으로 지도 확장/축소
- **Lazy Loading** : 이미지 및 지도 iframe 지연 로딩으로 초기 로딩 최적화
- **커스텀 404 페이지** : 모든 탭으로의 네비게이션 링크 제공

## Project Structure

```
src/
├── components/
│   ├── Card.jsx           # 카드 컴포넌트 (이미지, 정보, 접이식 지도)
│   └── MasonryGrid.jsx    # Masonry 레이아웃 컴포넌트
├── data/
│   ├── accommodations.js   # 숙소 데이터
│   ├── attractions.js      # 관광지 데이터 (12곳)
│   ├── restaurants.js      # 식당 데이터 (20곳)
│   ├── shopping.js         # 쇼핑 데이터 (15곳)
│   ├── daytrips.js         # 근교 투어 데이터 (3곳)
│   └── festivals.js        # 축제 데이터
├── layouts/
│   └── Layout.astro        # 공통 레이아웃 (Hero, Tab Nav, Footer)
├── pages/
│   ├── index.astro         # 숙소 탭 (메인)
│   ├── attractions.astro   # 가볼만한 곳 탭
│   ├── restaurants.astro   # 식당 탭
│   ├── shopping.astro      # 쇼핑 탭
│   ├── daytrips.astro      # 근교 투어 탭
│   ├── festivals.astro     # 축제 탭
│   └── 404.astro           # 커스텀 404 페이지
└── styles/
    └── global.css          # 글로벌 스타일시트
```

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

## Update History

### v1.0 - Initial Release
- `dc2ff11` 바르셀로나 여행 꿀팁 가이드 웹페이지 초기 구현
- `c40eb44` GitHub Pages 배포 워크플로우 추가

### v1.1 - Content Expansion
- `3583d59` 쇼핑 탭 콘텐츠 대폭 확장 (5곳 -> 15곳)
- `9f30bd2` 축제 탭 신규 추가 (크리스마스 마켓 & 이벤트)
- `731f5d4` 근교 투어 탭 추가 (몬세라트, 지로나, 시제스)
- `2b85d5b` 탭 버튼 한줄 표시 + 근교 투어 카드 전체 너비 적용

### v1.2 - Astro Migration
- `77b0fd8` Astro 프레임워크로 전체 마이그레이션 + 신규 콘텐츠 추가
- `ac62d78` Node.js 22로 업그레이드 (Astro 6 요구사항)
- `299eed8` 탭 네비게이션 404 에러 수정 (base URL 슬래시 누락)

### v1.3 - UX Improvements
- `ccc22f1` 커스텀 404 페이지 추가 및 footer에 작성자(sangsang.park) 표기
- `9ea5fe7` 방문 장소 "sangsang 방문" 뱃지 표시 및 Hero 타이틀 변경
- `b60c66b` 핀터레스트 스타일 Masonry 레이아웃 적용
- `b228473` Masonry 레이아웃 카드 간 상하 여백 추가

### v1.4 - Card Images & Collapsible Map
- `f1c36e3` 각 카드에 Wikimedia Commons 기반 대표 이미지 추가
- `3bd78ec` 이미지 URL을 Wikimedia Special:FilePath 형식으로 변경
- `2d576b4` 접이식 Google Maps 구현 (버튼 클릭 시 애니메이션 확장)
- `2d576b4` 이미지 URL을 wsrv.nl 프록시로 전환 (Wikimedia 429 에러 해결)

### v1.5 - Cross-Browser Compatibility
- `e1603e2` 깨진 이미지 URL 수정 (wsrv.nl 인코딩 문제 해결)
- `6f690c0` CSS columns를 JS + Flexbox 기반 Masonry로 교체 (iOS Safari 호환)

## License

This project is for personal use.

---

Created by **sangsang.park**
