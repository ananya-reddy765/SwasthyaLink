"""
AI module 5: Multilingual NLP.

Placeholder for understanding requests spoken/typed in English, Hindi or
Telugu — used by the phone/IVR and SMS channels described in the project
brief (these channels are separate from the main web app). Swap the
translate() and detect_language() stubs for a real translation/NLU
service (e.g. IndicTrans2, Bhashini, or a hosted translation API).
"""

SUPPORTED_LANGUAGES = ["en", "hi", "te"]

# Minimal keyword hints — replace with a real language-detection model.
_LANGUAGE_HINTS = {
    "hi": ["chahiye", "khoon", "अस्पताल", "रक्त"],
    "te": ["kavali", "raktam", "ఆసుపత్రి", "రక్తం"],
}


def detect_language(text: str) -> str:
    text_lower = text.lower()
    for lang, hints in _LANGUAGE_HINTS.items():
        if any(h in text_lower for h in hints):
            return lang
    return "en"


def translate_to_english(text: str, source_lang: str) -> str:
    """
    Placeholder pass-through. In production this calls a real translation
    model/API and returns the English text for downstream request
    classification (see ai/request_classification.py).
    """
    if source_lang == "en":
        return text
    return text  # TODO: integrate real translation service
