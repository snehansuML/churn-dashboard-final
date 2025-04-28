import React, { useState } from "react";
import "./App.css";
import ExcelUploader from "./components/ExcelUploader";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList
} from "recharts";

const COLORS = ["#FFA726", "#FB8C00", "#F57C00", "#EF6C00"];

const formatCurrency = (value) => `$${(value / 1000000).toFixed(2)}M`;

function SidebarCard({ title, value, isCurrency }) {
  return (
    <div className="sidebar-card">
      <h3>{isCurrency ? formatCurrency(value) : value.toLocaleString()}</h3>
      <p>{title}</p>
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = useState("Customer Churn");

  const [sidebarMetrics, setSidebarMetrics] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [churnByYearData, setChurnByYearData] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [riskLevelData, setRiskLevelData] = useState([]);
  const [riskByTenureData, setRiskByTenureData] = useState([]);
  const [insightData, setInsightData] = useState([]);
  const [contractData, setContractData] = useState([]);

  const getMetric = (key) => sidebarMetrics.find(d => d.metric === key)?.value || 0;

  const loadExcelData = (data) => {
    setSidebarMetrics(data.sidebarMetrics || []);
    setGenderData(data.genderData || []);
    setChurnByYearData(data.churnByYearData || []);
    setPaymentMethodData(data.paymentMethodData || []);
    setRiskLevelData(data.riskLevelData || []);
    setRiskByTenureData(data.riskByTenureData || []);
    setInsightData(data.insightData || []);
    setContractData(data.contractData || []);
  };

  return (
    <div className="dashboard-grid">
      <aside className="sidebar">
        <ExcelUploader onDataLoaded={loadExcelData} />
        <SidebarCard title="Customer Churn" value={getMetric("customerChurn")} />
        <SidebarCard title="Yearly Charges" value={getMetric("yearlyCharges")} isCurrency />
        <SidebarCard title="Monthly Charges" value={getMetric("monthlyCharges")} isCurrency />
        <SidebarCard title="Admin Tickets" value={getMetric("adminTickets")} />
        <SidebarCard title="Tech Tickets" value={getMetric("techTickets")} />
      </aside>

      <main className="main-content">
        <header className="topbar">
          <img
            src="/Telecom_Argentina-Logo.wine.svg"
            alt="Telecom Logo"
            className="logo"
            style={{ height: "100px", maxWidth: "220px" }}
          />
          <h1>Customer Churn Dashboard</h1>
          <div className="topbar-buttons">
            <button onClick={() => setActiveView("Customer Churn")}>Customer Churn</button>
            <button onClick={() => setActiveView("Customer Risk")}>Customer Risk</button>
            <button onClick={() => setActiveView("Services")}>Services</button>
            <button onClick={() => setActiveView("Insights")}>Insights</button>
          </div>
        </header>

        <section className="charts-grid">
          {activeView === "Customer Churn" && (
            <>
              <div className="chart-card">
                <h3>Gender</h3>
                <PieChart width={200} height={200}>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', justifyContent: 'center' }}>
                  {genderData.map((entry, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem' }}>{entry.name === "Male" ? "👨" : "👩"}</div>
                      <strong>{entry.name}</strong>
                      <div>{entry.value}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card">
                <h3>Churn by Year</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={churnByYearData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={90} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FFA726" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Payment Method</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={paymentMethodData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={90} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FB8C00" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {activeView === "Customer Risk" && (
            <>
              <div className="chart-card">
                <h3>Risk Levels</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={riskLevelData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={90} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f44336" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Risk by Tenure</h3>
                <PieChart width={200} height={200}>
                  <Pie
                    data={riskByTenureData}
                    dataKey="value"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {riskByTenureData.map((entry, index) => (
                      <Cell key={`cell-risk-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </>
          )}

          {activeView === "Services" && (
            <div className="chart-card">
              <h3>Service Usage</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { name: "Internet", value: 70 },
                  { name: "Phone", value: 50 },
                  { name: "TV", value: 35 }
                ]} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#42A5F5">
                    <LabelList dataKey="value" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeView === "Insights" && (
            <>
              <div className="chart-card">
                <h3>Top Churn Reasons</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={insightData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="reason" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#e57373" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Churn by Contract Type</h3>
                <PieChart width={250} height={250}>
                  <Pie
                    data={contractData}
                    dataKey="value"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    <Cell fill="#BA68C8" />
                    <Cell fill="#4DB6AC" />
                    <Cell fill="#FFB74D" />
                  </Pie>
                </PieChart>
              </div>

              <div className="chart-card" style={{ background: '#fff7e6', padding: '1rem' }}>
                <h3>Key Takeaways</h3>
                <ul>
                  <li>⚠️ Churn is highest among month-to-month customers</li>
                  <li>🧠 Longer tenure customers churn less</li>
                  <li>🔧 Customers with >3 tech tickets/month are 2x more likely to churn</li>
                </ul>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
