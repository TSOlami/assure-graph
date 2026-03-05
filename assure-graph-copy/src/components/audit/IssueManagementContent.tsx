"use client";

import { useState } from "react";
import clsx from "clsx";
import { ISSUES, Issue, IssueStatus, FindingSeverity } from "@/data/audit";
import { StatCard } from "@/components/ui/StatCard";
import { Pagination } from "@/components/ui/Pagination";
import { AIBanner } from "@/components/ui/AIBanner";
import AddIssueModal from "./modals/AddIssueModal";

const severityColors: Record<FindingSeverity, { bg: string; text: string }> = {
  Critical: { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]" },
  High: { bg: "bg-[#FFF3E0]", text: "text-[#F57C00]" },
  Medium: { bg: "bg-[#FFF8E1]", text: "text-[#F9A825]" },
  Low: { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]" },
};

const statusConfig: Record<IssueStatus, { bg: string; text: string; icon: React.ReactNode }> = {
  Resolved: {
    bg: "bg-green-50",
    text: "text-green-600",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4.5 7L6.5 9L9.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "In-progress": {
    bg: "bg-[#FFF3E0]",
    text: "text-[#F57C00]",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Open: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
};

export default function IssueManagementContent() {
  const [modal, setModal] = useState<"add-issue" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const totalIssues = 34;
  const openCount = 15;
  const inProgressCount = 8;
  const resolvedCount = 14;
  const overdueCount = 3;

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedRows.length === ISSUES.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(ISSUES.map((i) => i.id));
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 pt-5 pb-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Issue Management</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Track and resolve compliance issues with AI recommendations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg border transition-colors bg-transparent border-[#F9CAFF] text-[#A418B7] hover:bg-[#FCF2FE]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L9.2 4.8L13 6L9.2 7.2L8 11L6.8 7.2L3 6L6.8 4.8L8 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                <path d="M12.5 9.5L13.1 11.4L15 12L13.1 12.6L12.5 14.5L11.9 12.6L10 12L11.9 11.4L12.5 9.5Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
              </svg>
              AI Insights
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 12V3M8 3L4.5 6.5M8 3L11.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 13H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Export
            </button>
            <button
              onClick={() => setModal("add-issue")}
              className="flex items-center gap-2 px-4 py-2 bg-brand-5 text-white rounded-lg text-sm font-medium hover:bg-brand-6 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Add new issue
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 bg-[#F5F5F7]">
        {/* Stats Row */}
        <div className="grid grid-cols-5 gap-4">
          <StatCard value={totalIssues} label="Total Issues" />
          <StatCard value={openCount} label="Open" className="bg-[#FCF2FE] border-[#F9CAFF] text-[#A418B7] [&_.stat-label]:text-[#A418B7]" />
          <StatCard value={inProgressCount} label="In-Progress" accentColor="green" variant="accent" />
          <StatCard value={resolvedCount} label="Resolved" />
          <StatCard value={overdueCount} label="Overdue" accentColor="red" variant="accent" />
        </div>

        {/* AI Banner */}
        <AIBanner
          title="AI Issue Analysis"
          confidence="91% Confident"
          description="3 Issues are at risk of becoming overdue. AI suggests prioritizing the MFA implementation issue due to its impact on upcoming SOC 2 audit."
          primaryActionLabel="View Prioritize Issues"
        />

        {/* Filters */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 2.5H12.5M3.5 7H10.5M5.5 11.5H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Severity
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Type
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            Status
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="ml-auto">
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
              Export as
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="w-12 px-4 py-3">
                  <input type="checkbox" checked={selectedRows.length === ISSUES.length && ISSUES.length > 0} onChange={toggleAll} className="w-4 h-4 rounded border-gray-300" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Finding</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Severity</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Owner</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Related Control</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {ISSUES.map((issue) => (
                <IssueRow
                  key={issue.id}
                  issue={issue}
                  selected={selectedRows.includes(issue.id)}
                  onToggle={() => toggleRow(issue.id)}
                />
              ))}
            </tbody>
          </table>

          <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
        </div>
      </div>

      {/* Modals */}
      {modal === "add-issue" && <AddIssueModal onClose={() => setModal(null)} />}
    </div>
  );
}

function IssueRow({ issue, selected, onToggle }: { issue: Issue; selected: boolean; onToggle: () => void }) {
  const severity = severityColors[issue.severity];
  const status = statusConfig[issue.status];

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="px-4 py-3">
        <input type="checkbox" checked={selected} onChange={onToggle} className="w-4 h-4 rounded border-gray-300" />
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-900">{issue.title}</p>
          {issue.description && (
            <p className="text-xs text-brand-5 mt-0.5">{issue.description}</p>
          )}
          {issue.aiGenerated && !issue.description && (
            <p className="text-xs text-brand-5 mt-0.5">AI generated</p>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#E9F5FF] text-[#0088FF]">
          {issue.type}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={clsx("px-2.5 py-1 rounded-full text-xs font-medium", severity.bg, severity.text)}>
          {issue.severity}
        </span>
      </td>
      <td className="px-4 py-3">
        {issue.owner ? (
          <div className="flex items-center gap-2">
            {issue.ownerAvatar ? (
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${issue.ownerAvatar}`}
                alt={issue.owner}
                className="w-7 h-7 rounded-full"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="5" r="2.5" stroke="#9CA3AF" strokeWidth="1.2" />
                  <path d="M2.5 12.5C2.5 10 4.5 8.5 7 8.5C9.5 8.5 11.5 10 11.5 12.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            )}
            <span className="text-sm text-gray-700">{issue.owner}</span>
          </div>
        ) : (
          <button className="flex items-center gap-1.5 text-sm text-brand-5 font-medium">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2.5 12.5C2.5 10 4.5 8.5 7 8.5C9.5 8.5 11.5 10 11.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Assign
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{issue.dueDate}</td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 text-sm text-gray-700">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5L12.5 4V8C12.5 10.5 10 12.5 7 13.5C4 12.5 1.5 10.5 1.5 8V4L7 1.5Z" stroke="#9CA3AF" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          {issue.relatedControl}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={clsx("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit", status.bg, status.text)}>
          {status.icon}
          {issue.status}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </td>
    </tr>
  );
}
