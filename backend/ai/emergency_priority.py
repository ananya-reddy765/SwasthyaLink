"""
AI module 4: Emergency Priority.

Assigns a priority score to incoming requests so emergency cases surface
first in dashboards and queues. This does not make medical decisions —
it only helps route and order coordination work for human staff.
"""

URGENCY_SCORES = {
    "Emergency": 100,
    "High": 60,
    "Normal": 20,
}

# Resources where even a "Normal" request should still be bumped up,
# because delays are more consequential for these categories.
CRITICAL_RESOURCE_BONUS = {
    "blood_bank": 15,
    "oxygen": 15,
    "ambulance": 20,
    "specialist": 5,
    "milk_bank": 5,
    "medicine": 0,
}


def priority_score(urgency: str, resource_type: str) -> int:
    base = URGENCY_SCORES.get(urgency, 20)
    bonus = CRITICAL_RESOURCE_BONUS.get(resource_type, 0)
    return min(100, base + bonus)


def rank_requests_by_priority(requests: list) -> list:
    for r in requests:
        r["_priority_score"] = priority_score(r.get("urgency", "Normal"), r.get("resource_type", "medicine"))
    return sorted(requests, key=lambda r: r["_priority_score"], reverse=True)
