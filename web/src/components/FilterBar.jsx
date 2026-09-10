import { CATEGORIES, COMPANION_OPTIONS } from '../lib/constants'
import { CATEGORY_ICONS, IconSparkle } from './icons'

const START_OPTIONS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
const WINDOW_OPTIONS = [
  { label: '1시간 (가벼운 마실)', minutes: 60 },
  { label: '2시간 (차 한잔 & 산책)', minutes: 120 },
  { label: '3시간 (여유로운 반나절)', minutes: 180 },
  { label: '4시간 (식사 & 나들이)', minutes: 240 },
  { label: '5시간 (종일 마실)', minutes: 300 },
]

export default function FilterBar({ filters, onChange, onRecommend, recommendDisabled }) {
  const toggleCategory = (key) => {
    const next = new Set(filters.categories)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    onChange({ ...filters, categories: next })
  }

  const toggleFlatOnly = () => {
    onChange({ ...filters, flatOnly: !filters.flatOnly })
  }

  return (
    <div className="filter-bar">
      {/* Line 1: 5개 테마 구분 영역 버튼 */}
      <div className="filter-row filter-row-top">
        <div className="chip-group">
          {CATEGORIES.map((c) => {
            const active = filters.categories.has(c.key)
            const Icon = CATEGORY_ICONS[c.key]
            return (
              <button
                key={c.key}
                type="button"
                className="chip"
                data-active={active}
                style={
                  active
                    ? {
                        background: c.badgeBg,
                        color: c.badgeInk,
                        borderColor: c.badgeBg,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      }
                    : {
                        background: c.bg,
                        color: c.ink,
                        borderColor: c.border,
                        opacity: 0.85,
                      }
                }
                onClick={() => toggleCategory(c.key)}
              >
                {Icon && <Icon className="icon" />}
                <span>{c.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Line 2: 어르신 보행 상태 ~ 맞춤 코스 추천받기 버튼 */}
      <div className="filter-row filter-row-bottom">
        <div className="filter-controls-group">
          <label className="select-field">
            어르신 보행 상태
            <select value={filters.companion} onChange={(e) => onChange({ ...filters, companion: e.target.value })}>
              {COMPANION_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>

          <label className="select-field">
            출발 시각
            <select value={filters.start} onChange={(e) => onChange({ ...filters, start: e.target.value })}>
              {START_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="select-field">
            여유 시간
            <select
              value={filters.windowMinutes}
              onChange={(e) => onChange({ ...filters, windowMinutes: Number(e.target.value) })}
            >
              {WINDOW_OPTIONS.map((w) => (
                <option key={w.minutes} value={w.minutes}>{w.label}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className={`chip ${filters.flatOnly ? 'is-active' : ''}`}
            onClick={toggleFlatOnly}
            style={
              filters.flatOnly
                ? { background: '#594236', color: '#FFF', borderColor: '#594236' }
                : { background: '#F0EDE6', color: '#292524', borderColor: '#E5E0D8' }
            }
            title="지팡이나 휠체어 이용에 편리한 계단 없는 평지/슬로프만 표시"
          >
            <span>👨‍🦯 계단 없는 평지/슬로프 전용</span>
          </button>
        </div>

        <div className="spacer" />
        <button type="button" className="btn-primary" onClick={onRecommend} disabled={recommendDisabled}>
          <IconSparkle className="icon" style={{ width: 20, height: 20 }} />
          어르신 맞춤 코스 추천받기
        </button>
      </div>
    </div>
  )
}
