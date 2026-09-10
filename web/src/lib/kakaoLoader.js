// 카카오맵 JS SDK를 동적으로 로드한다. autoload=false 로 불러온 뒤
// kakao.maps.load(callback) 로 초기화 시점을 직접 제어하는 공식 권장 패턴을 사용한다.
// 참고: https://apis.map.kakao.com/web/guide/

let loadingPromise = null

export function loadKakaoMaps() {
  if (window.kakao && window.kakao.maps && typeof window.kakao.maps.load === 'function') {
    return new Promise((resolve) => {
      window.kakao.maps.load(() => resolve(window.kakao))
    })
  }

  if (loadingPromise) return loadingPromise

  const appKey = import.meta.env.VITE_KAKAO_JS_KEY || '9c8f5fbad231c8e09fc24e451dff1f5e'

  loadingPromise = new Promise((resolve, reject) => {
    // 이전 오래된/중단된 스크립트 태그가 있다면 제거
    const oldScript = document.getElementById('kakao-map-sdk')
    if (oldScript) {
      oldScript.remove()
    }

    const script = document.createElement('script')
    script.id = 'kakao-map-sdk'
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`
    script.async = true

    const timeoutTimer = setTimeout(() => {
      loadingPromise = null
      reject(new Error('카카오 지도 SDK 응답 시간 초과 (카카오 Developers 도메인 등록 상태를 확인해주세요)'))
    }, 8000)

    script.onload = () => {
      clearTimeout(timeoutTimer)
      if (window.kakao && window.kakao.maps && typeof window.kakao.maps.load === 'function') {
        window.kakao.maps.load(() => resolve(window.kakao))
      } else {
        loadingPromise = null
        reject(new Error('카카오맵 SDK 초기화 실패'))
      }
    }

    script.onerror = () => {
      clearTimeout(timeoutTimer)
      loadingPromise = null
      reject(new Error('카카오맵 SDK 스크립트 로드 실패. 카카오 디벨로퍼스 도메인 및 앱 키를 확인하세요.'))
    }

    document.head.appendChild(script)
  })

  return loadingPromise
}
