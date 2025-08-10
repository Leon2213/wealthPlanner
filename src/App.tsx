import React, { useState, useEffect } from "react";
import InputRow from "./InputRow.tsx";
import MillionList from "./MillionList.tsx";
import Graph from "./Graph.tsx";
import SummaryInsights from "./SummaryInsights.tsx";
import { DataPoint, ColorMap, SummaryInsightsProps, GraphProps, MillionListProps, MillionMilestone, InputRowProps } from "./types";


const PENSION_AGE = 65;

const COLORS = {
  start: "#6a4c93",
  amortering: "#ff0088ff",
  sparande: "#ffc000",
  sparandeRanta: "#ff9800", 
  total: "#4f81bd"
};

const MILESTONES = [40, 50, 60, 65];

const App: React.FC = () => {
  const [startNetworth, setStartNetworth] = useState(800000);
  const [amortering, setAmortering] = useState(3500);
  const [sparande, setSparande] = useState(15000);
  const [years, setYears] = useState(10);
  const [startAge, setStartAge] = useState(32);
  const [tillPension, setTillPension] = useState(true);
  const [compound, setCompound] = useState(false); // 1. Ny state för ränta-på-ränta
  const [showAgeOnXAxis, setShowAgeOnXAxis] = useState(true); // Ålder är default
  const [includeAmortering, setIncludeAmortering] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Beräkna effectiveYears utifrån valt läge
  const calculatedYears = tillPension ? PENSION_AGE - startAge : years;
  const effectiveYears = calculatedYears > 0 ? calculatedYears : 0;

  const [data, setData] = useState<DataPoint[]>([]);

  // Här lägger vi till amorteringValue
  const amorteringValue = includeAmortering ? amortering : 0;

  useEffect(() => {
    const newData: DataPoint[] = [];
    for (let i = 0; i <= effectiveYears; i++) {
      const year = i;
      const amort = i === 0 ? 0 : amorteringValue * 12 * year;
      const spar = i === 0 ? 0 : sparande * 12 * year;
      let sparRanta = 0;
      let total = 0;

      if (compound && i > 0) {
        // Startkapital växer med ränta
        let kapitalMedRanta = startNetworth * Math.pow(1.07, year);

        // Lägg till varje års sparande, varje insättning får ränta från sitt år
        for (let y = 0; y < year; y++) {
          const insatt = sparande * 12;
          kapitalMedRanta += insatt * Math.pow(1.07, year - y - 1);
        }

        sparRanta = Math.round(kapitalMedRanta - startNetworth - spar);
        total = Math.round(kapitalMedRanta + amort);
      } else if (i > 0) {
        sparRanta = 0;
        total = startNetworth + amort + spar;
      } else {
        // År 0: bara startvärden
        sparRanta = 0;
        total = startNetworth;
      }

      const noCompoundTotal = startNetworth + amort + spar;

      newData.push({
        year,
        start: startNetworth,
        amortering: amort,
        sparande: spar,
        sparandeRanta: sparRanta,
        total,
        noCompoundTotal,
      });
    }
    setData(newData);
  }, [startNetworth, amortering, sparande, tillPension, startAge, years, effectiveYears, compound, includeAmortering]);

  // Funktion som returnerar summering för ett visst åldersmål (milestone)
  function milestoneSummary(age: number) {
    const y = age - startAge;
    if (y <= 0) return null; // Ignorera om milestone före startålder

    let sparandeTot = 0;
    let rantaTot = 0;
    if (compound) {
      for (let i = 0; i < y; i++) {
        const insatt = sparande * 12;
        const beloppVidStart = insatt * Math.pow(1.07, y - i - 1);
        sparandeTot += insatt;
        rantaTot += beloppVidStart - insatt;
      }
      sparandeTot = Math.round(sparandeTot);
      rantaTot = Math.round(rantaTot);
    } else {
      sparandeTot = sparande * 12 * y;
      rantaTot = 0;
    }

    return {
      amorteringTot: amorteringValue * 12 * y,
      sparandeTot,
      rantaTot,
      total: startNetworth + amorteringValue * 12 * y + sparandeTot + rantaTot,
      years: y,
      age,
    };
  }

  function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


  // Funktion för att hitta när varje miljon nås
  function millionMilestones(data: DataPoint[], startAge: number) {
    const result: { million: number; year: number; months: number; age: number }[] = [];
    let nextMil = 1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].total >= nextMil * 1_000_000) {
        // Exakt när under året?
        const prev = i === 0 ? 0 : data[i - 1].total;
        const yearFraction =
          prev < nextMil * 1_000_000
            ? (nextMil * 1_000_000 - prev) / (data[i].total - prev)
            : 0;
        const totalMonths = (i - 1) * 12 + Math.round(12 * yearFraction);
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        result.push({
          million: nextMil,
          year: years,
          months,
          age: startAge + years,
        });
        nextMil++;
        if (nextMil > 10) break; // max 10 miljoner
      }
    }
    return result;
  }

  const millionList = millionMilestones(data, startAge);

  // Lägg till före return:
  const maxY = Math.max(...data.map(d => d.total || 0), 1);
  const maxMiljon = Math.ceil(maxY / 1_000_000);
  const yTicks = Array.from({ length: maxMiljon + 1 }, (_, i) => i * 1_000_000);

  // Innan return i App-komponenten:
const summaryInsightsProps: SummaryInsightsProps = {
  milestones: MILESTONES,
  milestoneSummary,
  COLORS,
  startNetworth,
  formatNumber,
};

const graphProps: GraphProps = {
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
};

const inputRowProps: InputRowProps = {
  startAge,
  setStartAge,
  effectiveYears,
  years,
  setYears,
  tillPension,
  setTillPension,
  startNetworth,
  setStartNetworth,
  amortering,
  setAmortering,
  sparande,
  setSparande,
  compound,
  setCompound,
  COLORS,
  includeAmortering,
  setIncludeAmortering,
};

  return (
    <div
      style={{
        // maxWidth: 1100,  // Ta bort eller kommentera ut denna rad
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >  <h1 style={{ color: "#1976d2", textAlign: "center", marginBottom: 2, marginTop: -10 }}>
      Ekonomiprognos
    </h1>
      {/* Första rad: Ålder, år, checkbox */}
      <InputRow {...inputRowProps}
      />

      

      {/* Container med graf + summering */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          maxWidth: 1000,
          margin: "0 auto",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <Graph {...graphProps}/>
        <SummaryInsights {...summaryInsightsProps} />

        {/* Skala ner MillionList till 80% */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 0 }}>
          <div
            style={{
              transform: "scale(0.8)",
              transformOrigin: "top center",
              margin: "0 auto",
              display: "block",
              width: "fit-content",
            }}
          >
            <MillionList millionList={millionList} />
          </div>
        </div>
      </div>


    </div>
  );
};

export default App;
