import React, { useState } from 'react';
import axios from 'axios';

function ChurnPredictionForm() {
  const [formData, setFormData] = useState({
    gender: '',
    tenure_months: '',
    monthly_charges: '',
    total_charges: '',
    contract_type: '',
    payment_method: '',
    risk_level: '',
    complaints: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FINAL Correct API URL (with /api/predict_churn)
      const API_URL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:5001/api/predict_churn'  // local backend
        : 'https://churn-dashboard-final.onrender.com/api/predict_churn'; // deployed backend

      const payload = {
        gender: formData.gender === 'Male' ? 1 : 0,
        tenure_months: Number(formData.tenure_months),
        monthly_charges: Number(formData.monthly_charges),
        total_charges: Number(formData.total_charges),
        contract_type: formData.contract_type === 'Month-to-Month' ? 0 : (formData.contract_type === 'One Year' ? 1 : 2),
        payment_method: formData.payment_method === 'Electronic' ? 0 : (formData.payment_method === 'Mailed' ? 1 : (formData.payment_method === 'Credit Card' ? 2 : 3)),
        risk_level: formData.risk_level === 'Low' ? 0 : (formData.risk_level === 'Medium' ? 1 : 2),
        complaints: Number(formData.complaints)
      };

      const response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResult(response.data);

    } catch (error) {
      console.error('Prediction error:', error);
      setResult({ error: 'Failed to predict. Please check server or payload.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Churn Prediction Form</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Tenure Months:</label>
          <input type="number" name="tenure_months" value={formData.tenure_months} onChange={handleChange} required />
        </div>

        <div>
          <label>Monthly Charges:</label>
          <input type="number" name="monthly_charges" value={formData.monthly_charges} onChange={handleChange} required />
        </div>

        <div>
          <label>Total Charges:</label>
          <input type="number" name="total_charges" value={formData.total_charges} onChange={handleChange} required />
        </div>

        <div>
          <label>Contract Type:</label>
          <select name="contract_type" value={formData.contract_type} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Month-to-Month">Month-to-Month</option>
            <option value="One Year">One Year</option>
            <option value="Two Years">Two Years</option>
          </select>
        </div>

        <div>
          <label>Payment Method:</label>
          <select name="payment_method" value={formData.payment_method} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Electronic">Electronic</option>
            <option value="Mailed">Mailed</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <div>
          <label>Risk Level:</label>
          <select name="risk_level" value={formData.risk_level} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label>Complaints:</label>
          <input type="number" name="complaints" value={formData.complaints} onChange={handleChange} required />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Predict</button>
      </form>

      {loading && <p>Loading prediction...</p>}

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Prediction Result:</h3>
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <p><strong>{result.prediction}</strong> with a probability of <strong>{result.probability * 100}%</strong></p>
          )}
        </div>
      )}
    </div>
  );
}

export default ChurnPredictionForm;
