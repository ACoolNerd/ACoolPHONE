import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  { label: "Total Devices",  value: "—", icon: "📱" },
  { label: "Active Tasks",   value: "—", icon: "⚙️" },
  { label: "Online Devices", value: "—", icon: "🟢" },
  { label: "Error Rate",     value: "—", icon: "⚠️" },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Overview of your ACoolPHONE environment.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <span>{stat.icon}</span>
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder activity feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-slate-400">
            No recent activity. Connect a device or schedule a task to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
