"""
마실(Masil) 크롤러 출력물(raw)을 병합해 웹앱이 쓰는 최종 스키마(output/places.json)로 정규화한다.

어르신/실버 맞춤 5대 카테고리:
  - 도보마실 (걸어서 다녀올 산책로/공원)
  - 차량마실 (차 타고 다녀올 드라이브/명소)
  - 1시간마실 (1시간 숏 마실 & 찻집)
  - 보양·전통찻집 (속 편한 한식 & 다원)
  - 복지관·데이케어 (시/구립 어르신 복지관, 문화센터, 데이케어센터, 장기요양센터)
"""
import json
from datetime import date
from pathlib import Path

OUTPUT_DIR = Path(__file__).parent / "output"
FINAL_PATH = OUTPUT_DIR / "places.json"
WEB_DATA_PATH = Path(__file__).parent.parent / "web" / "src" / "data" / "places.json"

CATEGORY_KEYWORDS = {
    "복지관·데이케어": ["복지관", "문화센터", "데이케어", "주간보호", "장기요양", "치매안심"],
    "도보마실": ["산책", "공원", "숲길", "둘레길", "탄천", "호수"],
    "차량마실": ["식물원", "수목원", "드라이브", "남한산성", "전망대"],
    "1시간마실": ["찻집", "다원", "도서관", "쉼터"],
    "보양·전통찻집": ["백숙", "곤드레", "한정식", "보양식", "삼계탕", "대추차", "쌍화차"],
}
DEFAULT_CATEGORY = "도보마실"

def guess_category(name: str, description: str) -> str:
    text = f"{name} {description}"
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(k in text for k in keywords):
            return category
    return DEFAULT_CATEGORY

def load_raw(path: Path):
    if not path.exists():
        return []
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return data.get("places", [])
    except Exception as e:
        print(f"[경고] {path} 읽기 실패: {e}")
        return []

def normalize(entry: dict) -> dict:
    if not entry.get("category"):
        entry["category"] = guess_category(entry.get("name", ""), entry.get("description", ""))
    if not entry.get("senior_care_tags"):
        entry["senior_care_tags"] = ["평지/슬로프", "쉼터 의자 다수", "화장실 완비"]
    if not entry.get("duration_min"):
        entry["duration_min"] = 60
    return entry

def main():
    raw_files = sorted(OUTPUT_DIR.glob("places.*.json"))
    all_places = []
    for f in raw_files:
        all_places.extend(load_raw(f))

    if not all_places:
        print("병합할 raw 크롤러 출력이 없습니다.")
        return

    normalized = [normalize(p) for p in all_places]
    output_data = {
        "generated_at": str(date.today()),
        "schema_version": "1.0-masil-senior",
        "places": normalized
    }

    FINAL_PATH.write_text(json.dumps(output_data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[마실 통합 정규화] {len(normalized)}곳 정규화 완료 → {FINAL_PATH}")

    if WEB_DATA_PATH.parent.exists():
        WEB_DATA_PATH.write_text(json.dumps(output_data, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"웹앱 데이터 동기화 완료 → {WEB_DATA_PATH}")

if __name__ == "__main__":
    main()
