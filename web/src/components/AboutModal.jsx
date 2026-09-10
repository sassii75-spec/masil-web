import { IconLogo, IconSparkle, IconPin } from './icons'

export default function AboutModal({ onClose, onStartRecommend }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container about-modal-container" onClick={(e) => e.stopPropagation()} style={{ padding: 32 }}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        {/* Hero Header */}
        <div className="about-modal-hero" style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="about-hero-logo" style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 12 }}>
            <IconLogo />
          </div>
          <h2 style={{ fontSize: 30, color: '#8A4015', marginBottom: 8 }}>'마실 (Masil)'이란?</h2>
          <p className="about-tagline" style={{ fontSize: 17, color: '#44403C', lineHeight: 1.6 }}>
            <strong>'마실'</strong>은 이웃에 놀러 다니거나 가볍게 잠깐 외출하는 일을 뜻하는 <strong>정겨운 순우리말(표준어)</strong>입니다.
          </p>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="about-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          <div className="about-value-card" style={{ background: '#FDF2E9', border: '1.5px solid #EAC8AB', padding: 20, borderRadius: 16 }}>
            <div className="value-icon-box" style={{ fontSize: 28, marginBottom: 8 }}>🚶‍♂️</div>
            <h3 style={{ fontSize: 18, color: '#8A4015', marginBottom: 6 }}>1시간 안심 보행 코스</h3>
            <p style={{ fontSize: 14.5, color: '#44403C', margin: 0, lineHeight: 1.5 }}>
              지팡이나 휠체어 이용에도 무리가 없는 <strong>계단 없는 평지 데크길</strong>과 1시간가량 쉬어가는 동선을 추천해 드립니다.
            </p>
          </div>

          <div className="about-value-card" style={{ background: '#FDF5EC', border: '1.5px solid #EAC8AB', padding: 20, borderRadius: 16 }}>
            <div className="value-icon-box" style={{ fontSize: 28, marginBottom: 8 }}>🍵</div>
            <h3 style={{ fontSize: 18, color: '#944B15', marginBottom: 6 }}>속 편한 보양식 & 찻집</h3>
            <p style={{ fontSize: 14.5, color: '#44403C', margin: 0, lineHeight: 1.5 }}>
              속이 편안한 <strong>곤드레 나물 밥상, 토종 삼계탕</strong>과 수제 대추차 다원 쉼터를 검증하여 안내해 드립니다.
            </p>
          </div>

          <div className="about-value-card" style={{ background: '#F5EFE8', border: '1.5px solid #E2D7CB', padding: 20, borderRadius: 16 }}>
            <div className="value-icon-box" style={{ fontSize: 28, marginBottom: 8 }}>🏥</div>
            <h3 style={{ fontSize: 18, color: '#5C442B', marginBottom: 6 }}>복지관 & 데이케어 연동</h3>
            <p style={{ fontSize: 14.5, color: '#44403C', margin: 0, lineHeight: 1.5 }}>
              시·구립 <strong>노인종합복지관, 셔틀버스, 노인주간보호 데이케어센터 및 치매안심센터</strong> 정보를 한눈에 제공합니다.
            </p>
          </div>
        </div>

        {/* Key Impact Stats Badges */}
        <div className="about-stats-row" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
          <div className="stat-badge-item" style={{ background: '#FDF2E9', color: '#8A4015', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 14.5 }}>
            <IconPin className="icon" /> 분당·성남 마실 명소 & 복지관 18+
          </div>
          <div className="stat-badge-item" style={{ background: '#FEF3C7', color: '#92400E', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 14.5 }}>
            <IconSparkle className="icon" /> 1초 만에 어르신 맞춤 동선 조합
          </div>
        </div>

        {/* Modal Action CTA */}
        <div className="about-modal-footer">
          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: 19 }}
            onClick={() => {
              onClose()
              if (onStartRecommend) onStartRecommend()
            }}
          >
            <IconSparkle className="icon" />
            지금 어르신 맞춤 마실 코스 추천받기
          </button>
        </div>
      </div>
    </div>
  )
}
