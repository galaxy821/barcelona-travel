const img = (url) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&n=-1`;

const restaurants = {
  main: [
    {
      name: 'Bendala Braseria',
      nameEn: '브라세리아 · €20~30',
      image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tuna_tartare.jpg/800px-Tuna_tartare.jpg'),
      visited: true,
      badge: { type: 'rec', icon: 'fa-fire', text: '추천' },
      address: 'P.º de Catalina de Ribera, 4, Casco Antiguo, 41004 Sevilla',
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>와사비 아이스크림을 얹은 참치 타르타르</strong>와 <strong>이베리코 갈비</strong>가 기억에 남는 곳.' },
        { icon: 'tip', faIcon: 'fa-location-dot', html: '알카사르와 산타 크루스 지구 동선에 넣기 좋습니다.' },
        { icon: 'price', faIcon: 'fa-coins', html: '1인 예산은 보통 <strong>20~30유로</strong> 정도로 잡으면 편합니다.' },
      ],
      map: { q: 'Bendala Braseria Sevilla', link: 'https://maps.app.goo.gl/niMsbZw2kzBc6aKd9' },
    },
    {
      name: 'Uno de Delicias',
      nameEn: '수제 버거 · €10~20',
      image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/800px-Cheeseburger.jpg'),
      visited: true,
      badge: { type: 'star', icon: 'fa-burger', text: '버거' },
      address: 'P.º de las Delicias, 1, Casco Antiguo, 41001 Sevilla',
      info: [
        { icon: 'menu', faIcon: 'fa-burger', html: '<strong>수제 버거 맛집</strong>. 스페인 음식이 살짝 물릴 때 좋은 선택지입니다.' },
        { icon: 'tip', faIcon: 'fa-person-walking', html: '과달키비르 강변, 대성당, 황금의 탑 쪽 산책 동선과 잘 맞습니다.' },
        { icon: 'price', faIcon: 'fa-coins', html: '1인 예산 <strong>10~20유로</strong>.' },
      ],
      map: { q: 'Uno de Delicias Sevilla', link: 'https://maps.app.goo.gl/kNePxJpRkFws6UGi6' },
    },
    {
      name: 'Bar El Comercio',
      nameEn: '타파스 바 · 츄러스 · €1~10',
      image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Chocolate_con_churros_%28cropped%29.jpg/800px-Chocolate_con_churros_%28cropped%29.jpg'),
      badge: { type: 'rec', icon: 'fa-cookie-bite', text: '츄러스' },
      address: 'C. Lineros, 9, Casco Antiguo, 41004 Sevilla',
      info: [
        { icon: 'menu', faIcon: 'fa-cookie-bite', html: '<strong>츄러스 맛집</strong>으로 유명한 오래된 바. 초콜라테와 함께 가볍게 먹기 좋습니다.' },
        { icon: 'warn', faIcon: 'fa-clock', html: '항상 사람이 많은 편이라 아침이나 애매한 시간대 방문 추천.' },
        { icon: 'price', faIcon: 'fa-coins', html: '간식 기준 <strong>1~10유로</strong>.' },
      ],
      map: { q: 'Bar El Comercio Sevilla', link: 'https://maps.app.goo.gl/PWAiRFFaYDbf4FBe6' },
    },
    {
      name: 'Kukuchurro',
      nameEn: 'Plaza del Salvador · 추로스 전문점',
      image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Churros_en_un_puesto_de_Madrid.jpg/800px-Churros_en_un_puesto_de_Madrid.jpg'),
      badge: { type: 'star', icon: 'fa-cookie-bite', text: '간식' },
      address: 'Pl. del Salvador, 15, Casco Antiguo, 41004 Sevilla',
      info: [
        { icon: 'menu', faIcon: 'fa-cookie-bite', html: '<strong>추로스 전문점</strong>. 살바도르 광장 주변을 지날 때 간식 코스로 넣기 좋습니다.' },
        { icon: 'tip', faIcon: 'fa-mug-hot', html: '바삭한 추로스와 진한 초콜라테 조합으로 짧게 쉬어가기 좋습니다.' },
      ],
      map: { q: 'Kukuchurro Plaza del Salvador Sevilla', link: 'https://maps.app.goo.gl/MPT9f9B5oor7eBJW7' },
    },
  ],
  dessert: [
    {
      name: 'Helados La Abuela',
      nameEn: '아이스크림',
      image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Ice_Cream_dessert_02.jpg/800px-Ice_Cream_dessert_02.jpg'),
      visited: true,
      badge: { type: 'star', icon: 'fa-ice-cream', text: '디저트' },
      address: 'C. Larana, 10, Casco Antiguo, 41003 Sevilla',
      info: [
        { icon: 'menu', faIcon: 'fa-ice-cream', html: '직원은 불친절할 수 있지만 <strong>아이스크림은 맛있는 곳</strong>.' },
        { icon: 'tip', faIcon: 'fa-location-dot', html: '라스 세타스와 가까워 전망대 전후 디저트 코스로 좋습니다.' },
      ],
      map: { q: 'Helados La Abuela Calle Larana Sevilla', link: 'https://maps.app.goo.gl/5HocvYznvrnae6vWA' },
    },
  ],
};

export default restaurants;
