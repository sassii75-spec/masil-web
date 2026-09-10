// 장소 카테고리 정의 — 마실(Masil) 어르신 & 실버 맞춤 5대 테마 (품격 있는 은은한 파스텔 구분 컬러)
export const CATEGORIES = [
  {
    key: '도보마실',
    label: '걸어서 다녀올 마실',
    bg: '#EAEFE9',
    ink: '#27402B',
    badgeBg: '#3F5E44',
    badgeInk: '#FFFFFF',
    border: '#CAD9CC',
  },
  {
    key: '차량마실',
    label: '차량 이동 추천 마실',
    bg: '#EAF0F6',
    ink: '#1F384C',
    badgeBg: '#355670',
    badgeInk: '#FFFFFF',
    border: '#C8D8E6',
  },
  {
    key: '1시간마실',
    label: '1시간 숏 마실 & 찻집',
    bg: '#FBF0E6',
    ink: '#6B3B15',
    badgeBg: '#9B5622',
    badgeInk: '#FFFFFF',
    border: '#EEDCCE',
  },
  {
    key: '보양·전통찻집',
    label: '건강식 & 전통 찻집',
    bg: '#F9EBEB',
    ink: '#5C2222',
    badgeBg: '#8A3B3B',
    badgeInk: '#FFFFFF',
    border: '#EBD3D3',
  },
  {
    key: '복지관·데이케어',
    label: '복지관 · 문화센터 · 데이케어',
    bg: '#F4EFEA',
    ink: '#423832',
    badgeBg: '#66574F',
    badgeInk: '#FFFFFF',
    border: '#DDD6CE',
  },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]))

export const ACTIVITY_CATEGORIES = ['도보마실', '차량마실', '복지관·데이케어']
export const REST_CATEGORIES = ['1시간마실', '보양·전통찻집']

export const COMPANION_OPTIONS = [
  '전체 어르신',
  '액티브 실버 (자율 보행)',
  '보행 보조 / 지팡이 이용',
  '휠체어 이동 어르신',
  '자녀 / 손주 동반 나들이',
  '보호자 돌봄 상담'
]

export const SENIOR_CARE_TAGS = [
  { key: 'flat_slope', label: '평지/슬로프 (계단 없음)', icon: '👨‍🦯' },
  { key: 'parking_shuttle', label: '넓은 주차 / 셔틀버스', icon: '🚗' },
  { key: 'chairs_rest', label: '쉼터 의자 다수', icon: '☕' },
  { key: 'welfare_care', label: '건강 강좌 / 데이케어', icon: '🏥' },
  { key: 'healthy_meal', label: '속 편한 영양 식사', icon: '🍵' },
  { key: 'toilet_clean', label: '편의 화장실 완비', icon: '🚽' },
]

export const DEFAULT_CENTER = { lat: 37.3826, lng: 127.1188 }
