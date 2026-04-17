const restaurants = {
  main: [
    {
      name: 'Bar Anxoita',
      visited: true,
      badge: { type: 'rec', icon: 'fa-fire', text: '꿀대구' },
      address: 'Carrer de Mallorca, 250, Eixample, 08008 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>꿀대구 (Bacalao)</strong> 6~8유로' },
        { icon: 'warn', faIcon: 'fa-clock', html: '점심시간대 웨이팅 있을 수 있음' },
      ],
      map: { q: 'Bar Anxoita Barcelona', link: 'https://maps.app.goo.gl/uP61JP4TgXXgwYA78' },
    },
    {
      name: 'Vinitus',
      visited: true,
      badge: { type: 'rec', icon: 'fa-fire', text: '꿀대구' },
      address: 'Carrer del Consell de Cent, 333, Eixample, 08007 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>꿀대구 (Bacalao)</strong> 맛집' },
        { icon: 'warn', faIcon: 'fa-clock', html: '웨이팅 거의 <strong>필수</strong>' },
      ],
      map: { q: 'Vinitus Barcelona', link: 'https://maps.app.goo.gl/sjFgeEixxgW1U6HX6' },
    },
    {
      name: '라보케리아 시장',
      nameEn: 'Mercat de la Boqueria',
      image: '/barcelona-travel/images/boqueria.jpg',
      visited: true,
      address: 'La Rambla, 91, Ciutat Vella, 08001 Barcelona',
      info: [
        { icon: 'tip', faIcon: 'fa-lightbulb', html: '바르셀로나 대표 재래시장. 신선한 <strong>과일, 해산물, 타파스</strong>를 즐길 수 있는 곳' },
      ],
      map: { q: 'Mercat de la Boqueria Barcelona', link: 'https://maps.app.goo.gl/8aPRMiDFt9rVd8cF7' },
    },
    {
      name: 'Makamaka',
      nameEn: 'Barcelona',
      visited: true,
      address: 'Pg. de Joan de Borbo, 76, Ciutat Vella, 08039 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>수제 버거</strong> 맛집' },
        { icon: 'tip', faIcon: 'fa-umbrella-beach', html: '바르셀로네타 <strong>해변 근처</strong>, 해변 갈 겸 들리기 좋음' },
      ],
      map: { q: 'Makamaka Barcelona Beach', link: 'https://maps.app.goo.gl/t3Cbb851z3nVT67BA' },
    },
    {
      name: 'Cerveceria Catalana',
      nameEn: '타파스 전문 레스토랑',
      badge: { type: 'rec', icon: 'fa-fire', text: '인기' },
      address: 'Carrer de Mallorca, 236, Eixample, 08008 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>감자, 문어, 감바스</strong> 등 다양한 타파스' },
      ],
      map: { q: 'Cerveceria Catalana Barcelona', link: 'https://maps.app.goo.gl/ZfoSauizQEB6vhmq5' },
    },
    {
      name: '시우다드 콘달',
      nameEn: 'Ciutat Comtal',
      address: 'Rambla de Catalunya, 18, Eixample, 08007 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>타파스바</strong>' },
      ],
      map: { q: 'Ciutat Comtal Barcelona', link: 'https://maps.app.goo.gl/cA41YqBS7r5pTySV6' },
    },
    {
      name: '토스카',
      nameEn: 'Tosca Palau',
      address: 'Carrer de Sant Pere Més Alt, 8, Ciutat Vella, 08003 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>참치 타다끼, 갈릭 프라운</strong>' },
      ],
      map: { q: 'Tosca Palau Barcelona', link: 'https://maps.app.goo.gl/u6JLDhkJouotXc9w9' },
    },
    {
      name: 'Maná 75',
      nameEn: '지중해식 음식점',
      address: 'Pg. de Joan de Borbó, 101, Ciutat Vella, 08039 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>지중해식 음식</strong>' },
      ],
      map: { q: 'Maná 75 Barcelona', link: 'https://maps.app.goo.gl/BaK7UMHoxcCn1HUd8' },
    },
  ],
  sagrada: [
    {
      name: 'Oporto Restaurante',
      badge: { type: 'star', icon: 'fa-star', text: '추천' },
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '포르투갈 음식 - <strong>국물 빠에야</strong>(Arroz de marisco), <strong>문어 세비체</strong>(Pulpo con salsa verde), <strong>문어 구이</strong>(Pulpo a Lagareiro)' },
        { icon: 'tip', faIcon: 'fa-wine-glass', html: '포르투 식후주, 포르투갈 껌 제공' },
        { icon: 'time', faIcon: 'fa-calendar-xmark', html: '<strong>화요일 휴무</strong>' },
        { icon: 'phone', faIcon: 'fa-phone', html: '932 77 71 58' },
      ],
      map: { q: 'Oporto Restaurante Barcelona Sagrada Familia', link: 'https://goo.gl/maps/7gWvPPTQAMvVMVtk7' },
    },
    {
      name: 'El Glop Gaudi',
      badge: { type: 'star', icon: 'fa-star', text: '추천' },
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>빠에야 종류</strong> 추천. 카탈루냐 광장 유명 식당의 새 체인점' },
        { icon: 'tip', faIcon: 'fa-wine-glass', html: '스페인 스파클링 와인 <strong>까바</strong> 한 잔 추천' },
        { icon: 'phone', faIcon: 'fa-phone', html: '934 87 00 97' },
      ],
      map: { q: 'El Glop Gaudi Barcelona', link: 'https://goo.gl/maps/LMGbpRSViqb33a3M8' },
    },
    {
      name: 'Puertecillo',
      nameEn: 'Sagrada Familia',
      badge: { type: 'star', icon: 'fa-star', text: '추천' },
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '해산물 체인점 - <strong>오늘의 메뉴</strong>(Menu del Dia), 오징어, <strong>맛조개</strong>, 토마토 홍합스튜' },
        { icon: 'tip', faIcon: 'fa-lightbulb', html: '진열대에서 <strong>직접 재료 선택 가능</strong>, 스페인 식후주' },
        { icon: 'time', faIcon: 'fa-calendar-xmark', html: '<strong>월요일 휴무</strong>' },
        { icon: 'phone', faIcon: 'fa-phone', html: '934 50 01 91' },
      ],
      map: { q: 'Puertecillo Sagrada Familia Barcelona', link: 'https://goo.gl/maps/ezdQJ7HoKnHdWtAt5' },
    },
    {
      name: 'XYG Malatang',
      nameEn: 'Spicy Hotpot',
      badge: { type: 'star', icon: 'fa-star', text: '추천' },
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>마라탕</strong> - 뚝배기에 나와 따뜻한 국물, 맵기 단계 선택 가능' },
        { icon: 'tip', faIcon: 'fa-mug-hot', html: '음료 제공' },
        { icon: 'phone', faIcon: 'fa-phone', html: '934 99 71 74' },
      ],
      map: { q: 'XYG Malatang Spicy Hotpot Barcelona', link: 'https://maps.app.goo.gl/ikFxFD6FVWF9pN4D6' },
    },
    {
      name: 'Vietnam Authentic',
      nameEn: 'Restaurant',
      badge: { type: 'star', icon: 'fa-star', text: '추천' },
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>쌀국수</strong>, 오늘의 메뉴 추천. 추운 날 따뜻한 국물이 생각날 때!' },
        { icon: 'tip', faIcon: 'fa-mug-hot', html: '환영음료 제공' },
        { icon: 'phone', faIcon: 'fa-phone', html: '934 46 45 87' },
      ],
      map: { q: 'Vietnam Authentic Restaurant Barcelona', link: 'https://maps.app.goo.gl/J9kyYY8XgkZTk9p17' },
    },
    {
      name: 'Paisano Cafe',
      badge: { type: 'star', icon: 'fa-star', text: '추천' },
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>라자냐</strong>, 연어 훈제 토스트, 오늘의 파스타 추천' },
        { icon: 'tip', faIcon: 'fa-lightbulb', html: "'동포 카페'라는 이름의 친근한 이탈리아 카페" },
        { icon: 'time', faIcon: 'fa-calendar-xmark', html: '<strong>월요일 휴무</strong>' },
        { icon: 'phone', faIcon: 'fa-phone', html: '935 25 04 71' },
      ],
      map: { q: 'Paisano Cafe Barcelona', link: 'https://goo.gl/maps/Lmto4DnWWGKr4F5E9' },
    },
    {
      name: 'The Venue Steakhouse',
      badge: { type: 'star', icon: 'fa-star', text: '추천' },
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>티본 스테이크</strong> 추천' },
        { icon: 'tip', faIcon: 'fa-face-smile', html: '친절한 서비스' },
        { icon: 'time', faIcon: 'fa-calendar-xmark', html: '<strong>월 / 화요일 휴무</strong>' },
        { icon: 'phone', faIcon: 'fa-phone', html: '936 39 96 75' },
      ],
      map: { q: 'The Venue Steakhouse Barcelona', link: 'https://goo.gl/maps/uq9XabAj4PSKg1M99' },
    },
    {
      name: 'Bicos Restaurante',
      badge: { type: 'star', icon: 'fa-star', text: '추천' },
      info: [
        { icon: 'menu', faIcon: 'fa-utensils', html: '<strong>서버에게 음식 추천 요청</strong>하는 것을 권장' },
        { icon: 'tip', faIcon: 'fa-lightbulb', html: '갈리시아 레스토랑. 좋은 식재료, 분위기, 멋진 플레이팅' },
        { icon: 'time', faIcon: 'fa-calendar-xmark', html: '<strong>월요일 휴무</strong>' },
        { icon: 'phone', faIcon: 'fa-phone', html: '936 11 82 27' },
      ],
      map: { q: 'Bicos Restaurante Barcelona', link: 'https://g.page/bicosrestaurante?share' },
    },
  ],
  dessert: [
    {
      name: 'Bilmonte',
      nameEn: '아이스크림',
      visited: true,
      address: 'Carrer del Consell de Cent, 282, Eixample, 08007 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-ice-cream', html: '<strong>아이스크림</strong> 전문점' },
      ],
      map: { q: 'Bilmonte Barcelona', link: 'https://maps.app.goo.gl/qQwmAFrTTsfkZF4r5' },
    },
    {
      name: '추레리아 마누엘 산 로만',
      nameEn: 'Xurreria Manuel San Román',
      address: 'Baixos, Carrer dels Banys Nous, 8, Local, 08002 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-cookie-bite', html: '<strong>츄러스 전문점</strong> - 기본 츄러스에 딥초코 조합으로 먹기' },
      ],
      map: { q: 'Xurreria Manuel San Roman Barcelona', link: 'https://maps.app.goo.gl/Fv1fZVwZMuhsqAUh8' },
    },
    {
      name: 'Be Chocolat | Gòtic',
      nameEn: '초콜릿 카페',
      address: 'Carrer dels Banys Nous, 17, Ciutat Vella, 08002 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-mug-hot', html: '<strong>초콜릿 카페</strong>' },
      ],
      map: { q: 'Be Chocolat Gotic Barcelona', link: 'https://maps.app.goo.gl/t1ZfYksXmtdFpEMG9' },
    },
    {
      name: 'Cake-me | Gótico',
      nameEn: 'Cheesecake 0,99€',
      address: 'Carrer dels Banys Nous, 3, Ciutat Vella, 08002 Barcelona',
      info: [
        { icon: 'menu', faIcon: 'fa-cake-candles', html: '<strong>케이크 전문점</strong> - 치즈케이크 저렴!' },
      ],
      map: { q: 'Cake-me Gotico Barcelona Cheesecake', link: 'https://maps.app.goo.gl/jvkPtTZwmovfBvSd7' },
    },
  ],
};

export default restaurants;
