const accommodations = [
  {
    name: '호스텔 베니돔',
    nameEn: 'Hostel Benidorm',
    badge: { type: 'rec', icon: 'fa-thumbs-up', text: '추천' },
    address: 'Rambla dels Caputxins, 37, Ciutat Vella, 08002 Barcelona',
    info: [
      { icon: 'tip', faIcon: 'fa-lightbulb', html: '트윈룸 크기는 크지 않지만 <strong>깔끔하고 체크인 수월</strong>. Liceu 역 근처로 카탈루냐 광장, 구시가지, 해변까지 도보 이동 가능. <strong>도보 여행 베이스캠프로 최적</strong>' },
      { icon: 'price', faIcon: 'fa-coins', html: '도시세 <strong>22유로</strong> 별도 부과' },
    ],
    map: { q: 'Hostel Benidorm Barcelona Rambla Caputxins', link: 'https://maps.app.goo.gl/mAUC6m1oohFHbh2o9' },
  },
  {
    name: '오스탈 이즈나하르 바르셀로나',
    nameEn: 'Hostal Iznajar Barcelona',
    address: 'Carrer del Carme, 38, Ciutat Vella, 08001 Barcelona',
    info: [
      { icon: 'tip', faIcon: 'fa-lightbulb', html: '트윈룸 크기 작고 호스텔 베니돔보다 오래된 느낌이지만 체크인 수월. Liceu 역 근처이며 <strong>라보케리아 시장이 바로 코앞</strong>. 까르푸도 가까움' },
      { icon: 'note', faIcon: 'fa-person-walking', html: '카탈루냐 광장, 구시가지, 해변까지 도보 이동 가능' },
    ],
    map: { q: 'Hostal Iznajar Barcelona', link: 'https://maps.app.goo.gl/hsy6zSpK21sDJg1z9' },
  },
];

export default accommodations;
