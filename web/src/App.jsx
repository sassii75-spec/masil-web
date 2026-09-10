import { useEffect, useMemo, useState, useCallback } from 'react'
import placesData from './data/places.json'
import { CATEGORIES } from './lib/constants'
import { loadKakaoMaps } from './lib/kakaoLoader'
import { geocodePlaces } from './lib/geocode'
import { buildCourses } from './lib/courseEngine'
import FilterBar from './components/FilterBar'
import PlaceList from './components/PlaceList'
import MapView from './components/MapView'
import CourseTimeline from './components/CourseTimeline'
import PlaceDetailModal from './components/PlaceDetailModal'
import CourseRecommendationModal from './components/CourseRecommendationModal'
import HomeCurationView from './components/HomeCurationView'
import AboutModal from './components/AboutModal'
import CommunityView from './components/CommunityView'
import { IconPin, IconLogo, IconSearch, IconUser } from './components/icons'

function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export default function App() {
  const [kakao, setKakao] = useState(null)
  const [kakaoError, setKakaoError] = useState(null)
  const [coords, setCoords] = useState({})
  const [geocoding, setGeocoding] = useState(false)
  const [isLargeFont, setIsLargeFont] = useState(false)

  // 메인 화면 모드: 'home' | 'map' | 'community'
  const [viewMode, setViewMode] = useState('home')
  const [navTab, setNavTab] = useState('home')

  const [tab, setTab] = useState('list')
  const [selectedId, setSelectedId] = useState(null)
  const [courses, setCourses] = useState(null)
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  // 현재 사용자 위치 (기본값: 분당구 정자동)
  const [userLocation, setUserLocation] = useState({
    coord: { lat: 37.3614, lng: 127.1114 },
    addressName: '현재 위치 (분당구 정자동)',
    loading: false,
    isDefault: true,
  })

  // Place Detail Popup Modal State
  const [detailPlace, setDetailPlace] = useState(null)

  const [filters, setFilters] = useState({
    categories: new Set(CATEGORIES.map((c) => c.key)),
    companion: '전체 어르신',
    start: '10:00',
    windowMinutes: 180,
    flatOnly: false,
  })

  // 큰 글씨 모드 토글
  const toggleLargeFont = () => {
    setIsLargeFont((prev) => {
      const next = !prev
      if (next) {
        document.body.classList.add('font-large')
      } else {
        document.body.classList.remove('font-large')
      }
      return next
    })
  }

  // Kakao Map SDK 로드
  useEffect(() => {
    loadKakaoMaps()
      .then((k) => setKakao(k))
      .catch((e) => setKakaoError(e.message))
  }, [])

  // Geolocation 위치 감지 및 지코더
  const refreshUserLocation = useCallback(() => {
    if (!navigator.geolocation) return

    setUserLocation((prev) => ({ ...prev, loading: true }))

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const newCoord = { lat, lng }

        if (kakao && kakao.maps && kakao.maps.services) {
          const geocoder = new kakao.maps.services.Geocoder()
          geocoder.coord2RegionCode(lng, lat, (result, status) => {
            if (status === kakao.maps.services.Status.OK && result.length > 0) {
              const region = result.find((r) => r.region_type === 'H') || result[0]
              const shortName = region.region_3depth_name || region.region_2depth_name || '현재 위치'
              setUserLocation({
                coord: newCoord,
                addressName: `현재 위치 (${shortName})`,
                loading: false,
                isDefault: false,
              })
            } else {
              setUserLocation({
                coord: newCoord,
                addressName: `현재 위치 (${lat.toFixed(3)}, ${lng.toFixed(3)})`,
                loading: false,
                isDefault: false,
              })
            }
          })
        } else {
          setUserLocation({
            coord: newCoord,
            addressName: '현재 위치 (GPS 좌표 적용)',
            loading: false,
            isDefault: false,
          })
        }
      },
      (err) => {
        console.warn('Geolocation failed or denied:', err)
        setUserLocation((prev) => ({ ...prev, loading: false }))
      },
      { timeout: 8000, enableHighAccuracy: true }
    )
  }, [kakao])

  useEffect(() => {
    refreshUserLocation()
  }, [refreshUserLocation])

  useEffect(() => {
    if (!kakao) return
    setGeocoding(true)
    geocodePlaces(kakao, placesData.places).then((result) => {
      setCoords(result)
      setGeocoding(false)
    })
  }, [kakao])

  const placesWithCoord = useMemo(
    () => placesData.places.map((p) => ({ ...p, coord: coords[p.id] || null })),
    [coords]
  )

  const filteredPlaces = useMemo(
    () =>
      placesWithCoord.filter((p) => {
        const matchCat = filters.categories.has(p.category)
        const matchFlat =
          !filters.flatOnly ||
          (p.senior_care_tags && p.senior_care_tags.includes('평지/슬로프')) ||
          p.category === '1시간마실' ||
          p.category === '복지관·데이케어'
        const matchSearch =
          !searchQuery.trim() ||
          p.name.includes(searchQuery) ||
          (p.address && p.address.includes(searchQuery)) ||
          (p.description && p.description.includes(searchQuery))
        return matchCat && matchFlat && matchSearch
      }),
    [placesWithCoord, filters.categories, filters.flatOnly, searchQuery]
  )

  const handleRecommend = useCallback(() => {
    const targetPlaces = filteredPlaces && filteredPlaces.length > 0 ? filteredPlaces : placesWithCoord
    const result = buildCourses(targetPlaces, {
      startMinutes: timeToMinutes(filters.start),
      windowMinutes: filters.windowMinutes,
      userCoord: userLocation.coord,
      startLocationName: userLocation.addressName,
    })
    setCourses(result)
    setSelectedCourseIndex(0)
    setShowCourseModal(true)
  }, [filteredPlaces, placesWithCoord, filters.start, filters.windowMinutes, userLocation])

  const handleConfirmCourse = useCallback((index) => {
    setSelectedCourseIndex(index)
    setTab('course')
    setViewMode('map')
    setNavTab('course')
  }, [])

  const handleSwitchToCategoryMap = useCallback((catKey) => {
    setFilters((prev) => ({ ...prev, categories: new Set([catKey]) }))
    setViewMode('map')
    setTab('list')
    setNavTab('course')
  }, [])

  const activeCourse = useMemo(() => {
    if (tab !== 'course' || !courses || courses.length === 0) return null
    return courses[selectedCourseIndex] || courses[0] || null
  }, [tab, courses, selectedCourseIndex])

  return (
    <div className="app">
      {/* Top Navbar */}
      <header className="app-navbar">
        <div className="navbar-container">
          <div className="nav-left">
            <div
              className="brand-logo"
              onClick={() => setShowAboutModal(true)}
              title="클릭 시 '마실' 순우리말 소개 및 서비스 안내"
            >
              <IconLogo />
              <div className="brand-title-group">
                <span className="brand-korean">마실 (Masil)</span>
                <span className="brand-subtag">이웃과 함께하는 정겨운 동네 나들이</span>
              </div>
            </div>
            <nav className="nav-links">
              <button
                type="button"
                className={`nav-link ${navTab === 'home' && viewMode === 'home' ? 'is-active' : ''}`}
                onClick={() => { setViewMode('home'); setNavTab('home') }}
              >
                🏡 마실 큐레이션
              </button>

              <button
                type="button"
                className={`nav-link ${navTab === 'course' && viewMode === 'map' ? 'is-active' : ''}`}
                onClick={() => { setViewMode('map'); setTab('course'); setNavTab('course') }}
              >
                🗺️ 마실 지도 & 코스
              </button>
              <button
                type="button"
                className={`nav-link ${navTab === 'community' && viewMode === 'community' ? 'is-active' : ''}`}
                onClick={() => { setViewMode('community'); setNavTab('community') }}
              >
                💬 이웃 마실 이야기
              </button>
            </nav>
          </div>

          <div className="nav-center">
            <div className="nav-search-bar">
              <IconSearch className="search-icon" />
              <input
                type="text"
                placeholder="어디로 마실 가고 싶으세요? (예: 율동공원, 정자복지관)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="nav-right">
            <button
              type="button"
              className="font-size-toggle-btn"
              onClick={toggleLargeFont}
              title="글씨 크기 확대/원래대로"
            >
              🔍 {isLargeFont ? '보통 글씨' : '큰 글씨 모드'}
            </button>
            <button
              type="button"
              className={`loc-pill ${userLocation.loading ? 'is-loading' : ''}`}
              onClick={refreshUserLocation}
              title="클릭 시 현재 위치(GPS) 재탐색"
            >
              <IconPin className="icon" />
              <span>{userLocation.loading ? '위치 확인 중...' : userLocation.addressName}</span>
            </button>
            <button type="button" className="nav-user-btn font-size-toggle-btn">
              <IconUser className="icon" />
              <span>로그인</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Filter Bar */}
      {viewMode !== 'community' && (
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onRecommend={handleRecommend}
          recommendDisabled={!kakao || geocoding}
        />
      )}

      {viewMode === 'home' ? (
        <HomeCurationView
          places={filteredPlaces}
          onSelectPlace={(id) => {
            setSelectedId(id)
            setViewMode('map')
          }}
          onOpenDetail={setDetailPlace}
          onSwitchToMap={handleSwitchToCategoryMap}
          onOpenAbout={() => setShowAboutModal(true)}
        />
      ) : viewMode === 'community' ? (
        <CommunityView
          userLocation={userLocation}
          onOpenDetail={setDetailPlace}
        />
      ) : (
        <div className="layout">
          <div className="side-panel">
            <div className="tabs">
              <button type="button" className="tab-btn" data-active={tab === 'list'} onClick={() => setTab('list')}>
                마실 장소 ({filteredPlaces.length})
              </button>
              <button type="button" className="tab-btn" data-active={tab === 'course'} onClick={() => setTab('course')}>
                추천 코스 {courses ? `(${courses.length})` : ''}
              </button>
            </div>
            <div className="panel-scroll">
              {tab === 'list' ? (
                <PlaceList
                  places={filteredPlaces}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onOpenDetail={setDetailPlace}
                />
              ) : (
                <CourseTimeline
                  courses={courses}
                  selectedCourseIndex={selectedCourseIndex}
                  onSelectCourse={setSelectedCourseIndex}
                  onOpenDetail={setDetailPlace}
                />
              )}
            </div>
          </div>

          <MapView
            kakao={kakao}
            kakaoError={kakaoError}
            places={filteredPlaces}
            selectedId={selectedId}
            onSelectPlace={setSelectedId}
            onOpenDetail={setDetailPlace}
            selectedCourse={activeCourse}
            userLocation={userLocation}
          />
        </div>
      )}

      {/* Course Recommendation Preview Modal */}
      {showCourseModal && (
        <CourseRecommendationModal
          courses={courses}
          onConfirmCourse={handleConfirmCourse}
          onClose={() => setShowCourseModal(false)}
        />
      )}

      {/* Brand Intro About Modal */}
      {showAboutModal && (
        <AboutModal
          onClose={() => setShowAboutModal(false)}
          onStartRecommend={handleRecommend}
        />
      )}

      {/* Place Detail Popup Modal */}
      {detailPlace && (
        <PlaceDetailModal
          place={detailPlace}
          onClose={() => setDetailPlace(null)}
          onSelectOnMap={(id) => {
            setSelectedId(id)
            setViewMode('map')
          }}
        />
      )}
    </div>
  )
}
