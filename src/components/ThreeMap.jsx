/**
 * ThreeMap.jsx
 * Three.js 기반 바르셀로나 + 근교 3D 인터랙티브 지도
 *
 * 지리 범위: lng 1.0~3.5 / lat 40.8~42.5 (카탈루냐 전역)
 * 좌표 변환: GeoJSON [lng, lat] → Three.js [x, y(elevation), z]
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
   지리 상수
───────────────────────────────────── */
const LNG_MIN = 1.0, LNG_MAX = 3.5;
const LAT_MIN = 40.8, LAT_MAX = 42.5;
const MAP_W = 14, MAP_H = 9.5;

/** GeoJSON [lng, lat] → Three.js {x, z} (Y 는 별도 계산) */
function geo2xz(lng, lat) {
  const x = (lng - LNG_MIN) / (LNG_MAX - LNG_MIN) * MAP_W - MAP_W / 2;
  const z = -((lat - LAT_MIN) / (LAT_MAX - LAT_MIN) * MAP_H - MAP_H / 2);
  return { x, z };
}

/** 위치에 대한 지형 고도 계산 (몬세라트 + 피레네) */
function terrainElevation(lng, lat) {
  let e = 0;
  // 몬세라트 산 (1.83, 41.59)
  const dM = Math.hypot(lng - 1.83, (lat - 41.59) * 1.5);
  e += Math.max(0, 0.55 - dM * 3.8) * 0.9;
  // 피레네 산맥 (lat > 42.0)
  if (lat > 42.0) {
    e += ((lat - 42.0) / 0.5) * 0.7;
  }
  // 가르라프 해안절벽 (Sitges 부근)
  const dS = Math.hypot(lng - 1.81, (lat - 41.23) * 1.5);
  e += Math.max(0, 0.15 - dS * 2.5) * 0.2;
  return e;
}

/* ─────────────────────────────────────
   캔버스 기반 지도 텍스처 생성
───────────────────────────────────── */
function createMapTexture() {
  const CW = 1400, CH = 950;
  const cvs = document.createElement('canvas');
  cvs.width = CW; cvs.height = CH;
  const ctx = cvs.getContext('2d');

  /** 지리 좌표 → 캔버스 픽셀 */
  const g = (lng, lat) => [
    (lng - LNG_MIN) / (LNG_MAX - LNG_MIN) * CW,
    (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * CH,
  ];

  /* ── 바다 배경 ── */
  const seaGrad = ctx.createLinearGradient(CW, 0, 0, CH);
  seaGrad.addColorStop(0,   '#1a5f8a');
  seaGrad.addColorStop(0.4, '#2472a4');
  seaGrad.addColorStop(1,   '#3585b8');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, 0, CW, CH);

  // 바다 잔물결 선
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    const baseY = (i / 20) * CH;
    ctx.beginPath();
    for (let px = 0; px <= CW; px += 8) {
      const py = baseY + Math.sin(px / 60 + i * 0.7) * 4;
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();

  /* ── 카탈루냐 육지 폴리곤 ── */
  // 서쪽(아라곤) → 피레네(북) → 지중해 해안(동/남) 순 시계방향
  const LAND = [
    // 서쪽 경계 (아라곤)
    [1.00, 40.80], [1.00, 41.00], [1.02, 41.40], [1.05, 41.80],
    [1.10, 42.10], [1.25, 42.30], [1.43, 42.48],
    // 피레네 (북쪽, 프랑스 국경)
    [1.80, 42.49], [2.20, 42.47], [2.60, 42.45],
    [2.90, 42.43], [3.17, 42.44],
    // 지중해 해안 (북→남)
    [3.31, 42.32],  // Cap de Creus
    [3.21, 42.27],  // Roses
    [3.14, 42.12],  // L'Escala
    [3.18, 41.92],  // Palafrugell
    [3.02, 41.83],
    [2.93, 41.72],  // Tossa de Mar
    [2.80, 41.68],  // Blanes
    [2.55, 41.57],  // Calella
    [2.45, 41.54],  // Mataró
    [2.30, 41.47],  // Badalona
    [2.17, 41.38],  // Barcelona
    [2.09, 41.32],  // El Prat
    [1.98, 41.27],  // Castelldefels
    [1.81, 41.23],  // Sitges
    [1.67, 41.20],  // Cubelles
    [1.55, 41.17],
    [1.35, 41.13],  // Tarragona 근처
    [1.20, 41.08],
    [1.05, 40.95],
    [1.00, 40.85],
  ];

  ctx.beginPath();
  ctx.moveTo(...g(...LAND[0]));
  LAND.slice(1).forEach(p => ctx.lineTo(...g(...p)));
  ctx.closePath();

  // 육지 그라데이션 채우기
  const landGrad = ctx.createRadialGradient(CW * 0.35, CH * 0.45, 0, CW * 0.35, CH * 0.45, CW * 0.65);
  landGrad.addColorStop(0,   '#f4e8c1');
  landGrad.addColorStop(0.4, '#ead9a8');
  landGrad.addColorStop(0.8, '#dfd09a');
  landGrad.addColorStop(1,   '#d5c68e');
  ctx.fillStyle = landGrad;
  ctx.fill();

  // 해안선 테두리
  ctx.strokeStyle = 'rgba(50, 80, 130, 0.45)';
  ctx.lineWidth = 2;
  ctx.stroke();

  /* ── 몬세라트 산 영역 ── */
  const [mx, my] = g(1.83, 41.59);
  const mGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 75);
  mGrad.addColorStop(0,   'rgba(148,115,80, 0.80)');
  mGrad.addColorStop(0.4, 'rgba(155,125,90, 0.50)');
  mGrad.addColorStop(1,   'rgba(155,125,90, 0)');
  ctx.beginPath(); ctx.arc(mx, my, 75, 0, Math.PI * 2);
  ctx.fillStyle = mGrad; ctx.fill();

  // 몬세라트 특유의 들쭉날쭉 실루엣 힌트
  ctx.save();
  ctx.beginPath();
  const peakPts = [[1.77,41.62],[1.79,41.64],[1.81,41.62],[1.83,41.65],[1.86,41.62],[1.88,41.60],[1.84,41.58],[1.80,41.57]];
  const [p0x,p0y] = g(...peakPts[0]);
  ctx.moveTo(p0x,p0y);
  peakPts.slice(1).forEach(p => ctx.lineTo(...g(...p)));
  ctx.closePath();
  ctx.fillStyle='rgba(120,95,65,0.40)'; ctx.fill();
  ctx.restore();

  /* ── 피레네 산맥 ── */
  const pyrPoints = [[1.4,42.46],[1.7,42.49],[2.1,42.47],[2.5,42.46],[2.9,42.43],[3.15,42.42]];
  pyrPoints.forEach(([lng,lat]) => {
    const [px,py] = g(lng, lat);
    const pGrad = ctx.createRadialGradient(px, py, 0, px, py, 50);
    pGrad.addColorStop(0,   'rgba(210,215,225,0.80)');
    pGrad.addColorStop(0.4, 'rgba(175,155,130,0.45)');
    pGrad.addColorStop(1,   'rgba(175,155,130,0)');
    ctx.beginPath(); ctx.arc(px, py, 50, 0, Math.PI * 2);
    ctx.fillStyle = pGrad; ctx.fill();
  });

  /* ── 강 (로브레갓) ── */
  ctx.save();
  ctx.strokeStyle = 'rgba(80, 130, 200, 0.38)';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  const riverPts = [[2.09,41.32],[1.97,41.40],[1.92,41.55],[1.90,41.70],[1.87,41.90]];
  ctx.moveTo(...g(...riverPts[0]));
  riverPts.slice(1).forEach(p => ctx.lineTo(...g(...p)));
  ctx.stroke();
  // 테르 강 (지로나 방향)
  const ter = [[2.82,41.98],[2.90,42.08],[3.02,42.15],[3.08,42.22]];
  ctx.moveTo(...g(...ter[0]));
  ter.slice(1).forEach(p => ctx.lineTo(...g(...p)));
  ctx.stroke();
  ctx.restore();

  /* ── 격자선 (위도/경도) ── */
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.055)';
  ctx.lineWidth = 0.8;
  ctx.setLineDash([5, 10]);
  for (let lng = 1.5; lng < 3.5; lng += 0.5) {
    ctx.beginPath();
    ctx.moveTo(...g(lng, LAT_MIN)); ctx.lineTo(...g(lng, LAT_MAX));
    ctx.stroke();
  }
  for (let lat = 41.0; lat < 42.5; lat += 0.5) {
    ctx.beginPath();
    ctx.moveTo(...g(LNG_MIN, lat)); ctx.lineTo(...g(LNG_MAX, lat));
    ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.restore();

  /* ── 도시 점 & 라벨 ── */
  const cities = [
    { lng:2.17, lat:41.38, name:'Barcelona', size:5.5, bold:true,  offset:[8, 4] },
    { lng:2.82, lat:41.98, name:'Girona',    size:3.5, bold:false, offset:[6, 3] },
    { lng:1.81, lat:41.23, name:'Sitges',    size:3,   bold:false, offset:[6, 3] },
    { lng:1.83, lat:41.59, name:'Montserrat',size:3.5, bold:false, offset:[6, 3] },
    { lng:1.25, lat:41.12, name:'Tarragona', size:3,   bold:false, offset:[6, 3] },
    { lng:1.62, lat:41.62, name:'Manresa',   size:2.5, bold:false, offset:[6, 3] },
  ];
  cities.forEach(({ lng, lat, name, size, bold, offset }) => {
    const [cx, cy] = g(lng, lat);
    const isBcn = name === 'Barcelona';
    // 도트
    ctx.beginPath(); ctx.arc(cx, cy, size, 0, Math.PI * 2);
    ctx.fillStyle = isBcn ? '#c65d3e' : '#666'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 1.5; ctx.stroke();
    // 라벨
    ctx.font = `${bold ? 'bold ' : ''}${isBcn ? 13 : 10}px "Helvetica Neue", sans-serif`;
    ctx.fillStyle   = isBcn ? '#8B3A26' : '#4a4a4a';
    ctx.shadowColor = 'rgba(255,255,255,0.85)';
    ctx.shadowBlur  = 4;
    ctx.fillText(name, cx + offset[0], cy + offset[1]);
    ctx.shadowBlur  = 0;
  });

  return cvs;
}

/* ─────────────────────────────────────
   Main Component
───────────────────────────────────── */
export default function ThreeMap({ locations = [] }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null); // { renderer, scene, camera, controls, pins[], raf }

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
      scene.fog = new THREE.FogExp2('#0d2340', 0.025);

      /* camera */
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 120);
      camera.position.set(1.5, 11, 10);
      camera.lookAt(0.5, 0, 0);

      /* lights */
      scene.add(new THREE.AmbientLight(0xffe8cc, 0.75));

      const sun = new THREE.DirectionalLight(0xfff3e0, 1.8);
      sun.position.set(10, 14, 8);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      Object.assign(sun.shadow.camera, { left:-14, right:14, top:12, bottom:-12, near:0.5, far:40 });
      scene.add(sun);

      const fill = new THREE.DirectionalLight(0x99ccff, 0.35);
      fill.position.set(-8, 6, -6);
      scene.add(fill);

      /* ── 지도 평면 ── */
      const mapCanvas = createMapTexture();
      const mapTex    = new THREE.CanvasTexture(mapCanvas);
      mapTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const SEG_W = 140, SEG_H = 95;
      const mapGeo  = new THREE.PlaneGeometry(MAP_W, MAP_H, SEG_W, SEG_H);
      mapGeo.rotateX(-Math.PI / 2);

      // 정점 변위 (지형 고도)
      const pos = mapGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx  = pos.getX(i);
        const vz  = pos.getZ(i);
        const lng = (vx + MAP_W / 2) / MAP_W * (LNG_MAX - LNG_MIN) + LNG_MIN;
        const lat = LAT_MIN + (1 - (vz + MAP_H / 2) / MAP_H) * (LAT_MAX - LAT_MIN);
        pos.setY(i, terrainElevation(lng, lat));
      }
      mapGeo.computeVertexNormals();

      const mapMat  = new THREE.MeshStandardMaterial({
        map:       mapTex,
        roughness: 0.88,
        metalness: 0.0,
      });
      const mapMesh = new THREE.Mesh(mapGeo, mapMat);
      mapMesh.receiveShadow = true;
      scene.add(mapMesh);

      /* ── 해수면 (지도 아래) ── */
      const oceanGeo = new THREE.PlaneGeometry(36, 28);
      oceanGeo.rotateX(-Math.PI / 2);
      const oceanMat = new THREE.MeshStandardMaterial({
        color:    0x0e4a6e,
        roughness: 0.05,
        metalness: 0.3,
      });
      const ocean = new THREE.Mesh(oceanGeo, oceanMat);
      ocean.position.y = -0.08;
      scene.add(ocean);

      /* ── 핀 생성 ── */
      const pins = [];

      locations.forEach(loc => {
        const cat = CAT[loc.category];
        if (!cat) return;

        const { x, z } = geo2xz(loc.coords[0], loc.coords[1]);
        const baseY = terrainElevation(loc.coords[0], loc.coords[1]) + 0.04;

        const group = new THREE.Group();
        group.position.set(x, baseY, z);
        group.userData = { loc, baseY, phase: Math.random() * Math.PI * 2 };

        const isDaytrip  = loc.category === 'daytrip';
        const stemH      = isDaytrip ? 0.52 : 0.32;
        const headR      = isDaytrip ? 0.11 : 0.076;

        // 기둥
        const stemGeo = new THREE.CylinderGeometry(0.018, 0.025, stemH, 10);
        const stemMat = new THREE.MeshStandardMaterial({ color: cat.hex, roughness: 0.6 });
        const stem    = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = stemH / 2;
        stem.castShadow = true;
        group.add(stem);

        // 머리 (구)
        const headGeo = new THREE.SphereGeometry(headR, 20, 20);
        const headMat = new THREE.MeshStandardMaterial({
          color:            cat.hex,
          emissive:         cat.hex,
          emissiveIntensity: 0.55,
          roughness: 0.3,
          metalness: 0.1,
        });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = stemH + headR;
        head.castShadow = true;
        group.add(head);

        // 펄스 링 (땅 위 원형)
        const ringGeo = new THREE.RingGeometry(headR * 0.9, headR * 1.5, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color:       cat.hex,
          transparent: true,
          opacity:     0.35,
          side:        THREE.DoubleSide,
          depthWrite:  false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.02;
        group.add(ring);

        // 클릭 감지용 히트박스 (투명)
        const hitGeo = new THREE.CylinderGeometry(headR * 1.8, headR * 1.8, stemH + headR * 2, 8);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hit    = new THREE.Mesh(hitGeo, hitMat);
        hit.position.y = (stemH + headR) / 2;
        hit.userData = { isHit: true, loc };
        group.add(hit);

        scene.add(group);
        pins.push({ group, head, ring, hit, loc, visible: true });
      });

      /* ── 근교 여행 아크 (바르셀로나 → 근교) ── */
      const BCN = geo2xz(2.17, 41.38);
      const bcnY = terrainElevation(2.17, 41.38) + 0.1;

      const daytrips = locations.filter(l => l.category === 'daytrip');
      daytrips.forEach(dt => {
        const dest  = geo2xz(dt.coords[0], dt.coords[1]);
        const destY = terrainElevation(dt.coords[0], dt.coords[1]) + 0.1;

        // 거리 기반 아크 높이
        const dist  = Math.hypot(dest.x - BCN.x, dest.z - BCN.z);
        const arcH  = Math.min(dist * 0.35 + 0.8, 2.5);

        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(BCN.x,  bcnY,  BCN.z),
          new THREE.Vector3((BCN.x + dest.x) / 2, arcH, (BCN.z + dest.z) / 2),
          new THREE.Vector3(dest.x, destY, dest.z),
        );

        // 실선 아크 (glow 느낌)
        const pts    = curve.getPoints(80);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);

        // 아래 그림자 선
        const shadowMat = new THREE.LineBasicMaterial({
          color: 0x000000, transparent: true, opacity: 0.15,
        });
        const shadowLine = new THREE.Line(arcGeo.clone(), shadowMat);
        shadowLine.position.y = -0.02;
        scene.add(shadowLine);

        // 메인 아크
        const arcMat = new THREE.LineBasicMaterial({
          color:       CAT.daytrip.hex,
          transparent: true,
          opacity:     0.75,
        });
        scene.add(new THREE.Line(arcGeo, arcMat));

        // 점선 아크 (offset)
        const dashedMat = new THREE.LineDashedMaterial({
          color:       0xffffff,
          dashSize:    0.22,
          gapSize:     0.18,
          transparent: true,
          opacity:     0.40,
        });
        const dashed = new THREE.Line(arcGeo.clone(), dashedMat);
        dashed.computeLineDistances();
        scene.add(dashed);
      });

      /* ── OrbitControls ── */
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

      /* ── Raycaster ── */
      const raycaster = new THREE.Raycaster();
      const mouse     = new THREE.Vector2();

      const onClick = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const hits = pins.filter(p => p.visible).flatMap(p => [p.hit]);
        const intersects = raycaster.intersectObjects(hits);

        if (intersects.length > 0) {
          setSelected(intersects[0].object.userData.loc);
        } else {
          setSelected(null);
        }
      };
      renderer.domElement.addEventListener('click', onClick);

      /* ── Resize ── */
      const onResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      /* ── 애니메이션 루프 ── */
      sceneRef.current = { renderer, scene, camera, controls, pins };
      let t = 0;

      const animate = () => {
        if (dead) return;
        sceneRef.current.raf = requestAnimationFrame(animate);
        t += 0.016;

        pins.forEach(p => {
          if (!p.visible) return;
          // 핀 상하 흔들림
          const bob = Math.sin(t * 1.8 + p.group.userData.phase) * 0.035;
          p.group.position.y = p.group.userData.baseY + bob;

          // 펄스 링 확산
          const scale = 1 + Math.sin(t * 2.5 + p.group.userData.phase) * 0.35;
          p.ring.scale.setScalar(scale);
          p.ring.material.opacity = Math.max(0, 0.4 - (scale - 1) * 0.5);
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

  /* ── 카테고리 토글 → 핀 show/hide ── */
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
      if (next.has(key)) {
        if (next.size === 1) return prev;
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    setSelected(null);
  }, []);

  /* ── 선택된 핀으로 카메라 이동 ── */
  const flyToSelected = useCallback((loc) => {
    const s = sceneRef.current;
    if (!s || !loc) return;
    const { x, z } = geo2xz(loc.coords[0], loc.coords[1]);
    s.controls.target.set(x, 0, z);
    s.controls.update();
  }, []);

  return (
    <div className="bcn-map-root">

      {/* 카테고리 필터 */}
      <div className="bcn-filters" role="toolbar" aria-label="카테고리 필터">
        {Object.entries(CAT).map(([key, cat]) => {
          const on = active.has(key);
          return (
            <button
              key={key}
              className={`bcn-filter${on ? ' bcn-filter--on' : ''}`}
              style={{ '--cc': cat.color }}
              onClick={() => toggleCat(key)}
              aria-pressed={on}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className="bcn-filter__dot" />
            </button>
          );
        })}
      </div>

      {/* Three.js 마운트 */}
      <div className="bcn-map-wrap">
        <div
          ref={mountRef}
          className="bcn-map-canvas"
          style={{ background: '#0d2340', cursor: 'grab' }}
        />

        {/* 로딩 오버레이 */}
        {!loaded && (
          <div className="bcn-map-loading">
            <div className="bcn-map-spinner" />
            <span>3D 지도 렌더링 중…</span>
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
              style={{ background: CAT[selected.category].color }}
            >
              {CAT[selected.category].emoji}&nbsp;{CAT[selected.category].label}
              {selected.visited && <span className="bcn-popup__visited">✓ 방문</span>}
            </div>

            <p className="bcn-popup__name">{selected.name}</p>
            {selected.nameEn && <p className="bcn-popup__name-en">{selected.nameEn}</p>}

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
                onClick={() => flyToSelected(selected)}
              >
                <i className="fa-brands fa-google" />
                Google Maps에서 보기
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            )}
          </div>
        )}

        {/* 조작 안내 (로드 후) */}
        {loaded && (
          <div className="bcn-3d-hint">
            <span><i className="fa-solid fa-computer-mouse" /> 드래그: 회전</span>
            <span><i className="fa-solid fa-magnifying-glass" /> 스크롤: 줌</span>
            <span><i className="fa-solid fa-hand-pointer" /> 핀 클릭: 상세 정보</span>
          </div>
        )}
      </div>

      {/* 핀 수 안내 */}
      <p className="bcn-map-hint">
        <i className="fa-solid fa-circle-info" />
        {locations.filter(l => active.has(l.category)).length}개 장소 표시 중
        &middot; 근교 투어(🚌) 3곳은 바르셀로나에서 아치 선으로 연결됨
      </p>
    </div>
  );
}
