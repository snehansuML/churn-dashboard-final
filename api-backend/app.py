from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # ✅ Full CORS setup

# Load the model
model = joblib.load('model/churn_model.pkl')

@app.route('/')
def home():
    return "Hello, Flask is running!"

@app.route('/api/predict_churn', methods=['POST'])
def predict_churn():
    try:
        data = request.get_json()
        print("✅ Received data from frontend:", data)

        # Extract and validate input features
        gender = data.get('gender', 0)
        tenure_months = data.get('tenure_months', 0)
        monthly_charges = data.get('monthly_charges', 0)
        total_charges = data.get('total_charges', 0)
        contract_type = data.get('contract_type', 0)
        payment_method = data.get('payment_method', 0)
        risk_level = data.get('risk_level', 0)
        complaints = data.get('complaints', 0)

        # Basic validation: prevent negative or nonsensical inputs
        if any([
            tenure_months < 0,
            monthly_charges < 0,
            total_charges < 0,
            complaints < 0
        ]):
            print("❌ Invalid negative input detected.")
            return jsonify({'error': 'Invalid input: Negative values are not allowed.'}), 400

        # Combine features
        features = [
            gender,
            tenure_months,
            monthly_charges,
            total_charges,
            contract_type,
            payment_method,
            risk_level,
            complaints
        ]

        print("✅ Features prepared for model:", features)

        # Reshape for model
        features = np.array(features).reshape(1, -1)

        # Make prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]

        print(f"✅ Prediction: {prediction}, Probability: {probability}")

        result = {
            'prediction': 'Churn' if prediction == 1 else 'No Churn',
            'probability': round(float(probability), 2)
        }

        return jsonify(result)

    except Exception as e:
        print("❌ Error during prediction:", str(e))
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=False)
