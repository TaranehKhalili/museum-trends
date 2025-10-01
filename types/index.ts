export interface CSVRow {
  Date: string;
  [museumName: string]: string;
}

export interface VisitorDataPoint {
  date: string;
  museum: string;
  value: number;
}

export interface ChartSeries {
  name: string;
  data: [number, number][];
  type: "line";
}
