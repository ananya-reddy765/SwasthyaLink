"""
AI module 1: Smart Resource Matching.

This is a transparent, explainable scoring function — not a black-box
medical decision system. It ranks candidate facilities so a healthcare
worker can make the final, informed choice. AI only assists coordination;
medical decisions remain with healthcare professionals.

Scoring considers:
- Availability (does the facility actually have enough stock?)
- Distance (closer is better)
- Travel time (faster is better)
- Urgency (emergency requests weight distance/time more heavily)
- Facility verification (unverified facilities are never recommended)
"""
from typing import List, Dict


URGENCY_WEIGHTS = {
    "Normal": {"distance": 0.3, "time": 0.2, "availability": 0.5},
    "High": {"distance": 0.35, "time": 0.35, "availability": 0.3},
    "Emergency": {"distance": 0.45, "time": 0.45, "availability": 0.1},
}


def _normalize(value: float, best: float, worst: float) -> float:
    if worst == best:
        return 1.0
    return max(0.0, min(1.0, (worst - value) / (worst - best)))


def rank_facilities(candidates: List[Dict], urgency: str = "Normal") -> List[Dict]:
    verified_candidates = [c for c in candidates if c.get("verified", True)]
    if not verified_candidates:
        return []

    weights = URGENCY_WEIGHTS.get(urgency, URGENCY_WEIGHTS["Normal"])
    distances = [c.get("distance_km", 10) for c in verified_candidates]
    times = [c.get("travel_minutes", 20) for c in verified_candidates]

    best_d, worst_d = min(distances), max(distances)
    best_t, worst_t = min(times), max(times)

    scored = []
    for c in verified_candidates:
        distance_score = _normalize(c.get("distance_km", 10), best_d, worst_d)
        time_score = _normalize(c.get("travel_minutes", 20), best_t, worst_t)
        availability_score = 1.0 if c.get("units_available", 0) > 0 else 0.0

        total = (
            weights["distance"] * distance_score
            + weights["time"] * time_score
            + weights["availability"] * availability_score
        )
        c["_match_score"] = round(total, 3)
        scored.append(c)

    scored.sort(key=lambda x: x["_match_score"], reverse=True)
    return scored
