const shopping = {
  olive: {
    label: '올리브 · 스킨케어 · 수공예',
    labelIcon: 'fa-bag-shopping',
    items: [
      {
        name: 'La Chinata',
        nameEn: '올리브 오일 전문점',
        visited: true,
        badge: { type: 'rec', icon: 'fa-thumbs-up', text: '필수' },
        address: '바르셀로나 내 여러 지점 운영',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '세계 최대 올리브 생산국 스페인답게 다양한 올리브 제품 보유. <strong>트러플 올리브 오일</strong> 추천' },
        ],
        items: [
          { icon: 'fa-bottle-droplet', name: '올리브유', desc: '직접 빵에 찍어 시식 가능! 프리미엄 올리브유는 한국 대비 가격 차이가 상당하니 구매 추천' },
          { icon: 'fa-heart', name: '올리브 립밤', desc: '2유로대의 저렴한 가격, 여러 개 사서 선물하기 좋음' },
          { icon: 'fa-jar', name: '발사믹 소스', desc: '화이트트러플맛 추천' },
        ],
        highlight: {
          html: `<strong><i class="fa-solid fa-store"></i> 주요 지점</strong><br>&middot; <a href="https://goo.gl/maps/b8k5sVctmzYXsPyi8" target="_blank" rel="noopener">카탈루냐 광장 근처</a><br>&middot; <a href="https://goo.gl/maps/tvWFDLMGqCf9UePJA" target="_blank" rel="noopener">피카소 미술관 근처</a><br>&middot; <a href="https://maps.app.goo.gl/1F5JBW8nipCT2YPVA" target="_blank" rel="noopener">카사 바트요 근처</a>`,
        },
        map: { q: 'La Chinata Barcelona Diputacio', link: 'https://maps.app.goo.gl/WhtVYrYXUnvHtWFY6' },
      },
      {
        name: 'Sabon',
        nameEn: '스킨 케어 제품',
        badge: { type: 'rec', icon: 'fa-thumbs-up', text: '추천' },
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '<strong>사해 소금</strong>을 사용한 제품으로 가격, 품질, 친절 모두 좋은 곳. <strong>바디스크럽, 바디워시</strong> 추천' },
        ],
        map: { q: 'Sabon Barcelona', link: 'https://goo.gl/maps/vCoSZnPt3csZ9r6Q7' },
      },
      {
        name: 'Lush',
        nameEn: '핸드메이드 스킨케어',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '친환경 핸드메이드 제품. 세계에서 <strong>세 번째로 저렴한 곳이 스페인</strong>! 비누, 입욕제, 더티 스프레이 추천' },
        ],
        map: { q: 'Lush Barcelona Centro', link: 'https://g.page/LushBarcelonaCentro?share' },
      },
      {
        name: '사바테르',
        nameEn: 'Sabater Hnos. - 수제 비누',
        visited: true,
        address: 'Placa de Sant Felip Neri, 1, Ciutat Vella, 08002 Barcelona',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '<strong>삼대가 내려온 가족 가게</strong>. 올리브 오일 70%와 코코넛 오일 30% 등 자연적인 재료로 제작. 고딕지구에 위치하며 선물용으로 구매하기 좋음' },
        ],
        map: { q: 'Sabater Hnos Barcelona', link: 'https://g.page/sabaterhnosbcn?share' },
      },
      {
        name: 'Cereria Subira',
        nameEn: '양초 전문점 (1761년~)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cereria_Subir%C3%A0%2C_fa%C3%A7ana.jpg/800px-Cereria_Subir%C3%A0%2C_fa%C3%A7ana.jpg',
        visited: true,
        address: 'Baixada de la Llibreteria, 7, Ciutat Vella, 08002 Barcelona',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '<strong>1761년부터 이어온 바르셀로나에서 가장 오래된 양초집</strong>. 사그라다 파밀리아 성당에 양초를 납품하는 유서 깊은 가게. <strong>사그라다 파밀리아 실루엣 촛대</strong> 추천' },
        ],
        map: { q: 'Cereria Subira Barcelona', link: 'https://maps.app.goo.gl/p8ogR6Rydsw5BMrr5' },
      },
      {
        name: 'Primor',
        nameEn: '스페인 화장품 가게',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '구글지도에서 Primor 검색 후 가까운 곳 방문. <strong>산양유 크림 Ziaja</strong>와 <strong>콜라겐 크림 Xhekpon</strong> 추천' },
        ],
      },
    ],
  },
  fashion: {
    label: '패션 · 가방 · 신발',
    labelIcon: 'fa-shirt',
    items: [
      {
        name: 'La Manual Alpargatera',
        nameEn: '에스파듀 (스페인 짚신)',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '천연 소재로 <strong>삼대가 만들고 있는 수제 신발집</strong>. 한국 사이즈와 한국어로 안내 받을 수 있음' },
        ],
        map: { q: 'La Manual Alpargatera Barcelona', link: 'https://g.page/lamanual?share' },
      },
      {
        name: 'Calpa',
        nameEn: '가죽 가방',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '바르셀로나 <strong>보도블럭 무늬가 새겨진 가방</strong>은 다른 곳에서 볼 수 없는 독창적인 디자인' },
        ],
        map: { q: 'Calpa Barcelona leather bags', link: 'https://goo.gl/maps/T8GNFJixpwEzpLMB7' },
      },
      {
        name: 'Pinzat',
        nameEn: '스페인의 프라이탁',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '예술가들과 협업으로 만들어져 <strong>독특한 디자인</strong>의 가방을 구매할 수 있음' },
        ],
        map: { q: 'Pinzat Barcelona', link: 'https://goo.gl/maps/EDz561s5vrWfCvgr8' },
      },
    ],
  },
  food: {
    label: '식품 · 마트 · 백화점',
    labelIcon: 'fa-basket-shopping',
    items: [
      {
        name: 'Torrons Vicens',
        nameEn: '스페인 누가 뚜론 (1775년~)',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Carrer_Petritxol_-_Botiga_Torrons_Vicens.JPG/800px-Carrer_Petritxol_-_Botiga_Torrons_Vicens.JPG',
        address: 'Pl. de la Universitat, 5, Ciutat Vella, 08007 Barcelona',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '<strong>1775년부터 시작된 가족 기업</strong>. 기념품 초콜릿 판매. 구글지도에서 가게 이름을 검색하여 가까운 가게를 방문' },
        ],
        map: { q: 'Torrons Vicens Barcelona', link: 'https://maps.app.goo.gl/MpK5y7f93xxKtS638' },
      },
      {
        name: '하몽 전문점',
        nameEn: 'Reserva Iberica 등',
        info: [
          { icon: 'warn', faIcon: 'fa-triangle-exclamation', html: '우리나라에는 <strong>반입이 금지</strong>되어 있으니 스페인에서 많이 드세요!' },
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '엄선된 하몽을 다양한 종류와 가격대로 구매 가능' },
        ],
        highlight: {
          html: `<strong><i class="fa-solid fa-store"></i> 추천 매장</strong><br>&middot; <a href="https://goo.gl/maps/jeNZe4nXad2d4dJc9" target="_blank" rel="noopener">사그라다 파밀리아 성당 근처</a><br>&middot; <a href="https://g.page/Reserva-Iberica-Rambla-Catalunya?share" target="_blank" rel="noopener">카탈루냐 광장 근처 (Reserva Iberica)</a>`,
        },
      },
      {
        name: '스페인 와인',
        nameEn: '가성비 월등한 와인',
        info: [
          { icon: 'tip', faIcon: 'fa-wine-bottle', html: '바르셀로나 인근 대표 와인 생산지:<br>&middot; <strong>백포도주 / 스파클링</strong>: Penedes 지역<br>&middot; <strong>적포도주</strong>: Priorat 지역' },
          { icon: 'note', faIcon: 'fa-plane', html: '유럽 경유 귀국 시 공항 면세점에서도 구매 가능' },
        ],
      },
      {
        name: 'Mercadona',
        nameEn: '스페인 국민마트',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '우리나라 홈플러스와 같은 스페인 국민마트! 구글지도에서 Mercadona 검색 후 가까운 곳 방문' },
        ],
        items: [
          { icon: 'fa-cookie-bite', name: '하몽맛 감자칩', desc: '과자코너에서 감자칩과 하몽이 같이 그려진 과자를 찾아보세요' },
          { icon: 'fa-mug-hot', name: '꿀국화차 (Manzanilla con Miel)', desc: 'Hacendado 자체브랜드 제품 추천' },
          { icon: 'fa-cookie-bite', name: 'Valor 초콜릿 분말 / 호두 초콜릿', desc: '선물용으로도 좋은 스페인 대표 초콜릿' },
          { icon: 'fa-pump-soap', name: '올리브 크림 / 아르간 바디로션 / 올리브 핸드크림', desc: '화장품 코너, 1유로대 가성비 바디케어 제품' },
          { icon: 'fa-spray-can-sparkles', name: '프로폴리스 스프레이', desc: 'SPRAY PULVERIZADOR PROPOLIS ORAL로 검색' },
          { icon: 'fa-bread-slice', name: '빵 코너 에그타르트 + 착즙 오렌지주스', desc: '저렴하지만 맛있는 간식! 과일 코너에서 즉석 착즙 오렌지주스도 함께' },
        ],
      },
      {
        name: 'El Corte Ingles',
        nameEn: 'Placa de Catalunya',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/El_Corte_Ingl%C3%A9s_Barcelona_Pla%C3%A7a_de_Catalunya_2013.jpg/800px-El_Corte_Ingl%C3%A9s_Barcelona_Pla%C3%A7a_de_Catalunya_2013.jpg',
        visited: true,
        address: 'Pl. de Catalunya, 14, Eixample, 08002 Barcelona',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '카탈루냐 광장 앞 스페인 독점 백화점. <strong>지하 식품관</strong>에 슈퍼마켓과 고메마켓이 있음' },
        ],
        items: [
          { icon: 'fa-candy-cane', name: '뚜론 (Turron)', desc: '엘꼬르떼 잉글레스 자체브랜드가 비센스보다 훨씬 저렴! 여러 맛 중 취향껏 선택' },
          { icon: 'fa-gift', name: '라비토스 로열 초콜렛 (Rabitos Royal)', desc: '지하 고메마켓 초콜렛 코너. 달콤한 무화과 초콜렛' },
          { icon: 'fa-cookie-bite', name: 'Sal de Ibiza (이비자 꽃소금)', desc: '지하 식품관에서 구매 가능한 프리미엄 소금' },
        ],
        map: { q: 'El Corte Ingles Placa Catalunya Barcelona', link: 'https://maps.app.goo.gl/GyR7e82umZCMRwJ28' },
      },
    ],
  },
  pharmacy: {
    label: '약국 · 건강',
    labelIcon: 'fa-prescription-bottle-medical',
    items: [
      {
        name: 'Potenciator',
        nameEn: "'마시는 수액' 영양제",
        badge: { type: 'star', icon: 'fa-star', text: '가성비' },
        info: [
          { icon: 'price', faIcon: 'fa-coins', html: '한국에서 한 앰플당 약 5,000원이지만, 스페인에서는 <strong>20개 앰플에 약 28,000원</strong>으로 가성비 최고' },
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '약국(Farmacia)에서 <strong>"뽀뗀씨아또르 뽀르 파보르"</strong>라고 하면 구매 가능' },
        ],
      },
    ],
  },
  note: `· 가게 방문 전 구글지도에서 <strong>영업시간을 꼭 확인</strong>해주세요<br>· 한국에 직수입되는 보니야 감자칩, 롤레아 상그리아, 마티덤 앰플 등은 가격 차이가 크지 않아 추천하지 않습니다<br>· 가우디에 대해 더 알고 싶다면 <a href="https://url.kr/cyht49" target="_blank" rel="noopener"><strong>'인간 가우디를 만나다'</strong></a> 책을 추천합니다`,
};

export default shopping;
