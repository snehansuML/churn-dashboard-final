import React from "react";
import * as XLSX from "xlsx";

export default function ExcelUploader({ onDataLoaded }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const result = {
        genderData: XLSX.utils.sheet_to_json(workbook.Sheets["GenderData"]),
        churnByYearData: XLSX.utils.sheet_to_json(workbook.Sheets["ChurnByYear"]),
        paymentMethodData: XLSX.utils.sheet_to_json(workbook.Sheets["PaymentMethod"]),
        riskLevelData: XLSX.utils.sheet_to_json(workbook.Sheets["RiskLevels"]),
        riskByTenureData: XLSX.utils.sheet_to_json(workbook.Sheets["RiskByTenure"]),
        sidebarMetrics: XLSX.utils.sheet_to_json(workbook.Sheets["SidebarMetrics"]),
      };

      onDataLoaded(result);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <label htmlFor="upload">📂 Upload Excel Dashboard Data (.xlsx)</label>
      <input
        id="upload"
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        style={{ marginTop: "0.5rem" }}
      />
    </div>
  );
}
