const accounts = [
  {
    account_name: '25시동물의료센터',
    phone: '02-419-1351',
    address: '서울시 송파구 삼전로 80'
  },
  {
    account_name: 'KS카드포스광고기획',
    phone: '031-666-1203'
  },
  {
    account_name: '강릉중앙약국',
    phone: '033-647-3363',
    address: '강원도 강릉시 옥천동 152-1'
  },
  {
    account_name: '강북보육사',
    phone: '02-953-3657',
    fax: '02-953-3659',
    address: '경기도 하남시 춘궁동 56'
  },
  {
    account_name: '거림상사',
    phone: '010-3702-3642',
    address: '서울 종로 관수동 120-1 가-205'
  },
  {
    account_name: '거빈',
    phone: '054-371-7335',
    address: '경상북도 청도군 이서면 양원길 86-5'
  },
  {
    account_name: '건일상사',
    phone: '055-276-0049',
    address: '경남 창원시 팔용동 4-27 '
  },
  {
    account_name: '계림특수포장',
    phone: '02-2272-3368',
    fax: '02-6008-7442',
    address: '서울시 중구 주교동 10'
  },
  {
    account_name: '고려문화사',
    phone: '02-2635-2030',
    fax: '02-2635-2507',
    address: '서울시 영등포구 영등포로36길 10-1, 101호 (영등포동4가, 고려빌딩)'
  },
  {
    account_name: '광원',
    phone: '041-532-4961',
    fax: '041-532-4600',
    address:
      '충청남도 아산시 온천대로1122번길 35-8 (득산동 312-45) 득산농공단지 5-2 B/L'
  },
  {
    account_name: '광일프라스틱',
    phone: '02-2273-6110'
  },
  {
    account_name: '굿모닝온누리약국',
    phone: '031-391-8828',
    address: '경기 군포시 당동 922-30 은하프라자 106호'
  },
  {
    account_name: '그린산업',
    phone: '010-5345-1939',
    address: '경기도 평택시 서탄면 수월암리 891-1'
  },
  {
    account_name: '그린포장 (익산)',
    phone: '063-841-5223',
    address: '전북 익산시 석탄동 133-15'
  },
  {
    account_name: '그린화성',
    phone: '051-817-0456',
    address: '부산광역시 부산진구 동천로108번길 9-7 (전포동 660-16)'
  },
  {
    account_name: '극동상사',
    phone: '031-239-2578',
    fax: '031-237-2579',
    address: '경기도 수원시 권선구 정조로495번길 22 (세류동 545-15)'
  },
  {
    account_name: '금강물산',
    phone: '052-267-6126',
    address: '울산광역시 남구 왕생로82번길 1 (달동 1349-19)'
  },
  {
    account_name: '금용산업',
    phone: '053-814-8400',
    address: '경북 경산시 남천면 관방로 (금곡리 304-2)'
  },
  {
    account_name: '남경에스앤티',
    phone: '010-9975-1446',
    address: '경상북도 성주군 선남면 명관로 337-26'
  },
  {
    account_name: '남양수출포장',
    phone: '010-3750-5728',
    address: '김포시 통진읍 가현리 202-3'
  },
  {
    account_name: '네모비닐',
    phone: '02-2291-9536',
    fax: '02-2292-9537',
    address: '서울 동대문구 전농동 27-23'
  },
  {
    account_name: '다능컴텍',
    phone: '02-545-0554',
    address: '서울시 성동구 성수동1가 14-18 서울숲코오롱디지털타워 3차 601'
  },
  {
    account_name: '대경피엔엠',
    phone: '031-354-7327'
  },
  {
    account_name: '대득인쇄소',
    phone: '010-3817-2028',
    address: '대구 중구 남산2동 570-3'
  },
  {
    account_name: '대영화학 (중구)',
    phone: '02-2267-0474',
    address: '서울시 중구 동호로34길 26'
  },
  {
    account_name: '대진팜',
    phone: '031-353-6080',
    address: '경기도 화성시 정남면 서봉로869번길 38'
  },
  {
    account_name: '대진피이',
    phone: '031-354-5653',
    fax: '031-354-0607',
    address: '경기도 화성시 우정읍 배미길 68-5 (화산리 440-4)'
  },
  {
    account_name: '대한인쇄',
    phone: '010-6427-9554',
    address: '서울특별시 구로구 가마산로23길 9 (구로동 100-6) 구미빌딩'
  },
  {
    account_name: '대화종합상사',
    phone: '054-458-7765',
    address: '경북 구미시 원평동 1022-8'
  },
  {
    account_name: '동국약국',
    phone: '02-2267-5671',
    address: '서울 중구 필동3가 19-7'
  },
  {
    account_name: '동남의료약품',
    phone: '010-2870-0093',
    fax: '063-277-6383',
    address: '전북 전주시 완산구 서신동 254-2'
  },
  {
    account_name: '동아상사',
    phone: '055-241-7588',
    address:
      '경상남도 창원시 마산합포구 삼호로 13 (산호동 203-1) 고려종합상가 106호'
  },
  {
    account_name: '동아양행',
    phone: '032-624-2561',
    address: '경기도 부천시 오정구 삼정동 36-1 부천테크노파크3 102동 913호'
  },
  {
    account_name: '동양산업사',
    phone: '02-848-3430',
    fax: '02-858-3430',
    address:
      '서울시 금천구 서부샛길 606, 지하1층 비115호 (가산동, 대성디폴리스)'
  },
  {
    account_name: '동양인쇄',
    phone: '02-2631-6741',
    fax: '02-2631-6740',
    address:
      '서울특별시 영등포구 영신로34길 10 (영등포동4가 155-1) 영남빌딩 305호'
  },
  {
    account_name: '동화피엔피',
    phone: '010-9982-4607',
    address: '서울시 영등포구 대림로31가길 1 대창빌딩 203호'
  },
  {
    account_name: '두산약국',
    phone: '053-422-4423',
    address: '대구 중구 삼덕동 2가 105'
  },
  {
    account_name: '드림세무법인',
    phone: '032-551-3311',
    fax: '032-551-3314',
    address: '인천광역시 계양구 효서로 247, 301 (작전동, 유진빌딩)'
  },
  {
    account_name: '드림팩',
    phone: '055-346-6760',
    address: '경남 김해시 진례면 담안리 117-6'
  },
  {
    account_name: '디올메디',
    phone: '031-422-2588',
    address:
      '경기도 안양시 동안구 학의로 250, B105호 (관양동, 관양두산벤처다임)'
  },
  {
    account_name: '리드팩',
    phone: '055-544-0111',
    address: '경상남도 창원시 진해구 용재로103번길 4-1 (용원동 1182-5)'
  },
  {
    account_name: '리봄화장품',
    phone: '044-866-6789',
    address: '세종시 연동면 명학산단서로 6'
  },
  {
    account_name: '마음편한정신과의원',
    phone: '033-766-7675',
    address: '강원도 원주시 단구동 1512-1 리더스타워 5층'
  },
  {
    account_name: '멀티산업',
    phone: '054-471-0923',
    address: '경상북도 구미시 산동면 동백로 257-7 (동곡리 산45-2)'
  },
  {
    account_name: '메디칼현대기획',
    phone: '032-684-4026',
    fax: '032-684-4028',
    address: '경기도 부천시 길주로411번길 28-17'
  },
  {
    account_name: '문앞약국',
    phone: '053-253-3900',
    address: '대구 중구 동덕로26길 10 (삼덕동2가)'
  },
  {
    account_name: '미도씨엠씨',
    phone: '010-5326-2705',
    address: '경기도 광주시 용샘길 33-14'
  },
  {
    account_name: '미래약국 (안암동)',
    phone: '02-924-5264',
    address: '서울 성북구 안암동5가 101-7 (안암역 1번출구쪽)'
  },
  {
    account_name: '미미제과 (강태호님)',
    phone: '010-4032-6155'
  },
  {
    account_name: '민기획',
    phone: '02-830-5038',
    address: '서울 영등포구 영신로34길 10 (영등포동4가 155-1) 영남빌딩 307호'
  },
  {
    account_name: '반도스탠드',
    phone: '010-3132-1010',
    address: '서울특별시 성동구 아차산로 74 (성수동2가)'
  },
  {
    account_name: '방산비닐',
    phone: '02-2269-9826',
    fax: '02-2269-9827'
  },
  {
    account_name: '백두산약국',
    phone: '02-927-2792',
    address: '서울시 성북구 안암동5가 126-13'
  },
  {
    account_name: '보성종합상사',
    phone: '055-238-0489',
    address: '경남 창원시 의창구 팔용동 16-6'
  },
  {
    account_name: '부영포장',
    phone: '055-587-6442',
    fax: '055-587-6443',
    address: '경상남도 함안군 칠서면 구포2길 62-40 (구포리 814-1)'
  },
  {
    account_name: '부원화성',
    phone: '051-248-2280',
    address: '부산광역시 서구 대신로109번길 11 (서대신동3가 141-3)'
  },
  {
    account_name: '북부보육사',
    phone: '02-996-8147',
    address: '서울 도봉구 창5동 715-8'
  },
  {
    account_name: '삼선케미칼',
    phone: '070-7777-7553',
    address: '경기도 남양주시 진접읍 진벌로51번길 66'
  },
  {
    account_name: '삼성포장사',
    phone: '010-3513-7816',
    fax: '053-352-6187',
    address: '대구광역시 북구 오봉로 72-1 (침산동)'
  },
  {
    account_name: '삼성플라스틱',
    phone: '02-858-1141',
    fax: '02-866-9250',
    address: '서울시 구로구 구로동 212-1 에이스트윈타워6차 804호'
  },
  {
    account_name: '삼흥인쇄',
    phone: '031-397-1031',
    fax: '031-454-1822',
    address: '경기도 군포시 산본천로221번길 41 (산본동 86-11)'
  },
  {
    account_name: '상연기업',
    phone: '055-288-0663',
    fax: '055-288-0664',
    address: '경남 창원시 의창구 팔용동 11-12'
  },
  {
    account_name: '새경남약국',
    phone: '055-542-2585',
    address: '경남 진해시 용원동 1154 어판장입구'
  },
  {
    account_name: '서광하이텍',
    phone: '031-765-1436',
    address: '경기도 광주시 오포읍 오포로 334 (문형리 700)'
  },
  {
    account_name: '서해종합상사',
    phone: '031-658-9990',
    fax: '031-655-0901',
    address: '경기도 평택시 칠괴길 118-69'
  },
  {
    account_name: '선우기획',
    phone: '010-2500-2709'
  },
  {
    account_name: '선일포장',
    phone: '02-753-5370',
    fax: '02-753-5376',
    address: '서울 중구 남창동 34-28'
  },
  {
    account_name: '성광메디칼',
    phone: '031-257-7200',
    fax: '031-257-7335',
    address: '경기도 수원시 팔달구 지동 483-16(지급배송 부탁드립니다)'
  },
  {
    account_name: '성도화학',
    phone: '031-316-2330',
    address: '경기도 시흥시 금오로121번길 16-9 (무지내동)'
  },
  {
    account_name: '성림테크',
    phone: '02-848-5571',
    fax: '02-848-7574',
    address: '서울시 영등포구 경인로82길 3-4, 822호 (문래동1가, 센터플러스)'
  },
  {
    account_name: '성원사',
    phone: '031-736-2575',
    address: '경기도 성남시 중원구 상대원동 1967'
  },
  {
    account_name: '세종플러스',
    phone: '02-702-6140',
    address:
      '서울특별시 마포구 마포대로 127 (공덕동 404) 풍림브이아이피텔 1804호'
  },
  {
    account_name: '세화산업',
    phone: '053-581-6336',
    address: '대구 달서구 갈산동 390-1'
  },
  {
    account_name: '소아21',
    phone: '02-2644-1224',
    address: '경기도 안산시 단원구 동산로 60 (원시동, 209호)'
  },
  {
    account_name: '송광상사',
    phone: '052-267-5462',
    fax: '052-267-5463',
    address: '울산광역시 남구 돋질로206번길 18 (달동)'
  },
  {
    account_name: '스타산업',
    phone: '010-5268-8917',
    address: '대구시 달성군 다사읍 서재리 538-1'
  },
  {
    account_name: '승진포장',
    phone: '02-2269-0257',
    fax: '02-2278-8529',
    address: '서울시 중구 동호로37길 20 A3층 3020호 방산종합시장 (주교동)'
  },
  {
    account_name: '시온테크',
    phone: '031-224-9873',
    address: '경기도 수원시 권선구 권선로 308-6 (고색동 14-40)'
  },
  {
    account_name: '시지바이오',
    phone: '061-392-9840',
    address:
      '전라남도 장성군 남면 삼태로 147-22 나노바이오센터 212호 정성사업팀 최민철님'
  },
  {
    account_name: '신한기획',
    phone: '010-9409-8450',
    fax: '043-215-3433',
    address: '충청북도 청주시 서원구 구룡산로 317 (수곡동 333)'
  },
  {
    account_name: '신화케미칼',
    phone: '031-354-1338',
    address: '경기도 화성시 팔탄면 서해로987번길 15 (지월리 499-3) 5동 208호'
  },
  {
    account_name: '씨엠피 (송림하이텍)',
    phone: '010-3290-1592',
    address: '인천 서구 가좌동 548-20'
  },
  {
    account_name: '씨와이테크',
    phone: '010-6277-2329',
    address: '서울시 영등포구 대림1동 858-16, 102호 (배송전 꼭 연락바랍니다!)'
  },
  {
    account_name: '아이꿈터',
    phone: '031-544-0073',
    address: '경기도 포천시 가산면 방축리 산 28-9'
  },
  {
    account_name: '아이엘메디칼',
    phone: '032-423-2392',
    address: '인천시 남구 인주대로469번길 29, 1층 (주안동)'
  },
  {
    account_name: '아이조아',
    phone: '031-521-5065',
    address: '경기도 남양주시 와부읍 석실로488번길 46-23'
  },
  {
    account_name: '아트싸이언스',
    phone: '010-6232-0513',
    address: '경기도 남양주시 화도읍 차산리 176-8'
  },
  {
    account_name: '안진팜메디',
    phone: '02-474-1208',
    fax: '02-483-9860',
    address: '경기도 하남시 신장로77번길 107 (덕풍동 497-3)'
  },
  {
    account_name: '알엔피',
    phone: '010-4094-1756',
    fax: '031-5171-2488',
    address: '경기도 화성시 반월동 275-3 남양빌딩 4층'
  },
  {
    account_name: '에이원',
    phone: '02-924-2265',
    address: '서울시 노원구 상계동 1103-4'
  },
  {
    account_name: '에프에이',
    phone: '044-862-9134',
    fax: '044-862-9135',
    address: '세종특별자치시 연동면 청연로 442-48 (응암리 666-1) 201호'
  },
  {
    account_name: '엔프라니',
    phone: '032-881-2826',
    address: '인천광역시 중구 축항대로296번길 88 (신흥동3가 40-2) 엔프라니'
  },
  {
    account_name: '엠에스피',
    phone: '031-414-0023',
    fax: '031-414-0673',
    address:
      '경기도 안산시 단원구 산단로 296 (원시동 701, 702호, 대우테크노피아)'
  },
  {
    account_name: '영광비닐',
    phone: '053-653-5940',
    address: '대구광역시 남구 대명복개로 74-1 (대명동 1595-8)'
  },
  {
    account_name: '영동비닐',
    phone: '063-284-6801',
    address: '전라북도 전주시 완산구 풍남문2길 94 (전동3가 46) 남부시장'
  },
  {
    account_name: '영성지에프',
    phone: '010-4132-3418',
    address: '서울시 동대문구 장한로26길 37 (장안동, 르메이에르 장안타운 5차)'
  },
  {
    account_name: '오성메디',
    phone: '02-2291-0396',
    fax: '02-2291-0224',
    address: '서울시 성동구 행당동 232-1'
  },
  {
    account_name: '용태행',
    phone: '02-305-7576',
    address: '서울시 서대문구 응암로 117 (북가좌동, 지층)'
  },
  {
    account_name: '우경기업',
    phone: '010-3569-5759',
    address: '울산광역시 남구  삼산로 30번길 4  (신정동)'
  },
  {
    account_name: '우성인쇄사',
    phone: '042-623-4870',
    address: '대전 동구 삼성동 329-13'
  },
  {
    account_name: '원앤씨',
    phone: '010-7795-2492',
    address:
      '충북 청주시 흥덕구 옥산면 과학산업4로 205 (핸드폰으로 연락 꼭 부탁드립니다)'
  },
  {
    account_name: '원자프라자약국',
    phone: '02-974-1242',
    address: '서울특별시 노원구 공릉로46길 18 윤탁노블레스'
  },
  {
    account_name: '원형정공',
    phone: '010-4852-4101',
    address: '경기도 포천시 소흘읍 응골1길 26 (초가팔리)'
  },
  {
    account_name: '유림포장',
    phone: '053-358-2528',
    fax: '053-355-1262',
    address: '대구광역시 북구 오봉로 89 (노원동3가 1156-5)'
  },
  {
    account_name: '유일상사',
    phone: '061-691-1981',
    address: '전남 여수시 무선로 239-15 (화장동)'
  },
  {
    account_name: '융태행',
    phone: '02-752-8531',
    address: '서울 중구 북창동 94-9'
  },
  {
    account_name: '이룸메드',
    phone: '02-6495-4435',
    address: '서울시 강동구 상암로39길 28 (천호동)'
  },
  {
    account_name: '인디프린트',
    phone: '010-5237-6214',
    address:
      '서울특별시 영등포구 경인로82길 3-4 (문래동1가 39) 센터플러스 412호'
  },
  {
    account_name: '장미포장',
    phone: '064-726-6230',
    address: '제주특별자치도 제주시 중앙로 473 (아라이동)'
  },
  {
    account_name: '제욱화학',
    phone: '010-3803-6194',
    fax: '054-474-6352',
    address: '경상북도 구미시 옥계2공단로5길 8 (구포동 622-15)'
  },
  {
    account_name: '제이준 코스메틱',
    phone: '070-5117-0154',
    fax: '02-566-4555',
    address: '서울시 강남구 논현로 526, 5층 제품개발본부 정재욱 부장님'
  },
  {
    account_name: '제일봉투',
    phone: '02-2275-2206',
    address: '서울시 영등포구 대림동 720-1 대림빌딩 지하'
  },
  {
    account_name: '조이써플라이',
    phone: '070-8879-6704',
    fax: '031-629-6703',
    address: '경기도 고양시 덕양구 무원로6번길 12 (행신동 706-2) 대흥빌딩 811호'
  },
  {
    account_name: '중동상사',
    phone: '033-742-3790',
    fax: '033-743-3796',
    address: '강원도 원주시 우산동 479-8'
  },
  {
    account_name: '중앙약국 (인천)',
    phone: '032-513-9883',
    address:
      '인천광역시 부평구 무네미로 453 (구산동 354-3, 인천중앙병원 건너편)'
  },
  {
    account_name: '지안패키지',
    phone: '000-0000-0000'
  },
  {
    account_name: '진우종합상사',
    phone: '054-465-1811',
    address: '경상북도 구미시 비산로5길 34-12 (비산동 91-4)'
  },
  {
    account_name: '청와약국',
    phone: '02-855-1482',
    fax: '02-844-9955',
    address: '서울 구로구 가리봉동 89-163'
  },
  {
    account_name: '청풍산업',
    phone: '054-973-0527',
    address: '경상북도 칠곡군 지천면 금호로1길 56-22'
  },
  {
    account_name: '청풍화학',
    phone: '053-817-0636',
    address: '경상북도 경산시 압량면 가일길 141 (가일리 100-4)'
  },
  {
    account_name: '타스코리아',
    phone: '061-684-1082',
    fax: '061-684-1084',
    address: '전남 여수시 성산6길 33 (화장동, 타스빌딩 1층)'
  },
  {
    account_name: '태영상사',
    phone: '02-971-3477',
    address: '서울특별시 중랑구 중랑역로 174-1 정암빌딩'
  },
  {
    account_name: '태일산업',
    phone: '010-2513-8801',
    address: '경상북도 칠곡군 지천면 창평로2길 11 (화성수지)'
  },
  {
    account_name: '토탈솔루션과학',
    phone: '054-282-9641',
    address: '경북 포항시 남구 효성로15번길 27-17 (효자동)'
  },
  {
    account_name: '투에스메디',
    phone: '051-808-1050',
    fax: '051-808-1051',
    address: '부산광역시 부산진구 개금본동로 39, 지하1층 (개금동)'
  },
  {
    account_name: '티에이치티',
    phone: '031-297-1271',
    fax: '031-297-1274',
    address: '경기도 화성시 봉담읍 가마골길 9-5 (왕림리 128-1)'
  },
  {
    account_name: '푸른온누리약국',
    phone: '02-720-0333',
    fax: '0303-3132-0339',
    address: '서울시 종로구 평동 180 (서대문역 4번 출구)'
  },
  {
    account_name: '프린트몰',
    phone: '02-2273-3511',
    fax: '02-6442-3511',
    address: '서울시 성북구 장위동 246-172'
  },
  {
    account_name: '하나기업',
    phone: '055-222-6569',
    address: '경남 창원시 마산합포구 산호동6길 34 (산호동 313-5)'
  },
  {
    account_name: '한국밀봉원',
    phone: '02-926-0063',
    address: '서울 종로구 숭인2동 1155-1  02-926-0063'
  },
  {
    account_name: '한국스포츠',
    phone: '02-2292-5795',
    fax: '02-2292-5795',
    address: '서울시 동대문구 장안동 445-15'
  },
  {
    account_name: '한국위더스',
    phone: '054-336-3356',
    address: '경북 영천시 대창면 한제길 12-28'
  },
  {
    account_name: '한국티에스',
    phone: '061-686-1783',
    address: '전라남도 여수시 신기동 37-4'
  },
  {
    account_name: '한빛화스너',
    phone: '031-497-6565',
    address: '경기도 시흥시 마유로70번길 50, 719호 (정왕동, 시화공단3마)'
  },
  {
    account_name: '한성웰테크',
    phone: '055-276-4412',
    address: '경남 창원시 의창구 차상로 150번길 41(팔용동)'
  },
  {
    account_name: '한영산업',
    phone: '053-756-8881',
    address: '대구시 수성구 범어동 431-3'
  },
  {
    account_name: '현대포장 (전주)',
    phone: '063-276-0237',
    fax: '063-276-0236',
    address: '전라북도 전주시 완산구 태평2길 20 (태평동 22-4)'
  },
  {
    account_name: '현대포장 (청주)',
    phone: '043-252-6056',
    address: '충청북도 청주시 상당구 무심동로 274 (석교동 125-96)'
  },
  {
    account_name: '현우메트로',
    phone: '010-4219-0568',
    address: '충북 진천군 이월면 동성리 350-3 성현토탈 김재섭상무님'
  },
  {
    account_name: '환일상회',
    phone: '053-424-5754',
    address: '대구광역시 북구 칠성남로36길 11-10 (칠성동2가)'
  }
];

const products = [
        {
            "account_id": "20",
            "product_name": "100정",
            "product_thick": "0.05",
            "product_length": "11",
            "product_width": "7",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "녹색",
            "print_front_position": "지퍼아래 1cm 띄고",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A1%B0%EC%9D%B4%EC%8D%A8%ED%94%8C%EB%9D%BC%EC%9D%B4_100%EC%A0%95.jpg",
            "pack_material": "마대"
        },
        {
            "account_id": "21",
            "product_name": "123약국",
            "product_thick": "0.06",
            "product_length": "15",
            "product_width": "11",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "보라색",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EB%8F%99%EC%96%91%EC%9D%B8%EC%87%84_123%EC%95%BD%EA%B5%AD_15x11.jpg",
            "cut_punch_position": " ",
            "pack_material": "박스"
        },
        {
            "account_id": "22",
            "product_name": "123약국",
            "product_thick": "0.06",
            "product_length": "18",
            "product_width": "13",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "보라색",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EB%8F%99%EC%96%91%EC%9D%B8%EC%87%84_123%EC%95%BD%EA%B5%AD_18x13.jpg",
            "pack_material": "박스"
        },
        {
            "account_id": "23",
            "product_name": "123약국",
            "product_thick": "0.06",
            "product_length": "20",
            "product_width": "15",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "보라색",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EB%8F%99%EC%96%91%EC%9D%B8%EC%87%84_123%EC%95%BD%EA%B5%AD_20x15.jpg",
            "cut_punch_position": " ",
            "pack_material": "박스"
        },
        {
            "account_id": "24",
            "product_name": "123약국",
            "product_thick": "0.06",
            "product_length": "30",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 굵게\r\r\r\n수량 부족하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "보라색",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EB%8F%99%EC%96%91%EC%9D%B8%EC%87%84_123%EC%95%BD%EA%B5%AD_30x20.jpg",
            "cut_memo": "수량 부족하면 안됨",
            "pack_material": "박스"
        },
        {
            "account_id": "25",
            "product_name": "1개입 - 65902464887",
            "product_thick": "0.05",
            "product_length": "17",
            "product_width": "12",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "지퍼아래 3cm 띄고",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EB%B0%A9%EC%82%B0%EB%B9%84%EB%8B%90_1%EA%B0%9C%EC%9E%85-65902464887_17x12.jpg",
            "pack_material": "마대"
        },
        {
            "account_id": "26",
            "product_name": "1개입 - 65902464888",
            "product_thick": "0.05",
            "product_length": "17",
            "product_width": "12",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "지퍼아래 3cm 띄고",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EB%B0%A9%EC%82%B0%EB%B9%84%EB%8B%90_1%EA%B0%9C%EC%9E%85-65902464888_17x12.jpg",
            "pack_material": "마대"
        },
        {
            "account_id": "27",
            "product_name": "1등약국",
            "product_thick": "0.06",
            "product_length": "20",
            "product_width": "15",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "39청",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "28",
            "product_name": "1등약국",
            "product_thick": "0.06",
            "product_length": "27",
            "product_width": "18",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "39청",
            "pack_material": "마대"
        },
        {
            "account_id": "29",
            "product_name": "1등약국",
            "product_thick": "0.07",
            "product_length": "32",
            "product_width": "22",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "39청",
            "pack_material": "마대"
        },
        {
            "account_id": "30",
            "product_name": "1번약국",
            "product_thick": "0.065",
            "product_length": "31",
            "product_width": "21",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "올백/녹색",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "31",
            "product_name": "1회1포1일3회 (이동약국)",
            "product_thick": "0.06",
            "product_length": "15",
            "product_width": "10",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "군청색",
            "print_front_position": "지퍼아래 2.5cm 띄고",
            "pack_material": "마대"
        },
        {
            "account_id": "32",
            "product_name": "25시동물의료센터",
            "product_thick": "0.05",
            "product_length": "19",
            "product_width": "12.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "올백/군청",
            "pack_material": "마대"
        },
        {
            "account_id": "33",
            "product_name": "25시동물의료센터",
            "product_thick": "0.05",
            "product_length": "26",
            "product_width": "21",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "올백/군청",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "34",
            "product_name": "28정",
            "product_thick": "0.05",
            "product_length": "10",
            "product_width": "7",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "군청",
            "print_front_position": "지퍼아래 1cm 띄고",
            "pack_material": "마대"
        },
        {
            "account_id": "35",
            "product_name": "30정",
            "product_thick": "0.05",
            "product_length": "10",
            "product_width": "7",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "군청",
            "print_front_position": "지퍼아래 1cm 띄고",
            "pack_material": "마대"
        },
        {
            "account_id": "36",
            "product_name": "365열린온누리약국",
            "product_thick": "0.07",
            "product_length": "29",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "올백/군청",
            "pack_material": "마대"
        },
        {
            "account_id": "37",
            "product_name": "3M",
            "product_thick": "0.05",
            "product_length": "21.5",
            "product_width": "9.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "백베다/금적색",
            "print_front_position": "하단에서 5mm 띄고",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "38",
            "product_name": "3M",
            "product_thick": "0.09",
            "product_length": "30",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "금적색",
            "print_front_position": "중앙",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "39",
            "product_name": "42정",
            "product_thick": "0.05",
            "product_length": "10",
            "product_width": "7",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "군청",
            "print_front_position": "지퍼아래 1cm 띄고",
            "pack_material": "마대"
        },
        {
            "account_id": "40",
            "product_name": "4U 동물메디컬센터",
            "product_thick": "0.05",
            "product_length": "26.5",
            "product_width": "21",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "올백/군청",
            "pack_material": "마대"
        },
        {
            "account_id": "40",
            "product_name": "4층약국 (창원)",
            "product_thick": "0.06",
            "product_length": "18",
            "product_width": "13",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "올백/군청",
            "pack_material": "마대"
        },
        {
            "account_id": "40",
            "product_name": "5HKCYMA00350",
            "product_thick": "0.06",
            "product_length": "21",
            "product_width": "21",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 2cm 띄고",
            "cut_position": "2cm 띄고",
            "cut_ultrasonic": true,
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(7mm) ",
            "cut_memo": "3,500매 빼고 작업",
            "pack_material": "직납박스",
            "pack_unit": "3"
        },
        {
            "account_id": "40",
            "product_name": "5무지",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": "FALSE",
            "ext_color": "투명",
            "print_front_color_count": "0",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "40",
            "product_name": "60정",
            "product_thick": "0.05",
            "product_length": "10",
            "product_width": "7",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "군청",
            "print_front_position": "지퍼아래 1cm 띄고",
            "pack_material": "마대"
        },
        {
            "account_id": "40",
            "product_name": "7층에미진약국 大",
            "product_thick": "0.07",
            "product_length": "30",
            "product_width": "21",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "3",
            "print_front_color": "올백/흑색/강동주황",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "40",
            "product_name": "7층에미진약국 小",
            "product_thick": "0.07",
            "product_length": "20",
            "product_width": "15",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "3",
            "print_front_color": "올백/흑색/분당주황",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "40",
            "product_name": "8무지",
            "product_thick": "0.08",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": "FALSE",
            "ext_color": "투명",
            "print_front_color_count": "0",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "25",
            "product_name": "AB",
            "product_thick": "0.05",
            "product_length": "43",
            "product_width": "32",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "진녹색",
            "print_front_position": "하단에서 6cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(7mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "26",
            "product_name": "AIKANG (33)",
            "product_thick": "0.06",
            "product_length": "33",
            "product_width": "31",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": "2",
            "print_front_color": "녹색/적색",
            "print_front_position": "양면 중앙",
            "print_back_color_count": 1,
            "print_back_color": "녹색",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": "2",
            "cut_punch_position": "좌측 상하",
            "pack_material": "마대"
        },
        {
            "account_id": "27",
            "product_name": "AIKANG (40)",
            "product_thick": "0.06",
            "product_length": "40",
            "product_width": "31",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": "2",
            "print_front_color": "녹색/적색",
            "print_front_position": "양면 중앙",
            "print_back_color_count": 1,
            "print_back_color": "녹색",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": "2",
            "cut_punch_position": "좌측 상하",
            "pack_material": "마대"
        },
        {
            "account_id": "28",
            "product_name": "AIKANG ISO SIZE (33)",
            "product_thick": "0.06",
            "product_length": "33",
            "product_width": "31",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": "2",
            "print_front_color": "흑색/적색",
            "print_front_position": "양면 중앙",
            "print_back_color_count": 1,
            "print_back_color": "흑색",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": "2",
            "cut_punch_position": "좌측 상하",
            "pack_material": "마대"
        },
        {
            "account_id": "29",
            "product_name": "AIKANG ISO SIZE (40)",
            "product_thick": "0.06",
            "product_length": "40",
            "product_width": "31",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": "2",
            "print_front_color": "흑색/적색",
            "print_front_position": "양면 중앙",
            "print_back_color_count": 1,
            "print_back_color": "흑색",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": "2",
            "cut_punch_position": "좌측 상하",
            "pack_material": "마대"
        },
        {
            "account_id": "30",
            "product_name": "ALLY'S CASSETTE",
            "product_thick": "0.06",
            "product_length": "45",
            "product_width": "33",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 2cm 띄고",
            "cut_ultrasonic": true,
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 좌측 상단",
            "pack_material": "마대"
        },
        {
            "account_id": "31",
            "product_name": "ALLY'S CASSETTE",
            "product_thick": "0.07",
            "product_length": "46.5",
            "product_width": "67",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 5cm 띄고",
            "cut_ultrasonic": true,
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 좌측 상단",
            "cut_memo": " / 가분수",
            "pack_material": "마대"
        },
        {
            "account_id": "32",
            "product_name": "ANARK",
            "product_thick": "0.05",
            "product_length": "20.5",
            "product_width": "10",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "33",
            "product_name": "ANEDIT (언에디트)",
            "product_thick": "0.05",
            "product_length": "43",
            "product_width": "32",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "백색",
            "print_front_position": "하단에서 2cm 띄고",
            "print_memo": "인쇄 깨끗하고 선명하게",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "우측 상단",
            "cut_memo": "거래처 제출용 샘플: 10매",
            "pack_material": "마대"
        },
        {
            "account_id": "34",
            "product_name": "AWKWARDLY PERFECT",
            "product_thick": "0.05",
            "product_length": "45",
            "product_width": "35",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "35",
            "product_name": "Abbott 안과전용",
            "product_thick": "0.06",
            "product_length": "11.5",
            "product_width": "14",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "백색",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "36",
            "product_name": "Aimsak",
            "product_thick": "0.05",
            "product_length": "15",
            "product_width": "10",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "은색",
            "cut_punch_position": " ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "37",
            "product_name": "Aimsak",
            "product_thick": "0.05",
            "product_length": "30",
            "product_width": "25",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "은색",
            "cut_punch_position": " ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "38",
            "product_name": "American Red Cross",
            "product_thick": "0.09",
            "product_length": "35",
            "product_width": "25.5",
            "is_print": true,
            "ext_color": "유백",
            "ext_pretreat": "양면",
            "ext_memo": "지퍼불량 없게\r\r\r\n(수출품임)",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "print_back_color_count": 1,
            "print_back_color": "흑색",
            "print_back_position": "중앙",
            "print_memo": "인쇄 깨끗하게",
            "cut_position": "중앙",
            "cut_ultrasonic": true,
            "cut_memo": "불량 선별 철저",
            "pack_material": "마대"
        },
        {
            "account_id": "39",
            "product_name": "Autre",
            "product_thick": "0.05",
            "product_length": "18.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_position": "1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "40",
            "product_name": "BAD-15",
            "product_thick": "0.05",
            "product_length": "10",
            "product_width": "8",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(3mm) 고리용",
            "pack_material": "마대"
        },
        {
            "account_id": "41",
            "product_name": "BEERE",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "9",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 2cm 띄고",
            "cut_position": "우측에서 2cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "42",
            "product_name": "BLISS (2도)",
            "product_thick": "0.05",
            "product_length": "19",
            "product_width": "8",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "갈색 / 라딘연두",
            "print_front_position": "하단에서 1cm 띄고",
            "print_memo": "★인쇄 진하게★\r\r\r\n(샘플 참조)",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "43",
            "product_name": "BLOSSOM (진녹색)",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "진녹색",
            "print_front_position": "중앙",
            "print_memo": "인쇄위치 정확",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "44",
            "product_name": "BLOSSOM (쵸코색)",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "쵸코색",
            "print_front_position": "중앙",
            "print_memo": "인쇄위치 정확",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "45",
            "product_name": "BOARA",
            "product_thick": "0.05",
            "product_length": "19",
            "product_width": "8",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 1.5cm 띄고",
            "cut_position": "6cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "46",
            "product_name": "Bad Factory",
            "product_thick": "0.08",
            "product_length": "42",
            "product_width": "33.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "날개 5cm",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "cut_memo": "손잡이 구멍",
            "pack_material": "마대"
        },
        {
            "account_id": "47",
            "product_name": "Bartoli",
            "product_thick": "0.05",
            "product_length": "20",
            "product_width": "9",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "48",
            "product_name": "Belgravia",
            "product_thick": "0.05",
            "product_length": "45",
            "product_width": "35",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": 1,
            "print_front_color": "회색",
            "print_front_position": "하단에서 7.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "회색",
            "print_back_position": "하단에서 16cm 띄고",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "49",
            "product_name": "Bliss",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "ext_memo": "내경 18cm",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 1.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "올백",
            "cut_position": "2cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(고리용) ",
            "pack_material": "마대"
        },
        {
            "account_id": "50",
            "product_name": "Bliss",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "ext_memo": "내경 18cm",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 1.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "올백",
            "cut_position": "1.5cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 고리용",
            "pack_material": "마대"
        },
        {
            "account_id": "51",
            "product_name": "Bliss (소)",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "ext_memo": "내경 18cm",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 1.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "올백",
            "print_memo": "대득인쇄소 동판사용",
            "cut_position": "1.5cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 고리용",
            "pack_material": "마대"
        },
        {
            "account_id": "52",
            "product_name": "Bliss - SPECTACLES",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "ext_memo": "내경 18cm",
            "print_front_color_count": 1,
            "print_front_color": "황토색(샘플색)",
            "print_front_position": "하단에서 1.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "올백",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%9C%A0%EB%A6%BC%ED%8F%AC%EC%9E%A5_Bliss_Spectacles_195x85.jpg",
            "cut_position": "1.5cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 고리용",
            "pack_material": "마대"
        },
        {
            "account_id": "53",
            "product_name": "CARVEN",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 1.5cm 띄고",
            "cut_position": "1.5cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 우측",
            "pack_material": "마대"
        },
        {
            "account_id": "54",
            "product_name": "CBX",
            "product_thick": "0.05",
            "product_length": "39",
            "product_width": "28",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "분리배출에서 2cm 띄고",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 좌측 상단",
            "pack_material": "마대"
        },
        {
            "account_id": "55",
            "product_name": "CE",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "지퍼아래 2.5cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "고리용",
            "pack_material": "마대"
        },
        {
            "account_id": "56",
            "product_name": "CE (백색)",
            "product_thick": "0.05",
            "product_length": "20.5",
            "product_width": "10",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "백색",
            "print_front_position": "지퍼아래 1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "57",
            "product_name": "CHARRIOL",
            "product_thick": "0.08",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "262C",
            "print_front_position": "하단에서 1cm 띄고",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%9C%A0%EB%A6%BC%ED%8F%AC%EC%9E%A5_CHARRIOL_195x85.jpg",
            "cut_position": "1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "58",
            "product_name": "CHERVO",
            "product_thick": "0.06",
            "product_length": "43",
            "product_width": "27",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": 1,
            "print_front_color": "빙그레꽃빙수녹색(P3308C)",
            "print_front_position": "하단에서 1.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "빙그레꽃빙수녹색(P3308C)",
            "print_back_position": "하단에서 10cm 띄고",
            "cut_position": "후면 경고문구 중앙",
            "cut_ultrasonic": true,
            "pack_material": "마대"
        },
        {
            "account_id": "59",
            "product_name": "CHERVO",
            "product_thick": "0.06",
            "product_length": "54",
            "product_width": "38",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": 1,
            "print_front_color": "빙그레꽃빙수녹색(P3308C)",
            "print_front_position": "하단에서 3.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "빙그레꽃빙수녹색(P3308C)",
            "print_back_position": "하단에서 10cm 띄고",
            "cut_position": "후면 경고문구 중앙",
            "cut_ultrasonic": true,
            "pack_material": "마대"
        },
        {
            "account_id": "60",
            "product_name": "CINQUE",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "흑색/적색",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%9C%A0%EB%A6%BC%ED%8F%AC%EC%9E%A5_CINQUE_195x85.jpg",
            "print_memo": "인쇄 위치 잘 맞아야 함",
            "cut_position": "로고 중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "61",
            "product_name": "COLLECTION",
            "product_thick": "0.08",
            "product_length": "26",
            "product_width": "33",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 7cm 띄고",
            "cut_position": "중앙",
            "cut_punch_position": " ",
            "cut_memo": "가분수",
            "pack_material": "마대"
        },
        {
            "account_id": "62",
            "product_name": "COLLECTION - 백인백L",
            "product_thick": "0.08",
            "product_length": "30",
            "product_width": "40",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_position": "중앙",
            "cut_memo": "가분수",
            "pack_material": "마대"
        },
        {
            "account_id": "63",
            "product_name": "COLLECTION - 투웨이에코백",
            "product_thick": "0.08",
            "product_length": "45",
            "product_width": "38",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_position": "중앙",
            "pack_material": "마대"
        },
        {
            "account_id": "64",
            "product_name": "COLLECTION - 투웨이캔버스백L",
            "product_thick": "0.08",
            "product_length": "45",
            "product_width": "44",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_position": "중앙",
            "pack_material": "마대"
        },
        {
            "account_id": "65",
            "product_name": "COMA",
            "product_thick": "0.08",
            "product_length": "37",
            "product_width": "29",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "쵸코색",
            "print_front_position": "하단에서 1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(7mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "66",
            "product_name": "CREATIVE XCHANGE",
            "product_thick": "0.05",
            "product_length": "20.5",
            "product_width": "8",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "쵸코색",
            "print_front_position": "중앙",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "67",
            "product_name": "CROSS EYEWEAR",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "68",
            "product_name": "Canaan Tree",
            "product_thick": "0.05",
            "product_length": "20",
            "product_width": "8",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "69",
            "product_name": "Capillary Cap - 6T",
            "product_thick": "0.05",
            "product_length": "8.5",
            "product_width": "6",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "70",
            "product_name": "Cashmere Class",
            "product_thick": "0.08",
            "product_length": "42.5",
            "product_width": "31",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 2.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "흑색",
            "print_back_position": "하단에서 2cm 띄고",
            "cut_position": "전면로고 중앙에 오게",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 지퍼아래 3cm, 우측에서 2cm 띄고",
            "pack_material": "마대"
        },
        {
            "account_id": "71",
            "product_name": "Cashmere Class (소)",
            "product_thick": "0.08",
            "product_length": "37",
            "product_width": "27",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "우측상단",
            "pack_material": "마대"
        },
        {
            "account_id": "72",
            "product_name": "Clinic",
            "product_thick": "0.06",
            "product_length": "23",
            "product_width": "14",
            "is_print": true,
            "ext_color": "유백",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "진녹색",
            "print_front_position": "분리배출에서 1cm 띄고",
            "pack_material": "박스"
        },
        {
            "account_id": "73",
            "product_name": "Crusade",
            "product_thick": "0.08",
            "product_length": "20",
            "product_width": "7.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "금색",
            "print_front_position": "하단에서 1cm 띄고",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%9C%A0%EB%A6%BC%ED%8F%AC%EC%9E%A5_Crusade_200x75.jpg",
            "cut_position": "1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "74",
            "product_name": "DACC CARBON",
            "product_thick": "0.09",
            "product_length": "15.5",
            "product_width": "9",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 2.5cm 띄고",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "DACC CARBON",
            "product_thick": "0.09",
            "product_length": "20",
            "product_width": "15",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 2cm 띄고",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "76",
            "product_name": "DAEWON",
            "product_thick": "0.06",
            "product_length": "18",
            "product_width": "12",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "백베다/보라색",
            "print_memo": "거래처에서 동판 입고 예정",
            "pack_material": "마대",
            "pack_unit": 1
        },
        {
            "account_id": "77",
            "product_name": "DAEWON",
            "product_thick": "0.06",
            "product_length": "23",
            "product_width": "18",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": "2",
            "print_front_color": "백베다/보라색",
            "print_memo": "거래처에서 동판 입고 예정",
            "pack_material": "마대",
            "pack_unit": "5"
        },
        {
            "account_id": "78",
            "product_name": "DEFORMAGE",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "79",
            "product_name": "DRSKIN - 2S",
            "product_thick": "0.05",
            "product_length": "22",
            "product_width": "17",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "적색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN-2S_22x17.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "80",
            "product_name": "DRSKIN - 3S",
            "product_thick": "0.05",
            "product_length": "22",
            "product_width": "17",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "적색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN-3S_22x17.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "81",
            "product_name": "DRSKIN - L",
            "product_thick": "0.05",
            "product_length": "28",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_L_28x20.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "82",
            "product_name": "DRSKIN - M",
            "product_thick": "0.05",
            "product_length": "28",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_M_28x20.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "83",
            "product_name": "DRSKIN - S",
            "product_thick": "0.05",
            "product_length": "28",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_S_28x20.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "84",
            "product_name": "DRSKIN - XL",
            "product_thick": "0.05",
            "product_length": "28",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_XL_28x20.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "85",
            "product_name": "DRSKIN - XS",
            "product_thick": "0.05",
            "product_length": "28",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN-XS_28x20.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "86",
            "product_name": "DRSKIN - XXL",
            "product_thick": "0.05",
            "product_length": "28",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_XXL_28x20.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "87",
            "product_name": "DRSKIN - XXXL",
            "product_thick": "0.05",
            "product_length": "28",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_XXXL_28x20.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "88",
            "product_name": "DRSKIN - 웹주소",
            "product_thick": "0.05",
            "product_length": "22",
            "product_width": "17",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "적색",
            "print_front_position": "로고 중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_22x17_%EC%9B%B9%EC%A3%BC%EC%86%8C_%EC%A0%81%EC%83%89.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "89",
            "product_name": "DRSKIN - 웹주소",
            "product_thick": "0.05",
            "product_length": "28",
            "product_width": "20",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "ext_memo": "지퍼 너무 강하지 않게",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_%EC%9B%B9%EC%A3%BC%EC%86%8C_28x20.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "DRSKIN - 웹주소",
            "product_thick": "0.05",
            "product_length": "33",
            "product_width": "25",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "print_image_url": "https://kwangilmes-product-images.s3-ap-northeast-2.amazonaws.com/%EC%A0%9C%EC%9D%BC%EC%94%A8%ED%8B%B0_DRSKIN_%EC%9B%B9%EC%A3%BC%EC%86%8C_33x25.jpg",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "DSQUARED2",
            "product_thick": "0.05",
            "product_length": "22.5",
            "product_width": "16",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "지퍼아래 1cm 띄고",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "DSQUARED2",
            "product_thick": "0.05",
            "product_length": "40",
            "product_width": "31",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "양면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 7.5cm 띄고",
            "print_back_color_count": 1,
            "print_back_color": "흑색",
            "print_back_position": "하단에서 7.5cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "Dr. panda",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 4cm 띄고",
            "cut_position": "1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "ED",
            "product_thick": "0.05",
            "product_length": "30",
            "product_width": "21",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "군청색",
            "print_front_position": "하단에서 1.5cm 띄고",
            "cut_position": "1.5cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "75",
            "product_name": "ELLA",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "키즈랩하늘색",
            "print_front_position": "중앙",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "ELVAN - PARIS",
            "product_thick": "0.06",
            "product_length": "45",
            "product_width": "33",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 2cm 띄고",
            "cut_ultrasonic": true,
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 좌측 상단",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "ELVAN - PARIS",
            "product_thick": "0.07",
            "product_length": "46.5",
            "product_width": "67",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 5cm 띄고",
            "cut_ultrasonic": true,
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " 좌측 상단",
            "cut_memo": " / 가분수",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "ENDLESS",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "8.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "밤색; P 476C",
            "print_front_position": "하단에서 1.5cm 띄고",
            "cut_position": "1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "ENTOURAGE OF 7",
            "product_thick": "0.05",
            "product_length": "19.5",
            "product_width": "9",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "하단에서 1cm 띄고",
            "cut_position": "1cm 띄고",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "EU",
            "product_thick": "0.05",
            "product_length": "9",
            "product_width": "7",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "흑색",
            "print_front_position": "중앙",
            "cut_punch_position": " ",
            "pack_material": "마대"
        },
        {
            "account_id": "75",
            "product_name": "EXPERIMENT - 1번",
            "product_thick": "0.05",
            "product_length": "29",
            "product_width": "23.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "녹색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "75",
            "product_name": "EXPERIMENT - 2번",
            "product_thick": "0.05",
            "product_length": "25",
            "product_width": "18",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "적색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "83",
            "product_name": "EXPERIMENT - 2번",
            "product_thick": "0.05",
            "product_length": "32",
            "product_width": "23.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "적색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "83",
            "product_name": "EXPERIMENT - 3번",
            "product_thick": "0.05",
            "product_length": "25",
            "product_width": "18",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "공색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "83",
            "product_name": "EXPERIMENT - 3번",
            "product_thick": "0.05",
            "product_length": "29",
            "product_width": "23.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "공색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "83",
            "product_name": "EXPERIMENT - 3번",
            "product_thick": "0.05",
            "product_length": "31",
            "product_width": "23.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "공색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "83",
            "product_name": "EXPERIMENT - 3번",
            "product_thick": "0.05",
            "product_length": "41.5",
            "product_width": "18",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "공색",
            "print_front_position": "중앙",
            "print_memo": "아트싸이언스 - 3번 동판 사용",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "83",
            "product_name": "EXPERIMENT - 3번",
            "product_thick": "0.05",
            "product_length": "42",
            "product_width": "18",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "공색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "83",
            "product_name": "EXPERIMENT - 4번",
            "product_thick": "0.05",
            "product_length": "25",
            "product_width": "18",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "진곤색",
            "print_front_position": "중앙",
            "print_memo": "아트싸이언스 - 4번 동판 사용",
            "cut_position": "중앙",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "86",
            "product_name": "EXPERIMENT - 4번",
            "product_thick": "0.05",
            "product_length": "27",
            "product_width": "23.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "진곤색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "86",
            "product_name": "EXPERIMENT - 4번",
            "product_thick": "0.05",
            "product_length": "29",
            "product_width": "23.5",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "진곤색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        },
        {
            "account_id": "86",
            "product_name": "EXPERIMENT - 4번",
            "product_thick": "0.05",
            "product_length": "31",
            "product_width": "18",
            "is_print": true,
            "ext_color": "투명",
            "ext_pretreat": "단면",
            "print_front_color_count": 1,
            "print_front_color": "진곤색",
            "cut_is_punched": true,
            "cut_punch_count": 1,
            "cut_punch_position": "(5mm) ",
            "pack_material": "마대",
            "pack_deliver_all": true
        }
    ]

const plates = [
        {
            "product_1": "1",
            "plate_round": "375.5",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "2",
            "plate_round": "454",
            "plate_length": "350",
            "plate_material": "데스"
        },
        {
            "product_1": "3",
            "plate_round": "454",
            "plate_length": "350",
            "plate_material": "데스"
        },
        {
            "product_1": "4",
            "plate_round": "357.5",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "5",
            "plate_round": "303",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "6",
            "product_2": "8",
            "plate_round": "298.5",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "7",
            "product_2": "9",
            "plate_round": "298.5",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "8",
            "product_2": "10",
            "plate_round": "380.5",
            "plate_length": "450",
            "plate_material": "신주"
        },
        {
            "product_1": "9",
            "product_2": "11",
            "plate_round": "364",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "10",
            "product_2": "12",
            "plate_round": "302",
            "plate_length": "400",
            "plate_material": "신주"
        },
        {
            "product_1": "11",
            "product_2": "13",
            "plate_round": "364.5",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "12",
            "product_2": "14",
            "plate_round": "304",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "13",
            "product_2": "15",
            "plate_round": "304",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "14",
            "product_2": "16",
            "plate_round": "364",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "15",
            "product_2": "17",
            "product_3": "3",
            "plate_round": "303",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "16",
            "product_2": "18",
            "product_3": "4",
            "plate_round": "303",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "17",
            "product_2": "27",
            "product_3": "5",
            "plate_round": "362.5",
            "plate_length": "400",
            "plate_material": "신주"
        },
        {
            "product_1": "18",
            "product_2": "28",
            "plate_round": "362.5",
            "plate_length": "400",
            "plate_material": "신주"
        },
        {
            "product_1": "19",
            "product_2": "29",
            "plate_round": "298.5",
            "plate_length": "400",
            "plate_material": "신주"
        },
        {
            "product_1": "20",
            "product_2": "30",
            "plate_round": "303.5",
            "plate_length": "450",
            "plate_material": "신주"
        },
        {
            "product_1": "21",
            "product_2": "31",
            "plate_round": "395",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "22",
            "product_2": "32",
            "plate_round": "368",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "23",
            "product_2": "33",
            "plate_round": "362.5",
            "plate_length": "400",
            "plate_material": "신주"
        },
        {
            "product_1": "24",
            "product_2": "34",
            "plate_round": "366",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "25",
            "product_2": "35",
            "plate_round": "395",
            "plate_length": "400",
            "plate_material": "신주"
        },
        {
            "product_1": "26",
            "product_2": "36",
            "plate_round": "366",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "27",
            "plate_round": "310",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "28",
            "plate_round": "310",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "29",
            "plate_round": "328.5",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "30",
            "plate_round": "310",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "31",
            "plate_round": "310",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "32",
            "plate_round": "310",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "33",
            "plate_round": "310",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "34",
            "plate_round": "310",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "35",
            "plate_round": "308",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "36",
            "plate_round": "308",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "37",
            "plate_round": "310",
            "plate_length": "300",
            "plate_material": "신주"
        },
        {
            "product_1": "38",
            "plate_round": "328.5",
            "plate_length": "350",
            "plate_material": "신주"
        },
        {
            "product_1": "39",
            "plate_round": "400",
            "plate_length": "450",
            "plate_material": "데스"
        }
    ]

module.exports = {
  SAMPLE_ACCOUNTS: accounts,
  SAMPLE_PRODUCTS: products,
  SAMPLE_PLATES: plates
}
