"use client";

import { useState } from "react";
import clsx from "clsx";
import { REPORTS } from "@/data/audit";
import { AIBanner } from "@/components/ui/AIBanner";
import CreateReportModal from "./modals/CreateReportModal";

export default function ReportsContent() {
  const [modal, setModal] = useState<"create-report" | null>(null);

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 pt-5 pb-5">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <button
            onClick={() => setModal("create-report")}
            className="flex items-center gap-2 px-4 py-2 bg-brand-5 text-white rounded-lg text-sm font-medium hover:bg-brand-6 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Create Report
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 bg-[#F5F5F7]">
        {/* AI Banner */}
        <AIBanner
          title="AI-Generated Report Recommendation"
          confidence="97% Confident"
          description="Based on your audit schedule and recent activity, AssureGraph AI recommends creating a 'Pre-Audit Readiness Report' to identify gaps before your upcoming SOC 2 audit."
          primaryActionLabel="Create Recommended Report"
        />

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {REPORTS.map((report) => (
            <div key={report.id} className="bg-white rounded-xl border border-gray-200 p-5">
              {/* Badge */}
              <div className="mb-4">
                <span className={clsx(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                  report.badge === "AI Generated"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                )}>
                  {report.badge === "AI Generated" && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1L7 3.5L9.5 4L7 4.5L6 7L5 4.5L2.5 4L5 3.5L6 1Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
                    </svg>
                  )}
                  {report.badge === "Manual" && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 8.5L8.5 2.5L9.5 3.5L3.5 9.5H2.5V8.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                    </svg>
                  )}
                  {report.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-4">{report.title}</h3>

              {/* Details */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Frequency:</span>
                  <span className="text-sm font-medium text-gray-700">{report.frequency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last run:</span>
                  <span className="text-sm font-medium text-gray-700">{report.lastRun}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  View
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 12V3M8 3L4.5 6.5M8 3L11.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 13H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {modal === "create-report" && <CreateReportModal onClose={() => setModal(null)} />}
    </div>
  );
}
