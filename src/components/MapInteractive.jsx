import { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────
   Category config
───────────────────────────────────────── */
const CATEGORIES = {
  gaudi:      { color: '#9B59B6', border: '#7D3C98', label: '가우디',  emoji: '🏛️' },
  attraction: { color: '#3A6EC4', border: '#2C5AA0', label: '명소',    emoji: '📍' },
  restaurant: { color: '#E74C3C', border: '#C0392B', label: '맛집',    emoji: '🍽️' },
  dessert:    { color: '#E67E22', border: '#D35400', label: '디저트',  emoji: '🍰' },
  shopping:   { color: '#D4A04A', border: '#B8860B', label: '쇼핑',    emoji: '🛍️' },
  daytrip:    { color: '#27AE60', border: '#1E8449', label: '근교',    emoji: '🚌' },
};

const BARCELONA_CENTER = [2.1734, 41.3851];
const BARCELONA_ZOOM   = 13.2;
const BARCELONA_PITCH  = 48;
const BARCELONA_BEARING = -8;

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function MapInteractive({ locations = [] }) {
  const containerRef  = useRef(null);
  const mapRef        = useRef(null);
  const markersRef    = useRef([]);
  const mlglRef       = useRef(null);

  const [mapReady, setMapReady]           = useState(false);
  const [selected, setSelected]           = useState(null);
  const [active, setActive]               = useState(() => new Set(Object.keys(CATEGORIES)));
  const [isAnimating, setIsAnimating]     = useState(false);

  /* ── 1. MapLibre 초기화 ── */
  useEffect(() => {
    let map;
    (async () => {
      /* CSS */
      if (!document.getElementById('mlgl-css')) {
        const l = document.createElement('link');
        l.id   = 'mlgl-css';
        l.rel  = 'stylesheet';
        l.href = 'https://unpkg.com/maplibre-gl@5/dist/maplibre-gl.css';
        document.head.appendChild(l);
      }

      const mlgl = (await import('maplibre-gl')).default;
      mlglRef.current = mlgl;

      map = new mlgl.Map({
        container:  containerRef.current,
        style:      'https://tiles.openfreemap.org/styles/liberty',
        center:     BARCELONA_CENTER,
        zoom:       BARCELONA_ZOOM,
        pitch:      BARCELONA_PITCH,
        bearing:    BARCELONA_BEARING,
        antialias:  true,
        maxBounds:  [[-0.5, 40.2], [4.5, 43.2]], // Catalonia region bounds
      });

      mapRef.current = map;

      map.addControl(new mlgl.NavigationControl({ visualizePitch: true }), 'top-right');
      map.addControl(new mlgl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-right');

      map.on('load', () => {
        /* 3-D buildings */
        try {
          map.addLayer({
            id:     '3d-buildings',
            source: 'openmaptiles',
            'source-layer': 'building',
            type:   'fill-extrusion',
            minzoom: 14,
            paint: {
              'fill-extrusion-color':   '#e8ddd4',
              'fill-extrusion-height':  ['coalesce', ['get', 'render_height'], ['get', 'height'], 5],
              'fill-extrusion-base':    ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0],
              'fill-extrusion-opacity': 0.55,
            },
          });
        } catch (_) { /* style may already have buildings */ }

        setMapReady(true);
      });
    })();

    return () => { map?.remove(); };
  }, []);

  /* ── 2. 마커 렌더링 ── */
  useEffect(() => {
    if (!mapReady || !mapRef.current || !mlglRef.current) return;

    /* clear old markers */
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    locations.forEach(loc => {
      if (!active.has(loc.category)) return;

      const cat = CATEGORIES[loc.category];

      const el = document.createElement('div');
      el.className = 'bcn-marker';
      el.setAttribute('data-id', loc.id);
      el.innerHTML = `
        <div class="bcn-marker__pin" style="background:${cat.color};border-color:${cat.border}">
          <span class="bcn-marker__emoji">${cat.emoji}</span>
          ${loc.visited ? '<span class="bcn-marker__check">✓</span>' : ''}
        </div>
        <div class="bcn-marker__spike" style="border-top-color:${cat.color}"></div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelected(loc);
        if (!isAnimating) {
          setIsAnimating(true);
          mapRef.current.flyTo({
            center:   loc.coords,
            zoom:     Math.max(mapRef.current.getZoom(), 15),
            pitch:    50,
            duration: 700,
            essential: true,
          });
          setTimeout(() => setIsAnimating(false), 750);
        }
      });

      const marker = new mlglRef.current.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(loc.coords)
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });
  }, [mapReady, locations, active]);

  /* ── 3. 카테고리 토글 ── */
  const toggleCat = useCallback((key) => {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size === 1) return prev; // 최소 1개 유지
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    setSelected(null);
  }, []);

  /* ── 4. 근교 전용 선택 시 줌 아웃 ── */
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const isDaytripOnly = active.size === 1 && active.has('daytrip');

    if (isDaytripOnly) {
      const pts = locations.filter(l => l.category === 'daytrip');
      if (pts.length) {
        const lngs = pts.map(l => l.coords[0]);
        const lats = pts.map(l => l.coords[1]);
        mapRef.current.fitBounds(
          [[Math.min(...lngs) - 0.15, Math.min(...lats) - 0.15],
           [Math.max(...lngs) + 0.15, Math.max(...lats) + 0.15]],
          { padding: 60, pitch: 20, duration: 900, essential: true },
        );
      }
    } else {
      mapRef.current.flyTo({
        center:  BARCELONA_CENTER,
        zoom:    BARCELONA_ZOOM,
        pitch:   BARCELONA_PITCH,
        bearing: BARCELONA_BEARING,
        duration: 800,
        essential: true,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mapReady]);

  /* ── 5. 지도 클릭 시 팝업 닫기 ── */
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const handler = () => setSelected(null);
    mapRef.current.on('click', handler);
    return () => mapRef.current?.off('click', handler);
  }, [mapReady]);

  /* ─────── render ─────── */
  return (
    <div className="bcn-map-root">

      {/* 카테고리 필터 */}
      <div className="bcn-filters" role="toolbar" aria-label="카테고리 필터">
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const isOn = active.has(key);
          return (
            <button
              key={key}
              className={`bcn-filter${isOn ? ' bcn-filter--on' : ''}`}
              style={{ '--cc': cat.color }}
              onClick={() => toggleCat(key)}
              aria-pressed={isOn}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className="bcn-filter__dot" />
            </button>
          );
        })}
      </div>

      {/* 지도 */}
      <div className="bcn-map-wrap">
        <div ref={containerRef} className="bcn-map-canvas" />

        {/* 로딩 오버레이 */}
        {!mapReady && (
          <div className="bcn-map-loading">
            <div className="bcn-map-spinner" />
            <span>지도 불러오는 중…</span>
          </div>
        )}

        {/* 선택 팝업 카드 */}
        {selected && (
          <div className="bcn-popup" role="dialog" aria-label={selected.name}>
            <button
              className="bcn-popup__close"
              onClick={() => setSelected(null)}
              aria-label="닫기"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div
              className="bcn-popup__badge"
              style={{ background: CATEGORIES[selected.category].color }}
            >
              {CATEGORIES[selected.category].emoji}&nbsp;{CATEGORIES[selected.category].label}
              {selected.visited && <span className="bcn-popup__visited">✓ 방문</span>}
            </div>

            <p className="bcn-popup__name">{selected.name}</p>
            {selected.nameEn && (
              <p className="bcn-popup__name-en">{selected.nameEn}</p>
            )}

            {selected.price && (
              <p className="bcn-popup__price">
                <i className="fa-solid fa-coins" />&nbsp;{selected.price}
              </p>
            )}

            {selected.address && (
              <p className="bcn-popup__addr">
                <i className="fa-solid fa-location-dot" />&nbsp;{selected.address}
              </p>
            )}

            {selected.desc && (
              <p className="bcn-popup__desc">{selected.desc}</p>
            )}

            {selected.mapLink && (
              <a
                href={selected.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bcn-popup__link"
              >
                <i className="fa-brands fa-google" />
                Google Maps에서 보기
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* 핀 수 안내 */}
      <p className="bcn-map-hint">
        <i className="fa-solid fa-circle-info" />
        {locations.filter(l => active.has(l.category)).length}개 장소 표시 중 &middot; 핀을 클릭하면 상세 정보를 볼 수 있어요
      </p>
    </div>
  );
}
