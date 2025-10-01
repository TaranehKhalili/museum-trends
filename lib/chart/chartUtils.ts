import type { VisitorDataPoint, ChartSeries } from "@/types";

export function transformDataToChartSeries(
  data: VisitorDataPoint[]
): ChartSeries[] {
  const museumData = new Map<string, { date: string; value: number }[]>();

  for (const point of data) {
    if (!museumData.has(point.museum)) {
      museumData.set(point.museum, []);
    }
    museumData.get(point.museum)?.push({
      date: point.date,
      value: point.value,
    });
  }

  return Array.from(museumData.entries()).map(([museum, points]) => {
    const sortedPoints = points
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((p): [number, number] => [new Date(p.date).getTime(), p.value]);

    return {
      name: museum,
      data: sortedPoints,
      type: "line" as const,
    };
  });
}
