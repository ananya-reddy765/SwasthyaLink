"""
AI module 2: Demand Prediction.

Placeholder implementation returning illustrative trend data for the
Analytics screen. In production, replace this with a real time-series
model (e.g. Prophet, or a simple moving-average/regression baseline)
trained on historical request volume per resource type and region.
"""

def predict_demand():
    return [
        {"resource": "Blood O+", "level": "High", "change": "+40%"},
        {"resource": "Milk", "level": "Moderate", "change": "+20%"},
        {"resource": "Oxygen", "level": "Moderate", "change": "+20%"},
        {"resource": "Medicine", "level": "Low", "change": "+10%"},
        {"resource": "Ambulance", "level": "Low", "change": "+5%"},
        {"resource": "Specialist", "level": "Moderate", "change": "+15%"},
    ]
