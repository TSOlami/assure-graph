import { cn } from "@/lib/utils";

type ActivityType = "upload" | "check" | "warning" | "user";

interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "upload",
    message: "12 new evidence items uploaded to SOC 2",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "check",
    message: "Access review completed for Engineering",
    time: "1 hr ago",
  },
  {
    id: "3",
    type: "warning",
    message: "3 controls flagged as overdue",
    time: "3 hr ago",
  },
  {
    id: "4",
    type: "user",
    message: "Sarah added as control owner for HR-04",
    time: "5 hr ago",
  },
];

const typeConfig: Record<
  ActivityType,
  { icon: string; bg: string; color: string }
> = {
  upload: { icon: "lni-upload", bg: "bg-blue-50", color: "#3b82f6" },
  check: { icon: "lni-checkmark", bg: "bg-green-50", color: "#22c55e" },
  warning: { icon: "lni-warning", bg: "bg-red-50", color: "#ef4444" },
  user: { icon: "lni-user", bg: "bg-orange-50", color: "#f97316" },
};

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <i className="lni lni-pulse text-base" style={{ color: "#f05a35" }} />
        <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="flex flex-col gap-3">
        {activities.map((a) => {
          const cfg = typeConfig[a.type];
          return (
            <div key={a.id} className="flex items-start gap-3">
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                  cfg.bg,
                )}
              >
                <i
                  className={cn("lni", cfg.icon, "text-xs")}
                  style={{ color: cfg.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-700 leading-relaxed">
                  {a.message}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
