import React, { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { askChatGPT } from "./api";
import ChurnMap from "./components/ChurnMap";
import ChartCard from "./components/ChartCard";
import SidebarCard from "./components/SidebarCard";
import ClusterScatterChart from "./components/ClusterScatterChart";
import { jsPDF } from "jspdf"; 
import dashboardConfig from "./config/dashboardConfig";

import genderData from "./data/genderData.json";
import churnByYearData from "./data/churnData.json";
import paymentMethodData from "./data/paymentMethodData.json";
import riskLevelData from "./data/riskData.json";
import riskByTenureData from "./data/riskData.json";
import segmentationData from "./data/segmentationData.json";
import clusterScatterData from "./data/clusterScatterData.json";

import ChurnPredictionForm from "./pages/churn/ChurnPredictionForm";  // ✅ NEW IMPORT

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("Customer Churn");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const churnMetrics = {
    customerChurn: 1869,
    yearlyCharges: 16060000,
    monthlyCharges: 456120,
    adminTickets: 3632,
    techTickets: 2955
  };

  const handleChat = async () => {
    if (!question) return;
    setResponse("Thinking...");

    try {
      const reply = await askChatGPT(question, {
        genderData,
        churnByYearData,
        paymentMethodData,
        riskLevelData,
        riskByTenureData,
        segmentationData,
        clusterScatterData
      });

      setResponse(reply || "No response from ChatGPT.");
    } catch (err) {
      setResponse("❌ Error reaching ChatGPT backend.");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("ChatGPT Response:", 10, 10);
    const splitText = doc.splitTextToSize(response, 180); 
    doc.text(splitText, 10, 20);
    doc.save("chat_response.pdf");
  };

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="dashboard-grid" style={{ backgroundColor: "#e6f2ff" }}>
      <aside className="sidebar">
        {dashboardConfig.sidebar.map((item, index) => (
          <SidebarCard
            key={index}
            title={item.title}
            value={churnMetrics[item.key]}
            isCurrency={item.isCurrency}
          />
        ))}
      </aside>

      <main className="main-content">
        <header className="topbar">
          <img
            src={dashboardConfig.logoPath}
            alt="Logo"
            className="logo"
            style={{ height: "100px" }}
          />
          <h1>{dashboardConfig.appTitle}</h1>
          <div className="topbar-buttons">
            {dashboardConfig.topbarButtons.map((btn, index) => (
              <button key={index} onClick={() => setActiveView(btn)}>
                {btn}
              </button>
            ))}
            {/* ✅ NEW Button for Churn Prediction */}
            <button
              onClick={() => setActiveView("Churn Prediction")}
              style={{ marginLeft: "1rem" }}
            >
              Churn Prediction
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                marginLeft: "1rem",
                padding: "0.4rem 1rem"
              }}
            >
              Logout
            </button>
          </div>
        </header>

        <section className="charts-grid">
          {/* ✅ Handle Churn Prediction view separately */}
          {activeView === "Churn Prediction" && (
            <ChurnPredictionForm />
          )}

          {/* Keep other views as they are */}
          {activeView === "Customer Churn" && (
            <>
              <div className="chart-card">
                <h3>Gender Distribution</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "2rem",
                    marginTop: "1rem"
                  }}
                >
                  {genderData.map((entry, index) => (
                    <div key={index} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "2rem" }}>
                        {entry.name === "Male" ? "👨" : "👩"}
                      </div>
                      <strong>{entry.name}</strong>
                      <div>{entry.value}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <ChartCard
                title={dashboardConfig.chartConfigs.churnByYear.title}
                data={churnByYearData}
                barColor={dashboardConfig.chartConfigs.churnByYear.color}
              />
              <ChartCard
                title={dashboardConfig.chartConfigs.paymentMethod.title}
                data={paymentMethodData}
                barColor={dashboardConfig.chartConfigs.paymentMethod.color}
              />
            </>
          )}

          {activeView === "Customer Risk" && (
            <>
              <ChartCard
                title={dashboardConfig.chartConfigs.riskLevels.title}
                data={riskLevelData}
                barColor={dashboardConfig.chartConfigs.riskLevels.color}
              />
              <ChartCard
                title={dashboardConfig.chartConfigs.riskByTenure.title}
                data={riskByTenureData}
                barColor={dashboardConfig.chartConfigs.riskByTenure.color}
              />
            </>
          )}

          {activeView === "Insights" && (
            <>
              <div className="chart-card">
                <h3>Churn Insights</h3>
                <ul>
                  <li>🔍 High churn seen in month-to-month customers</li>
                  <li>👩 Female customers churn slightly less than 👨 males</li>
                  <li>⚠️ Most complaints are from streaming & TV users</li>
                  <li>🧠 Long-tenure customers have lowest churn risk</li>
                </ul>
              </div>

              <div className="chart-card">
                <h3>Ask ChatGPT Anything</h3>
                <input
                  type="text"
                  placeholder="e.g. Why is churn high in short-tenure users?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem"
                  }}
                />
                <button
                  onClick={handleChat}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    border: "none"
                  }}
                >
                  Ask ChatGPT
                </button>

                {response && (
                  <div
                    style={{
                      marginTop: "1rem",
                      background: "#f9f9f9",
                      padding: "1rem",
                      borderRadius: "8px"
                    }}
                  >
                    <strong>Response:</strong>
                    <p>{response}</p>

                    <button
                      onClick={downloadPDF}
                      style={{
                        marginTop: "1rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none"
                      }}
                    >
                      Download Chat as PDF
                    </button>
                  </div>
                )}
              </div>

              <div className="chart-card">
                <h3>Geographic View of Churn</h3>
                <ChurnMap />
              </div>
            </>
          )}

          {activeView === "Customer Segments" && (
            <>
              {Object.entries(dashboardConfig.chartConfigs.segments).map(
                ([key, config], index) => (
                  <ChartCard
                    key={index}
                    title={config.title}
                    data={segmentationData[key]}
                    barColor={config.color}
                  />
                )
              )}
              <ClusterScatterChart data={clusterScatterData} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
