"use client";

import clsx from "clsx";
import { Audit, AuditStatus } from "@/data/audit";

const statusConfig: Record<AuditStatus, { bg: string; text: string; icon: string }> = {
  "In-progress": { bg: "bg-orange-50", text: "text-orange-600", icon: "🔄" },
  Planning: { bg: "bg-blue-50", text: "text-blue-600", icon: "📋" },
  Completed: { bg: "bg-green-50", text: "text-green-600", icon: "✅" },
};

const frameworkIcons: Record<string, React.ReactNode> = {
  soc2: (
    <div className="w-10 h-10 rounded-lg bg-[#1a1a2e] flex items-center justify-center shrink-0">
      <span className="text-[10px] font-bold text-white leading-tight text-center">
        <span className="text-red-400">AICPA</span>
        <br />
        SOC
      </span>
    </div>
  ),
  iso27001: (
    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
      <span className="text-[9px] font-bold text-white leading-tight text-center">ISO</span>
    </div>
  ),
  gdpr: (
    <div className="w-10 h-10 rounded-lg bg-[#1a1a2e] flex items-center justify-center shrink-0">
      <span className="text-[10px] font-bold text-white leading-tight text-center">
        <span className="text-red-400">AICPA</span>
        <br />
        SOC
      </span>
    </div>
  ),
};

interface AuditCardProps {
  audit: Audit;
  onClick: (audit: Audit) => void;
}

export default function AuditCard({ audit, onClick }: AuditCardProps) {
  const status = statusConfig[audit.status];

  return (
    <div
      onClick={() => onClick(audit)}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {frameworkIcons[audit.frameworkIcon]}
          <div>
            <p className="text-xs text-gray-500">{audit.code}</p>
            <h3 className="text-sm font-semibold text-gray-900">{audit.name}</h3>
          </div>
        </div>
        <span className={clsx("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", status.bg, status.text)}>
          {audit.status === "In-progress" && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" /></svg>
          )}
          {audit.status === "Planning" && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" /></svg>
          )}
          {audit.status === "Completed" && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M4 6L5.5 7.5L8 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
          {audit.status}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-medium text-gray-700">{audit.progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={clsx(
              "h-full rounded-full transition-all",
              audit.progress === 100 ? "bg-green-500" : "bg-brand-5"
            )}
            style={{ width: `${audit.progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">
            {audit.controls.completed}/{audit.controls.total}
          </p>
          <p className="text-xs text-gray-500">Controls</p>
        </div>
        <div className="text-center">
          <p className={clsx("text-lg font-bold", audit.findings > 0 ? "text-brand-5" : "text-gray-900")}>
            {audit.findings}
          </p>
          <p className="text-xs text-gray-500">Findings</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{audit.aiMapped}</p>
          <p className="text-xs text-gray-500">AI Mapped</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M1.5 5.5H12.5" stroke="currentColor" strokeWidth="1.2" /><path d="M4.5 1V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M9.5 1V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
            {audit.startDate} - {audit.endDate}
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" /><path d="M2.5 12.5C2.5 10 4.5 8.5 7 8.5C9.5 8.5 11.5 10 11.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
            {audit.auditor} +{audit.auditorCount}
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
