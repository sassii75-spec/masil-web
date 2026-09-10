import { useMemo } from 'react'
import { CATEGORIES } from '../lib/constants'
import { CATEGORY_ICONS, IconPin, IconClock, IconSparkle } from './icons'

function CurationCard({ place, onSelectPlace, onOpenDetail }) {
  const catKey = place.category
  const cat = CATEGORIES.find((c) => c.key === catKey) || CATEGORIES[0]
  const Icon = CATEGORY_ICONS[catKey]

  return (
    <div
      className="curation-card"
      onClick={() => {
        if (onSelectPlace) onSelectPlace(place.id)
        if (onOpenDetail) onOpenDetail(place)
      }}
    >
      <div className="curation-thumb-box">
        {place.image_url ? (
          <img src={place.image_url} alt={place.name} className="curation-thumb-img" />
        ) : (
          <div className="curation-thumb-fallback" style={{ background: cat.bg, color: cat.ink }}>
            {Icon ? <Icon className="fallback-icon" /> : '🌿'}
          </div>
        )}
        <span className="curation-cat-badge" style={{ background: cat.badgeBg, color: cat.badgeInk }}>
          {cat.label}
        </span>
      </div>

      <div className="curation-card-body">
        <h4 className="curation-title">{place.name}</h4>
        <p className="curation-desc">{place.description || '어르신들이 가볍게 다녀오기 좋은 정겨운 곳입니다.'}</p>

        {/* Senior Care Badges */}
        {place.senior_care_tags && place.senior_care_tags.length > 0 && (
          <div className="curation-tags-row">
            {place.senior_care_tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="senior-care-tag-pill">
                ✓ {tag}
              </span>
            ))}
          </div>
        )}

        <div className="curation-meta-row">
          <span className="curation-meta-pill">
            <IconPin className="icon" />
            {place.region || '분당구'}
          </span>
          {place.duration_min && (
            <span className="curation-meta-pill time-pill">
              <IconClock className="icon" />
              추천 체류 {place.duration_min}분
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function HomeCurationView({
  places,
  onSelectPlace,
  onOpenDetail,
  onSwitchToMap,
  onOpenAbout,
}) {
  const categorized = useMemo(() => {
    const map = {}
    CATEGORIES.forEach((c) => {
      map[c.key] = places.filter((p) => p.category === c.key)
    })
    return map
  }, [places])

  const sectionTitles = {
    도보마실: {
      title: '🚶‍♂️ 걸어서 다녀오는 동네 산책 마실',
      sub: '경사 없이 평평하고 벤치 쉼터가 많은 분당·성남 명품 산책길',
    },
    차량마실: {
      title: '🚗 차 타고 경치 즐기는 드라이브 마실',
      sub: '차량으로 편안히 올라가 호수와 수목원의 사계절을 감상하는 코스',
    },
    '1시간마실': {
      title: '⏱️ 1시간 동안 가볍게 쉬어가는 숏 마실 & 찻집',
      sub: '부담 없이 들러 따스한 한방 차 한 잔과 숲 바람을 쐬는 공간',
    },
    '보양·전통찻집': {
      title: '🍵 속 편한 영양 한식 & 전통 찻집',
      sub: '조미료 없이 정갈한 곤드레 밥상, 토종 백숙 및 수제 대추차 다원',
    },
    '복지관·데이케어': {
      title: '🏥 시·구립 어르신 복지관 & 데이케어센터',
      sub: '건강강좌, 경로식당, 셔틀버스, 주간보호 데이케어 및 치매안심센터 안내',
    },
  }

  return (
    <div className="home-curation-view">
      {/* Masil Senior Banner */}
      <div className="masil-hero-banner">
        <div className="masil-hero-content">
          <span className="masil-hero-tag">💡 정겨운 순우리말 알림</span>
          <h2>"마실 가자~" 이웃에 놀러 다니는 따뜻한 정</h2>
          <p>
            <strong>'마실'</strong>은 이웃에 놀러 다니거나 가볍게 잠깐 외출하는 일을 뜻하는 순우리말(표준어)입니다.<br />
            어르신을 위한 1시간 산책, 보양 한식, 복지관 강좌 및 데이케어센터 정보를 한눈에 안내해 드려요.
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={onOpenAbout}>
          <IconSparkle className="icon" /> 마실 소개 보기
        </button>
      </div>

      {CATEGORIES.map((c) => {
        const groupPlaces = categorized[c.key] || []
        if (groupPlaces.length === 0) return null
        const meta = sectionTitles[c.key] || { title: c.label, sub: '' }

        return (
          <section key={c.key} className="curation-section">
            <div className="section-head-row">
              <div className="head-text-group">
                <h3>{meta.title}</h3>
                <p className="section-sub">{meta.sub}</p>
              </div>
              <button
                type="button"
                className="section-more-btn"
                onClick={() => onSwitchToMap && onSwitchToMap(c.key)}
              >
                지도에서 전체보기 ➔
              </button>
            </div>

            <div className="curation-grid">
              {groupPlaces.map((p) => (
                <CurationCard
                  key={p.id}
                  place={p}
                  onSelectPlace={onSelectPlace}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
