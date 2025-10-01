import RealTimeChartWrapper from "./RealTimeChartWrapper";
import DashboardCard from "./DashboardCard";
import StateDisplay from "./StateDisplay";
import { loadInitialData } from "@/lib/data/dataService";
import type { VisitorDataPoint } from "@/types";

export default function VisitorDashboard() {
  let initialData: VisitorDataPoint[] = [];
  let error: string | null = null;

  try {
    const result = loadInitialData();
    initialData = result.initialData;
    error = result.error;
  } catch (e) {
    error = "An unexpected error occurred while loading the dashboard.";
    console.error("Unexpected error in VisitorDashboard:", e);
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <DashboardCard>
          {error ? (
            <StateDisplay
              type="error"
              title="Unable to Load Data"
              message={error}
            />
          ) : initialData.length === 0 ? (
            <StateDisplay
              type="empty"
              title="No Data Available"
              message="There is no visitor data to display at this time."
            />
          ) : (
            <RealTimeChartWrapper initialData={initialData} />
          )}
        </DashboardCard>
      </div>
    </main>
  );
}
