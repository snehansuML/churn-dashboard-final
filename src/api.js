export async function askChatGPT(question, data) {
  const context = `
  Customer churn dashboard data:

  Gender:
  - Male: ${data.genderData[0]?.value || 0}%
  - Female: ${data.genderData[1]?.value || 0}%

  Churn by Year:
  ${data.churnByYearData.map(d => `- ${d.name}: ${d.value}%`).join("\n")}

  Payment Methods:
  ${data.paymentMethodData.map(d => `- ${d.name}: ${d.value}%`).join("\n")}

  Risk Levels:
  ${data.riskLevelData.map(d => `- ${d.name}: ${d.value}%`).join("\n")}

  Risk by Tenure:
  ${data.riskByTenureData.map(d => `- ${d.name}: ${d.value}%`).join("\n")}

  Question: ${question}
  `;

  const res = await fetch("https://churn-dashboard-final.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: context })
  });

  const result = await res.json();
  return result.reply;
}
