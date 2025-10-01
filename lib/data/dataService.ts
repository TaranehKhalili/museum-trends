import Papa from "papaparse";
import fs from "fs";
import path from "path";
import type { VisitorDataPoint, CSVRow } from "@/types";

export function parseCSVToDataPoints(csvString: string): VisitorDataPoint[] {
  const result = Papa.parse<CSVRow>(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  const dataPoints: VisitorDataPoint[] = [];

  for (const row of result.data) {
    const date = row.Date;

    for (const key in row) {
      if (key !== "Date") {
        const museum = key;
        const value = parseInt(row[key], 10);

        dataPoints.push({
          date,
          museum,
          value,
        });
      }
    }
  }

  return dataPoints;
}

export function getVisitorData(): VisitorDataPoint[] {
  const filePath = path.join(process.cwd(), "data", "museum_visitors.csv");
  const csvContent = fs.readFileSync(filePath, "utf-8");
  return parseCSVToDataPoints(csvContent);
}

export function getMuseumNames(data: VisitorDataPoint[]): string[] {
  const museums = new Set<string>();
  for (const point of data) {
    museums.add(point.museum);
  }
  return Array.from(museums);
}
