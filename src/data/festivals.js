const festivals = {
  intro: {
    html: `<strong><i class="fa-solid fa-circle-info"></i> 크리스마스 안내</strong><br>&middot; 크리스마스 행사, 축제, 시즌 이벤트 최신 일정과 꿀팁은 <a href="https://www.instagram.com/memento_tour/" target="_blank" rel="noopener"><strong>@memento_tour</strong> 인스타그램</a>에서 확인<br>&middot; <a href="https://www.google.com/maps/d/edit?mid=1VPTRSe1aj0C-ad38BtsvT6uMvXBYvHk&usp=sharing" target="_blank" rel="noopener"><strong>크리스마스 조명 지도</strong></a>를 보며 바르셀로나의 저녁을 천천히 걸어보세요. 거리마다 다른 분위기와 빛이 여행의 설렘을 더해줄 거예요<br><span style="font-size:12px; color:var(--c-text-muted);">&nbsp;&nbsp;Tip: 지도 → 공유하기 → Safari 또는 Google Maps로 열기 하면 위치 찾기가 더 편해요</span>`,
  },
  markets: [
    {
      name: 'Fira de Santa Llucia',
      nameEn: '산타 루시아 마켓',
      badge: { type: 'star', icon: 'fa-star', text: '전통' },
      address: '바르셀로나 대성당 앞 Placa Nova (고딕지구)',
      info: [
        { icon: 'time', faIcon: 'fa-calendar-days', html: '<strong>11월 28일 ~ 12월 23일</strong><br>10:00 ~ 21:00' },
        { icon: 'tip', faIcon: 'fa-lightbulb', html: '<strong>1786년부터 이어져 온 오래된 크리스마스 마켓</strong>. 약 200개 부스에서 전통 장식과 선물 판매' },
        { icon: 'menu', faIcon: 'fa-gift', html: "인기상품: 전통 인형 <strong>'까가네르(Caganer)'</strong>와 통나무 인형 <strong>'티오 데 나달(Tio de Nadal)'</strong>" },
      ],
      highlight: {
        html: '<a href="https://www.barcelona.cat/culturapopular/en/festivals-and-traditions/fairs/fira-de-santa-llucia" target="_blank" rel="noopener"><i class="fa-solid fa-link"></i> 공식 홈페이지에서 상세 정보 확인</a>',
      },
      map: { q: 'Fira de Santa Llucia Barcelona Cathedral', link: 'https://maps.app.goo.gl/byj24EpfM7Kjy3Yp8' },
    },
    {
      name: 'Fira de Nadal',
      nameEn: '사그라다 파밀리아 크리스마스 마켓',
      badge: { type: 'rec', icon: 'fa-thumbs-up', text: '추천' },
      address: '사그라다 파밀리아 성당 앞 광장',
      info: [
        { icon: 'time', faIcon: 'fa-calendar-days', html: '<strong>11월 28일 ~ 12월 23일</strong><br>평일 10:00 ~ 21:00 / 주말 및 공휴일 10:00 ~ 22:00' },
        { icon: 'tip', faIcon: 'fa-lightbulb', html: '<strong>성당을 배경으로 열리는 낭만적인 크리스마스 마켓</strong>. 지역 예술가들의 수공예품, 초콜릿, 치즈 등 다양한 먹거리' },
      ],
      highlight: {
        html: '<a href="https://www.barcelona.cat/culturapopular/en/festivals-and-traditions/fairs/fira-de-nadal-de-la-sagrada-familia" target="_blank" rel="noopener"><i class="fa-solid fa-link"></i> 공식 홈페이지에서 상세 정보 확인</a>',
      },
      map: { q: 'Fira de Nadal Sagrada Familia Barcelona', link: 'https://maps.app.goo.gl/NoDvKiTgg2hjHL4K9' },
    },
    {
      name: 'Moll de la Fusta',
      nameEn: '포트벨 크리스마스 마켓',
      badge: { type: 'rec', icon: 'fa-thumbs-up', text: '추천' },
      address: '포트벨 항구 인근 (Moll de la Fusta)',
      info: [
        { icon: 'time', faIcon: 'fa-calendar-days', html: '<strong>11월 28일 ~ 2026년 1월 6일</strong><br>운영시간은 공식 홈페이지 참고' },
        { icon: 'tip', faIcon: 'fa-lightbulb', html: '<strong>대관람차, 아이스링크, 푸드트럭, 라이브 음악</strong> 등 가장 활기찬 마켓' },
        { icon: 'tip', faIcon: 'fa-moon', html: '<strong>밤에 가면 조명과 바다가 어우러져 분위기 최고</strong>' },
      ],
      highlight: {
        html: '<a href="https://www.nadalalportvell.com/es/" target="_blank" rel="noopener"><i class="fa-solid fa-link"></i> 공식 홈페이지에서 상세 정보 확인</a>',
      },
      map: { q: 'Moll de la Fusta Barcelona Port Vell', link: 'https://maps.app.goo.gl/5n9epSiKb4GRZyMP9' },
    },
  ],
  events: [
    {
      name: '산트 자우메 광장',
      nameEn: '빛 · 사운드 쇼',
      address: 'Placa de Sant Jaume, Barcelona',
      info: [
        { icon: 'time', faIcon: 'fa-calendar-days', html: '<strong>11월 22일 ~ 1월 5일</strong>' },
        { icon: 'tip', faIcon: 'fa-lightbulb', html: '바르셀로나 시청 앞 광장에서 펼쳐지는 <strong>빛과 사운드 쇼</strong>' },
      ],
      highlight: {
        html: '<a href="https://www.barcelona.cat/infobarcelona/en/sant-jaume-2_1574581.html" target="_blank" rel="noopener"><i class="fa-solid fa-link"></i> 상세 정보 확인</a>',
      },
      map: { q: 'Plaça de Sant Jaume Barcelona', link: '' },
    },
    {
      name: '전통 구유(Nativity) 전시',
      nameEn: 'City Hall Coach Houses',
      info: [
        { icon: 'time', faIcon: 'fa-calendar-days', html: '<strong>12월 13일 ~ 1월 5일</strong>' },
        { icon: 'tip', faIcon: 'fa-lightbulb', html: '시청사 마차 보관소에서 열리는 <strong>전통 탄생 장면(Nativity Scene) 전시</strong>' },
      ],
      highlight: {
        html: '<a href="https://www.webarcelona.net/barcelona-events/traditional-nativity-scene-barcelona" target="_blank" rel="noopener"><i class="fa-solid fa-link"></i> 상세 정보 확인</a>',
      },
    },
  ],
};

export default festivals;
