/**
 * ThreeMap.jsx
 * Three.js 기반 바르셀로나 + 근교 3D 인터랙티브 지도
 *
 * 지리 범위: lng 1.0~3.5 / lat 40.8~42.5 (카탈루냐 전역)
 * 지도 텍스처: 캔버스로 직접 그린 일러스트 스타일 지도
 *   - 상세 해안선 (50+ 좌표점)
 *   - 산악 지형 (몬세라트, 피레네, 콜세롤라, 가라프)
 *   - 도로망 (AP-7, A-2, C-32, C-16, C-17)
 *   - 철도 (AVE/Renfe + FGC)
 *   - 하천, 도시, 지명 라벨, 나침반
 */

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────
   카테고리 설정
───────────────────────────────────── */
const CAT = {
  gaudi:      { color: '#9B59B6', hex: 0x9B59B6, label: '가우디',  emoji: '🏛️' },
  attraction: { color: '#3A6EC4', hex: 0x3A6EC4, label: '명소',    emoji: '📍' },
  restaurant: { color: '#E74C3C', hex: 0xE74C3C, label: '맛집',    emoji: '🍽️' },
  dessert:    { color: '#E67E22', hex: 0xE67E22, label: '디저트',  emoji: '🍰' },
  shopping:   { color: '#D4A04A', hex: 0xD4A04A, label: '쇼핑',    emoji: '🛍️' },
  daytrip:    { color: '#27AE60', hex: 0x27AE60, label: '근교',    emoji: '🚌' },
};

/* ─────────────────────────────────────
   지리 상수 (Three.js 씬 좌표계와 공유)
───────────────────────────────────── */
const LNG_MIN = 1.0,  LNG_MAX = 3.5;
const LAT_MIN = 40.8, LAT_MAX = 42.5;
const MAP_W   = 14,   MAP_H   = 9.5;

/** GeoJSON [lng, lat] → Three.js {x, z} */
function geo2xz(lng, lat) {
  const x = (lng - LNG_MIN) / (LNG_MAX - LNG_MIN) * MAP_W - MAP_W / 2;
  const z = -((lat - LAT_MIN) / (LAT_MAX - LAT_MIN) * MAP_H - MAP_H / 2);
  return { x, z };
}

/** 위치별 지형 고도 (Three.js 정점 변위용) */
function terrainElevation(lng, lat) {
  let e = 0;

  // 피레네 산맥 (북쪽)
  if (lat > 41.8) {
    const f = Math.max(0, (lat - 41.8) / 0.65);
    e += f * f * 1.35;
    e += Math.sin(lng * 6.8 + 1.1) * f * 0.10;
  }
  // 전피레네 구릉 (내륙 중부)
  const prePyr = Math.max(0, 0.22 - Math.abs(lat - 41.65) * 3.0)
               * Math.max(0, 1 - (lng - 1.2) / 1.4);
  e += prePyr * 0.38;

  // 몬세라트 (1.83, 41.59) - 특징적인 뾰족한 봉우리들
  const dM = Math.hypot((lng - 1.83) * 1.3, lat - 41.59);
  e += Math.max(0, 0.62 - dM * 4.3) * 1.12;

  // 콜세롤라 능선 (바르셀로나 뒤편 2.07, 41.46)
  const dC = Math.hypot((lng - 2.07) * 3.2, lat - 41.46);
  e += Math.max(0, 0.18 - dC * 2.9) * 0.44;

  // 가라프 해안 절벽 (Sitges-Barcelona 사이)
  const dG = Math.hypot((lng - 1.86) * 1.8, lat - 41.31);
  e += Math.max(0, 0.17 - dG * 3.3) * 0.38;

  // 몬트네그레 (마타로 북쪽 2.52, 41.64)
  const dMn = Math.hypot((lng - 2.52) * 2.5, lat - 41.64);
  e += Math.max(0, 0.14 - dMn * 3.6) * 0.28;

  return Math.max(0, e);
}

/* ═══════════════════════════════════════════════════════════
   캔버스 지도 텍스처 — 새로 그린 일러스트 스타일
═══════════════════════════════════════════════════════════ */
function createMapTexture() {
  const CW = 2048, CH = 1400;
  const cvs = document.createElement('canvas');
  cvs.width = CW; cvs.height = CH;
  const ctx = cvs.getContext('2d');

  /* 지리 좌표 → 캔버스 픽셀 */
  const g = (lng, lat) => [
    (lng - LNG_MIN) / (LNG_MAX - LNG_MIN) * CW,
    (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * CH,
  ];

  /* ── 유틸리티 ── */
  const linePath = (pts) => {
    ctx.beginPath();
    ctx.moveTo(...g(...pts[0]));
    for (let i = 1; i < pts.length; i++) ctx.lineTo(...g(...pts[i]));
  };
  const strokeLine = (pts) => { linePath(pts); ctx.stroke(); };

  const fillPoly = (pts, fillStyle) => {
    ctx.beginPath();
    ctx.moveTo(...g(...pts[0]));
    for (let i = 1; i < pts.length; i++) ctx.lineTo(...g(...pts[i]));
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  };

  /* ════════════════════════════════════
     1. 바다 배경
  ════════════════════════════════════ */
  const seaGrad = ctx.createLinearGradient(CW, 0, 0, CH * 0.7);
  seaGrad.addColorStop(0,   '#174f75');
  seaGrad.addColorStop(0.5, '#1d6390');
  seaGrad.addColorStop(1,   '#2474a8');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, 0, CW, CH);

  // 파도 잔물결
  ctx.save();
  for (let row = 0; row < 28; row++) {
    const by = (row / 28) * CH;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,255,255,${0.03 + (row % 3) * 0.015})`;
    ctx.lineWidth = 0.8;
    for (let px = 0; px <= CW; px += 5) {
      const py = by + Math.sin(px / 52 + row * 0.85) * 3.2
                    + Math.sin(px / 21 + row * 1.6) * 1.4;
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();

  /* ════════════════════════════════════
     2. 카탈루냐 육지 — 상세 해안선 (55 포인트)
  ════════════════════════════════════ */
  const LAND = [
    // ── 서쪽 경계 (아라곤/발렌시아) ──
    [0.87, 40.82],
    [0.88, 41.00], [0.92, 41.22], [0.95, 41.42],
    [0.98, 41.62], [1.02, 41.82], [1.08, 42.05],
    [1.15, 42.25], [1.30, 42.38], [1.43, 42.48],
    // ── 피레네 · 프랑스 국경 ──
    [1.65, 42.50], [1.88, 42.50], [2.12, 42.48],
    [2.38, 42.47], [2.62, 42.46], [2.86, 42.44],
    [3.05, 42.44], [3.17, 42.44],
    // ── 지중해 해안 북단 (Costa Brava) ──
    [3.21, 42.38],              // Llançà
    [3.19, 42.34],              // Port de la Selva
    [3.31, 42.32],              // Cap de Creus ★ 최동단
    [3.26, 42.28],              // Cadaqués
    [3.20, 42.25],
    [3.18, 42.27],              // Roses (만 안쪽)
    [3.13, 42.23],
    [3.10, 42.17],
    [3.13, 42.12],              // L'Escala
    [3.08, 42.08],
    [3.22, 42.04],              // Estartit (반도)
    [3.20, 41.98],
    [3.17, 41.93],              // Palafrugell
    [3.08, 41.87],              // Palamós
    [3.03, 41.84],              // Platja d'Aro
    [2.99, 41.81],              // Sant Feliu de Guíxols
    [2.94, 41.74],
    [2.93, 41.72],              // Tossa de Mar
    [2.84, 41.70],              // Lloret de Mar
    [2.79, 41.67],              // Blanes
    [2.73, 41.65],              // Malgrat
    [2.66, 41.62],              // Calella
    [2.58, 41.59],              // Canet de Mar
    [2.52, 41.57],              // Sant Pol
    [2.45, 41.54],              // Mataró
    [2.35, 41.50],
    [2.31, 41.48],              // El Masnou
    [2.24, 41.45],              // Badalona
    [2.19, 41.42],
    [2.20, 41.38],              // Barcelona (북동 항구 쪽)
    [2.17, 41.37],              // Barcelona 중심 해안
    [2.12, 41.33],              // El Prat 델타
    [2.06, 41.30],
    [1.97, 41.27],              // Castelldefels
    [1.93, 41.26],
    [1.88, 41.25],              // Garraf 절벽 시작
    [1.81, 41.23],              // Sitges ★
    [1.73, 41.22],              // Vilanova i la Geltrú
    [1.65, 41.20],              // Cubelles
    [1.57, 41.19],              // Calafell
    [1.48, 41.17],              // Creixell
    [1.40, 41.15],              // Torredembarra
    [1.31, 41.13],
    [1.25, 41.12],              // Tarragona ★
    [1.14, 41.08],
    [1.06, 41.07],              // Cambrils
    [0.98, 41.03],
    [0.90, 40.97],
    [0.87, 40.88],
    [0.87, 40.82],              // 시작점으로 돌아옴
  ];

  /* 육지 기본 채우기 */
  ctx.beginPath();
  ctx.moveTo(...g(...LAND[0]));
  LAND.forEach(p => ctx.lineTo(...g(...p)));
  ctx.closePath();

  const landGrad = ctx.createLinearGradient(CW * 0.1, CH * 0.1, CW * 0.6, CH * 0.9);
  landGrad.addColorStop(0,   '#f2e8c6');
  landGrad.addColorStop(0.4, '#ebdcb0');
  landGrad.addColorStop(0.75,'#e3d4a2');
  landGrad.addColorStop(1,   '#daca96');
  ctx.fillStyle = landGrad;
  ctx.fill();

  /* 육지 클리핑 - 지형 효과들을 육지 안에만 그림 */
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(...g(...LAND[0]));
  LAND.forEach(p => ctx.lineTo(...g(...p)));
  ctx.closePath();
  ctx.clip();

  /* ════════════════════════════════════
     3. 지형 음영 (육지 클립 내부)
  ════════════════════════════════════ */

  // ── 피레네 산맥 ──
  const [, pyrTop] = g(2, 42.50);
  const [, pyrBot] = g(2, 41.85);
  const pyrGrad = ctx.createLinearGradient(0, pyrTop, 0, pyrBot + 60);
  pyrGrad.addColorStop(0,    'rgba(215,220,232,0.95)'); // 설원
  pyrGrad.addColorStop(0.18, 'rgba(188,182,168,0.80)'); // 암석
  pyrGrad.addColorStop(0.45, 'rgba(168,155,138,0.52)'); // 사면
  pyrGrad.addColorStop(0.75, 'rgba(158,148,130,0.22)');
  pyrGrad.addColorStop(1,    'rgba(158,148,130,0)');
  ctx.fillStyle = pyrGrad;
  ctx.fillRect(0, pyrTop, CW * 0.72, pyrBot - pyrTop + 120);

  // 개별 피레네 봉우리들
  [[1.50,42.47],[1.72,42.50],[1.95,42.49],[2.15,42.48],
   [2.38,42.47],[2.58,42.46],[2.78,42.44],[3.00,42.44],[3.12,42.44]
  ].forEach(([lng, lat], i) => {
    const [px, py] = g(lng, lat);
    const r = 48 + (i % 3) * 8;
    const gr = ctx.createRadialGradient(px, py, 0, px, py, r);
    gr.addColorStop(0,    'rgba(228,232,242,0.82)');
    gr.addColorStop(0.28, 'rgba(198,192,178,0.60)');
    gr.addColorStop(0.65, 'rgba(172,162,144,0.30)');
    gr.addColorStop(1,    'rgba(172,162,144,0)');
    ctx.fillStyle = gr;
    ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
  });

  // ── 전피레네 구릉지 ──
  [[1.40,41.90],[1.62,41.80],[1.82,41.72],[2.00,41.67],
   [2.20,41.64],[2.40,41.66],[2.58,41.70]
  ].forEach(([lng, lat]) => {
    const [px, py] = g(lng, lat);
    const gr = ctx.createRadialGradient(px, py, 0, px, py, 44);
    gr.addColorStop(0,   'rgba(172,155,128,0.52)');
    gr.addColorStop(0.5, 'rgba(172,155,128,0.24)');
    gr.addColorStop(1,   'rgba(172,155,128,0)');
    ctx.fillStyle = gr;
    ctx.beginPath(); ctx.arc(px, py, 44, 0, Math.PI * 2); ctx.fill();
  });

  // ── 몬세라트 — 특징적인 톱니 능선 ──
  const [mnx, mny] = g(1.83, 41.595);
  // 큰 산덩어리
  const mnBase = ctx.createRadialGradient(mnx, mny - 8, 0, mnx, mny, 76);
  mnBase.addColorStop(0,   'rgba(142,112,74,0.90)');
  mnBase.addColorStop(0.30,'rgba(152,124,88,0.68)');
  mnBase.addColorStop(0.60,'rgba(162,136,102,0.38)');
  mnBase.addColorStop(1,   'rgba(162,136,102,0)');
  ctx.fillStyle = mnBase;
  ctx.beginPath(); ctx.arc(mnx, mny, 76, 0, Math.PI * 2); ctx.fill();

  // 톱니 능선 실루엣
  const RIDGE = [
    [1.763,41.588],[1.773,41.608],[1.783,41.596],[1.793,41.618],
    [1.803,41.604],[1.814,41.625],[1.826,41.612],[1.838,41.598],
    [1.850,41.608],[1.860,41.594],[1.868,41.578],[1.862,41.562],
    [1.848,41.558],[1.832,41.560],[1.816,41.556],[1.800,41.562],
    [1.783,41.570],[1.763,41.588],
  ];
  ctx.beginPath();
  ctx.moveTo(...g(...RIDGE[0]));
  RIDGE.slice(1).forEach(p => ctx.lineTo(...g(...p)));
  ctx.closePath();
  ctx.fillStyle = 'rgba(115,85,52,0.56)';
  ctx.fill();
  // 능선 하이라이트 (북서 사면)
  ctx.strokeStyle = 'rgba(200,180,150,0.30)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  [[1.773,41.608],[1.793,41.618],[1.814,41.625],[1.826,41.612]].forEach((p,i) => {
    i === 0 ? ctx.moveTo(...g(...p)) : ctx.lineTo(...g(...p));
  });
  ctx.stroke();

  // ── 콜세롤라 능선 (바르셀로나 북서쪽) ──
  [[1.96,41.50],[2.02,41.48],[2.07,41.47],[2.13,41.47],[2.20,41.48],[2.24,41.49]
  ].forEach(([lng, lat]) => {
    const [px, py] = g(lng, lat);
    const gr = ctx.createRadialGradient(px, py, 0, px, py, 30);
    gr.addColorStop(0,   'rgba(100,135,72,0.58)');
    gr.addColorStop(0.5, 'rgba(108,142,80,0.28)');
    gr.addColorStop(1,   'rgba(108,142,80,0)');
    ctx.fillStyle = gr;
    ctx.beginPath(); ctx.arc(px, py, 30, 0, Math.PI * 2); ctx.fill();
  });

  // ── 가라프 해안 절벽 (Sitges-BCN 사이) ──
  const [gfx, gfy] = g(1.87, 41.305);
  const gfGr = ctx.createRadialGradient(gfx, gfy, 0, gfx, gfy, 50);
  gfGr.addColorStop(0,   'rgba(148,128,98,0.64)');
  gfGr.addColorStop(0.5, 'rgba(155,135,105,0.32)');
  gfGr.addColorStop(1,   'rgba(155,135,105,0)');
  ctx.fillStyle = gfGr;
  ctx.beginPath(); ctx.arc(gfx, gfy, 50, 0, Math.PI * 2); ctx.fill();

  // ── 몬트네그레 (마타로 북쪽) ──
  const [mngx, mngy] = g(2.54, 41.655);
  const mnGr2 = ctx.createRadialGradient(mngx, mngy, 0, mngx, mngy, 36);
  mnGr2.addColorStop(0,   'rgba(125,150,88,0.52)');
  mnGr2.addColorStop(1,   'rgba(125,150,88,0)');
  ctx.fillStyle = mnGr2;
  ctx.beginPath(); ctx.arc(mngx, mngy, 36, 0, Math.PI * 2); ctx.fill();

  // ── 삼림 지대 (내륙 녹색 틴트) ──
  [
    [1.92,41.85,58],[2.12,41.76,52],[2.30,41.80,56],[1.68,41.93,52],
    [1.48,42.08,46],[2.58,42.12,52],[2.82,42.22,55],[3.05,42.30,50],
    [2.44,41.85,44],[1.85,42.15,42],
  ].forEach(([lng, lat, r]) => {
    const [fx, fy] = g(lng, lat);
    const fGr = ctx.createRadialGradient(fx, fy, 0, fx, fy, r);
    fGr.addColorStop(0,   'rgba(88,135,72,0.30)');
    fGr.addColorStop(0.55,'rgba(95,142,78,0.14)');
    fGr.addColorStop(1,   'rgba(95,142,78,0)');
    ctx.fillStyle = fGr;
    ctx.beginPath(); ctx.arc(fx, fy, r, 0, Math.PI * 2); ctx.fill();
  });

  /* ════════════════════════════════════
     4. 하천
  ════════════════════════════════════ */
  ctx.strokeStyle = 'rgba(75,125,192,0.52)';
  ctx.lineWidth = 2.2;
  ctx.lineJoin = ctx.lineCap = 'round';

  // 로브레갓 (바르셀로나 남쪽, 북서 내륙에서 흘러옴)
  strokeLine([[2.09,41.32],[1.99,41.38],[1.94,41.45],[1.90,41.53],
              [1.88,41.62],[1.87,41.73],[1.89,41.87]]);
  // 아노이아 (로브레갓 지류)
  strokeLine([[1.90,41.48],[1.78,41.53],[1.65,41.57],[1.55,41.59]]);
  // 베소스 (바르셀로나 북쪽)
  strokeLine([[2.22,41.43],[2.26,41.50],[2.30,41.58],[2.35,41.68]]);
  // 테르 (지로나 통과)
  strokeLine([[2.82,41.97],[2.90,42.04],[2.98,42.10],[3.06,42.15],[3.11,42.20]]);
  // 플루비아 (엠포르다)
  strokeLine([[3.10,42.17],[3.00,42.20],[2.84,42.23],[2.68,42.22],[2.55,42.18]]);
  // 카르도네르 (마네사 부근)
  ctx.lineWidth = 1.5;
  strokeLine([[1.83,41.73],[1.82,41.62],[1.83,41.55]]);

  ctx.restore(); // 육지 클립 해제

  /* ════════════════════════════════════
     5. 해안선 (육지 클립 밖 — 해안 빛 테두리)
  ════════════════════════════════════ */
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(...g(...LAND[0]));
  LAND.forEach(p => ctx.lineTo(...g(...p)));
  ctx.closePath();
  // 얕은 바다 (해안 근처 밝은 파란)
  ctx.strokeStyle = 'rgba(90,170,215,0.40)';
  ctx.lineWidth = 14;
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.strokeStyle = 'rgba(110,185,228,0.22)';
  ctx.lineWidth = 28;
  ctx.stroke();
  // 메인 해안선
  ctx.strokeStyle = 'rgba(42,80,130,0.62)';
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();

  /* ════════════════════════════════════
     6. 격자선 (위도/경도)
  ════════════════════════════════════ */
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.052)';
  ctx.lineWidth = 0.9;
  ctx.setLineDash([5, 12]);
  for (let lng = 1.5; lng < 3.5; lng += 0.5) {
    ctx.beginPath();
    ctx.moveTo(...g(lng, LAT_MIN)); ctx.lineTo(...g(lng, LAT_MAX)); ctx.stroke();
  }
  for (let lat = 41.0; lat < 42.5; lat += 0.5) {
    ctx.beginPath();
    ctx.moveTo(...g(LNG_MIN, lat)); ctx.lineTo(...g(LNG_MAX, lat)); ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.restore();

  /* ════════════════════════════════════
     7. 도로망
  ════════════════════════════════════ */
  const road = (pts, color, w, shadow = true) => {
    ctx.save();
    ctx.lineJoin = ctx.lineCap = 'round';
    if (shadow) {
      linePath(pts);
      ctx.strokeStyle = 'rgba(90,55,10,0.25)';
      ctx.lineWidth = w + 2.5;
      ctx.stroke();
    }
    linePath(pts);
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.stroke();
    ctx.restore();
  };
  const dashRoad = (pts, color, w) => {
    ctx.save();
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.setLineDash([8, 6]);
    linePath(pts);
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  };

  // AP-7 / E-15  지중해 고속도로 (주 남북 간선)
  road([
    [3.08,42.42],[2.96,42.27],[2.87,42.12],[2.84,41.98],
    [2.77,41.87],[2.63,41.73],[2.52,41.62],[2.41,41.55],
    [2.27,41.48],[2.20,41.43],[2.15,41.38],[2.07,41.33],
    [1.97,41.28],[1.83,41.22],[1.48,41.14],[1.24,41.10],
    [1.07,41.06],[0.93,40.98],
  ], '#DFA020', 4.0);

  // A-2 / E-90  바르셀로나 → 마드리드 (서쪽)
  road([
    [2.15,41.38],[2.04,41.42],[1.94,41.44],[1.87,41.48],
    [1.78,41.55],[1.67,41.58],[1.55,41.61],[1.40,41.64],[1.22,41.64],
  ], '#DFA020', 3.2);

  // C-32  바르셀로나 → Sitges 해안 고속도로
  road([
    [2.10,41.36],[2.03,41.33],[1.97,41.29],[1.92,41.27],
    [1.87,41.25],[1.81,41.23],[1.73,41.22],
  ], '#C8901A', 2.8);

  // C-16 / E-9  바르셀로나 → 몬세라트 → 마네사
  road([
    [2.10,41.38],[2.03,41.43],[1.96,41.47],[1.91,41.47],
    [1.87,41.52],[1.85,41.58],[1.84,41.66],[1.83,41.74],
    [1.83,41.85],[1.82,42.02],[1.82,42.15],
  ], '#C8901A', 2.8);

  // C-17  바르셀로나 → Granollers → Vic → 피레네
  road([
    [2.16,41.43],[2.23,41.52],[2.30,41.61],[2.28,41.73],
    [2.26,41.83],[2.25,41.93],[2.22,42.06],[2.20,42.20],[2.12,42.40],
  ], '#C8901A', 2.8);

  // B-20 (바르셀로나 외곽 순환)
  dashRoad([
    [2.16,41.42],[2.10,41.46],[2.05,41.47],[2.00,41.46],
    [1.97,41.43],[1.98,41.39],[2.02,41.36],[2.08,41.35],
  ], '#BF8818', 2.2);

  // N-II  구 해안 국도 (점선)
  dashRoad([
    [2.84,41.98],[2.72,41.86],[2.60,41.73],[2.47,41.60],
    [2.40,41.55],[2.28,41.48],[2.20,41.43],
  ], '#C89825', 1.8);

  /* ════════════════════════════════════
     8. 철도
  ════════════════════════════════════ */
  const rail = (pts, w = 2.4, dashA = 9, dashB = 5) => {
    ctx.save();
    ctx.lineJoin = ctx.lineCap = 'round';
    // 레일 몸통
    ctx.strokeStyle = 'rgba(55,55,65,0.75)';
    ctx.lineWidth = w;
    ctx.setLineDash([dashA, dashB]);
    linePath(pts); ctx.stroke();
    // 침목 하이라이트
    ctx.strokeStyle = 'rgba(255,255,255,0.42)';
    ctx.lineWidth = w * 0.45;
    ctx.setLineDash([3, dashA + dashB - 3]);
    linePath(pts); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  };

  // Renfe AVE/Regional — 바르셀로나 → 지로나 → 프랑스
  rail([
    [2.17,41.40],[2.25,41.48],[2.33,41.55],[2.44,41.58],
    [2.56,41.63],[2.67,41.74],[2.76,41.86],[2.83,41.98],
    [2.88,42.10],[2.91,42.22],[3.00,42.32],[3.10,42.42],
  ], 2.8);

  // Renfe R2-Sud — 바르셀로나 → Sitges → Tarragona
  rail([
    [2.18,41.38],[2.10,41.35],[2.02,41.31],[1.96,41.28],
    [1.90,41.26],[1.81,41.23],[1.72,41.22],
    [1.60,41.19],[1.42,41.14],[1.25,41.11],
  ], 2.5);

  // FGC R5 — 바르셀로나 → 몬세라트 → 마네사
  rail([
    [2.13,41.39],[2.07,41.43],[1.99,41.44],[1.91,41.47],
    [1.87,41.52],[1.85,41.58],[1.83,41.65],[1.82,41.74],
  ], 2.0, 6, 4);

  /* ════════════════════════════════════
     9. 바르셀로나 도심 표현
  ════════════════════════════════════ */
  const [bcnX, bcnY] = g(2.175, 41.395);

  // 도시 영역 글로우
  const bcnArea = ctx.createRadialGradient(bcnX, bcnY, 0, bcnX, bcnY, 80);
  bcnArea.addColorStop(0,   'rgba(200,130,75,0.42)');
  bcnArea.addColorStop(0.38,'rgba(200,130,75,0.22)');
  bcnArea.addColorStop(0.70,'rgba(200,130,75,0.08)');
  bcnArea.addColorStop(1,   'rgba(200,130,75,0)');
  ctx.fillStyle = bcnArea;
  ctx.beginPath(); ctx.arc(bcnX, bcnY, 80, 0, Math.PI * 2); ctx.fill();

  // 에이샴플라 격자 힌트 (바르셀로나 특유의 팔각 블록)
  ctx.save();
  ctx.translate(bcnX, bcnY);
  ctx.rotate(-0.08); // 약간 기울어진 그리드
  ctx.strokeStyle = 'rgba(110,72,35,0.12)';
  ctx.lineWidth = 0.9;
  for (let i = -6; i <= 6; i++) {
    const s = i * 7;
    ctx.beginPath(); ctx.moveTo(s - 42, -42); ctx.lineTo(s + 42, 42); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-42, s - 42); ctx.lineTo(42, s + 42); ctx.stroke();
  }
  ctx.restore();

  // 몬주익 (바르셀로나 서쪽 언덕)
  const [mjx, mjy] = g(2.156, 41.360);
  const mjGr = ctx.createRadialGradient(mjx, mjy, 0, mjx, mjy, 24);
  mjGr.addColorStop(0,   'rgba(95,132,65,0.62)');
  mjGr.addColorStop(0.6, 'rgba(95,132,65,0.25)');
  mjGr.addColorStop(1,   'rgba(95,132,65,0)');
  ctx.fillStyle = mjGr;
  ctx.beginPath(); ctx.arc(mjx, mjy, 24, 0, Math.PI * 2); ctx.fill();

  // 항구 (포르트)
  fillPoly([
    [2.176,41.370],[2.192,41.356],[2.208,41.352],
    [2.205,41.366],[2.186,41.375],
  ], 'rgba(18,65,105,0.52)');

  // 바르셀로네타 (해변)
  ctx.save();
  ctx.strokeStyle = 'rgba(232,215,158,0.65)';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  strokeLine([[2.190,41.375],[2.201,41.385],[2.211,41.396]]);
  ctx.restore();

  /* ════════════════════════════════════
     10. 주요 도시 표현 (글로우 원)
  ════════════════════════════════════ */
  [
    [2.826,41.983, 32],[1.250,41.117, 28],[1.834,41.729, 22],
    [2.254,41.932, 19],[2.965,42.267, 17],[1.724,41.225, 16],
    [1.625,41.583, 15],[2.445,41.545, 16],[2.298,41.615, 14],
  ].forEach(([lng, lat, r]) => {
    const [cx, cy] = g(lng, lat);
    const cGr = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    cGr.addColorStop(0,   'rgba(222,212,192,0.62)');
    cGr.addColorStop(1,   'rgba(222,212,192,0)');
    ctx.fillStyle = cGr;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  });

  /* ════════════════════════════════════
     11. 도시 마커 & 라벨
  ════════════════════════════════════ */
  const cityDot = (lng, lat, name, dotR, fontSize, bold, dotColor, labelOff) => {
    const [cx, cy] = g(lng, lat);
    // 도트
    ctx.beginPath(); ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    ctx.fillStyle   = dotColor;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.88)';
    ctx.lineWidth   = bold ? 1.8 : 1.2;
    ctx.stroke();
    // 라벨
    ctx.font        = `${bold ? 'bold ' : ''}${fontSize}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle   = bold ? dotColor : '#3a3028';
    ctx.shadowColor = 'rgba(255,255,255,0.92)';
    ctx.shadowBlur  = 5;
    ctx.fillText(name, cx + dotR + 4 + (labelOff?.[0] || 0), cy + 4 + (labelOff?.[1] || 0));
    ctx.shadowBlur  = 0;
  };

  // ★ 당일치기 목적지 (초록 강조)
  cityDot(2.175, 41.390, 'Barcelona',  6.5, 17, true,  '#8B3A26');
  cityDot(2.826, 41.983, 'Girona',     4.5, 12, true,  '#1a5428');
  cityDot(1.814, 41.593, 'Montserrat', 3.8, 11, true,  '#1a5428', [0, -1]);
  cityDot(1.814, 41.226, 'Sitges',     3.8, 11, true,  '#1a5428');

  // 기타 주요 도시
  cityDot(1.250, 41.117, 'Tarragona',   4,   10, false, '#555');
  cityDot(1.834, 41.729, 'Manresa',     3,    9, false, '#555');
  cityDot(2.254, 41.932, 'Vic',         2.8,  9, false, '#555');
  cityDot(2.965, 42.267, 'Figueres',    3,    9, false, '#555');
  cityDot(2.445, 41.545, 'Mataró',      2.5,  8, false, '#555');
  cityDot(1.724, 41.224, 'Vilanova',    2.5,  8, false, '#555', [0, -1]);
  cityDot(1.625, 41.583, 'Igualada',    2.5,  8, false, '#555');
  cityDot(2.298, 41.615, 'Granollers',  2.5,  8, false, '#555');
  cityDot(1.100, 41.050, 'Cambrils',    2.2,  8, false, '#555');

  /* ════════════════════════════════════
     12. 지리 명칭 라벨 (이탤릭)
  ════════════════════════════════════ */
  const geoText = (lng, lat, text, size, color, angle = 0) => {
    const [lx, ly] = g(lng, lat);
    ctx.save();
    ctx.translate(lx, ly);
    if (angle) ctx.rotate(angle * Math.PI / 180);
    ctx.font        = `italic ${size}px "Palatino Linotype", Georgia, serif`;
    ctx.fillStyle   = color;
    ctx.shadowColor = 'rgba(255,255,255,0.82)';
    ctx.shadowBlur  = 4;
    ctx.textAlign   = 'center';
    ctx.fillText(text, 0, 0);
    ctx.shadowBlur  = 0;
    ctx.restore();
  };

  // 바다
  geoText(2.95, 41.52, 'Mar Mediterrànea', 14, 'rgba(22,72,128,0.65)', -4);
  geoText(3.22, 41.72, 'Costa Brava',       10, 'rgba(22,72,128,0.58)', -32);
  geoText(1.50, 41.00, 'Costa Daurada',     10, 'rgba(22,72,128,0.58)', -8);

  // 산악
  geoText(1.83, 41.648, 'Montserrat',  9.5, 'rgba(78,52,26,0.88)');
  geoText(2.12, 42.28,  'Pirineus',    14,  'rgba(78,80,92,0.82)', -4);
  geoText(2.10, 41.52,  'Collserola',   8,  'rgba(55,88,42,0.75)');
  geoText(1.87, 41.30,  'Garraf',       8,  'rgba(78,62,42,0.70)');
  geoText(2.54, 41.68,  'Montnegre',    8,  'rgba(55,88,42,0.68)');

  // 지역명
  geoText(1.42, 41.50, 'Anoia',      8, 'rgba(78,58,38,0.52)');
  geoText(1.52, 41.98, 'Bages',      8, 'rgba(78,58,38,0.52)');
  geoText(2.02, 42.14, 'Osona',      8, 'rgba(78,58,38,0.52)');
  geoText(2.80, 42.18, 'Empordà',    9, 'rgba(78,58,38,0.58)');
  geoText(1.12, 41.35, 'Priorat',    8, 'rgba(78,58,38,0.48)');
  geoText(2.55, 41.80, 'La Selva',   8, 'rgba(78,58,38,0.50)');
  geoText(1.68, 41.38, 'Penedès',    8, 'rgba(78,58,38,0.50)');

  // 국경
  geoText(1.80, 42.52, '— FRANÇA —', 9, 'rgba(60,60,80,0.55)');

  /* ════════════════════════════════════
     13. 나침반 (우상단)
  ════════════════════════════════════ */
  const [crx, cry] = g(3.38, 42.44);
  ctx.save();
  ctx.translate(crx, cry);
  const cs = 22; // 크기

  // 외부 원
  ctx.beginPath(); ctx.arc(0, 0, cs * 1.22, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(248,242,230,0.82)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(120,90,50,0.50)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // N 포인터 (검정)
  ctx.beginPath();
  ctx.moveTo(0, -cs); ctx.lineTo(cs * 0.28, -cs * 0.1); ctx.lineTo(0, -cs * 0.28); ctx.closePath();
  ctx.fillStyle = '#222'; ctx.fill();

  // S 포인터 (밝은 회색)
  ctx.beginPath();
  ctx.moveTo(0, cs); ctx.lineTo(-cs * 0.28, cs * 0.1); ctx.lineTo(0, cs * 0.28); ctx.closePath();
  ctx.fillStyle = '#bbb'; ctx.fill();

  // E/W 포인터
  [[ cs * 0.78, 0, cs * 0.22],[- cs * 0.78, 0, cs * 0.22]].forEach(([ex, ey, r]) => {
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex > 0 ? 0 : 0, -r); ctx.lineTo(ex > 0 ? 0 : 0,  r);
    ctx.closePath();
    ctx.fillStyle = '#999'; ctx.fill();
  });

  // 중심 원
  ctx.beginPath(); ctx.arc(0, 0, cs * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = '#fff'; ctx.fill();
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.stroke();

  // N 문자
  ctx.font        = `bold ${cs * 0.62}px "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle   = '#1a1a1a';
  ctx.textAlign   = 'center';
  ctx.shadowColor = 'rgba(255,255,255,0.85)';
  ctx.shadowBlur  = 3;
  ctx.fillText('N', 0, -cs - 7);
  ctx.shadowBlur  = 0;

  ctx.restore();

  /* ════════════════════════════════════
     14. 범례 (좌하단)
  ════════════════════════════════════ */
  const [lgx, lgy] = g(1.06, 40.98);
  ctx.save();
  ctx.translate(lgx, lgy);
  const lgW = 145, lgH = 62;

  // 범례 배경
  ctx.fillStyle = 'rgba(248,242,230,0.82)';
  ctx.strokeStyle = 'rgba(120,90,50,0.40)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(-8, -12, lgW, lgH, 5);
  ctx.fill(); ctx.stroke();

  // 도로 범례
  ctx.lineWidth = 3; ctx.strokeStyle = '#DFA020';
  ctx.beginPath(); ctx.moveTo(0, 5); ctx.lineTo(28, 5); ctx.stroke();
  ctx.font = '9px Arial, sans-serif';
  ctx.fillStyle = '#3a3028'; ctx.textAlign = 'left';
  ctx.fillText('고속도로 (AP-7 등)', 33, 9);

  ctx.lineWidth = 2.2; ctx.strokeStyle = '#444';
  ctx.setLineDash([8, 5]);
  ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(28, 22); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillText('철도 (Renfe / FGC)', 33, 26);

  // 스케일 바
  ctx.fillStyle = '#3a3028';
  ctx.fillText('0        25       50 km', 0, 44);
  const scaleW = 125;
  ctx.strokeStyle = '#3a3028'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(0, 49); ctx.lineTo(scaleW, 49); ctx.stroke();
  [0, scaleW / 2, scaleW].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x, 46); ctx.lineTo(x, 52); ctx.stroke();
  });

  ctx.restore();

  return cvs;
}

/* ═══════════════════════════════════════════════════════════
   Three.js 메인 컴포넌트
═══════════════════════════════════════════════════════════ */
export default function ThreeMap({ locations = [] }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  const [loaded,   setLoaded]   = useState(false);
  const [selected, setSelected] = useState(null);
  const [active,   setActive]   = useState(() => new Set(Object.keys(CAT)));

  /* ── Three.js 초기화 ── */
  useEffect(() => {
    let dead = false;
    (async () => {
      const THREE = (await import('three')).default ?? await import('three');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
      if (dead || !mountRef.current) return;

      const el = mountRef.current;
      const W  = el.clientWidth  || 800;
      const H  = el.clientHeight || 500;

      /* renderer */
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
      renderer.toneMapping       = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      el.appendChild(renderer.domElement);

      /* scene */
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#0d2340');
      scene.fog = new THREE.FogExp2('#0d2340', 0.024);

      /* camera */
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 120);
      camera.position.set(1.5, 11, 10);
      camera.lookAt(0.5, 0, 0);

      /* lights */
      scene.add(new THREE.AmbientLight(0xffe8cc, 0.78));
      const sun = new THREE.DirectionalLight(0xfff3e0, 1.85);
      sun.position.set(10, 14, 8);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      Object.assign(sun.shadow.camera, { left:-14, right:14, top:12, bottom:-12, near:0.5, far:40 });
      scene.add(sun);
      const fill = new THREE.DirectionalLight(0x99ccff, 0.38);
      fill.position.set(-8, 6, -6);
      scene.add(fill);

      /* 지도 평면 */
      const mapCanvas = createMapTexture();
      const mapTex    = new THREE.CanvasTexture(mapCanvas);
      mapTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const mapGeo = new THREE.PlaneGeometry(MAP_W, MAP_H, 140, 95);
      mapGeo.rotateX(-Math.PI / 2);

      // 정점 변위 (지형 입체화)
      const pos = mapGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx  = pos.getX(i);
        const vz  = pos.getZ(i);
        const lng = (vx + MAP_W / 2) / MAP_W * (LNG_MAX - LNG_MIN) + LNG_MIN;
        const lat = LAT_MIN + (1 - (vz + MAP_H / 2) / MAP_H) * (LAT_MAX - LAT_MIN);
        pos.setY(i, terrainElevation(lng, lat));
      }
      mapGeo.computeVertexNormals();

      const mapMat  = new THREE.MeshStandardMaterial({ map: mapTex, roughness: 0.86, metalness: 0 });
      const mapMesh = new THREE.Mesh(mapGeo, mapMat);
      mapMesh.receiveShadow = true;
      scene.add(mapMesh);

      /* 해수면 */
      const oceanGeo = new THREE.PlaneGeometry(36, 28);
      oceanGeo.rotateX(-Math.PI / 2);
      const ocean = new THREE.Mesh(
        oceanGeo,
        new THREE.MeshStandardMaterial({ color: 0x0e4a6e, roughness: 0.06, metalness: 0.28 }),
      );
      ocean.position.y = -0.08;
      scene.add(ocean);

      /* 핀 생성 */
      const pins = [];
      locations.forEach(loc => {
        const cat = CAT[loc.category];
        if (!cat) return;

        const { x, z } = geo2xz(loc.coords[0], loc.coords[1]);
        const baseY = terrainElevation(loc.coords[0], loc.coords[1]) + 0.04;
        const isDT  = loc.category === 'daytrip';
        const stemH = isDT ? 0.52 : 0.32;
        const headR = isDT ? 0.11 : 0.076;

        const group = new THREE.Group();
        group.position.set(x, baseY, z);
        group.userData = { loc, baseY, phase: Math.random() * Math.PI * 2 };

        // 기둥
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.018, 0.025, stemH, 10),
          new THREE.MeshStandardMaterial({ color: cat.hex, roughness: 0.6 }),
        );
        stem.position.y = stemH / 2;
        stem.castShadow = true;
        group.add(stem);

        // 머리 (구)
        const head = new THREE.Mesh(
          new THREE.SphereGeometry(headR, 20, 20),
          new THREE.MeshStandardMaterial({
            color: cat.hex, emissive: cat.hex, emissiveIntensity: 0.55,
            roughness: 0.3, metalness: 0.1,
          }),
        );
        head.position.y = stemH + headR;
        head.castShadow = true;
        group.add(head);

        // 펄스 링
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(headR * 0.9, headR * 1.5, 32),
          new THREE.MeshBasicMaterial({
            color: cat.hex, transparent: true, opacity: 0.35,
            side: THREE.DoubleSide, depthWrite: false,
          }),
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.02;
        group.add(ring);

        // 클릭 히트박스 (투명)
        const hit = new THREE.Mesh(
          new THREE.CylinderGeometry(headR * 1.8, headR * 1.8, stemH + headR * 2, 8),
          new THREE.MeshBasicMaterial({ visible: false }),
        );
        hit.position.y = (stemH + headR) / 2;
        hit.userData = { isHit: true, loc };
        group.add(hit);

        scene.add(group);
        pins.push({ group, head, ring, hit, loc, visible: true });
      });

      /* 근교 아크 라인 */
      const BCN  = geo2xz(2.17, 41.38);
      const bcnY = terrainElevation(2.17, 41.38) + 0.1;

      locations.filter(l => l.category === 'daytrip').forEach(dt => {
        const dest  = geo2xz(dt.coords[0], dt.coords[1]);
        const destY = terrainElevation(dt.coords[0], dt.coords[1]) + 0.1;
        const dist  = Math.hypot(dest.x - BCN.x, dest.z - BCN.z);
        const arcH  = Math.min(dist * 0.36 + 0.8, 2.6);

        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(BCN.x,  bcnY,  BCN.z),
          new THREE.Vector3((BCN.x + dest.x) / 2, arcH, (BCN.z + dest.z) / 2),
          new THREE.Vector3(dest.x, destY, dest.z),
        );
        const pts    = curve.getPoints(80);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);

        scene.add(new THREE.Line(arcGeo,
          new THREE.LineBasicMaterial({ color: CAT.daytrip.hex, transparent: true, opacity: 0.75 })));

        const dashed = new THREE.Line(arcGeo.clone(),
          new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.22, gapSize: 0.18, transparent: true, opacity: 0.38 }));
        dashed.computeLineDistances();
        scene.add(dashed);
      });

      /* OrbitControls */
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0.5, 0, 0);
      controls.minPolarAngle    = Math.PI / 7;
      controls.maxPolarAngle    = Math.PI / 2.2;
      controls.minDistance      = 3.5;
      controls.maxDistance      = 24;
      controls.enableDamping    = true;
      controls.dampingFactor    = 0.07;
      controls.rotateSpeed      = 0.6;
      controls.panSpeed         = 0.7;
      controls.screenSpacePanning = true;

      /* Raycaster */
      const raycaster = new THREE.Raycaster();
      const mouse     = new THREE.Vector2();

      const onClick = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(pins.filter(p => p.visible).map(p => p.hit));
        setSelected(hits.length ? hits[0].object.userData.loc : null);
      };
      renderer.domElement.addEventListener('click', onClick);

      /* Resize */
      const onResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      /* 애니메이션 루프 */
      sceneRef.current = { renderer, scene, camera, controls, pins };
      let t = 0;
      const animate = () => {
        if (dead) return;
        sceneRef.current.raf = requestAnimationFrame(animate);
        t += 0.016;
        pins.forEach(p => {
          if (!p.visible) return;
          p.group.position.y = p.group.userData.baseY + Math.sin(t * 1.8 + p.group.userData.phase) * 0.035;
          const sc = 1 + Math.sin(t * 2.5 + p.group.userData.phase) * 0.35;
          p.ring.scale.setScalar(sc);
          p.ring.material.opacity = Math.max(0, 0.4 - (sc - 1) * 0.5);
        });
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
      setLoaded(true);

      return () => {
        window.removeEventListener('resize', onResize);
        renderer.domElement.removeEventListener('click', onClick);
      };
    })();

    return () => {
      dead = true;
      const s = sceneRef.current;
      if (!s) return;
      cancelAnimationFrame(s.raf);
      s.renderer.dispose();
      s.renderer.domElement.parentNode?.removeChild(s.renderer.domElement);
      sceneRef.current = null;
    };
  }, []); // eslint-disable-line

  /* 카테고리 토글 → 핀 표시/숨김 */
  useEffect(() => {
    sceneRef.current?.pins.forEach(p => {
      const vis = active.has(p.loc.category);
      p.group.visible = vis;
      p.visible       = vis;
    });
  }, [active]);

  const toggleCat = useCallback((key) => {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(key)) { if (next.size === 1) return prev; next.delete(key); }
      else next.add(key);
      return next;
    });
    setSelected(null);
  }, []);

  /* ── render ── */
  return (
    <div className="bcn-map-root">
      {/* 카테고리 필터 */}
      <div className="bcn-filters" role="toolbar" aria-label="카테고리 필터">
        {Object.entries(CAT).map(([key, cat]) => {
          const on = active.has(key);
          return (
            <button key={key} className={`bcn-filter${on ? ' bcn-filter--on' : ''}`}
              style={{ '--cc': cat.color }} onClick={() => toggleCat(key)} aria-pressed={on}>
              <span>{cat.emoji}</span><span>{cat.label}</span>
              <span className="bcn-filter__dot" />
            </button>
          );
        })}
      </div>

      {/* Three.js 마운트 */}
      <div className="bcn-map-wrap">
        <div ref={mountRef} className="bcn-map-canvas" style={{ background: '#0d2340', cursor: 'grab' }} />

        {!loaded && (
          <div className="bcn-map-loading">
            <div className="bcn-map-spinner" />
            <span>3D 지도 렌더링 중…</span>
          </div>
        )}

        {/* 선택 팝업 */}
        {selected && (
          <div className="bcn-popup" role="dialog" aria-label={selected.name}>
            <button className="bcn-popup__close" onClick={() => setSelected(null)} aria-label="닫기">
              <i className="fa-solid fa-xmark" />
            </button>
            <div className="bcn-popup__badge" style={{ background: CAT[selected.category].color }}>
              {CAT[selected.category].emoji}&nbsp;{CAT[selected.category].label}
              {selected.visited && <span className="bcn-popup__visited">✓ 방문</span>}
            </div>
            <p className="bcn-popup__name">{selected.name}</p>
            {selected.nameEn  && <p className="bcn-popup__name-en">{selected.nameEn}</p>}
            {selected.price   && <p className="bcn-popup__price"><i className="fa-solid fa-coins" />&nbsp;{selected.price}</p>}
            {selected.address && <p className="bcn-popup__addr"><i className="fa-solid fa-location-dot" />&nbsp;{selected.address}</p>}
            {selected.desc    && <p className="bcn-popup__desc">{selected.desc}</p>}
            {selected.mapLink && (
              <a href={selected.mapLink} target="_blank" rel="noopener noreferrer" className="bcn-popup__link">
                <i className="fa-brands fa-google" />
                Google Maps에서 보기
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            )}
          </div>
        )}

        {/* 조작 안내 */}
        {loaded && (
          <div className="bcn-3d-hint">
            <span><i className="fa-solid fa-computer-mouse" /> 드래그: 회전</span>
            <span><i className="fa-solid fa-magnifying-glass" /> 스크롤: 줌</span>
            <span><i className="fa-solid fa-hand-pointer" /> 핀 클릭: 상세 정보</span>
          </div>
        )}
      </div>

      <p className="bcn-map-hint">
        <i className="fa-solid fa-circle-info" />
        {locations.filter(l => active.has(l.category)).length}개 장소 표시 중
        &middot; 근교 투어(🚌) 3곳은 바르셀로나에서 아치 선으로 연결됨
      </p>
    </div>
  );
}
