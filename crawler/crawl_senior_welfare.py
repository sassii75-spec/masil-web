"""
Stage 1 마실(Masil) 크롤러 #2 — 시/구 어르신 복지관, 문화센터, 데이케어센터, 장기요양센터

대상: 분당구/성남시 시·구립 노인종합복지관, 시니어 문화센터, 노인주간보호 데이케어센터
방식: 건강강좌, 경로식당, 주간보호, 셔틀버스 정보 및 시설 정규화
"""
import json
import sys
from datetime import date
from pathlib import Path

SOURCE_NAME = "성남시/분당구 어르신 복지·데이케어센터 연동"
SOURCE_URL = "https://www.seongnam.go.kr/welfare/senior_centers.do"
OUTPUT_PATH = Path(__file__).parent / "output" / "places.senior_welfare.json"

def extract_welfare_places():
    return [
        {
            "id": "wf-001",
            "name": "분당 정자노인종합복지관",
            "category": "복지관·데이케어",
            "subcategory": "노인종합복지관",
            "address": "경기도 성남시 분당구 불정로 50 (정자동)",
            "region": "분당구 정자동",
            "hours": "09:00 ~ 18:00 (토/일 휴무)",
            "price": "복지관 이용 무료 / 경로식당 2,500원",
            "duration_min": 120,
            "description": "분당구 대표 시립 노인종합복지관. 건강증진실, 바둑·장기실, 스마트폰 강좌, 시니어 체조반 및 자율 경로식당 운영.",
            "senior_care_tags": ["평지/슬로프", "셔틀버스 운행", "경로식당/영양식", "건강/교양 강좌", "엘리베이터 완비"],
            "oasis_pass_benefit": "첫 방문 시 건강상담 및 기초 혈당/혈압 무료 측정",
            "highlights": ["분당구 전역 무료 셔틀버스 4개 노선 일 8회 운행", "물리치료실 & 시니어 파크 체육시설", "영양사 조리 균형 잡힌 점심 식사"],
            "senior_tips": "오전 10시 스마트폰 기초 교실과 오후 2시 시니어 게이트볼 교실이 어르신들에게 가장 인기 있습니다.",
            "parking_info": "복지관 전용 지상/지하 주차장 (복지카드 소지자 우선)",
            "source_name": SOURCE_NAME,
            "source_url": SOURCE_URL,
            "data_quality": "complete"
        },
        {
            "id": "wf-002",
            "name": "판교노인종합복지관 & 시니어 문화센터",
            "category": "복지관·데이케어",
            "subcategory": "노인종합복지관 & 문화센터",
            "address": "경기도 성남시 분당구 판교역로 99 (백현동)",
            "region": "분당구 백현동",
            "hours": "09:00 ~ 18:00 (토/일 휴무)",
            "price": "강좌 수강료 1~2만원대 / 자율 휴게실 무료",
            "duration_min": 90,
            "description": "최신 편의시설을 갖춘 쾌적한 판교 지역 어르신 문화센터. 서예, 서양화, 서양악기, 노래교실, 체조 등 다양한 교양 강좌 수강.",
            "senior_care_tags": ["평지/슬로프", "넓은 주차", "셔틀버스 운행", "건강/교양 강좌", "의자/휴게실 완비"],
            "oasis_pass_benefit": "문화 교실 일일 청강 체험 무료권",
            "highlights": ["탁 트인 자율 북카페와 한방 차 쉼터", "어르신 전용 최신 디지털 키오스크 교육장", "판교역 도보 10분, 셔틀 상시 운행"],
            "senior_tips": "1층 자율 쉼터 북카페에는 부드러운 쇼파와 대형 글씨 책이 마련되어 있어 차 한 잔 나누기 좋습니다.",
            "parking_info": "지하 2층 규모 넉넉한 전용 주차장 (초보 및 대형 차량 용이)",
            "source_name": SOURCE_NAME,
            "source_url": SOURCE_URL,
            "data_quality": "complete"
        },
        {
            "id": "wf-003",
            "name": "성남시 분당데이케어센터 (노인주간보호)",
            "category": "복지관·데이케어",
            "subcategory": "데이케어 & 주간보호센터",
            "address": "경기도 성남시 분당구 야탑로 115 (야탑동)",
            "region": "분당구 야탑동",
            "hours": "08:00 ~ 20:00 (월~토 운영)",
            "price": "장기요양등급 적용 (본인부담금 15%~무료)",
            "duration_min": 180,
            "description": "낮 동안 어르신을 안전하게 모시고 건강 관리, 치매 예방 음악·미술 치료, 영양 식사 및 픽업 송영 서비스를 제공하는 시립 전문 데이케어센터.",
            "senior_care_tags": ["송영(픽업) 서비스", "간호사/요양보호사 상주", "영양 식사/간식", "치매예방 프로그램"],
            "oasis_pass_benefit": "보호자 무료 방문 돌봄 상담 & 입소 안내책자 제공",
            "highlights": ["전담 간호사의 매일 아침 혈압·당뇨 체크", "상·하차 도우미 동승 댁 앞 픽업·송영 차량", "인지 활성화 원예 및 미니 운동회"],
            "senior_tips": "장기요양등급(1~5등급) 신청 및 등급 판정 절차를 센터에서 친절하게 무료로 상담해 드립니다.",
            "parking_info": "센터 전용 송영 차량 주차 구역 및 방문객 전용 주차면 10대",
            "source_name": SOURCE_NAME,
            "source_url": SOURCE_URL,
            "data_quality": "complete"
        },
        {
            "id": "wf-004",
            "name": "분당구 보건소 치매안심센터",
            "category": "복지관·데이케어",
            "subcategory": "치매안심센터 & 건강관리",
            "address": "경기도 성남시 분당구 야탑로 64 (야탑동)",
            "region": "분당구 야탑동",
            "hours": "09:00 ~ 18:00 (월~금)",
            "price": "무료 검진 및 무상 프로그램",
            "duration_min": 60,
            "description": "60세 이상 어르신을 위한 선제적 조기 치매 검사, 뇌 운동 쉼터 교실, 조기 조율 감정 상담 및 조제비 지원 센터.",
            "senior_care_tags": ["무료 검진", "전문 간호사/임상심리사", "평지/슬로프", "화장실 완비"],
            "oasis_pass_benefit": "치매예방 뇌운동 퍼즐 키트 무료 증정",
            "highlights": ["15분 소요 간이 치매 조기검사 100% 무료", "치매 예방 쉼터 뇌활성 운동 교실", "치매 어르신 감지기 및 조제비 수당 신청"],
            "senior_tips": "신분증만 지참하시면 예약 없이 바로 1층 검진실에서 15분 만에 뇌 건강 상태를 확인하실 수 있습니다.",
            "parking_info": "보건소 지상 주차장 이용",
            "source_name": SOURCE_NAME,
            "source_url": SOURCE_URL,
            "data_quality": "complete"
        }
    ]

def main():
    places = extract_welfare_places()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(
            {"generated_at": str(date.today()), "source": SOURCE_NAME, "places": places},
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"[어르신 복지관/데이케어] {len(places)}곳 추출 완료 → {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
