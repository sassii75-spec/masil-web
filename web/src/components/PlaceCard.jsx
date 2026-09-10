import { CATEGORY_MAP } from '../lib/constants'
import { CATEGORY_ICONS, IconClock, IconPrice, IconGift } from './icons'

export default function PlaceCard({ place, selected, onSelect, onOpenDetail }) {
  const cat = CATEGORY_MAP[place.category] || CATEGORY_MAP['도보마실']
  const Icon = CATEGORY_ICONS[place.category]

  return (
    <div
      className="place-card"
      data-selected={selected}
      onClick={() => {
        onSelect(place.id)
        if (onOpenDetail) onOpenDetail(place)
      }}
      style={{
        border: selected ? '2px solid #2E5A36' : '1.5px solid #E2DDD5',
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        background: selected ? '#F4F8F4' : '#FFFFFF',
        cursor: 'pointer',
        boxShadow: selected ? '0 4px 12px rgba(46,90,54,0.15)' : 'none',
      }}
    >
      {/* Real Place Image Thumbnail */}
      <div className="thumb-wrapper" style={{ height: 140, overflow: 'hidden', borderRadius: 10, marginBottom: 10, background: cat.bg, position: 'relative' }}>
        {place.image_url ? (
          <img
            src={place.image_url}
            alt={place.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none'
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: place.image_url ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            color: cat.ink,
          }}
        >
          {Icon ? <Icon className="icon" /> : '🌿'}
        </div>
        <span className="cat-pill" style={{ position: 'absolute', top: 8, left: 8, background: cat.badgeBg, color: cat.badgeInk, padding: '2px 8px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
          {cat.label}
        </span>
      </div>

      <div className="row1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <h4 style={{ margin: 0, fontSize: 18, color: '#1F2937', fontWeight: 700 }}>{place.name}</h4>
        <button
          type="button"
          className="section-more-btn"
          style={{ padding: '4px 10px', fontSize: 12.5 }}
          onClick={(e) => {
            e.stopPropagation()
            if (onOpenDetail) onOpenDetail(place)
          }}
        >
          상세보기
        </button>
      </div>

      {place.senior_care_tags && (
        <div className="care-tags-row" style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
          {place.senior_care_tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="senior-care-tag-pill" style={{ fontSize: 12, background: '#F2EFE9', color: '#1E3F24', border: '1px solid #D8D2C6', padding: '2px 6px', borderRadius: 4 }}>
              ✓ {tag}
            </span>
          ))}
        </div>
      )}

      {place.oasis_pass_benefit && (
        <div style={{ background: '#FDF5EC', color: '#944B15', padding: '4px 8px', borderRadius: 6, fontSize: 12.5, fontWeight: 700, marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <IconGift className="icon" style={{ width: 14, height: 14 }} /> {place.oasis_pass_benefit}
        </div>
      )}

      <div className="meta" style={{ display: 'flex', gap: 10, fontSize: 13, color: '#6B7280' }}>
        <span><IconClock className="icon" /> {place.duration_min ? `${place.duration_min}분 체류` : '시간 안내'}</span>
        {place.price && <span><IconPrice className="icon" /> {place.price}</span>}
      </div>

      {place.description && <p className="desc" style={{ fontSize: 13.5, color: '#4B5563', marginTop: 6, marginBottom: 0, lineHeight: 1.4 }}>{place.description}</p>}
    </div>
  )
}
