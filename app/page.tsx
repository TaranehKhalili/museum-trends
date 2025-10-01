import RealTimeChartWrapper from "@/components/RealTimeChartWrapper";
import { getVisitorData } from "@/lib/data/dataService";

export default function Home() {
  const initialData = getVisitorData();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Museum Visitor Trends Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <RealTimeChartWrapper initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
