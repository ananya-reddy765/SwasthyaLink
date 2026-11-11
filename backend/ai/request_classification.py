"""
AI module 3: Request Classification.

Parses a free-text request like "2 units of O+ blood" into structured
fields (resource_type, quantity, sub-type). Placeholder rule-based
implementation — swap for an NLP model (e.g. a fine-tuned classifier)
once real request data is available.
"""
import re

RESOURCE_KEYWORDS = {
    "blood_bank": ["blood", "o+", "o-", "a+", "a-", "b+", "b-", "ab+", "ab-"],
    "milk_bank": ["milk"],
    "oxygen": ["oxygen", "cylinder", "concentrator"],
    "ambulance": ["ambulance"],
    "medicine": ["medicine", "tablet", "insulin", "drug"],
    "specialist": ["doctor", "specialist", "cardiologist", "surgeon", "physician"],
}


def classify_request(text: str) -> dict:
    text_lower = text.lower()
    resource_type = "medicine"  # default fallback
    for r_type, keywords in RESOURCE_KEYWORDS.items():
        if any(k in text_lower for k in keywords):
            resource_type = r_type
            break

    quantity_match = re.search(r"(\d+)", text_lower)
    quantity = int(quantity_match.group(1)) if quantity_match else 1

    return {"resource_type": resource_type, "quantity": quantity, "raw_text": text}
