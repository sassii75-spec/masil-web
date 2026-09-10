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
    { title: '코스 1: 복지관 강좌 & 숏 마실', badge: '최우선 추천' },
    { title: '코스 2: 숲길 산책 & 다원 힐링', badge: '여유형' },
    { title: '코스 3: 호수 드라이브 & 한식', badge: '알짜배기' },
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
            <span className="summary-budget-pill" style={{ display: 'inline-block', marginTop: 8 }}>
              ⏱️ 소요시간: 약 {Math.floor(currentCourse.totalMinutes / 60)}시간 {currentCourse.totalMinutes % 60}분 &nbsp;|&nbsp; 🚶‍♂️ 걸음수: 약 {currentCourse.estimatedStepsCount || '1,800'}보 &nbsp;|&nbsp; 💰 총 예산: {currentCourse.estimatedCostText}
            </span>
          </p>

          {/* Course Options Tabs (Single 1-Row 3-Grid Layout) */}
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
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: isSelected ? '2px solid #B85B24' : '1.5px solid #E8E2D9',
                    background: isSelected ? '#FDF2E9' : '#FFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span className="tab-theme-badge" style={{ background: isSelected ? '#B85B24' : '#78716C', color: '#FFF', padding: '2px 8px', borderRadius: 4, fontSize: 11.5, fontWeight: 700 }}>
                      {theme.badge}
                    </span>
                    <span style={{ fontSize: 13, color: '#57534E', fontWeight: 600 }}>⏱️ {timeStr}</span>
                  </div>
                  <div className="tab-title" style={{ fontWeight: 800, fontSize: 15.5, color: isSelected ? '#8A4015' : '#1C1917', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {theme.title}
                  </div>
                  <span className="tab-meta" style={{ fontSize: 12.5, color: '#78716C', display: 'block', marginTop: 2 }}>💰 예산: {c.estimatedCostText}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3-Stop Cards Flow */}
        <div className="course-modal-body">
          <div className="three-stop-cards-row" style={{ display: 'flex', alignItems: 'stretch', gap: 16, margin: '20px 0' }}>
            {currentCourse.steps.map((step, sIdx) => {
              const place = step.place
              const Icon = CATEGORY_ICONS[place.category]
              const cardColorClass = sIdx === 0 ? 'card-blue' : sIdx === 1 ? 'card-green' : 'card-orange'
              const isLast = sIdx === currentCourse.steps.length - 1

              const bgMap = {
                'card-blue': { bg: '#EBF1F7', border: '#C8D8E6', ink: '#1F384C' },
                'card-green': { bg: '#F2F4EE', border: '#CAD9CC', ink: '#27402B' },
                'card-orange': { bg: '#FDF2E9', border: '#EAC8AB', ink: '#8A4015' },
              }
              const styleTheme = bgMap[cardColorClass]

              return (
                <div key={place.id} className="stop-card-wrapper" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    className={`stop-card ${cardColorClass}`}
                    style={{
                      flex: 1,
                      background: styleTheme.bg,
                      border: `1.5px solid ${styleTheme.border}`,
                      borderRadius: 20,
                      padding: '24px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: 250,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div className="stop-card-head" style={{ textAlign: 'center', marginBottom: 12 }}>
                      <div
                        className="icon-circle"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: '#FFFFFF',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 10,
                          fontSize: 22,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                          color: styleTheme.ink,
                        }}
                      >
                        {Icon ? <Icon className="icon" style={{ width: 22, height: 22 }} /> : '📍'}
                      </div>
                      <h4 className="stop-title" style={{ fontSize: 18, fontWeight: 800, color: '#1C1917', margin: '0 0 6px' }}>
                        Stop {sIdx + 1}: {place.name}
                      </h4>
                      <div className="stop-duration" style={{ fontSize: 13.5, fontWeight: 700, color: '#57534E' }}>
                        ⏰ ({place.duration_min || 60}분 {sIdx === 1 ? '식사/휴식' : '체류'})
                      </div>
                    </div>

                    {place.oasis_pass_benefit && (
                      <div
                        className="stop-benefit-badge"
                        style={{
                          background: '#FEF08A',
                          color: '#854D0E',
                          padding: '6px 14px',
                          borderRadius: 999,
                          fontSize: 13,
                          fontWeight: 800,
                          margin: '10px auto',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          textAlign: 'center',
                        }}
                      >
                        <IconGift className="icon" style={{ width: 14, height: 14 }} /> 마실 혜택: {place.oasis_pass_benefit}
                      </div>
                    )}

                    <p className="stop-desc" style={{ fontSize: 14, color: '#44403C', lineHeight: 1.5, margin: '8px 0 0', textAlign: 'center' }}>
                      {place.description || `${place.category} 추천 장소입니다.`}
                    </p>
                  </div>

                  {!isLast && (
                    <div className="stop-arrow" style={{ fontSize: 24, color: '#B85B24', fontWeight: 900 }}>
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
