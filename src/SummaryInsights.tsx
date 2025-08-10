import React from "react";
import { SummaryInsightsProps } from "./types";


const SummaryInsights: React.FC<SummaryInsightsProps> = ({
  milestones,
  milestoneSummary,
  COLORS,
  startNetworth,
  formatNumber,
}) => (
  <div
    style={{
      width: "1200px",
      transform: "scale(0.90)",
      textAlign: "left",
      margin: "32px auto 24px auto",
    }}
  >
    <br />
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        fontSize: 16,
        justifyContent: "space-between", // Viktigt: sprider ut rutorna
        alignItems: "stretch",
        flexWrap: "nowrap", // Alla på en rad
        marginLeft: 8,
        marginRight: 8,
        width: "calc(100% - 16px)",
      }}
    >
      {milestones.map((age) => {
        const summ = milestoneSummary(age);
        if (!summ) return null;
        const diff = summ.total - startNetworth;
        return (
          <div
            key={age}
            style={{
              border: "1px solid #ddd",
              padding: 14,
              borderRadius: 8,
              backgroundColor: "#fafafa",
              minWidth: 0,
              flex: "1 1 0",
              minHeight: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxSizing: "border-box",
              marginBottom: 6,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 20, color: "#1565c0", marginBottom: 2 }}>
              {age} år
            </div>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>
              Totalt kapital:{" "}
              <span style={{ color: COLORS.total, fontWeight: 700, fontSize: 17, whiteSpace: "nowrap" }}>
                {formatNumber(summ.total)} kr
              </span>
            </div>
            <div style={{ whiteSpace: "nowrap" }}>
              <span style={{ fontWeight: 600 }}>Ökning från start:</span>{" "}
              <span style={{ color: diff >= 0 ? "#27ae60" : "#c0392b", fontWeight: 700 }}>
                {diff >= 0 ? "+" : "-"}
                {formatNumber(Math.abs(diff))} kr
              </span>
            </div>
            <div>
              <span style={{ fontWeight: 600 }}>Startkapital:</span>{" "}
              <span style={{ color: COLORS.start, fontWeight: 700, whiteSpace: "nowrap" }}>
                {formatNumber(startNetworth)} kr
              </span>
            </div>
            <div style={{ whiteSpace: "nowrap" }}>
              <span style={{ fontWeight: 600 }}>Sparande totalt:</span>{" "}
              <span style={{ color: COLORS.sparande, fontWeight: 700 }}>
                {formatNumber(summ.sparandeTot)} kr
              </span>
            </div>
            <div>
              <span style={{ fontWeight: 600 }}>Avkastning:</span>{" "}
              <span style={{ color: COLORS.sparandeRanta, fontWeight: 700, whiteSpace: "nowrap" }}>
                {formatNumber(summ.rantaTot)} kr
              </span>
            </div>
            <div style={{ whiteSpace: "nowrap" }}>
              <span style={{ fontWeight: 600 }}>Amortering totalt:</span>{" "}
              <span style={{ color: COLORS.amortering, fontWeight: 700 }}>
                {formatNumber(summ.amorteringTot)} kr
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default SummaryInsights;