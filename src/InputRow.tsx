import React from "react";
import { NumericFormat } from "react-number-format";

const labelStyle = { minWidth: 160, display: "flex", flexDirection: "column", alignItems: "flex-start" };
const inputStyle = { width: 120, padding: 6 };

const colorBoxStyle = (color: string) => ({
  width: 14,
  height: 14,
  backgroundColor: color,
  borderRadius: 3,
  border: "1px solid #bbb",
  display: "inline-block",
  marginLeft: 8,
});

const InputRow = ({
  startAge, setStartAge,
  effectiveYears, years, setYears,
  tillPension, setTillPension,
  startNetworth, setStartNetworth,
  amortering, setAmortering,
  sparande, setSparande,
  compound, setCompound,
  includeAmortering, setIncludeAmortering,
  COLORS
}) => (
  <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
    <div style={{ marginLeft: 60, transform: "scale(0.92)", transformOrigin: "left" }}>
      {/* Rad 1: Ålder, år, till pension */}
      <div style={{ display: "flex", gap: 32, justifyContent: "flex-start", marginBottom: 10 }}>
        <label style={labelStyle}>
          <span>Startålder:</span>
          <NumericFormat
            value={startAge}
            thousandSeparator=" "
            onValueChange={v => {
              const val = Number(v.value);
              if (val >= 0 && val <= 120) setStartAge(val);
            }}
            allowNegative={false}
            decimalScale={0}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          <span>Antal år:</span>
          <NumericFormat
            value={effectiveYears}
            thousandSeparator=" "
            onValueChange={v => {
              if (!tillPension) {
                const val = Number(v.value);
                if (val >= 1 && val <= 100) setYears(val);
              }
            }}
            allowNegative={false}
            decimalScale={0}
            style={{
              ...inputStyle,
              backgroundColor: tillPension ? "#eee" : "white",
              color: tillPension ? "#aaa" : "#222",
              border: "1px solid #888",
              outline: "none",
              boxShadow: "none",
            }}
            disabled={tillPension}
          />
        </label>
        <label style={{
          display: "flex", alignItems: "center", marginTop: 24, minWidth: 180, fontSize: 15, fontWeight: 400
        }}>
          <input
            type="checkbox"
            checked={tillPension}
            onChange={e => setTillPension(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Till pension (65 år)
        </label>
      </div>
      {/* Rad 2: Startkapital, amortering, sparande */}
      <div style={{ display: "flex", gap: 32, justifyContent: "flex-start", alignItems: "flex-end" }}>
        <label style={labelStyle}>
          <span>Startkapital (kr):</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <NumericFormat
              value={startNetworth}
              thousandSeparator=" "
              onValueChange={v => setStartNetworth(Number(v.value))}
              allowNegative={false}
              decimalScale={0}
              style={inputStyle}
            />
            {/* <div style={colorBoxStyle(COLORS.start)} /> */}
          </div>
        </label>
        <label style={{ ...labelStyle, marginLeft: -25 }}>
          <span style={{ marginLeft: 28 }}>Amortering/mån (kr):</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={includeAmortering}
              onChange={e => setIncludeAmortering(e.target.checked)}
              style={{ marginRight: 6 }}
              title="Räkna med amortering"
            />
            <NumericFormat
              value={amortering}
              thousandSeparator=" "
              onValueChange={v => setAmortering(Number(v.value))}
              allowNegative={false}
              decimalScale={0}
              style={{
                ...inputStyle,
                backgroundColor: includeAmortering ? "white" : "#eee",
                color: includeAmortering ? "#222" : "#aaa",
                border: "1px solid #888",
                outline: "none",
                boxShadow: "none",
              }}
              disabled={!includeAmortering}
            />
            {/* <div style={colorBoxStyle(COLORS.amortering)} /> */}
          </div>
        </label>
        <label style={labelStyle}>
          <span>Sparande/mån (kr):</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <NumericFormat
              value={sparande}
              thousandSeparator=" "
              onValueChange={v => setSparande(Number(v.value))}
              allowNegative={false}
              decimalScale={0}
              style={inputStyle}
            />
            {/* <div style={colorBoxStyle(COLORS.sparande)} /> */}
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              userSelect: "none",
              fontWeight: 400,
              fontSize: 14,
              whiteSpace: "nowrap",
              marginLeft: 12,
            }}>
              <input
                type="checkbox"
                checked={compound}
                onChange={e => setCompound(e.target.checked)}
                style={{ marginRight: 4 }}
              />
              Ränta på sparande (7%/år)
            </label>
          </div>
        </label>
      </div>
    </div>
  </div>
);

export default InputRow;