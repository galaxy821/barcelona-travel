const img = (url) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&n=-1`;

const shopping = {
  souvenir: {
    label: '오렌지 · 기념품',
    labelIcon: 'fa-gift',
    items: [
      {
        name: 'Orange Tree Sevilla',
        nameEn: '오렌지 기념품점',
        image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Bitter_orange_marmalade.jpg/800px-Bitter_orange_marmalade.jpg'),
        badge: { type: 'rec', icon: 'fa-thumbs-up', text: '선물 추천' },
        address: 'C/ Ximenez de Enciso, 22, Casco Antiguo, 41004 Sevilla',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '세비야 오렌지를 테마로 한 <strong>술, 꿀, 잼, 과자, 향 제품</strong>을 찾기 좋은 기념품점.' },
          { icon: 'note', faIcon: 'fa-gift', html: '퀄리티가 좋아서 가족, 친구 선물용으로 추천합니다.' },
        ],
        items: [
          { icon: 'fa-jar', name: '오렌지 잼', desc: '가볍고 선물하기 좋은 기본템' },
          { icon: 'fa-wine-bottle', name: '오렌지 리큐르', desc: '세비야다운 맛이 나는 술 기념품' },
          { icon: 'fa-spoon', name: '오렌지 꿀', desc: '숙소 조식이나 차와 함께 먹기 좋은 선물' },
        ],
        map: { q: 'Orange Tree Sevilla Ximenez de Enciso 22', link: 'https://maps.app.goo.gl/snah1ZzJfMLzM1kf6' },
      },
    ],
  },
  grocery: {
    label: '마트 · 숙소 조리',
    labelIcon: 'fa-basket-shopping',
    items: [
      {
        name: 'Carrefour Express',
        nameEn: '숙소 장보기',
        image: img('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Carrefour_Express_in_Spain.jpg/800px-Carrefour_Express_in_Spain.jpg'),
        badge: { type: 'star', icon: 'fa-kitchen-set', text: '요리' },
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: 'MUSH ROOM APARTAMENTOS에서 조리할 계획이라면 가까운 까르푸, 디아, 메르카도나에서 장보기.' },
          { icon: 'menu', faIcon: 'fa-utensils', html: '추천 장바구니: 하몽, 치즈, 토마토, 올리브, 과일, 요거트, 와인, 빵.' },
          { icon: 'warn', faIcon: 'fa-triangle-exclamation', html: '스페인 마트는 지점별 영업시간 차이가 크니 구글지도에서 당일 영업 여부 확인.' },
        ],
        map: { q: 'Carrefour Express Calle Imagen Sevilla', link: 'https://www.google.com/maps/search/Carrefour+Express+Calle+Imagen+Sevilla/' },
      },
    ],
  },
  note: '세비야는 오렌지, 타일, 플라멩고, 가죽 소품이 기념품 키워드입니다. 무거운 병 제품은 귀국 수하물 무게를 먼저 계산하고 고르세요.',
};

export default shopping;
