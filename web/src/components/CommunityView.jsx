import { useState } from 'react'
import { IconPin, IconUser, IconGift, IconSparkle } from './icons'

const SAMPLE_POSTS = [
  {
    id: 'post-1',
    category: '마실 산책 생생 후기',
    title: '율동공원 호수산책로 오전 10시 마실 다녀왔어요! 벤치 쉼터 꿀팁 🌳',
    author: '정자동 이어르신',
    locationBadge: '📍 분당구 정자동 인증',
    seniorInfo: '70대 어르신 / 지팡이 보행',
    date: '2시간 전',
    summary: 'A주차장에 차 대고 데크 산책로 둘러봤는데 계단이 하나도 없어 무릎 부담이 전혀 없네요. 호수를 조망하는 그늘 벤치에서 따뜻한 차 한 잔 나누기 좋습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    likes: 42,
    comments: 12,
    views: 380,
    tags: ['#율동공원', '#평지산책로', '#그늘벤치', '#주차3시간무료'],
    oasisPass: '🎁 마실 혜택: 찻집 10% 할인 쿠폰',
  },
  {
    id: 'post-2',
    category: '복지관 & 교양강좌 후기',
    title: '분당 정자노인종합복지관 스마트폰 교실 후기! 셔틀버스가 편해요 🏥',
    author: '수내동 박어르신',
    locationBadge: '📍 분당구 수내동 인증',
    seniorInfo: '60대 실버 / 셔틀 이용',
    date: '5시간 전',
    summary: '오늘 복지관에서 카카오톡 글씨 크게 보는법 배웠는데 아주 유용합니다. 정자역에서 셔틀버스가 자주 다녀서 다리 불편한 날도 걱정이 없네요.',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    likes: 89,
    comments: 24,
    views: 850,
    tags: ['#정자노인복지관', '#스마트폰강좌', '#셔틀버스운행', '#경로식당'],
    oasisPass: '🎁 마실 혜택: 기초 혈압/혈당 무료 측정',
  },
  {
    id: 'post-3',
    category: '보양 한식 & 찻집',
    title: '백현동 곤드레 밥상 다녀왔어요. 속 편안하고 무릎 안 아픈 높낮이 의자 🍵',
    author: '구미동 김보호자',
    locationBadge: '📍 분당구 구미동 인증',
    seniorInfo: '부모님 모시고 마실',
    date: '어제',
    summary: '80대 어머니 모시고 점심 드시러 갔는데 자극적인 양념이 없어 속이 무척 편하다고 하십니다. 좌식이 아닌 높은 입식 테이블이라 무릎 안 아파하셔서 흐뭇했습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    likes: 128,
    comments: 31,
    views: 1420,
    tags: ['#곤드레밥상', '#속편한한식', '#입식테이블', '#발렛주차'],
    oasisPass: '🎁 마실 혜택: 구수한 숭늉 무료 추가',
  },
  {
    id: 'post-4',
    category: '데이케어 & 주간보호',
    title: '분당 데이케어센터 무료 방문 상담 다녀온 솔직 후기 공유합니다 🏥',
    author: '야탑동 박보호자',
    locationBadge: '📍 분당구 야탑동 인증',
    seniorInfo: '보호자 상담',
    date: '1일 전',
    summary: '아버님 장기요양 등급 신청과 주간보호 송영(픽업) 차량 관련해서 데이케어센터 방문했습니다. 원장님과 간호사분이 친절하게 절차를 알려주셔서 마음이 편해졌네요.',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    likes: 54,
    comments: 15,
    views: 620,
    tags: ['#데이케어센터', '#장기요양등급', '#송영서비스', '#치매안심'],
  },
]

export default function CommunityView({ userLocation, onOpenDetail }) {
  const [activeCat, setActiveCat] = useState('전체')
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [writeTitle, setWriteTitle] = useState('')
  const [writeContent, setWriteContent] = useState('')

  const categories = ['전체', '마실 산책 생생 후기', '복지관 & 교양강좌 후기', '보양 한식 & 찻집', '데이케어 & 주간보호']

  const filteredPosts = activeCat === '전체'
    ? SAMPLE_POSTS
    : SAMPLE_POSTS.filter((p) => p.category === activeCat)

  const toggleLike = (id) => {
    const next = new Set(likedPosts)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setLikedPosts(next)
  }

  return (
    <div className="community-view" style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      {/* Neighborhood Location Verification Banner */}
      <div className="location-verify-banner" style={{ background: '#FDF2E9', border: '1.5px solid #EAC8AB', padding: 24, borderRadius: 18, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="verify-left">
          <div className="verify-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#B85B24', color: '#FFF', padding: '4px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
            <IconPin className="icon" />
            <span>{userLocation?.addressName || '현재 위치 (분당구 정자동)'} 위치 인증</span>
          </div>
          <h2 style={{ fontSize: 24, color: '#8A4015', margin: '0 0 6px' }}>우리 동네 이웃 어르신 & 보호자 생생 이야기</h2>
          <p style={{ margin: 0, fontSize: 15, color: '#44403C' }}>분당·성남 이웃 어르신들이 전해주는 산책길 후기, 복지관 강좌 꿀팁, 속 편한 찻집 정보입니다.</p>
        </div>
        <div className="verify-right">
          <button type="button" className="btn-primary" onClick={() => setShowWriteModal(true)}>
            ✏️ 마실 이야기 글쓰기
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="community-cat-bar" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="chip"
            style={{
              background: activeCat === cat ? '#B85B24' : '#FFFFFF',
              color: activeCat === cat ? '#FFFFFF' : '#1C1917',
              border: '1.5px solid #E8E2D9',
            }}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Post Feed Grid */}
      <div className="community-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {filteredPosts.map((post) => {
          const isLiked = likedPosts.has(post.id)
          return (
            <article key={post.id} className="blog-card" style={{ background: '#FFFFFF', border: '1.5px solid #E8E2D9', borderRadius: 16, overflow: 'hidden' }}>
              <div className="blog-card-thumb" style={{ height: 160, position: 'relative' }}>
                <img src={post.imageUrl} alt={post.title} className="blog-thumb-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="blog-cat-badge" style={{ position: 'absolute', top: 12, left: 12, background: '#B85B24', color: '#FFF', padding: '4px 10px', borderRadius: 6, fontSize: 12.5, fontWeight: 700 }}>
                  {post.category}
                </span>
              </div>

              <div className="blog-card-body" style={{ padding: 18 }}>
                <div className="blog-author-row" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div className="author-avatar" style={{ width: 34, height: 34, borderRadius: 999, background: '#FDF2E9', color: '#B85B24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconUser className="icon" />
                  </div>
                  <div className="author-info">
                    <div className="author-name-row" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span className="author-name" style={{ fontWeight: 700, fontSize: 14 }}>{post.author}</span>
                      <span className="location-badge" style={{ fontSize: 12, color: '#78716C' }}>{post.locationBadge}</span>
                    </div>
                    <span className="senior-info" style={{ fontSize: 12, color: '#D97706', fontWeight: 600 }}>{post.seniorInfo} · {post.date}</span>
                  </div>
                </div>

                <h3 className="blog-title" style={{ fontSize: 17, color: '#1C1917', marginBottom: 8, lineHeight: 1.4 }}>{post.title}</h3>
                <p className="blog-summary" style={{ fontSize: 14, color: '#44403C', lineHeight: 1.5, marginBottom: 12 }}>{post.summary}</p>

                <div className="blog-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E8E2D9', paddingTop: 10 }}>
                  <button
                    type="button"
                    className="btn-like"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: isLiked ? '#E11D48' : '#78716C' }}
                    onClick={() => toggleLike(post.id)}
                  >
                    ❤️ 공감 {post.likes + (isLiked ? 1 : 0)}
                  </button>
                  <span style={{ fontSize: 13, color: '#78716C' }}>💬 댓글 {post.comments}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Write Post Modal */}
      {showWriteModal && (
        <div className="modal-overlay" onClick={() => setShowWriteModal(false)}>
          <div className="modal-container write-modal-container" onClick={(e) => e.stopPropagation()} style={{ padding: 28, maxWidth: 540 }}>
            <button type="button" className="modal-close-btn" onClick={() => setShowWriteModal(false)}>✕</button>
            <div className="write-modal-header" style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 20, color: '#8A4015', margin: '0 0 4px' }}>✏️ 마실 나들이 이야기 쓰기</h3>
              <span className="verified-pill" style={{ fontSize: 13, color: '#B85B24' }}>📍 {userLocation?.addressName || '정자동'} 위치 인증 상태로 공유됩니다.</span>
            </div>

            <div className="write-form" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label className="form-label" style={{ fontWeight: 700, fontSize: 14, color: '#1C1917' }}>
                제목
                <input
                  type="text"
                  placeholder="예: 율동공원 데크 산책로 벤치 위치 꿀팁 공유!"
                  style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #E8E2D9', marginTop: 4, fontSize: 15 }}
                  value={writeTitle}
                  onChange={(e) => setWriteTitle(e.target.value)}
                />
              </label>

              <label className="form-label" style={{ fontWeight: 700, fontSize: 14, color: '#1C1917' }}>
                이야기 내용
                <textarea
                  rows={5}
                  placeholder="어르신들이 다녀오시기 좋은 산책길 경사도, 주차 편의, 복지관 셔틀이나 찻집 소식을 자유롭게 나누어 보세요."
                  style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #E8E2D9', marginTop: 4, fontSize: 15 }}
                  value={writeContent}
                  onChange={(e) => setWriteContent(e.target.value)}
                />
              </label>

              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', padding: 12, fontSize: 17 }}
                onClick={() => {
                  alert('성공적으로 마실 게시글이 등록되었습니다!')
                  setShowWriteModal(false)
                  setWriteTitle('')
                  setWriteContent('')
                }}
              >
                마실 이야기 등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
