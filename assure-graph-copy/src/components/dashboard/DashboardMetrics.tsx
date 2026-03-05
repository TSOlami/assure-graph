import { cn } from "@/lib/utils";

interface MetricItem {
  icon: string;
  iconBg: string;
  iconColor: string;
  trend: string;
  trendColor: string;
  value: string;
  label: string;
}

const stats: MetricItem[] = [
  {
    icon: "lni-database",
    iconBg: "bg-blue-50",
    iconColor: "#3b82f6",
    trend: "+40%",
    trendColor: "text-green-500",
    value: "64/89",
    label: "Controls",
  },
  {
    icon: "lni-users",
    iconBg: "bg-red-50",
    iconColor: "#f97316",
    trend: "+5%",
    trendColor: "text-green-500",
    value: "45",
    label: "Team members",
  },
  {
    icon: "lni-folder",
    iconBg: "bg-green-50",
    iconColor: "#22c55e",
    trend: "+10%",
    trendColor: "text-green-500",
    value: "156",
    label: "Evidence Item",
  },
  {
    icon: "lni-folder",
    iconBg: "bg-orange-50",
    iconColor: "#f59e0b",
    trend: "+8%",
    trendColor: "text-green-500",
    value: "12",
    label: "Open Findings",
  },
];

interface MetricCardProps {
  stat: MetricItem;
}

function MetricCard({ stat }: MetricCardProps) {
  return (
    <div className="bg-slate-50 rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
      {/* Top row: icon + trend */}
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            stat.iconBg,
          )}
        >
          <i
            className={cn("lni", stat.icon, "text-base")}
            style={{ color: stat.iconColor }}
          />
        </div>
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-semibold",
            stat.trendColor,
          )}
        >
          <i className="lni lni-arrow-up-right text-xs" />
          {stat.trend}
        </span>
      </div>

      {/* Bottom: value + label */}
      <div>
        <p className="text-xl font-bold text-gray-900 leading-tight">
          {stat.value}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
      </div>
    </div>
  );
}

interface DashboardMetricsProps {
  className?: string;
}

export function DashboardMetrics({ className }: DashboardMetricsProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-3", className)}>
      {stats.map((stat, i) => (
        <MetricCard key={i} stat={stat} />
      ))}
    </div>
  );
}
