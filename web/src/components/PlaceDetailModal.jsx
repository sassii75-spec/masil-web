import { CATEGORY_MAP } from '../lib/constants'
import { CATEGORY_ICONS, IconClock, IconPrice, IconPin, IconGift } from './icons'

export default function PlaceDetailModal({ place, onClose, onSelectOnMap }) {
  if (!place) return null

  const cat = CATEGORY_MAP[place.category] || CATEGORY_MAP['도보마실']
  const CategoryIcon = CATEGORY_ICONS[place.category]

  const kakaoMapSearchUrl = `https://map.kakao.com/link/search/${encodeURIComponent(
    place.name
  )}`

  const benefitText = place.oasis_pass_benefit || '마실 어르신 혜택: 현장 대추차/음료 서비스'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        {/* Modal Banner / Image */}
        <div className="modal-header-image" style={{ height: 220, position: 'relative', background: cat.bg }}>
          {place.image_url ? (
            <img src={place.image_url} alt={place.name} className="place-hero-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div className="place-hero-fallback" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, color: cat.ink }}>
              {CategoryIcon ? <CategoryIcon className="hero-icon" /> : '🌿'}
            </div>
          )}
          <div className="modal-header-badge-row" style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 8 }}>
            <span className="cat-pill" style={{ background: cat.badgeBg, color: cat.badgeInk, padding: '4px 12px', borderRadius: 999, fontSize: 13, fontWeight: 800 }}>
              {cat.label}
            </span>
            {place.subcategory && (
              <span className="subcat-pill" style={{ background: 'rgba(0,0,0,0.6)', color: '#FFF', padding: '4px 12px', borderRadius: 999, fontSize: 13 }}>
                {place.subcategory}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="title-row" style={{ marginBottom: 10 }}>
            <h2 style={{ fontSize: 24, margin: 0, color: '#1C1917' }}>{place.name}</h2>
          </div>

          <p className="summary-desc" style={{ fontSize: 16, color: '#44403C', lineHeight: 1.6 }}>{place.description}</p>

          {/* Senior Care Badges */}
          {place.senior_care_tags && (
            <div className="modal-care-tags">
              {place.senior_care_tags.map((tag, idx) => (
                <span key={idx} className="care-badge">
                  ✓ {tag}
                </span>
              ))}
            </div>
          )}

          {/* Oasis Pass Benefit Banner */}
          <div className="oasis-benefit-banner" style={{ background: '#FDF5EC', border: '1.5px solid #EAC8AB', padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0', color: '#944B15', fontWeight: 700 }}>
            <IconGift className="icon" style={{ width: 22, height: 22 }} />
            <span className="benefit-text">{benefitText}</span>
          </div>

          {/* Quick Meta Info Grid */}
          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
            <div className="info-item">
              <span className="label" style={{ fontWeight: 700, color: '#1C1917', display: 'block' }}><IconPin className="icon" /> 주소</span>
              <span className="val" style={{ fontSize: 14.5, color: '#44403C' }}>{place.address || '주소 정보 확인 필요'}</span>
            </div>
            <div className="info-item">
              <span className="label" style={{ fontWeight: 700, color: '#1C1917', display: 'block' }}><IconClock className="icon" /> 이용시간 & 체류</span>
              <span className="val" style={{ fontSize: 14.5, color: '#44403C' }}>{place.hours || '09:00~18:00'} ({place.duration_min}분 추천)</span>
            </div>
            <div className="info-item">
              <span className="label" style={{ fontWeight: 700, color: '#1C1917', display: 'block' }}><IconPrice className="icon" /> 이용 요금</span>
              <span className="val" style={{ fontSize: 14.5, color: '#44403C' }}>{place.price || '무료 이용 / 안내'}</span>
            </div>
            {place.parking_info && (
              <div className="info-item">
                <span className="label" style={{ fontWeight: 700, color: '#1C1917', display: 'block' }}>🚗 주차 / 셔틀</span>
                <span className="val" style={{ fontSize: 14.5, color: '#44403C' }}>{place.parking_info}</span>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          {place.highlights && place.highlights.length > 0 && (
            <div className="section-box highlights-box" style={{ background: '#FDF2E9', border: '1px solid #EAC8AB', padding: 16, borderRadius: 14, margin: '14px 0' }}>
              <h3 style={{ fontSize: 18, color: '#8A4015', marginBottom: 10 }}>✨ 주요 특징 및 편의 시설</h3>
              <ul style={{ paddingLeft: 20, margin: 0, color: '#B85B24' }}>
                {place.highlights.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Senior Tips */}
          {place.senior_tips && (
            <div className="section-box tips-box" style={{ background: '#FFFDF9', border: '1px solid #F3E4D4', padding: 16, borderRadius: 14 }}>
              <h3 style={{ fontSize: 18, color: '#944B15', marginBottom: 6 }}>💡 어르신 나들이 꿀팁</h3>
              <p style={{ margin: 0, fontSize: 14.5, color: '#5C3818' }}>{place.senior_tips}</p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer" style={{ padding: 20, borderTop: '1px solid #E8E2D9', display: 'flex', gap: 12 }}>
          {place.coord && (
            <button
              type="button"
              className="btn-primary"
              style={{ flex: 1 }}
              onClick={() => {
                onSelectOnMap(place.id)
                onClose()
              }}
            >
              마실 코스에 추가하기
            </button>
          )}
          <a
            href={kakaoMapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="section-more-btn"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            카카오맵 보기
          </a>
        </div>
      </div>
    </div>
  )
}
