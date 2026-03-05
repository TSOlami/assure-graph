"use client";

import clsx from "clsx";
import { Audit, AuditStatus } from "@/data/audit";

const statusConfig: Record<AuditStatus, { bg: string; text: string }> = {
  "In-progress": { bg: "bg-orange-50", text: "text-orange-600" },
  Planning: { bg: "bg-blue-50", text: "text-blue-600" },
  Completed: { bg: "bg-green-50", text: "text-green-600" },
};

interface AuditDetailsModalProps {
  audit: Audit;
  onClose: () => void;
}

export default function AuditDetailsModal({ audit, onClose }: AuditDetailsModalProps) {
  const status = statusConfig[audit.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Audit Details</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Audit Info */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500">{audit.code}</p>
            <span className={clsx("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", status.bg, status.text)}>
              {audit.status === "In-progress" && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" /></svg>
              )}
              {audit.status === "Completed" && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M4 6L5.5 7.5L8 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
              {audit.status}
            </span>
          </div>
          <h3 className="text-base font-semibold text-gray-900">{audit.name}</h3>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm font-medium text-gray-700">{audit.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={clsx("h-full rounded-full", audit.progress === 100 ? "bg-green-500" : "bg-brand-5")}
              style={{ width: `${audit.progress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{audit.controls.total}</p>
            <p className="text-xs text-gray-400 mt-0.5">Total Controls</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{audit.controls.completed}</p>
            <p className="text-xs text-gray-400 mt-0.5">Tested</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{audit.findings}</p>
            <p className="text-xs text-gray-400 mt-0.5">Findings</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{audit.aiMapped}</p>
            <p className="text-xs text-gray-400 mt-0.5">AI Mapped</p>
          </div>
        </div>

        {/* AI Evidence Mapping */}
        <div className="bg-[#FFF8F0] border border-[#FFE0C2] rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2.5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
              <path d="M10 2L12 7L17 8L12 9L10 14L8 9L3 8L8 7L10 2Z" stroke="#B45309" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M15 12L16 14L18 15L16 16L15 18L14 16L12 15L14 14L15 12Z" stroke="#B45309" strokeWidth="1" strokeLinejoin="round" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">AI Evidence Mapping</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                AssureGraph AI has analyzed control descriptions and mapped {audit.aiMapped} evidence items to {audit.controls.total} controls.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <button className="px-3 py-1.5 text-xs font-medium text-brand-5 border border-brand-5 rounded-lg hover:bg-brand-0-5 transition-colors">
                  Review Evidence
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-brand-5 border border-brand-5 rounded-lg hover:bg-brand-0-5 transition-colors">
                  View Findings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="flex-1 px-4 py-2.5 bg-brand-5 text-white rounded-lg text-sm font-medium hover:bg-brand-6 transition-colors flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            View Audit Details
          </button>
          <button className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V3M8 3L4.5 6.5M8 3L11.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 13H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
