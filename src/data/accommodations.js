const img = (url) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&n=-1`;

const accommodations = [
  {
    name: 'MUSH ROOM APARTAMENTOS',
    nameEn: 'The Mush Rooms Apartamentos Turisticos Sevilla',
    image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Metropol_Parasol_Sevilla_2011.jpg/800px-Metropol_Parasol_Sevilla_2011.jpg'),
    visited: false,
    badge: { type: 'rec', icon: 'fa-thumbs-up', text: '최고 추천' },
    address: 'C. Imagen, 4, Casco Antiguo, 41003 Sevilla',
    info: [
      { icon: 'tip', faIcon: 'fa-location-dot', html: '<strong>세비야 구시가지 중심</strong>, 라스 세타스와 산 페드로 광장 사이에 있어 도보 여행 동선이 좋습니다.' },
      { icon: 'price', faIcon: 'fa-coins', html: '가성비, 위치, 시설을 종합하면 <strong>세비야 숙소 1순위</strong>로 추천합니다.' },
      { icon: 'menu', faIcon: 'fa-kitchen-set', html: '아파트형 숙소라 <strong>간단한 조리 가능</strong>. 까르푸, 디아, 메르카도나 등에서 장봐서 요리하기 좋습니다.' },
      { icon: 'note', faIcon: 'fa-person-walking', html: '스페인 광장, 대성당, 알카사르, 쇼핑 거리까지 대부분 도보 또는 자전거로 이동하기 편한 위치입니다.' },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-circle-info"></i> 숙소 활용 팁</strong><br>아침은 숙소에서 간단히 만들어 먹고, 점심과 저녁은 타파스 바를 섞으면 여행 예산을 꽤 아낄 수 있습니다.',
    },
    map: { q: 'MUSH ROOM APARTAMENTOS C. Imagen 4 Sevilla', link: 'https://maps.app.goo.gl/jDLUhG5ErsW6fMV77' },
  },
];

export default accommodations;
