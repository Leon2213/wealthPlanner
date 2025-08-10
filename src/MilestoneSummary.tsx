import React from "react";

interface MilestoneSummaryProps {
  milestones: number[];
  milestoneSummary: (age: number) => any;
  COLORS: any;
  startNetworth: number;
}

const MilestoneSummary: React.FC<MilestoneSummaryProps> = ({
  milestones,
  milestoneSummary,
  COLORS,
  startNetworth,
}) => (
  <div
    style={{
      width: "100%",
      textAlign: "left",
      margin: "32px auto 24px auto",
    }}
  >
    <h3 style={{ marginLeft: 8 }}>Summering vid milstolpar</h3>
    <div style={{ transform: "scale(0.52)", transformOrigin: "left", width: "50%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          fontSize: 16,
          justifyContent: "space-between",
          alignItems: "stretch",
          flexWrap: "nowrap",
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
                  {summ.total.toLocaleString("sv-SE")} kr
                </span>
              </div>
              <div style={{ whiteSpace: "nowrap" }}>
                <span style={{ fontWeight: 600 }}>Ökning från start:</span>{" "}
                <span style={{ color: diff >= 0 ? "#27ae60" : "#c0392b", fontWeight: 700 }}>
                  {diff >= 0 ? "+" : "-"}
                  {Math.abs(diff).toLocaleString("sv-SE")} kr
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>Startkapital:</span>{" "}
                <span style={{ color: COLORS.start, fontWeight: 700, whiteSpace: "nowrap" }}>
                  {startNetworth.toLocaleString("sv-SE")} kr
                </span>
              </div>
              <div style={{ whiteSpace: "nowrap" }}>
                <span style={{ fontWeight: 600 }}>Sparande totalt:</span>{" "}
                <span style={{ color: COLORS.sparande, fontWeight: 700 }}>
                  {summ.sparandeTot.toLocaleString("sv-SE")} kr
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>Avkastning:</span>{" "}
                <span style={{ color: COLORS.sparandeRanta, fontWeight: 700, whiteSpace: "nowrap" }}>
                  {summ.rantaTot.toLocaleString("sv-SE")} kr
                </span>
              </div>
              <div style={{ whiteSpace: "nowrap" }}>
                <span style={{ fontWeight: 600 }}>Amortering totalt:</span>{" "}
                <span style={{ color: COLORS.amortering, fontWeight: 700 }}>
                  {summ.amorteringTot.toLocaleString("sv-SE")} kr
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Miljonrutor kan placeras här, de skalas också ned */}
      {/* <div>Miljonrutor här</div> */}
    </div>
  </div>
);

export default MilestoneSummary;