"use client";

import { cn } from "@/lib/utils";

type StepStatus = "completed" | "in-progress" | "pending";

interface AuditStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  progress: number;
  actionLabel: string;
}

const steps: AuditStep[] = [
  {
    id: "1",
    title: "Evidence Sources",
    description: "Connect your systems to auto collect evidence",
    status: "completed",
    progress: 100,
    actionLabel: "Manage integrations",
  },
  {
    id: "2",
    title: "Control & Ownership",
    description: "Map controls with assign owners",
    status: "in-progress",
    progress: 65,
    actionLabel: "Review controls",
  },
  {
    id: "3",
    title: "Evidence Review",
    description: "Verify auto-collected evidence freshness",
    status: "in-progress",
    progress: 40,
    actionLabel: "Review evidence",
  },
];

const statusConfig: Record<
  StepStatus,
  { label: string; labelClass: string; iconColor: string; icon: string }
> = {
  completed: {
    label: "Completed",
    labelClass: "text-green-600 bg-green-50 border-green-200",
    iconColor: "#22c55e",
    icon: "lni-checkmark-circle",
  },
  "in-progress": {
    label: "In progress",
    labelClass: "text-orange-500 bg-orange-50 border-orange-200",
    iconColor: "#f97316",
    icon: "lni-timer",
  },
  pending: {
    label: "Pending",
    labelClass: "text-gray-400 bg-gray-50 border-gray-200",
    iconColor: "#9ca3af",
    icon: "lni-timer",
  },
};

export function AuditReadiness() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-5">
        <i
          className="lni lni-checkmark-circle text-base"
          style={{ color: "#f05a35" }}
        />
        <h2 className="text-sm font-semibold text-gray-900">
          Audit Readiness Progress
        </h2>
      </div>

      <div className="flex flex-col space-y-2">
        {steps.map((step) => {
          const cfg = statusConfig[step.status];
          return (
            <div key={step.id} className="py-4 bg-slate-50 rounded-lg">
              <div className="flex items-start justify-between mb-1 p-3 rounded-lg">
                <div className="flex items-start gap-3">
                  <i
                    className={cn("lni", cfg.icon, "text-lg mt-0.5")}
                    style={{ color: cfg.iconColor }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-md border whitespace-nowrap",
                    cfg.labelClass,
                  )}
                >
                  {cfg.label}
                </span>
              </div>

              <div className="pl-10 pr-4">
                <div className="w-full bg-brand-1 rounded-full h-1.5 mb-2.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${step.progress}%`,
                      backgroundColor: "#f05a35",
                    }}
                  />
                </div>
                <button className="flex items-center gap-1 text-xs font-medium text-brand-5 hover:text-brand-6 transition-colors">
                  {step.actionLabel}
                  <i className="lni lni-arrow-top-right text-xs" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
