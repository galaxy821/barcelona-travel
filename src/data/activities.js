const img = (url) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&n=-1`;

const activities = [
  {
    name: '세비야 자전거 대여',
    nameEn: 'Sevici · Guadalquivir Riverside Ride',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Sevici_bikes_in_Seville.jpg/800px-Sevici_bikes_in_Seville.jpg'),
    badge: { type: 'rec', icon: 'fa-bicycle', text: '추천' },
    address: '세비야 시내 Sevici 정류장 및 자전거 대여점',
    route: {
      title: '추천 라이딩 동선',
      steps: [
        { icon: 'fa-bicycle', text: '구시가지' },
        { icon: 'fa-water', text: '강변 자전거길' },
        { icon: 'fa-tree', text: '마리아 루이사 공원' },
        { icon: 'fa-landmark-dome', text: '스페인 광장' },
      ],
    },
    info: [
      { icon: 'tip', faIcon: 'fa-bicycle', html: '세비야는 평지가 많고 강변 자전거 도로가 잘 되어 있어 <strong>자전거로 시내를 돌기 좋은 도시</strong>입니다.' },
      { icon: 'tip', faIcon: 'fa-route', html: '도심에서 과달키비르 강변을 따라 내려가 스페인 광장까지 가는 코스를 추천합니다.' },
      { icon: 'warn', faIcon: 'fa-triangle-exclamation', html: '구시가지 골목은 보행자가 많으니 속도를 낮추고, 자전거 반납 위치를 미리 확인하세요.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-circle-info"></i> 팁</strong><br>짧게 탈 거면 공유 자전거, 반나절 이상 여유롭게 탈 거면 일반 대여점이 편합니다.',
    },
    map: { q: 'Sevici Sevilla Plaza de Espana', link: 'https://www.google.com/maps/search/Sevici+Sevilla/' },
  },
];

export default activities;
