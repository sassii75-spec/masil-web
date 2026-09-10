// 카카오맵 JS SDK를 동적으로 로드한다. autoload=false 로 불러온 뒤
// kakao.maps.load(callback) 로 초기화 시점을 직접 제어하는 공식 권장 패턴을 사용한다.
// 참고: https://apis.map.kakao.com/web/guide/

let loadingPromise = null

export function loadKakaoMaps() {
  if (loadingPromise) return loadingPromise

  loadingPromise = new Promise((resolve, reject) => {
    const initSdk = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => resolve(window.kakao))
      } else {
        reject(new Error('카카오맵 SDK 초기화 실패'))
      }
    }

    if (window.kakao && window.kakao.maps) {
      initSdk()
      return
    }

    const appKey = import.meta.env.VITE_KAKAO_JS_KEY || '9c8f5fbad231c8e09fc24e451dff1f5e'
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`
    script.async = true
    script.onload = initSdk
    script.onerror = () => reject(new Error('카카오맵 SDK 스크립트를 불러오지 못했습니다.'))
    document.head.appendChild(script)
  })

  return loadingPromise
}
