import requests

url = "http://127.0.0.1:5001/api/predict_churn"  # <-- Fixed here

payload = {
    "gender": "Male",
    "tenure_months": 12,
    "monthly_charges": 65.5,
    "total_charges": 700,
    "contract_type": "Month-to-Month",
    "payment_method": "Electronic",
    "risk_level": "High",
    "complaints": 3
}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)

try:
    print("Response:", response.json())
except Exception as e:
    print("❌ Failed to parse JSON:", response.text)
