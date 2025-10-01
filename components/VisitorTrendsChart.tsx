"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
import type { VisitorDataPoint } from "@/types";
import { transformDataToChartSeries } from "@/lib/chart/chartUtils";
import { createVisitorTrendsChartOptions } from "@/lib/chart/chartConfig";

interface VisitorTrendsChartProps {
  data: VisitorDataPoint[];
}

export default function VisitorTrendsChart({ data }: VisitorTrendsChartProps) {
  const options = useMemo(() => {
    const series = transformDataToChartSeries(data);
    return createVisitorTrendsChartOptions(series);
  }, [data]);

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
