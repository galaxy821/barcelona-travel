const img = (url) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&n=-1`;

const attractions = [
  {
    name: '스페인 광장',
    nameEn: 'Plaza de Espana',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Plaza_de_Espa%C3%B1a%2C_Sevilla%2C_Espa%C3%B1a%2C_2015-12-06%2C_DD_13.JPG/800px-Plaza_de_Espa%C3%B1a%2C_Sevilla%2C_Espa%C3%B1a%2C_2015-12-06%2C_DD_13.JPG'),
    visited: true,
    badge: { type: 'free', icon: 'fa-ticket', text: '무료' },
    address: 'Av. Isabel la Catolica, 41004 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-landmark-dome', html: '1929년 이베로아메리카 박람회를 위해 조성된 세비야 대표 랜드마크. 반원형 건축, 타일 장식, 운하와 다리가 어우러집니다.' },
      { icon: 'time', faIcon: 'fa-clock', html: '<strong>24시간 개방</strong>되는 광장이라 낮, 해질녘, 밤, 비오는 날, 맑은 날의 분위기가 모두 다릅니다.' },
      { icon: 'tip', faIcon: 'fa-music', html: '<strong>플라멩고 거리 공연</strong>은 공식 고정 시간표가 아니라 날씨와 공연자에 따라 달라집니다. 보통 사람이 많은 <strong>오후~해질녘 전</strong>에 만날 확률이 높습니다.' },
      { icon: 'note', faIcon: 'fa-heart', html: 'sangsang.park의 인생 여행지로 세비야를 꼽게 만드는 이유 중 하나. 시간이 허락하면 여러 시간대에 반복 방문 추천.' },
      { icon: 'tip', faIcon: 'fa-person-running', html: '런닝을 좋아한다면 마리아 루이사 공원과 연결해 <strong>스페인 광장 러닝 코스</strong>로 뛰어보는 것도 좋습니다.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-camera"></i> 추천 방문법</strong><br>첫날 낮에 한 번, 다른 날 해질녘에 한 번 더. 밤 조명까지 보면 같은 장소가 세 번 다른 도시처럼 보입니다.',
    },
    map: { q: 'Plaza de Espana Sevilla', link: 'https://maps.app.goo.gl/fL3nVGyjWkTESVrF7' },
  },
  {
    name: '메트로폴 파라솔',
    nameEn: 'Setas de Sevilla',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Metropol_Parasol_Sevilla_2011.jpg/800px-Metropol_Parasol_Sevilla_2011.jpg'),
    visited: true,
    badge: { type: 'star', icon: 'fa-binoculars', text: '전망대' },
    address: 'Pl. de la Encarnacion, s/n, Casco Antiguo, 41003 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-lightbulb', html: '구시가지 한가운데 놓인 거대한 목조 구조물. 별명처럼 <strong>라스 세타스</strong>, 즉 버섯 모양 전망대로 불립니다.' },
      { icon: 'price', faIcon: 'fa-coins', html: '전망대 티켓은 세비야의 무료 명소들에 비하면 비싼 편. 여유가 있다면 <strong>일몰 시간대</strong>를 추천합니다.' },
      { icon: 'time', faIcon: 'fa-clock', html: '운영시간과 야간 콘텐츠는 시즌별 변동이 있어 공식 예매 페이지에서 확인 후 방문하세요.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-circle-info"></i> 동선 팁</strong><br>MUSH ROOM APARTAMENTOS 근처라 체크인 전후로 가볍게 들르기 좋습니다.',
    },
    map: { q: 'Setas de Sevilla', link: 'https://maps.app.goo.gl/UNNknHALSuqVXiHw5' },
  },
  {
    name: '세비야 대성당',
    nameEn: 'Catedral de Sevilla',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Catedral_de_Sevilla_2018.jpg/800px-Catedral_de_Sevilla_2018.jpg'),
    visited: true,
    badge: { type: 'star', icon: 'fa-church', text: '세계유산' },
    address: 'Av. de la Constitucion, s/n, Casco Antiguo, 41004 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-lightbulb', html: '세계 최대급 고딕 성당으로, 히랄다 탑과 콜럼버스 묘, 거대한 제단화가 핵심 관람 포인트입니다.' },
      { icon: 'price', faIcon: 'fa-coins', html: '2026년 기준 일반 입장권은 <strong>온라인 13유로</strong>, 현장 14유로. 오디오 가이드는 별도 요금입니다.' },
      { icon: 'warn', faIcon: 'fa-triangle-exclamation', html: '대기 줄이 길 수 있으니 <strong>온라인 예매</strong> 또는 오픈 시간대 방문 추천. 현장 구매 줄은 특히 오래 걸릴 수 있습니다.' },
      { icon: 'note', faIcon: 'fa-headphones', html: '오디오 가이드를 빌리면 관람 밀도가 올라갑니다. 한국어 지원 여부는 방문 시점의 공식 앱/대여 옵션에서 한 번 더 확인하세요.' },
    ],
    map: { q: 'Catedral de Sevilla', link: 'https://maps.app.goo.gl/rBQbsjuQMr1nZWrw5' },
  },
  {
    name: '알카사르',
    nameEn: 'Real Alcazar de Sevilla',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Patio_de_las_Doncellas%2C_Real_Alc%C3%A1zar_de_Sevilla.jpg/800px-Patio_de_las_Doncellas%2C_Real_Alc%C3%A1zar_de_Sevilla.jpg'),
    badge: { type: 'rec', icon: 'fa-thumbs-up', text: '강력 추천' },
    address: 'Casco Antiguo, 41004 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-archway', html: '화려한 아치, 16세기 타일, 물소리가 이어지는 정원으로 유명한 무데하르 양식 왕궁입니다.' },
      { icon: 'tip', faIcon: 'fa-crown', html: '그라나다에 알람브라가 있다면 세비야에는 <strong>알카사르</strong>. 세비야 체류 시간이 짧다면 대성당보다 알카사르를 먼저 추천합니다.' },
      { icon: 'warn', faIcon: 'fa-ticket', html: '인기 시간대는 매진될 수 있어 <strong>공식 사이트 사전 예매</strong>가 안전합니다.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-leaf"></i> 관람 포인트</strong><br>실내 궁전만 보고 나오지 말고 정원까지 충분히 걸어보세요. 세비야의 빛과 물소리가 가장 잘 살아나는 곳입니다.',
    },
    map: { q: 'Real Alcazar de Sevilla', link: 'https://maps.app.goo.gl/Rv8jURjzT1fpgBHQ7' },
  },
];

export default attractions;
