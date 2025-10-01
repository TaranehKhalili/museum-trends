import Papa from "papaparse";
import fs from "fs";
import path from "path";
import type { VisitorDataPoint, CSVRow } from "@/types";
import { DATA_CONFIG } from "@/lib/constants";

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
  const filePath = path.join(process.cwd(), DATA_CONFIG.CSV_FILE_PATH);

  if (!fs.existsSync(filePath)) {
    throw new Error("Data file not found");
  }

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

interface DataResult {
  initialData: VisitorDataPoint[];
  error: string | null;
}

export function loadInitialData(): DataResult {
  try {
    const data = getVisitorData();
    return { initialData: data, error: null };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    console.error("Error loading initial data:", errorMessage);

    return {
      initialData: [],
      error:
        errorMessage === "Data file not found"
          ? "Data file not found. Please check if the CSV file exists."
          : "Failed to load visitor data. Please try again later.",
    };
  }
}
