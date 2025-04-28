import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# 1. Load dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(BASE_DIR, "..", "data", "churn_data.csv")
df = pd.read_csv(data_path)

# 2. Encode categorical variables
categorical_cols = ["gender", "contract_type", "payment_method", "risk_level"]
label_encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# 3. Feature Matrix and Target
X = df.drop("churned", axis=1)
y = df["churned"]

# 4. Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 6. Save model and encoders
model_dir = os.path.join(BASE_DIR, "model")
os.makedirs(model_dir, exist_ok=True)  # ✅ Create model directory if not exists

joblib.dump(model, os.path.join(model_dir, "churn_model.pkl"))
joblib.dump(label_encoders, os.path.join(model_dir, "label_encoders.pkl"))

print("✅ Model and encoders saved successfully!")
