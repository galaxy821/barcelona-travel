const img = (url) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&n=-1`;

const daytrips = [
  {
    name: '그라나다',
    nameEn: 'Granada',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Alhambra_from_Mirador_de_San_Nicolas.jpg/800px-Alhambra_from_Mirador_de_San_Nicolas.jpg'),
    visited: true,
    badge: { type: 'rec', icon: 'fa-thumbs-up', text: '방문' },
    address: 'Granada, Andalucia (세비야에서 약 250km)',
    route: {
      title: '세비야에서 가는 방법',
      steps: [
        { icon: 'fa-train', text: 'Santa Justa역' },
        { icon: 'fa-train-subway', text: 'Renfe' },
        { icon: 'fa-city', text: 'Granada역' },
        { icon: 'fa-bus', text: '알람브라 이동' },
      ],
    },
    info: [
      { icon: 'tip', faIcon: 'fa-landmark-dome', html: '<strong>알람브라 궁전</strong> 하나만으로도 갈 가치가 있는 도시. 나스르 궁전 시간 지정 입장이 핵심입니다.' },
      { icon: 'time', faIcon: 'fa-clock', html: '고속/중거리 열차 기준 약 <strong>2시간 30분~3시간</strong>. 당일치기도 가능하지만 1박이면 훨씬 여유롭습니다.' },
      { icon: 'warn', faIcon: 'fa-ticket', html: '알람브라 티켓은 인기 날짜가 빨리 매진되므로 일정 확정 즉시 예매 추천.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-camera"></i> 추천 포인트</strong><br>해질녘 미라도르 데 산 니콜라스에서 바라보는 알람브라와 시에라 네바다 풍경.',
    },
    map: { q: 'Granada Alhambra', link: 'https://www.google.com/maps/place/Granada/' },
  },
  {
    name: '론다',
    nameEn: 'Ronda',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Puente_Nuevo_Ronda_2010.jpg/800px-Puente_Nuevo_Ronda_2010.jpg'),
    badge: { type: 'star', icon: 'fa-bridge', text: '절벽 도시' },
    address: 'Ronda, Malaga (세비야에서 약 130km)',
    route: {
      title: '세비야에서 가는 방법',
      steps: [
        { icon: 'fa-bus', text: 'Prado 또는 Plaza de Armas' },
        { icon: 'fa-bus-simple', text: '시외버스' },
        { icon: 'fa-mountain-city', text: 'Ronda' },
      ],
    },
    info: [
      { icon: 'tip', faIcon: 'fa-bridge', html: '<strong>누에보 다리</strong>와 깊은 협곡이 도시의 하이라이트. 사진보다 실제 스케일이 훨씬 큽니다.' },
      { icon: 'time', faIcon: 'fa-clock', html: '버스 또는 렌터카 기준 약 <strong>2시간~2시간 30분</strong>. 대중교통 배차가 많지 않아 시간표 확인 필수.' },
      { icon: 'note', faIcon: 'fa-car', html: '세비야에서 렌터카를 쓴다면 하얀 마을 코스와 묶기 좋습니다.' },
    ],
    map: { q: 'Puente Nuevo Ronda', link: 'https://www.google.com/maps/place/Ronda/' },
  },
  {
    name: '카디스',
    nameEn: 'Cadiz',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Cadiz_Cathedral_from_the_sea.jpg/800px-Cadiz_Cathedral_from_the_sea.jpg'),
    visited: true,
    badge: { type: 'rec', icon: 'fa-thumbs-up', text: '방문' },
    address: 'Cadiz, Andalucia (세비야에서 약 120km)',
    route: {
      title: '세비야에서 가는 방법',
      steps: [
        { icon: 'fa-train', text: 'Santa Justa역' },
        { icon: 'fa-train-subway', text: 'Media Distancia' },
        { icon: 'fa-water', text: 'Cadiz역' },
      ],
    },
    info: [
      { icon: 'tip', faIcon: 'fa-water', html: '대서양 바다와 오래된 성벽, 카디스 대성당이 어우러진 해안 도시입니다.' },
      { icon: 'time', faIcon: 'fa-clock', html: '기차 기준 약 <strong>1시간 40분~2시간</strong>. 당일치기로 가장 부담이 적은 근교 중 하나.' },
      { icon: 'tip', faIcon: 'fa-umbrella-beach', html: '날씨가 좋으면 라 칼레타 해변과 해안 산책로를 함께 추천합니다.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-sun"></i> 추천 시간</strong><br>오후 늦게 도착해 바다 산책 후 일몰을 보는 코스가 좋습니다.',
    },
    map: { q: 'Cadiz Cathedral Spain', link: 'https://www.google.com/maps/place/C%C3%A1diz/' },
  },
  {
    name: '코르도바',
    nameEn: 'Cordoba',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Cordoba_Mezquita_Cathedral_interior.jpg/800px-Cordoba_Mezquita_Cathedral_interior.jpg'),
    badge: { type: 'star', icon: 'fa-mosque', text: '메스키타' },
    address: 'Cordoba, Andalucia (세비야에서 약 140km)',
    route: {
      title: '세비야에서 가는 방법',
      steps: [
        { icon: 'fa-train', text: 'Santa Justa역' },
        { icon: 'fa-train-subway', text: 'AVE/Avant' },
        { icon: 'fa-city', text: 'Cordoba역' },
      ],
    },
    info: [
      { icon: 'tip', faIcon: 'fa-mosque', html: '<strong>메스키타</strong>의 붉고 흰 아치 숲이 핵심. 이슬람과 가톨릭 건축이 겹쳐진 독특한 공간입니다.' },
      { icon: 'time', faIcon: 'fa-clock', html: '고속열차 기준 약 <strong>45분</strong> 내외라 세비야 근교 중 접근성이 가장 좋습니다.' },
      { icon: 'tip', faIcon: 'fa-camera', html: '유대인 지구, 꽃 골목, 로마 다리까지 반나절~하루 코스로 묶기 좋습니다.' },
    ],
    map: { q: 'Mezquita Cathedral Cordoba', link: 'https://www.google.com/maps/place/C%C3%B3rdoba/' },
  },
];

export default daytrips;
