import { useState } from 'react'
import { CATEGORY_MAP } from '../lib/constants'
import { CATEGORY_ICONS, IconGift, IconSparkle } from './icons'

export default function CourseRecommendationModal({ courses, onConfirmCourse, onClose }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!courses || courses.length === 0) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container course-modal-container" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="modal-close-btn" onClick={onClose}>✕</button>
          <div className="empty-state" style={{ padding: 40, textAlign: 'center' }}>
            선택한 조건에 알맞은 어르신 마실 코스를 만들지 못했습니다. <br />
            여유 시간을 늘리거나 카테고리를 더 선택해 주세요.
          </div>
        </div>
      </div>
    )
  }

  const currentCourse = courses[selectedIndex] || courses[0]

  const optionThemes = [
    { title: '🌿 코스 1: 🚶‍♂️ 숲길 산책 & 다원 힐링 코스', badge: '강력추천', desc: '평지 숲길 산책과 국산 한방 차 한 잔' },
    { title: '🚗 코스 2: 🚗 호수 드라이브 & 건강 한식 코스', badge: '여유형', desc: '율동 호수 드라이브와 속 편한 곤드레 밥상' },
    { title: '🏥 코스 3: ⏱️ 복지관 강좌 & 1시간 숏 마실', badge: '알짜배기', desc: '어르신 복지관 교양 강좌 후 정원 쉼터' },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container course-modal-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        {/* Modal Header */}
        <div className="course-modal-header">
          <div className="course-modal-title">
            <IconSparkle className="title-sparkle-icon" />
            <h2>어르신 맞춤 마실 코스 추천</h2>
          </div>
          <p className="course-modal-sub">
            원하는 마실 코스를 선택하신 후 <strong>"이 마실 코스로 확정하기"</strong>를 눌러 지도와 타임라인을 확인하세요.<br />
            <span className="summary-budget-pill">
              ⏱️ 소요시간: 약 {Math.floor(currentCourse.totalMinutes / 60)}시간 {currentCourse.totalMinutes % 60}분 &nbsp;|&nbsp; 🚶‍♂️ 걸음수: 약 {currentCourse.estimatedStepsCount || '1,800'}보 &nbsp;|&nbsp; 💰 총 예산: {currentCourse.estimatedCostText}
            </span>
          </p>

          {/* Course Options Tabs */}
          <div className="course-option-tabs">
            {courses.slice(0, 3).map((c, idx) => {
              const theme = optionThemes[idx] || { title: `코스 ${idx + 1}`, badge: '추천' }
              const isSelected = idx === selectedIndex
              const hours = Math.floor(c.totalMinutes / 60)
              const mins = Math.round(c.totalMinutes % 60)
              const timeStr = hours > 0 ? `${hours}시간 ${mins > 0 ? `${mins}분` : ''}` : `${mins}분`
              return (
                <button
                  key={c.id || idx}
                  type="button"
                  className={`course-tab-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedIndex(idx)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 14,
                    border: isSelected ? '2px solid #B85B24' : '1.5px solid #E8E2D9',
                    background: isSelected ? '#FDF2E9' : '#FFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span className="tab-theme-badge" style={{ background: '#B85B24', color: '#FFF', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
                    {theme.badge}
                  </span>
                  <div className="tab-title" style={{ fontWeight: 800, fontSize: 16, marginTop: 4, color: '#8A4015' }}>
                    {theme.title}
                  </div>
                  <span className="tab-meta" style={{ fontSize: 13, color: '#44403C' }}>⏱️ {timeStr} · {c.estimatedCostText}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3-Stop Cards Flow */}
        <div className="course-modal-body">
          <div className="three-stop-cards-row">
            {currentCourse.steps.map((step, sIdx) => {
              const place = step.place
              const cat = CATEGORY_MAP[place.category] || CATEGORY_MAP['도보마실']
              const Icon = CATEGORY_ICONS[place.category]
              const cardColorClass = sIdx === 0 ? 'card-orange' : sIdx === 1 ? 'card-orange' : 'card-blue'
              const isLast = sIdx === currentCourse.steps.length - 1

              return (
                <div key={place.id} className="stop-card-wrapper" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className={`stop-card ${cardColorClass}`} style={{ flex: 1, borderTop: '6px solid #B85B24' }}>
                    <div className="stop-card-head" style={{ marginBottom: 10 }}>
                      <div className="icon-circle" style={{ fontSize: 24, marginBottom: 4 }}>
                        {Icon ? <Icon className="icon" /> : '📍'}
                      </div>
                      <h4 className="stop-title" style={{ fontSize: 18, color: '#1C1917' }}>
                        Stop {sIdx + 1}: {place.name}
                      </h4>
                      <div className="stop-duration" style={{ fontSize: 14, color: '#78716C' }}>
                        ⏰ ({place.duration_min || 60}분 체류)
                      </div>
                    </div>

                    {place.oasis_pass_benefit && (
                      <div className="stop-benefit-badge" style={{ background: '#FDF5EC', border: '1px solid #EAC8AB', color: '#944B15', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                        <IconGift className="icon" /> 혜택: {place.oasis_pass_benefit}
                      </div>
                    )}

                    <p className="stop-desc" style={{ fontSize: 14.5, color: '#44403C', lineHeight: 1.5 }}>
                      {place.description || `${place.category} 추천 장소입니다.`}
                    </p>
                  </div>

                  {!isLast && (
                    <div className="stop-arrow" style={{ fontSize: 20, color: '#B85B24', fontWeight: 800 }}>
                      ➔
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Modal Footer Confirm Action */}
        <div className="course-modal-footer" style={{ marginTop: 24 }}>
          <button
            type="button"
            className="btn-confirm-course"
            onClick={() => {
              onConfirmCourse(selectedIndex)
              onClose()
            }}
          >
            <IconSparkle className="icon" />
            이 마실 코스로 확정하기 (지도 & 타임라인 보기)
          </button>
        </div>
      </div>
    </div>
  )
}
