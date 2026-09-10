// Stage 3 — 마실(Masil) 어르신 맞춤 1시간/반나절 코스 추천 엔진
import { ACTIVITY_CATEGORIES, REST_CATEGORIES } from './constants'

const AVG_SPEED_KMH = 20 // 어르신 운전/이동 속도 고려
const MIN_TRAVEL_MIN = 5

function haversineKm(a, b) {
  if (!a || !b || a.lat == null || b.lat == null) return 0
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function travelMinutes(a, b) {
  const km = haversineKm(a, b)
  return Math.max(MIN_TRAVEL_MIN, Math.round((km / AVG_SPEED_KMH) * 60))
}

function fmtTime(startMinutesOfDay, offset) {
  const total = startMinutesOfDay + offset
  const h = Math.floor(total / 60) % 24
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function estimateCourseCost(steps) {
  let minCost = 0
  let maxCost = 0

  for (const s of steps) {
    const p = s.place
    const priceStr = p.price || ''
    if (priceStr.includes('무료')) {
      // 0원
    } else if (p.category === '보양·전통찻집') {
      minCost += 15000
      maxCost += 30000
    } else if (p.category === '1시간마실') {
      minCost += 7000
      maxCost += 12000
    } else if (p.category === '복지관·데이케어') {
      minCost += 3000
      maxCost += 10000
    } else {
      minCost += 5000
      maxCost += 15000
    }
  }

  if (maxCost === 0) return '무료입장 / 이용'
  const minMan = Math.floor(minCost / 10000)
  const maxMan = Math.ceil(maxCost / 10000)
  if (minMan === 0) return `약 ${maxCost.toLocaleString()}원 이내`
  return `약 ${minMan}~${maxMan}만원대`
}

/**
 * @param {Array} places 장소 목록
 * @param {Object} opts
 */
export function buildCourses(places, opts = {}) {
  const {
    startMinutes = 600,
    windowMinutes = 180,
    userCoord,
    startLocationName,
    count = 3,
  } = opts

  let pool = places.filter((p) => p && p.coord)

  if (pool.length === 0 && places && places.length > 0) {
    pool = places.map((p, idx) => ({
      ...p,
      coord: p.coord || { lat: 37.3614 + idx * 0.003, lng: 127.1114 + idx * 0.003 },
    }))
  }

  if (pool.length === 0) return []

  const originCoord = userCoord || { lat: 37.3614, lng: 127.1114 }

  const poolWithDist = pool
    .map((p) => ({
      place: p,
      distKm: haversineKm(originCoord, p.coord),
    }))
    .sort((a, b) => a.distKm - b.distKm)

  const sortedPlaces = poolWithDist.map((pd) => pd.place)

  const rawCourses = []

  for (let i = 0; i < Math.min(sortedPlaces.length, 6); i++) {
    const primary = sortedPlaces[i]
    const initialTravel = travelMinutes(originCoord, primary.coord)
    const initialDist = haversineKm(originCoord, primary.coord)
    const primaryDuration = primary.duration_min || 60

    const steps = [
      {
        place: primary,
        arriveOffset: initialTravel,
        durationMin: primaryDuration,
        travelMinFromPrev: initialTravel,
        distanceKmFromPrev: Math.round(initialDist * 10) / 10,
      },
    ]

    let cursorOffset = initialTravel + primaryDuration
    let cursorPlace = primary
    let totalDistance = initialDist
    let remaining = Math.max(20, windowMinutes - cursorOffset)

    const maxStops = windowMinutes >= 300 ? 4 : windowMinutes >= 180 ? 3 : 2

    while (steps.length < maxStops && remaining >= 15) {
      let candidates = sortedPlaces.filter(
        (item) => !steps.some((s) => s.place.id === item.id)
      )

      if (candidates.length === 0) break

      const isRestTurn = steps.length % 2 === 1
      const preferred = candidates.filter((item) =>
        isRestTurn
          ? REST_CATEGORIES.includes(item.category)
          : ACTIVITY_CATEGORIES.includes(item.category)
      )

      const targetPool = preferred.length > 0 ? preferred : candidates

      const sortedCandidates = targetPool
        .map((item) => ({
          place: item,
          distanceKm: haversineKm(cursorPlace.coord, item.coord),
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm)

      const pick = sortedCandidates[0]
      const travel = travelMinutes(cursorPlace.coord, pick.place.coord)
      const dur = pick.place.duration_min || 60

      cursorOffset += travel
      steps.push({
        place: pick.place,
        arriveOffset: cursorOffset,
        durationMin: dur,
        travelMinFromPrev: travel,
        distanceKmFromPrev: Math.round(pick.distanceKm * 10) / 10,
      })
      cursorOffset += dur
      remaining -= travel + dur
      totalDistance += pick.distanceKm
      cursorPlace = pick.place
    }

    // 어르신 권장 걸음수 계산 (1분당 약 70보)
    const estimatedSteps = Math.round(
      steps.reduce((acc, s) => acc + (s.place.duration_min || 45) * 20, 0)
    )

    rawCourses.push({
      id: `course-${primary.id}-${i}`,
      startLocation: originCoord,
      startLocationName: startLocationName || '현재 위치',
      steps,
      totalMinutes: cursorOffset,
      totalDistanceKm: Math.round(totalDistance * 10) / 10,
      estimatedCostText: estimateCourseCost(steps),
      estimatedStepsCount: estimatedSteps,
      startMinutes,
    })

    if (rawCourses.length >= count * 2) break
  }

  const finalCourses = rawCourses.slice(0, count).map((c, idx) => ({
    ...c,
    id: `course-opt-${idx + 1}`,
    steps: c.steps.map((s) => ({
      ...s,
      startLabel: fmtTime(c.startMinutes, s.arriveOffset),
      endLabel: fmtTime(c.startMinutes, s.arriveOffset + s.durationMin),
    })),
    startLabel: fmtTime(c.startMinutes, 0),
    endLabel: fmtTime(c.startMinutes, c.totalMinutes),
  }))

  return finalCourses
}
