import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import CustomTooltip from "./CustomTooltip.tsx";

interface GraphProps {
  data: any[];
  COLORS: any;
  startAge: number;
  startNetworth: number;
  sparande: number;
  amorteringValue: number;
  formatNumber: (num: number) => string;
  compound: boolean;
  includeAmortering: boolean;
  showAgeOnXAxis: boolean;
  setShowAgeOnXAxis: (v: boolean) => void;
}

const Graph: React.FC<GraphProps> = ({
  data,
  COLORS,
  startAge,
  startNetworth,
  sparande,
  amorteringValue,
  formatNumber,
  compound,
  includeAmortering,
  showAgeOnXAxis,
  setShowAgeOnXAxis,
}) => {
  // Beräkna yTicks för miljoner
  const maxY = Math.max(...data.map((d) => d.total || 0), 1);
  const maxMiljon = Math.ceil(maxY / 1_000_000);
  const yTicks = Array.from({ length: maxMiljon + 1 }, (_, i) => i * 1_000_000);

  return (
    <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto", background: "#fff", height: 480 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            interval={0}
            label={{
              value: showAgeOnXAxis ? "Ålder" : "År",
              position: "insideBottomRight",
              offset: -10,
            }}
            tickFormatter={(tick) =>
              showAgeOnXAxis ? `${startAge + tick} ` : ` ${tick}`
            }
          />
          <YAxis
            interval={0}
            ticks={yTicks}
            label={{
              value: "Belopp (kr)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
            tickFormatter={(tick) => (tick === 0 ? "0" : `${tick / 1_000_000} M`)}
          />
          <Tooltip
            content={
              <CustomTooltip
                COLORS={COLORS}
                startAge={startAge}
                startNetworth={startNetworth}
                sparande={sparande}
                amortering={amorteringValue}
                formatNumber={formatNumber}
              />
            }
          />
          <Bar dataKey="start" stackId="a" fill={COLORS.start} />
          <Bar
            dataKey="amortering"
            stackId="a"
            fill={COLORS.amortering}
            hide={!includeAmortering}
          />
          <Bar dataKey="sparande" stackId="a" fill={COLORS.sparande} />
          <Bar
            dataKey="sparandeRanta"
            stackId="a"
            fill={COLORS.sparandeRanta}
            name="Avkastning"
            hide={!compound}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke={COLORS.total}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 5 }}
          />
        </BarChart>
      </ResponsiveContainer>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          justifyContent: "center",
          margin: "12px 0",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: COLORS.start,
              borderRadius: 3,
            }}
          />
          Startkapital
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: COLORS.amortering,
              borderRadius: 3,
            }}
          />
          Amortering
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: COLORS.sparande,
              borderRadius: 3,
            }}
          />
          Sparande
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            opacity: compound ? 1 : 0.4,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: compound ? COLORS.sparandeRanta : "#eee",
              borderRadius: 3,
              border: "1px solid #ccc",
            }}
          />
          Avkastning
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 22,
              height: 0,
              borderTop: `3px solid ${COLORS.total}`,
              borderRadius: 2,
              marginTop: 2,
              marginBottom: 2,
              background: "none",
            }}
          />
          Totalt kapital
        </div>
        {/* Toggle längst till höger */}
        <div
          style={{
            marginLeft: 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontWeight: showAgeOnXAxis ? 700 : 400,
              color: showAgeOnXAxis ? "#222" : "#888",
              fontSize: 13,
            }}
          >
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
          <span
            style={{
              fontWeight: !showAgeOnXAxis ? 700 : 400,
              color: !showAgeOnXAxis ? "#222" : "#888",
              fontSize: 13,
            }}
          >
            Visa år
          </span>
        </div>
      </div>
    </div>
  );
};

export default Graph;