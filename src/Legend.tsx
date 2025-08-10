import React from "react";

interface LegendProps {
  COLORS: any;
  compound: boolean;
  showAgeOnXAxis: boolean;
  setShowAgeOnXAxis: (v: boolean) => void;
}

const Legend: React.FC<LegendProps> = ({ COLORS, compound, showAgeOnXAxis, setShowAgeOnXAxis }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: 18,
    justifyContent: "center",
    margin: "12px 0",
    flexWrap: "wrap"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 14, height: 14, backgroundColor: COLORS.start, borderRadius: 3 }} />
      Startkapital
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 14, height: 14, backgroundColor: COLORS.amortering, borderRadius: 3 }} />
      Amortering
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 14, height: 14, backgroundColor: COLORS.sparande, borderRadius: 3 }} />
      Sparande
    </div>
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      opacity: compound ? 1 : 0.4
    }}>
      <div
        style={{
          width: 14,
          height: 14,
          backgroundColor: compound ? COLORS.sparandeRanta : "#eee",
          borderRadius: 3,
          border: "1px solid #ccc",
        }}
      />
      Räntad del av sparande
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 22,
        height: 0,
        borderTop: `3px solid ${COLORS.total}`,
        borderRadius: 2,
        marginTop: 2,
        marginBottom: 2,
        background: "none"
      }} />
      Totalt kapital
    </div>
    <div style={{ marginLeft: 24, display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontWeight: showAgeOnXAxis ? 700 : 400, color: showAgeOnXAxis ? "#222" : "#888", fontSize: 13 }}>
        Visa ålder
      </span>
      <div
        onClick={() => setShowAgeOnXAxis((v) => !v)}
        style={{
          width: 32,
          height: 16,
          borderRadius: 8,
          background: showAgeOnXAxis ? "#2196f3" : "#bbb",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s",
          display: "flex",
          alignItems: "center",
          padding: 2,
        }}
        tabIndex={0}
        role="button"
        aria-pressed={showAgeOnXAxis}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 4px #0002",
            transform: showAgeOnXAxis ? "translateX(14px)" : "translateX(0)",
            transition: "transform 0.2s",
          }}
        />
      </div>
      <span style={{ fontWeight: !showAgeOnXAxis ? 700 : 400, color: !showAgeOnXAxis ? "#222" : "#888", fontSize: 13 }}>
        Visa år
      </span>
    </div>
  </div>
);

export default Legend;