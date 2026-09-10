import { CATEGORY_MAP } from '../lib/constants'
import { CATEGORY_ICONS } from './icons'

function CourseCard({ course, index, selected, onSelectCourse, onOpenDetail }) {
  const firstStep = course.steps[0]
  const lastStep = course.steps[course.steps.length - 1]
  const navUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
    lastStep.place.name
  )},${lastStep.place.coord?.lat || ''},${lastStep.place.coord?.lng || ''}`

  return (
    <div
      className={`edge-course-card ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelectCourse && onSelectCourse(index)}
      style={{
        border: selected ? '2px solid #B85B24' : '1.5px solid #E8E2D9',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        background: selected ? '#FDF2E9' : '#FFFFFF',
        cursor: 'pointer',
      }}
    >
      {/* Course Header */}
      <div className="edge-course-head" style={{ marginBottom: 12 }}>
        <div className="head-title-group" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="course-badge" style={{ background: '#B85B24', color: '#FFF', padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: 13 }}>
            마실 코스 {index + 1}
          </span>
          <span className="course-summary-pill" style={{ fontSize: 13, color: '#44403C', fontWeight: 600 }}>
            {course.steps.length}곳 순회
          </span>
        </div>
        <div className="course-total-stat" style={{ fontSize: 13.5, color: '#1C1917', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span>⏱️ 총 {Math.floor(course.totalMinutes / 60)}시간 {Math.round(course.totalMinutes % 60)}분</span>
          <span>🚶‍♂️ 약 {course.estimatedStepsCount || '1,800'}보</span>
          <span>💰 {course.estimatedCostText || '예산 산출'}</span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="edge-timeline" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Origin */}
        <div className="edge-origin-card" style={{ background: '#FDF2E9', padding: '8px 12px', borderRadius: 10, fontSize: 13.5, color: '#8A4015', fontWeight: 700 }}>
          📍 출발: {course.startLocationName || '현재 위치'} ({course.startLabel || '10:00'})
        </div>

        {course.steps.map((s, i) => {
          const cat = CATEGORY_MAP[s.place.category] || CATEGORY_MAP['도보마실']
          const Icon = CATEGORY_ICONS[s.place.category]

          return (
            <div
              key={s.place.id}
              className="edge-place-card"
              onClick={(e) => {
                e.stopPropagation()
                if (onSelectCourse) onSelectCourse(index)
                if (onOpenDetail) onOpenDetail(s.place)
              }}
              style={{
                border: '1.5px solid #E8E2D9',
                borderRadius: 12,
                padding: 12,
                background: '#FFFFFF',
              }}
            >
              <div className="name-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <h5 style={{ margin: 0, fontSize: 16, color: '#1C1917' }}>
                  Stop {i + 1}: {s.place.name}
                </h5>
                <span className="time-badge" style={{ fontSize: 12.5, color: '#B85B24', fontWeight: 700 }}>
                  {s.startLabel}~{s.endLabel}
                </span>
              </div>
              <div className="address-text" style={{ fontSize: 13, color: '#78716C', marginBottom: 6 }}>
                📍 {s.place.address || s.place.region}
              </div>
              <div className="cat-tag-row" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span className="cat-micro-tag" style={{ background: cat.bg, color: cat.ink, padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
                  {cat.label}
                </span>
                <span className="duration-tag" style={{ fontSize: 12, color: '#44403C' }}>
                  {s.place.duration_min}분 체류
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation CTA */}
      <div className="edge-bottom-cta" style={{ marginTop: 14 }}>
        <a
          href={navUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'block', textAlign: 'center', width: '100%', textDecoration: 'none', padding: '10px', fontSize: 15 }}
          onClick={(e) => e.stopPropagation()}
        >
          🚗 길찾기 (카카오맵)
        </a>
      </div>
    </div>
  )
}

export default function CourseTimeline({ courses, selectedCourseIndex, onSelectCourse, onOpenDetail }) {
  if (!courses) {
    return (
      <div className="empty-state" style={{ padding: 24, textAlign: 'center', color: '#78716C' }}>
        상단에서 이동 수단, 여유 시간을 선택하신 후<br />
        <strong>“어르신 맞춤 코스 추천받기”</strong>를 눌러보세요.
      </div>
    )
  }
  if (courses.length === 0) {
    return <div className="empty-state" style={{ padding: 24, textAlign: 'center' }}>조건에 알맞은 마실 코스를 찾지 못했습니다.</div>
  }
  return (
    <div className="course-timeline-list">
      {courses.map((c, i) => (
        <CourseCard
          key={c.id}
          course={c}
          index={i}
          selected={i === selectedCourseIndex}
          onSelectCourse={onSelectCourse}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  )
}
