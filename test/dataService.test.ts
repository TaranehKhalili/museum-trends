import { describe, it, expect } from "vitest";
import { getVisitorData } from "@/lib/data/dataService";
import type { VisitorDataPoint } from "@/types";

describe("Initial Data Load", () => {
  it("should load visitor data successfully", () => {
    const data = getVisitorData();

    // Check that data is an array
    expect(Array.isArray(data)).toBe(true);

    // Check that we have some data
    expect(data.length).toBeGreaterThan(0);

    // Check that each data point has the correct structure
    data.forEach((point: VisitorDataPoint) => {
      expect(point).toHaveProperty("date");
      expect(point).toHaveProperty("museum");
      expect(point).toHaveProperty("value");

      expect(typeof point.date).toBe("string");
      expect(typeof point.museum).toBe("string");
      expect(typeof point.value).toBe("number");

      // Check date format (YYYY-MM-DD)
      expect(point.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      // Check that value is positive
      expect(point.value).toBeGreaterThan(0);
    });

    // Check that we have multiple museums
    const museums = [...new Set(data.map((point) => point.museum))];
    expect(museums.length).toBeGreaterThan(1);

    console.log(
      `✅ Loaded ${data.length} data points from ${museums.length} museums`
    );
  });
});
