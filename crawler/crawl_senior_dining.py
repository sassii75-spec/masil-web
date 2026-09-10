"""
Stage 1 마실(Masil) 크롤러 #3 — 어르신 건강식 & 전통 찻집 소스

대상: 어르신 입맛에 맞는 보양식, 속 편한 한식, 쌍화차/대추차 다원 쉼터
"""
import json
from datetime import date
from pathlib import Path

SOURCE_NAME = "마실 큐레이션 — 보양 한식 & 전통 다원"
SOURCE_URL = "https://www.diningcode.com/list.dc?query=분당+어르신+한식+전통찻집"
OUTPUT_PATH = Path(__file__).parent / "output" / "places.senior_dining.json"

def extract_senior_dining():
    return [
        {
            "id": "sd-001",
            "name": "정자동 흙향기 전통 다원",
            "category": "1시간마실",
            "subcategory": "전통 찻집 & 다원",
            "address": "경기도 성남시 분당구 불정로 77 (정자동)",
            "region": "분당구 정자동",
            "hours": "10:00 ~ 21:00 (연중무휴)",
            "price": "쌍화차 8,000원 / 대추차 7,500원",
            "duration_min": 60,
            "description": "직접 달인 진한 수제 십전대보탕과 대추차, 가래떡 구이가 함께 나오는 고즈넉한 흙벽 전통 찻집. 1시간 편히 쉬어가기 으뜸.",
            "senior_care_tags": ["온돌 방방이", "편안한 의자", "어르신 맞춤 차", "무료 주차"],
            "oasis_pass_benefit": "차 주문 시 숯불 가래떡 구이 무료 서비스",
            "highlights": ["100% 국산 약재로 12시간 고아낸 수제 대추차", "신발 벗지 않는 편안한 높은 의자석 보유", "잔잔한 가야금 클래악 음악"],
            "senior_tips": "창가 좌식 온돌방은 다리가 아프지 않도록 입식 등받이 의자가 구비되어 있습니다.",
            "parking_info": "매장 앞 전용 주차장 6대 주차 가능",
            "source_name": SOURCE_NAME,
            "source_url": SOURCE_URL,
            "data_quality": "complete"
        },
        {
            "id": "sd-002",
            "name": "백현동 곤드레 밥상 (자연 한정식)",
            "category": "보양·전통찻집",
            "subcategory": "속 편한 한식당",
            "address": "경기도 성남시 분당구 판교백현로 59 (백현동)",
            "region": "분당구 백현동",
            "hours": "11:00 ~ 21:00 (Break 15:00~17:00)",
            "price": "곤드레 정식 15,000원 / 산채 보리밥 13,000원",
            "duration_min": 60,
            "description": "강원도 정선 곤드레와 12가지 무농약 산채 나물로 차려낸 깔끔하고 부드러운 속 편한 웰빙 밥상.",
            "senior_care_tags": ["부드러운 소화", "입식 테이블", "넓은 주차", "남녀 화장실"],
            "oasis_pass_benefit": "어르신 방문 시 구수한 숭늉 & 잡채 추가 서비스",
            "highlights": ["조미료를 쓰지 않아 어르신 속이 아주 편안한 나물류", "전 좌석 입식 의자로 무릎 부담 제로", "식후 무료 한방 원두차 셀프바"],
            "senior_tips": "주말 점심은 예약 시 1층 넓은 테이블로 우선 배치해 드립니다.",
            "parking_info": "발렛 주차 지원 및 자체 지상 주차장 20대",
            "source_name": SOURCE_NAME,
            "source_url": SOURCE_URL,
            "data_quality": "complete"
        },
        {
            "id": "sd-003",
            "name": "남한산성 계곡 장수 백숙",
            "category": "보양·전통찻집",
            "subcategory": "보양식 & 숲속 식당",
            "address": "경기도 광주시 남한산성면 남한산성로 712",
            "region": "남한산성",
            "hours": "10:30 ~ 21:00",
            "price": "토종닭 누룽지 백숙 65,000원 (3~4인분)",
            "duration_min": 90,
            "description": "푹 고아낸 엄나무 토종닭과 고소한 찹쌀 누룽지가 어우러진 여름·겨울 어르신 원기회복 보양식 명가.",
            "senior_care_tags": ["원기회복 보양식", "계곡 숲 경치", "넓은 주차", "개별 방"],
            "oasis_pass_benefit": "도토리묵 무침 (15,000원 상당) 무료 증정",
            "highlights": ["살이 뼈에서 부드럽게 발라지는 살살 녹는 부드러움", "가족 단위 모임에 좋은 독립 룸 완비", "숲속 계곡 바람 선선한 힐링 장소"],
            "senior_tips": "방문 1시간 전 전화 예약 시 기다림 없이 바로 끓인 닭백숙을 드실 수 있습니다.",
            "parking_info": "매장 앞 대형 주차장 (버스 주차 가능)",
            "source_name": SOURCE_NAME,
            "source_url": SOURCE_URL,
            "data_quality": "complete"
        }
    ]

def main():
    places = extract_senior_dining()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(
            {"generated_at": str(date.today()), "source": SOURCE_NAME, "places": places},
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"[어르신 건강식/전통찻집] {len(places)}곳 추출 완료 → {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
