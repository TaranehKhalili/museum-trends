import type { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
}

export default function DashboardCard({ children }: DashboardCardProps) {
  return <div className="bg-white rounded-lg shadow-lg p-6">{children}</div>;
}
