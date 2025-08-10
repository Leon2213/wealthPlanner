import React from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: number;
  COLORS: any;
  startAge: number;
  startNetworth: number;
  sparande: number;
  amortering: number;
  formatNumber: (n: number) => string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  COLORS,
  startAge,
  startNetworth,
  sparande,
  amortering,
  formatNumber,
}) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const age = data.year + startAge;
  const diff = data.total - startNetworth;
  const diffSign = diff >= 0 ? "+" : "-";

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ccc",
        padding: 12,
        borderRadius: 6,
        fontSize: 15,
        minWidth: 200,
        color: "#111",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        Ålder: {age} år
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Totalt kapital:</span>{" "}
        <span style={{ color: COLORS.total, fontWeight: 700 }}>
          {formatNumber(data.total)} kr
        </span>
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Ökning från start:</span>{" "}
        <span style={{ color: diff >= 0 ? "#27ae60" : "#c0392b", fontWeight: 700 }}>
          {diffSign}{formatNumber(Math.abs(diff))} kr
        </span>
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Avkastning:</span>{" "}
        <span style={{ color: COLORS.sparandeRanta, fontWeight: 700 }}>
          {formatNumber(
            data.total -
            (startNetworth + data.amortering + data.sparande)
          )} kr
        </span>
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Sparande:</span>{" "}
        <span style={{ color: COLORS.sparande, fontWeight: 700 }}>
          {formatNumber(data.sparande)} kr
        </span>
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Amortering:</span>{" "}
        <span style={{ color: COLORS.amortering, fontWeight: 700 }}>
          {formatNumber(data.amortering)} kr
        </span>
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Startkapital:</span>{" "}
        <span style={{ color: COLORS.start, fontWeight: 700 }}>
          {formatNumber(startNetworth)} kr
        </span>
      </div>
    </div>
  );
};

export default CustomTooltip;