import { cn } from "@/lib/utils";

type Urgency = "Urgent" | "Medium" | "Low";

interface Deadline {
  id: string;
  title: string;
  dueLabel: string;
  urgency: Urgency;
}

const deadlines: Deadline[] = [
  {
    id: "1",
    title: "Quarterly Access Review",
    dueLabel: "Due in 3 days",
    urgency: "Urgent",
  },
  {
    id: "2",
    title: "Policy Acknowledgement",
    dueLabel: "Due in 5 days",
    urgency: "Medium",
  },
  {
    id: "3",
    title: "Vendors Risk Assessment",
    dueLabel: "Due in 7 days",
    urgency: "Low",
  },
];

const urgencyConfig: Record<Urgency, { className: string }> = {
  Urgent: { className: "bg-red-50 text-red-600 border-red-200" },
  Medium: { className: "bg-orange-50 text-orange-500 border-orange-200" },
  Low: { className: "bg-gray-50 text-gray-500 border-gray-200" },
};

export function UpcomingDeadlines() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <i className="lni lni-timer text-base" style={{ color: "#f05a35" }} />
        <h2 className="text-sm font-semibold text-gray-900">
          Upcoming Deadlines
        </h2>
      </div>

      <div className="flex flex-col space-y-2">
        {deadlines.map((d) => (
          <div key={d.id} className="p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-sm font-semibold text-gray-900">{d.title}</p>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-md border",
                  urgencyConfig[d.urgency].className,
                )}
              >
                {d.urgency}
              </span>
            </div>
            <p className="text-xs font-semibold text-brand-4">{d.dueLabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
