import { getVisitorData } from "@/lib/dataService";

export default function TestPage() {
  const data = getVisitorData();

  return (
    <div>
      <h1>Data Test</h1>
      <p>Total: {data.length}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
