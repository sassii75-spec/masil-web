// 마실(Masil) 인라인 SVG 아이콘 세트 (아늑한 웜 테라코타 & 샌드 디자인)

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconLogo(props) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Soft Warm Sunset Circle */}
      <circle cx="24" cy="24" r="21" fill="#FDF2E9" stroke="#EAC8AB" strokeWidth="1.5" />
      {/* Korean House Roof Curve */}
      <path d="M11 23C13 17 18 13.5 24 13.5C30 13.5 35 17 37 23" stroke="#B85B24" strokeWidth="3" strokeLinecap="round" />
      {/* Cozy Tea Cup */}
      <path d="M16.5 25.5H31.5V28.5C31.5 32 28.5 35 24 35C19.5 35 16.5 32 16.5 28.5V25.5Z" fill="#B85B24" />
      {/* Gentle Steam Lines */}
      <path d="M20.5 19.5C20.5 18 21.5 17.5 21.5 16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <path d="M27.5 19.5C27.5 18 28.5 17.5 28.5 16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconWalk(props) {
  return (
    <svg {...base} {...props}>
      <path d="M13 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M6.5 21l3.5-7 2.5 3 4.5 4" />
      <path d="M9 10l3-3 4 2.5v5.5" />
      <path d="M17 13l-4-2" />
    </svg>
  )
}

export function IconDrive(props) {
  return (
    <svg {...base} {...props}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A2 2 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}

export function IconTea(props) {
  return (
    <svg {...base} {...props}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  )
}

export function IconFood(props) {
  return (
    <svg {...base} {...props}>
      <path d="M18 8a6 6 0 0 0-12 0v12h12V8z" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="6" y1="14" x2="18" y2="14" />
    </svg>
  )
}

export function IconWelfare(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 10h6" />
      <path d="M12 7v6" />
    </svg>
  )
}

export function IconGift(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12v10H4V12" />
      <path d="M22 7H2v5h20V7z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

export function IconSearch(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

export function IconUser(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="7" r="4" />
      <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  )
}

export function IconPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function IconSparkle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    </svg>
  )
}

export function IconPrice(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12l8-8h8v8l-8 8-8-8z" />
      <circle cx="15" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const CATEGORY_ICONS = {
  도보마실: IconWalk,
  차량마실: IconDrive,
  '1시간마실': IconTea,
  '보양·전통찻집': IconFood,
  '복지관·데이케어': IconWelfare,
}
