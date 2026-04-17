/**
 * ThreeMap.jsx  (MapLibre GL JS 기반 2.5D 인터랙티브 지도)
 *
 * 벡터 타일 방식: 뷰포트에 보이는 영역만 실시간 렌더링 → 성능 최적
 * OpenFreeMap liberty 스타일 타일 (무료, API 키 불필요)
 * pitch 48° + 3D 건물 레이어로 2.5D 시점 구현
 */

import { useEffect, useRef, useState } from 'react';

/* ── 카테고리 ─────────────────────────────────────── */
const CAT = {
  gaudi:      { color: '#9B59B6', label: '가우디',  emoji: '🏛️' },
  attraction: { color: '#3A6EC4', label: '명소',    emoji: '📍' },
  restaurant: { color: '#E74C3C', label: '맛집',    emoji: '🍽️' },
  dessert:    { color: '#E67E22', label: '디저트',  emoji: '🍰' },
  shopping:   { color: '#D4A04A', label: '쇼핑',    emoji: '🛍️' },
  daytrip:    { color: '#27AE60', label: '근교',    emoji: '🚌' },
};

/* ── 카테고리별 뷰 초기 설정 ──────────────────────── */
const DEFAULT_VIEW = { center: [2.1734, 41.3851], zoom: 13.2, pitch: 48, bearing: -8 };
const DAYTRIP_BOUNDS = [[1.65, 41.10], [3.10, 42.15]];

export default function ThreeMap({ locations = [] }) {
  const containerRef  = useRef(null);
  const mapRef        = useRef(null);   // maplibre Map instance
  const markersRef    = useRef([]);     // { marker, el, category }[]
  const popupRef      = useRef(null);

  const [ready,   setReady]   = useState(false);
  const [filters, setFilters] = useState(() => new Set(Object.keys(CAT)));

  /* ── 지도 초기화 ────────────────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    (async () => {
      /* MapLibre 동적 import (SSR 방지) */
      const [{ default: maplibregl }] = await Promise.all([
        import('maplibre-gl'),
        injectCSS('https://unpkg.com/maplibre-gl@5/dist/maplibre-gl.css', 'maplibre-css'),
      ]);
      if (cancelled) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        ...DEFAULT_VIEW,
        maxPitch: 65,
        antialias: true,
        attributionControl: { compact: true },
        localIdeographFontFamily: "'Noto Sans KR', sans-serif",
      });
      mapRef.current = map;

      /* 지도 로드 완료 ─────────────────────────────── */
      map.on('load', () => {
        if (cancelled) return;

        /* 3D 건물 레이어 */
        if (map.getSource('openmaptiles')) {
          map.addLayer({
            id: '3d-buildings',
            source: 'openmaptiles',
            'source-layer': 'building',
            type: 'fill-extrusion',
            minzoom: 14,
            paint: {
              'fill-extrusion-color': [
                'interpolate', ['linear'], ['zoom'],
                14, '#dbd4cc',
                17, '#c8c0b5',
              ],
              'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                14, 0,
                14.5, ['coalesce', ['get', 'render_height'], 0],
              ],
              'fill-extrusion-base': [
                'interpolate', ['linear'], ['zoom'],
                14, 0,
                14.5, ['coalesce', ['get', 'render_min_height'], 0],
              ],
              'fill-extrusion-opacity': 0.72,
            },
          });
        }

        /* 핀 마커 생성 ───────────────────────────────── */
        locations.forEach(loc => {
          const cat = CAT[loc.category];
          if (!cat) return;

          const el = createPinElement(loc, cat);

          const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
            .setLngLat(loc.coords)
            .addTo(map);

          el.addEventListener('click', e => {
            e.stopPropagation();
            openPopup(map, maplibregl, loc, cat);
          });

          markersRef.current.push({ marker, el, category: loc.category });
        });

        setReady(true);
      });

      /* 지도 클릭 시 팝업 닫기 */
      map.on('click', () => {
        if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
      });
    })();

    return () => {
      cancelled = true;
      markersRef.current.forEach(({ marker }) => marker.remove());
      markersRef.current = [];
      if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  /* ── 필터 적용 ────────────────────────────────────── */
  useEffect(() => {
    markersRef.current.forEach(({ el, category }) => {
      el.style.display = filters.has(category) ? '' : 'none';
    });

    const map = mapRef.current;
    if (!map) return;

    /* 근교만 선택 → 전체 범위로 줌 아웃 */
    const active = [...filters];
    if (active.length === 1 && active[0] === 'daytrip') {
      map.fitBounds(DAYTRIP_BOUNDS, { padding: 60, pitch: 30, duration: 800 });
    } else if (active.length > 0 && !active.every(c => c === 'daytrip') && map.getZoom() < 11) {
      map.flyTo({ ...DEFAULT_VIEW, duration: 700 });
    }
  }, [filters]);

  /* ── 필터 토글 ────────────────────────────────────── */
  const toggleFilter = cat => {
    setFilters(prev => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat); // 최소 1개는 유지
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setFilters(prev =>
      prev.size === Object.keys(CAT).length ? new Set(['gaudi']) : new Set(Object.keys(CAT))
    );
  };

  /* ── 팝업 열기 헬퍼 ────────────────────────────────── */
  function openPopup(map, maplibregl, loc, cat) {
    if (popupRef.current) { popupRef.current.remove(); popupRef.current = null; }

    map.flyTo({
      center: loc.coords,
      zoom: Math.max(map.getZoom(), 15.5),
      duration: 500,
      essential: true,
    });

    const popup = new maplibregl.Popup({
      offset: [0, -36],
      maxWidth: '300px',
      closeButton: true,
      closeOnClick: false,
      className: 'bcn-popup-wrap',
    })
      .setLngLat(loc.coords)
      .setHTML(popupHTML(loc, cat))
      .addTo(map);

    popupRef.current = popup;
  }

  /* ── 렌더 ────────────────────────────────────────── */
  return (
    <div className="bcn-map-root">

      {/* 필터 바 */}
      <div className="bcn-filters">
        <button
          className={`bcn-filter bcn-filter--all ${filters.size === Object.keys(CAT).length ? 'bcn-filter--on' : ''}`}
          onClick={toggleAll}
          title="전체 토글"
        >
          전체
        </button>
        {Object.entries(CAT).map(([key, { emoji, label, color }]) => (
          <button
            key={key}
            className={`bcn-filter ${filters.has(key) ? 'bcn-filter--on' : ''}`}
            style={{ '--filter-color': color }}
            onClick={() => toggleFilter(key)}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* 지도 래퍼 */}
      <div className="bcn-map-wrap">
        {!ready && (
          <div className="bcn-map-loading">
            <div className="bcn-map-loading__spinner" />
            <span>지도 불러오는 중…</span>
          </div>
        )}

        <div ref={containerRef} className="bcn-map-canvas" />

        {/* 조작 힌트 */}
        {ready && (
          <div className="bcn-3d-hint">
            <span>🖱️ 드래그·이동</span>
            <span>⚲ 스크롤·줌</span>
            <span>🖱️ 우클릭·회전</span>
            <span>📍 핀 클릭</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   헬퍼: CSS 동적 주입
────────────────────────────────────────────────── */
function injectCSS(href, id) {
  return new Promise(resolve => {
    if (document.getElementById(id)) { resolve(); return; }
    const link = Object.assign(document.createElement('link'), {
      id, rel: 'stylesheet', href,
    });
    link.onload = resolve;
    link.onerror = resolve; // 실패해도 진행
    document.head.appendChild(link);
  });
}

/* ──────────────────────────────────────────────────
   헬퍼: 핀 DOM 엘리먼트 생성
────────────────────────────────────────────────── */
function createPinElement(loc, cat) {
  const el = document.createElement('div');
  el.className = `bcn-marker bcn-marker--${loc.category}`;
  el.style.setProperty('--pin-color', cat.color);
  el.title = loc.name;

  el.innerHTML = `
    <div class="bcn-marker__body">
      <span class="bcn-marker__emoji">${cat.emoji}</span>
    </div>
    <div class="bcn-marker__needle"></div>
    ${loc.visited ? '<div class="bcn-marker__visited">✓</div>' : ''}
  `;
  return el;
}

/* ──────────────────────────────────────────────────
   헬퍼: 팝업 HTML
────────────────────────────────────────────────── */
function popupHTML(loc, cat) {
  const rows = [
    loc.price   && `<div class="bcn-popup__row"><span class="bcn-popup__icon">💰</span>${loc.price}</div>`,
    loc.address && `<div class="bcn-popup__row"><span class="bcn-popup__icon">📍</span>${loc.address}</div>`,
    loc.desc    && `<div class="bcn-popup__desc">${loc.desc}</div>`,
  ].filter(Boolean).join('');

  const link = loc.mapLink
    ? `<a class="bcn-popup__link" href="${loc.mapLink}" target="_blank" rel="noopener noreferrer">
         🗺️ Google Maps에서 보기
       </a>`
    : '';

  return `
    <div class="bcn-popup">
      <div class="bcn-popup__cat" style="color:${cat.color}">${cat.emoji} ${cat.label}</div>
      <div class="bcn-popup__name">${loc.name}</div>
      <div class="bcn-popup__name-en">${loc.nameEn || ''}</div>
      ${rows}
      ${link}
    </div>
  `;
}
