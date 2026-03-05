"use client";

import { useState } from "react";
import clsx from "clsx";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { XmarkOutlined } from "@lineiconshq/free-icons";
import type { AIAlert, AlertSeverity } from "@/data/monitoring";
import { MOCK_ALERTS } from "@/data/monitoring";

interface AIAlertsPanelProps {
  onClose: () => void;
}

const TABS: { key: AlertSeverity | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "critical", label: "Critical" },
  { key: "warning", label: "Warning" },
  { key: "info", label: "Info" },
  { key: "success", label: "Success" },
];

const tabColors: Record<string, string> = {
  all: "text-brand-5 border-brand-5",
  critical: "text-red-500 border-red-500",
  warning: "text-amber-500 border-amber-500",
  info: "text-blue-500 border-blue-500",
  success: "text-green-500 border-green-500",
};

function SeverityIcon({ severity }: { severity: AlertSeverity }) {
  switch (severity) {
    case "critical":
      return (
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M8 5V8.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="10.75" r="0.75" fill="#ef4444" />
          </svg>
        </div>
      );
    case "warning":
      return (
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#f59e0b" strokeWidth="1.5" />
            <path d="M8 5V8.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="10.75" r="0.75" fill="#f59e0b" />
          </svg>
        </div>
      );
    case "info":
      return (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#3b82f6" strokeWidth="1.5" />
            <path d="M8 5V5.01" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 7V11" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );
    case "success":
      return (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#22c55e" strokeWidth="1.5" />
            <path d="M5.5 8L7.25 9.75L10.5 6.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
  }
}

const cardBg: Record<AlertSeverity, string> = {
  critical: "bg-red-50 border-red-200",
  warning: "bg-amber-50 border-amber-200",
  info: "bg-blue-50 border-blue-200",
  success: "bg-green-50 border-green-200",
};

const confidenceColor: Record<AlertSeverity, string> = {
  critical: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
  success: "text-green-500",
};

function AlertCard({ alert }: { alert: AIAlert }) {
  return (
    <div
      className={clsx(
        "rounded-xl border p-4 space-y-2.5",
        cardBg[alert.severity]
      )}
    >
      <div className="flex items-start gap-3">
        <SeverityIcon severity={alert.severity} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 leading-snug">
            {alert.title}
          </h4>
          <p className="text-sm text-gray-500 mt-0.5">{alert.description}</p>
        </div>
      </div>

      {alert.affectedControls.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500">Affected controls:</span>
          {alert.affectedControls.map((ctrl) => (
            <span
              key={ctrl}
              className="text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded px-2 py-0.5"
            >
              {ctrl}
            </span>
          ))}
        </div>
      )}

      <p
        className={clsx(
          "text-xs font-medium",
          confidenceColor[alert.severity]
        )}
      >
        AI Confidence: {alert.confidence}%
      </p>

      {alert.hasAutoFix && (
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-brand-5 rounded-lg hover:bg-brand-6 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7.5L5.5 4L7 5.5L11.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 1.5H11.5V4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Auto-Fix
        </button>
      )}
    </div>
  );
}

export default function AIAlertsPanel({ onClose }: AIAlertsPanelProps) {
  const [activeTab, setActiveTab] = useState<AlertSeverity | "all">("all");

  const filteredAlerts =
    activeTab === "all"
      ? MOCK_ALERTS
      : MOCK_ALERTS.filter((a) => a.severity === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 flex flex-col max-h-[90vh]">
        <div className="px-6 pt-5 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4.5 7V17L12 22L19.5 17V7L12 2Z" stroke="#7c3aed" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 8V12" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 14L12 12L16 14" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-base font-semibold text-gray-900">
                AI Powered Alerts
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Lineicons icon={XmarkOutlined} size={20} aria-hidden />
            </button>
          </div>

          <div className="flex items-center gap-4 border-b border-gray-100">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={clsx(
                  "pb-2.5 text-sm font-medium transition-colors border-b-2",
                  activeTab === tab.key
                    ? tabColors[tab.key]
                    : "text-gray-400 border-transparent hover:text-gray-600"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5">
          {filteredAlerts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No alerts in this category
            </p>
          ) : (
            filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-5 rounded-lg hover:bg-brand-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 4.5L8 6.5L13 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 2H13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Apply All Auto-Fixes
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
}
