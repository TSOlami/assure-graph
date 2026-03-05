"use client";

import clsx from "clsx";
import { AI_SIDEBAR_ALERTS, FAILED_TESTS_BREAKDOWN } from "@/data/monitoring";
import type { AlertSeverity } from "@/data/monitoring";

interface AISidebarProps {
  onViewAllAlerts: () => void;
}

function SidebarAlertIcon({ severity }: { severity: AlertSeverity }) {
  switch (severity) {
    case "critical":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="6.5" stroke="#ef4444" strokeWidth="1" />
          <path d="M8 5V8.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="10.5" r="0.6" fill="#ef4444" />
        </svg>
      );
    case "warning":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="6.5" stroke="#f59e0b" strokeWidth="1" />
          <path d="M8 5V8.5" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="10.5" r="0.6" fill="#f59e0b" />
        </svg>
      );
    case "success":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <circle cx="8" cy="8" r="6.5" stroke="#22c55e" strokeWidth="1" />
          <path d="M5.5 8L7.25 9.75L10.5 6.5" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

const alertCardBg: Record<AlertSeverity, string> = {
  critical: "bg-red-50 border-red-200",
  warning: "bg-amber-50 border-amber-200",
  info: "bg-blue-50 border-blue-200",
  success: "bg-green-50 border-green-200",
};

const confidenceTextColor: Record<AlertSeverity, string> = {
  critical: "text-red-400",
  warning: "text-amber-500",
  info: "text-blue-500",
  success: "text-green-500",
};

export default function AISidebar({ onViewAllAlerts }: AISidebarProps) {
  return (
    <div className="w-72 shrink-0 space-y-4">
      {/* AI Analysis Card */}
      <div className="bg-gray-900 rounded-xl p-4 text-white space-y-3.5">
        <h3 className="text-sm font-semibold">AI Analysis</h3>

        {AI_SIDEBAR_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className={clsx(
              "rounded-lg border p-3 space-y-1.5",
              alertCardBg[alert.severity]
            )}
          >
            <div className="flex items-start gap-2">
              <SidebarAlertIcon severity={alert.severity} />
              <p className="text-xs font-semibold text-gray-900 leading-snug">
                {alert.title}
              </p>
            </div>
            <p className="text-[11px] text-gray-500 pl-6">
              {alert.description}
            </p>
            <p
              className={clsx(
                "text-[10px] font-medium pl-6",
                confidenceTextColor[alert.severity]
              )}
            >
              AI Confidence: {alert.confidence}%
            </p>
            {alert.hasAutoFix && (
              <div className="pl-6">
                <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-white bg-brand-5 rounded-md hover:bg-brand-6 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 7L5 3.5L6.5 5L10 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 1.5H10V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Auto-Fix
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={onViewAllAlerts}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-brand-5 rounded-lg hover:bg-brand-6 transition-colors"
        >
          View All Alerts
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Failed Tests Breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Failed Tests</h3>
          <span className="text-lg font-bold text-brand-5">42</span>
        </div>

        <div className="space-y-2.5">
          {FAILED_TESTS_BREAKDOWN.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={clsx("h-full rounded-full", item.color)}
                    style={{ width: `${(item.count / 42) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-6 text-right">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
