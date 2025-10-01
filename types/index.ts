export interface CSVRow {
  Date: string;
  [museumName: string]: string;
}

export interface VisitorDataPoint {
  date: string;
  museum: string;
  value: number;
}
