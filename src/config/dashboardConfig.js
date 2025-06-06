const dashboardConfig = {
    appTitle: "Customer Churn Dashboard",
    logoPath: "/Telecom_Argentina-Logo.wine.svg",
  
    // Sidebar metrics
    sidebar: [
      { title: "Customer Churn", key: "customerChurn", isCurrency: false },
      { title: "Yearly Charges", key: "yearlyCharges", isCurrency: true },
      { title: "Monthly Charges", key: "monthlyCharges", isCurrency: true },
      { title: "Admin Tickets", key: "adminTickets", isCurrency: false },
      { title: "Tech Tickets", key: "techTickets", isCurrency: false }
    ],
  
    // Topbar navigation buttons
    topbarButtons: [
      "Customer Churn",
      "Customer Risk",
      "Insights",
      "Customer Segments" // ✅ "Services" removed
    ],
  
    // Chart configuration for different sections
    chartConfigs: {
      churnByYear: {
        title: "Churn by Year",
        color: "#FFA726"
      },
      paymentMethod: {
        title: "Payment Method",
        color: "#FB8C00"
      },
      riskLevels: {
        title: "Risk Levels",
        color: "#f44336"
      },
      riskByTenure: {
        title: "Risk by Tenure",
        color: "#6A1B9A"
      },
  
      // Segment-specific configs
      segments: {
        demographics: {
          title: "Age Groups",
          color: "#8E24AA"
        },
        gender: {
          title: "Gender Split",
          color: "#3949AB"
        },
        location: {
          title: "Customer Location",
          color: "#1E88E5"
        },
        spending: {
          title: "Spending Patterns (ARPU)",
          color: "#43A047"
        },
        plans: {
          title: "Service Plan Types",
          color: "#FB8C00"
        },
        behavior: {
          title: "Behavioral Segments",
          color: "#F4511E"
        },
        clusters: {
          title: "Cluster Groups (ML)",
          color: "#6D4C41"
        }
      }
    }
  };
  
  export default dashboardConfig;
  