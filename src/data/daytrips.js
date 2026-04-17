const daytrips = [
  {
    name: '몬세라트 수도원',
    nameEn: 'Montserrat Monastery',
    image: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Monestir_de_Montserrat%252C_Spain_%2528Unsplash%2529.jpg/800px-Monestir_de_Montserrat%252C_Spain_%2528Unsplash%2529.jpg&n=-1',
    visited: true,
    badge: { type: 'rec', icon: 'fa-thumbs-up', text: '필수' },
    address: 'Montserrat, 08199 Barcelona (바르셀로나에서 약 60km)',
    route: {
      title: '바르셀로나에서 가는 방법',
      steps: [
        { icon: 'fa-train-subway', text: 'Placa Espanya역' },
        { icon: 'fa-train', text: 'FGC R5선' },
        { icon: 'fa-mountain', text: '산악열차 또는 케이블카' },
        { icon: 'fa-church', text: '몬세라트' },
      ],
    },
    info: [
      { icon: 'tip', faIcon: 'fa-train', html: '<strong>Cremallera (산악열차)</strong> - Monistrol de Montserrat역 하차<br>&middot; 왕복 약 <strong>14.50유로</strong> / 편도 약 8.70유로<br><strong>Aeri (케이블카)</strong> - Aeri de Montserrat역 하차<br>&middot; 왕복 약 <strong>14.00유로</strong> / 편도 약 9.30유로<br><span style="font-size:12px; color:var(--c-text-muted);">※ T-Mobilitat 교통권 사용 불가, 별도 티켓 필요</span>' },
      { icon: 'price', faIcon: 'fa-coins', html: '<strong>패키지 티켓 (추천)</strong><br>&middot; <strong>Tot Montserrat</strong> (약 71.50유로) : 왕복교통+푸니쿨라+박물관+뷔페식사 올인원<br>&middot; <strong>Trans Montserrat</strong> (약 43.80유로) : 왕복교통+푸니쿨라 (식사/박물관 미포함)<br><span style="font-size:12px; color:var(--c-text-muted);">Placa Espanya FGC 매표소 또는 온라인 구매 가능</span>' },
    ],
    sections: [
      {
        title: '전망대 (Sant Joan 푸니쿨라)',
        icon: 'fa-binoculars',
        info: [
          { icon: 'tip', faIcon: 'fa-cable-car', html: '<strong>Sant Joan 푸니쿨라</strong>로 몬세라트 최고 전망대까지 이동<br>&middot; 왕복 약 <strong>17.00유로</strong> / 편도 약 11.00유로<br>&middot; 정상에서 <strong>피레네 산맥, 카탈루냐 평원</strong>, 맑은 날에는 <strong>지중해</strong>까지 조망 가능<br>&middot; 다양한 하이킹 코스의 출발점이기도 함' },
          { icon: 'warn', faIcon: 'fa-triangle-exclamation', html: '<strong>Santa Cova 푸니쿨라</strong>는 현재 보수 공사 중으로 운행 중단 상태 (방문 전 확인 필수)' },
        ],
      },
      {
        title: '검은 성모상 (La Moreneta)',
        icon: 'fa-hand-holding-heart',
        info: [
          { icon: 'tip', faIcon: 'fa-lightbulb', html: '대성당 오른쪽 입구에서 줄을 서서 관람. 성모상의 손을 만지는 것이 전통<br>&middot; 대기시간: 보통 <strong>20~45분</strong>, 관광버스 도착 시 1시간 이상<br>&middot; <strong>오후 시간대</strong>가 비교적 한가함<br>&middot; 매일 <strong>13:00</strong> 에스콜라니아 소년 합창단 공연 시 대기줄이 짧아짐<br>&middot; 어깨와 무릎을 가리는 복장 권장' },
        ],
      },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-circle-info"></i> 팁</strong> &middot; 하루 투어로 아침 일찍 출발 추천 (오전 8~9시) &middot; 패키지 티켓은 온라인 사전 구매가 편리 &middot; 푸니쿨라를 타고 올라간 뒤 하이킹으로 내려오는 코스도 인기',
    },
    map: { q: 'Montserrat Monastery Barcelona', link: 'https://www.google.com/maps/place/Montserrat+Monastery/' },
  },
  {
    name: '지로나',
    nameEn: 'Girona',
    image: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/1/1c/Girona_Cathedral_2020.jpg&n=-1',
    badge: { type: 'star', icon: 'fa-star', text: '왕좌의 게임' },
    address: 'Girona (바르셀로나에서 약 100km)',
    route: {
      title: '바르셀로나에서 가는 방법',
      steps: [
        { icon: 'fa-train-subway', text: 'Barcelona Sants역' },
        { icon: 'fa-train', text: 'Renfe AVE/Avant' },
        { icon: 'fa-city', text: 'Girona역' },
      ],
    },
    info: [
      { icon: 'price', faIcon: 'fa-coins', html: '<strong>AVE / Avant (고속열차)</strong> : 약 <strong>38분</strong>, 편도 약 <strong>7~12유로</strong> (조기예매 시 더 저렴)<br><strong>Media Distancia (일반열차)</strong> : 약 <strong>1시간 20~40분</strong>, 편도 약 <strong>5~7유로</strong><br><span style="font-size:12px; color:var(--c-text-muted);">Tip: renfe.com에서 3~6개월 전 조기예매 시 최저가 확보 가능</span>' },
    ],
    sections: [
      {
        title: '왕좌의 게임 (Game of Thrones) 촬영지',
        icon: 'fa-dragon',
        info: [
          { icon: 'tip', faIcon: 'fa-landmark-dome', html: "<strong>지로나 대성당 (Catedral de Girona)</strong><br>시즌 6 <strong>'바엘로르 대성전(Great Sept of Baelor)'</strong> 촬영지. 제이미 라니스터가 말을 타고 대성당 계단을 올라가는 명장면이 촬영된 곳<br>&middot; 입장료: 약 <strong>7~10유로</strong> (대성당+성 펠리우 성당+미술관 통합권)" },
          { icon: 'tip', faIcon: 'fa-archway', html: "<strong>유대인 지구 (El Call)</strong><br>아리아 스타크의 <strong>'브라보스(Braavos)' 거리</strong>로 사용된 좁은 중세 골목길. <strong>비숍 호셉 카르타나 거리 계단</strong>이 가장 유명한 포토스팟" },
          { icon: 'tip', faIcon: 'fa-bath', html: '<strong>아랍 목욕탕 (Banys Arabs)</strong><br>도른(Dorne) 관련 장면 촬영지. 12세기 무어 양식의 아름다운 목욕탕<br>&middot; 입장료: 약 <strong>3유로</strong>' },
        ],
      },
      {
        title: '기타 관광 포인트',
        icon: 'fa-camera',
        info: [
          { icon: 'tip', faIcon: 'fa-palette', html: "<strong>오냐르 강 컬러풀 하우스 (Cases de l'Onyar)</strong><br>강변에 늘어선 파스텔톤 건물들은 지로나의 대표 포토스팟. <strong>Pont de les Peixateries Velles</strong> (에펠 회사가 설계한 철제 다리)에서 감상 추천" },
        ],
      },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-circle-info"></i> 팁</strong> &middot; 도보로 구시가지 전체를 돌아볼 수 있어 반나절~하루 코스로 적당 &middot; 대성당 계단 앞에서 왕좌의 게임 포즈 사진 필수! &middot; 점심은 구시가지 골목 타파스 바 추천',
    },
    map: { q: 'Girona Cathedral Spain', link: 'https://www.google.com/maps/place/Girona+Cathedral/' },
  },
  {
    name: '시제스',
    nameEn: 'Sitges',
    image: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/a4/Beach_Sitges_Spain.jpg&n=-1',
    badge: { type: 'free', icon: 'fa-umbrella-beach', text: '해변' },
    address: 'Sitges (바르셀로나에서 약 35km)',
    route: {
      title: '바르셀로나에서 가는 방법',
      steps: [
        { icon: 'fa-train-subway', text: 'Barcelona Sants역' },
        { icon: 'fa-train', text: 'Renfe R2 Sud' },
        { icon: 'fa-umbrella-beach', text: 'Sitges역' },
      ],
    },
    info: [
      { icon: 'price', faIcon: 'fa-coins', html: '<strong>Renfe Rodalies R2 Sud선</strong><br>&middot; 소요시간: 약 <strong>30~37분</strong><br>&middot; 편도 약 <strong>5~6유로</strong> (Zone 4 티켓)<br>&middot; 배차간격: 10~20분 (매우 자주 운행)<br>&middot; T-Casual 교통권(Zone 4) 사용 가능<br><span style="font-size:12px; color:var(--c-text-muted);">Passeig de Gracia역에서도 탑승 가능</span>' },
    ],
    sections: [
      {
        title: '추천 해변',
        icon: 'fa-water',
        info: [
          { icon: 'tip', faIcon: 'fa-star', html: '<strong>Platja de la Ribera</strong><br>산트 바르토메우 성당 바로 아래 메인 해변. 시제스에서 가장 인기 있고 활기찬 곳' },
          { icon: 'tip', faIcon: 'fa-camera', html: '<strong>Platja de Sant Sebastia</strong><br>구시가지에서 가장 가까운 해변. 절벽 위 성당이 배경으로 보이는 <strong>시제스에서 가장 포토제닉한 해변</strong>' },
          { icon: 'tip', faIcon: 'fa-umbrella-beach', html: '<strong>Platja de Terramar</strong><br>서쪽 끝에 위치한 조용한 해변. 정원으로 둘러싸인 <strong>한적하고 여유로운 분위기</strong>' },
        ],
      },
      {
        title: '산트 바르토메우 성당 전망대',
        icon: 'fa-church',
        info: [
          { icon: 'tip', faIcon: 'fa-binoculars', html: '<strong>Church of Sant Bartomeu i Santa Tecla</strong><br>바위 곶 위에 우뚝 선 17세기 성당. 양쪽 해변을 내려다보는 <strong>Baluard 테라스</strong>에서 지중해 파노라마 뷰 감상 가능<br>&middot; 성당 입장 <strong>무료</strong> / 가이드 투어 시 종탑 360도 전망 가능' },
        ],
      },
      {
        title: '구시가지 산책 포인트',
        icon: 'fa-person-walking',
        info: [
          { icon: 'tip', faIcon: 'fa-road', html: '<strong>Passeig Maritim</strong> : 약 3km 해변 산책로. 야자수, 모더니즘 빌라, 카페가 늘어선 시제스의 하이라이트' },
          { icon: 'tip', faIcon: 'fa-palette', html: '<strong>Carrer d\'en Bosch</strong> : 하얀 벽에 파란 문, 부겐빌레아가 어우러진 시제스에서 가장 예쁜 골목' },
          { icon: 'tip', faIcon: 'fa-building-columns', html: '<strong>Cau Ferrat &middot; Maricel 미술관</strong> : 피카소, 엘 그레코 작품 소장. 바다가 보이는 갤러리가 인상적' },
        ],
      },
    ],
    highlight: {
      html: '<strong><i class="fa-solid fa-circle-info"></i> 팁</strong> &middot; 바르셀로나에서 가장 가까운 해변 도시로 반나절이면 충분 &middot; 오전에 가서 해변 산책 + 점심 + 구시가지 관광 코스 추천 &middot; 일몰 시간에 성당 테라스에서 보는 석양이 압권',
    },
    map: { q: 'Church Sant Bartomeu Sitges', link: 'https://www.google.com/maps/place/Sitges/' },
  },
];

export default daytrips;
