// En datapunkt för grafen
export interface DataPoint {
  year: number;
  start: number;
  amortering: number;
  sparande: number;
  total: number;
  noCompoundTotal?: number;
  sparandeRanta?: number;
}

// Färgobjekt
export interface ColorMap {
  start: string;
  amortering: string;
  sparande: string;
  sparandeRanta: string;
  total: string;
}

// Props till SummaryInsights
export interface SummaryInsightsProps {
  milestones: number[];
  milestoneSummary: (age: number) => {
    amorteringTot: number;
    sparandeTot: number;
    rantaTot: number;
    total: number;
    years: number;
    age: number;
  } | null;
  COLORS: ColorMap;
  startNetworth: number;
  formatNumber: (num: number) => string;
}

// Props till Graph
export interface GraphProps {
  data: DataPoint[];
  COLORS: ColorMap;
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

// Million milestone
export interface MillionMilestone {
  million: number;
  year: number;
  months: number;
  age: number;
}

// Props till MillionList
export interface MillionListProps {
  millionList: MillionMilestone[];
}

export interface InputRowProps {
  startAge: number;
  setStartAge: (age: number) => void;
  effectiveYears: number;
  years: number;
  setYears: (years: number) => void;
  tillPension: boolean;
  setTillPension: (tillPension: boolean) => void;
  startNetworth: number;
  setStartNetworth: (networth: number) => void;
  amortering: number;
  setAmortering: (amortering: number) => void;
  sparande: number;
  setSparande: (sparande: number) => void;
  compound: boolean;
  setCompound: (compound: boolean) => void;
  COLORS: ColorMap;
  includeAmortering: boolean;
  setIncludeAmortering: (include: boolean) => void;
}