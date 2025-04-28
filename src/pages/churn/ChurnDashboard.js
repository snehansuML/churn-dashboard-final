import React from 'react';
import ChurnPredictionForm from './ChurnPredictionForm';

function ChurnDashboard() {
  return (
    <div style={{ padding: '30px' }}>
      <h1>Churn Dashboard</h1>
      <ChurnPredictionForm />
    </div>
  );
}

export default ChurnDashboard;
