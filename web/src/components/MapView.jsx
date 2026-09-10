import { useEffect, useRef } from 'react'
import { DEFAULT_CENTER } from '../lib/constants'

// 카테고리별 커스텀 핀 테마 (아늑한 웜 테라코타 & 샌드 & 슬레이트)
const CATEGORY_PIN_THEMES = {
  도보마실: {
    icon: '🚶‍♂️',
    bg: '#F3EBE1',
    ink: '#5C442B',
    border: '#A37750',
    badgeBg: '#A37750',
  },
  차량마실: {
    icon: '🚗',
    bg: '#EBF1F7',
    ink: '#2A4B68',
    border: '#457297',
    badgeBg: '#457297',
  },
  '1시간마실': {
    icon: '⏱️',
    bg: '#FDF2E9',
    ink: '#9A4913',
    border: '#B85B24',
    badgeBg: '#B85B24',
  },
  '보양·전통찻집': {
    icon: '🍵',
    bg: '#F9ECEB',
    ink: '#832B2B',
    border: '#A83B3B',
    badgeBg: '#A83B3B',
  },
  '복지관·데이케어': {
    icon: '🏥',
    bg: '#F2F4EE',
    ink: '#3D4D33',
    border: '#6B825B',
    badgeBg: '#6B825B',
  },
}

export default function MapView({
  kakao,
  kakaoError,
  places,
  selectedId,
  onSelectPlace,
  onOpenDetail,
  selectedCourse,
  userLocation,
}) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const overlaysRef = useRef([])
  const polylineRef = useRef(null)
  const distanceOverlaysRef = useRef([])
  const infoWindowRef = useRef(null)

  const activeCoord = userLocation?.coord || DEFAULT_CENTER

  useEffect(() => {
    if (!kakao || !mapRef.current || mapInstance.current) return
    mapInstance.current = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(activeCoord.lat, activeCoord.lng),
      level: 5,
    })
    infoWindowRef.current = new kakao.maps.InfoWindow({ removable: true })
  }, [kakao, activeCoord.lat, activeCoord.lng])

  const handleRecenter = () => {
    if (!mapInstance.current || !kakao) return
    const latLng = new kakao.maps.LatLng(activeCoord.lat, activeCoord.lng)
    mapInstance.current.setCenter(latLng)
    mapInstance.current.setLevel(5)
  }

  useEffect(() => {
    if (!kakao || !mapInstance.current) return

    overlaysRef.current.forEach((o) => o.setMap(null))
    overlaysRef.current = []

    if (polylineRef.current) {
      polylineRef.current.setMap(null)
      polylineRef.current = null
    }

    distanceOverlaysRef.current.forEach((o) => o.setMap(null))
    distanceOverlaysRef.current = []

    // 0. 현재 위치 핀
    const userLatLng = new kakao.maps.LatLng(activeCoord.lat, activeCoord.lng)
    const userContent = document.createElement('div')
    userContent.className = 'custom-map-pin is-user-pin'
    userContent.innerHTML = `
      <div class="pin-card user-location-card" style="background:#B85B24; border:2px solid #8A4015; color:#FFFFFF; font-weight:800; padding:6px 12px; border-radius:12px; box-shadow: 0 4px 12px rgba(184,91,36,0.35);">
        <span class="pin-icon">📍</span>
        <span class="pin-title">${userLocation?.addressName || '현재 위치'}</span>
      </div>
    `
    const userOverlay = new kakao.maps.CustomOverlay({
      position: userLatLng,
      content: userContent,
      yAnchor: 1.2,
      zIndex: 10,
    })
    userOverlay.setMap(mapInstance.current)
    overlaysRef.current.push(userOverlay)

    // 1. 장소 마커 생성
    const validPlaces = places.filter((p) => p.coord)

    validPlaces.forEach((p) => {
      const latLng = new kakao.maps.LatLng(p.coord.lat, p.coord.lng)
      const isSelected = p.id === selectedId

      let stepIndex = null
      if (selectedCourse && selectedCourse.steps) {
        const foundIdx = selectedCourse.steps.findIndex((s) => s.place.id === p.id)
        if (foundIdx !== -1) stepIndex = foundIdx + 1
      }

      const theme = CATEGORY_PIN_THEMES[p.category] || CATEGORY_PIN_THEMES['도보마실']
      const content = document.createElement('div')
      content.className = `custom-map-pin ${isSelected ? 'is-selected' : ''} ${stepIndex ? 'is-course-step' : ''}`

      const pNum = stepIndex ? `Stop ${stepIndex}` : null
      content.innerHTML = `
        <div class="pin-card" style="background: ${theme.bg}; border: 2px solid ${theme.border}; color: ${theme.ink}; padding: 6px 12px; border-radius: 12px; font-weight: 700; box-shadow: 0 4px 10px rgba(0,0,0,0.12);">
          ${pNum ? `<span class="step-num-pill" style="background:${theme.badgeBg}; color:#FFF; padding:2px 6px; border-radius:4px; font-size:11px; margin-right:4px;">${pNum}</span>` : ''}
          <span class="pin-icon">${theme.icon}</span>
          <span class="pin-title">${p.name}</span>
        </div>
      `

      content.addEventListener('click', () => {
        onSelectPlace(p.id)
        if (onOpenDetail) onOpenDetail(p)
      })

      const overlay = new kakao.maps.CustomOverlay({
        position: latLng,
        content,
        yAnchor: 1.25,
        zIndex: isSelected ? 20 : pNum ? 15 : 5,
      })

      overlay.setMap(mapInstance.current)
      overlaysRef.current.push(overlay)
    })

    // 2. 동선 경로선
    if (selectedCourse && selectedCourse.steps && selectedCourse.steps.length > 0) {
      const coursePath = []

      if (selectedCourse.startLocation) {
        const startLatLng = new kakao.maps.LatLng(
          selectedCourse.startLocation.lat,
          selectedCourse.startLocation.lng
        )
        coursePath.push(startLatLng)
      }

      selectedCourse.steps.forEach((step) => {
        if (step.place.coord) {
          const stepLatLng = new kakao.maps.LatLng(step.place.coord.lat, step.place.coord.lng)
          coursePath.push(stepLatLng)
        }
      })

      if (coursePath.length >= 2) {
        polylineRef.current = new kakao.maps.Polyline({
          path: coursePath,
          strokeWeight: 6,
          strokeColor: '#B85B24',
          strokeOpacity: 0.85,
          strokeStyle: 'solid',
        })
        polylineRef.current.setMap(mapInstance.current)

        const bounds = new kakao.maps.LatLngBounds()
        coursePath.forEach((pt) => bounds.extend(pt))
        mapInstance.current.setBounds(bounds)
      }
    }
  }, [kakao, places, selectedId, selectedCourse, activeCoord, onSelectPlace, onOpenDetail, userLocation])

  if (kakaoError) {
    return (
      <div className="map-view-box empty-state" style={{ padding: 40, textAlign: 'center' }}>
        카카오 지도를 불러오지 못했습니다. <br />
        <code>.env</code> 파일의 <code>VITE_KAKAO_JS_KEY</code> 설정을 확인해주세요.
      </div>
    )
  }

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-view-box" />
      <button
        type="button"
        className="btn-primary"
        onClick={handleRecenter}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          zIndex: 30,
          padding: '10px 18px',
          fontSize: 15,
        }}
      >
        📍 내 위치로 지도 중앙 이동
      </button>
    </div>
  )
}
