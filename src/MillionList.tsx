import React from "react";

interface MillionListProps {
  millionList: { million: number; year: number; months: number; age: number }[];
}

const MillionList: React.FC<MillionListProps> = ({ millionList }) => (
  <div
    style={{
      width: "fit-content",
      margin: "0 auto 32px auto",
      textAlign: "center",
    }}
  >
    <h3 style={{ marginLeft: 8, marginBottom: 12, fontSize: 22, color: "#2979ff", letterSpacing: 0.5 }}>
      När nås varje miljon?
    </h3>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 24,
        fontSize: 16,
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "wrap",
        marginLeft: 8,
      }}
    >
      {millionList.length === 0 && (
        <div style={{ color: "#888", fontStyle: "italic", fontSize: 17, padding: 18 }}>
          Ingen miljon nås under perioden.
        </div>
      )}
      {millionList.map((m) => {
        const ordningstal = m.million === 1
          ? "1:a"
          : m.million === 2
          ? "2:a"
          : m.million === 3
          ? "3:e"
          : `${m.million}:e`;

        return (
          <div
            key={m.million}
            style={{
              border: "1.5px solid #64b5f6",
              boxShadow: "0 2px 8px #90caf933",
              padding: 18,
              borderRadius: 12,
              background: "#e3f2fd",
              minWidth: 190,
              minHeight: 90,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <div style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1565c0",
              marginBottom: 2,
              lineHeight: 1.1,
            }}>
              {ordningstal} <span style={{ fontSize: 18, fontWeight: 500, color: "#2979ff" }}>miljonen</span>
            </div>
            <div style={{ fontSize: 15, color: "#222", marginBottom: 2 }}>
              Efter <strong>{m.year} år</strong>
              {m.months > 0 && <> och <strong>{m.months} mån</strong></>}
            </div>
            <div style={{ fontSize: 14, color: "#555" }}>
              <span style={{ fontWeight: 400 }}>
                (vid <strong>{m.age}</strong>
                {m.months > 0 && <span> år + <strong>{m.months}</strong> mån</span>})
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default MillionList;