"use client";

import { useMemo } from "react";
import VisitorTrendsChart from "./VisitorTrendsChart";
import { useVisitorUpdates } from "@/hooks/useVisitorUpdates";
import type { VisitorDataPoint } from "@/types";

interface RealTimeChartWrapperProps {
  initialData: VisitorDataPoint[];
}

export default function RealTimeChartWrapper({
  initialData,
}: RealTimeChartWrapperProps) {
  const { updates, isConnected, error } = useVisitorUpdates();

  const chartData = useMemo(() => {
    if (updates.length === 0) {
      return initialData;
    }

    const dataMap = new Map<string, VisitorDataPoint>();

    for (const point of initialData) {
      const key = `${point.date}-${point.museum}`;
      dataMap.set(key, point);
    }

    for (const point of updates) {
      const key = `${point.date}-${point.museum}`;
      dataMap.set(key, point);
    }

    return Array.from(dataMap.values());
  }, [initialData, updates]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-4 h-4 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {isConnected && (
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping opacity-75" />
            )}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {isConnected ? "Live Updates Active" : "Connecting..."}
          </span>
          {error && <span className="text-xs text-red-500">({error})</span>}
        </div>
      </div>

      <VisitorTrendsChart data={chartData} />
    </div>
  );
}
