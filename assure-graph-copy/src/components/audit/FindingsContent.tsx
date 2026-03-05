"use client";

import { useState } from "react";
import clsx from "clsx";
import { FINDINGS, Finding, FindingSeverity, FindingStatus } from "@/data/audit";
import { StatCard } from "@/components/ui/StatCard";
import { Pagination } from "@/components/ui/Pagination";
import { AIBanner } from "@/components/ui/AIBanner";
import AddFindingModal from "./modals/AddFindingModal";

const severityColors: Record<FindingSeverity, { bg: string; text: string }> = {
  Critical: { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]" },
  High: { bg: "bg-[#FFF3E0]", text: "text-[#F57C00]" },
  Medium: { bg: "bg-[#FFF8E1]", text: "text-[#F9A825]" },
  Low: { bg: "bg-[#E8F5E9]", text: "text-[#2E7D32]" },
};

const statusConfig: Record<FindingStatus, { bg: string; text: string; icon: React.ReactNode }> = {
  Open: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" /></svg>,
  },
  "In-progress": {
    bg: "bg-[#FFF3E0]",
    text: "text-[#F57C00]",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" /><path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  Resolved: {
    bg: "bg-green-50",
    text: "text-green-600",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" /><path d="M4.5 7L6.5 9L9.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
};

export default function FindingsContent() {
  const [modal, setModal] = useState<"add-finding" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const totalFindings = 24;
  const criticalCount = 3;
  const highCount = 8;
  const mediumCount = 12;
  const lowCount = 3;
  const openCount = 15;
  const resolvedCount = 9;

  const filteredFindings = FINDINGS.filter((f) => {
    if (searchQuery && !f.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedRows.length === filteredFindings.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredFindings.map((f) => f.id));
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 pt-5 pb-5">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Findings</h1>
          <button
            onClick={() => setModal("add-finding")}
            className="flex items-center gap-2 px-4 py-2 bg-brand-5 text-white rounded-lg text-sm font-medium hover:bg-brand-6 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Add Findings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 bg-[#F5F5F7]">
        {/* Stats Row */}
        <div className="grid grid-cols-7 gap-3">
          <StatCard value={totalFindings} label="Total" />
          <StatCard value={criticalCount} label="Critical" accentColor="red" variant="accent" />
          <StatCard value={highCount} label="High" accentColor="amber" variant="accent" />
          <StatCard value={mediumCount} label="Medium" accentColor="green" variant="accent" />
          <StatCard value={lowCount} label="Low" />
          <StatCard value={openCount} label="Open" variant="dark" />
          <StatCard value={resolvedCount} label="Resolved" accentColor="green" variant="accent" />
        </div>

        {/* AI Banner */}
        <AIBanner
          variant="warning"
          title="AI-Detected Finding Pattern"
          confidence="87% Confident"
          description="AssureGraph AI detected that 3 findings are related to the same root cause: incomplete MFA rollout. Consolidating remediation efforts could save 40% time."
          primaryActionLabel="View Consolidated Plan"
        />

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search findings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 bg-white"
            />
          </div>

          <FilterButton label="Severity" hasFilterIcon />
          <FilterButton label="Status" />
          <FilterButton label="Source" />

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
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredFindings.length && filteredFindings.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Finding</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Control</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Owner</th>
              </tr>
            </thead>
            <tbody>
              {filteredFindings.map((finding) => (
                <FindingRow
                  key={finding.id}
                  finding={finding}
                  selected={selectedRows.includes(finding.id)}
                  onToggle={() => toggleRow(finding.id)}
                />
              ))}
            </tbody>
          </table>

          <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
        </div>
      </div>

      {/* Modals */}
      {modal === "add-finding" && <AddFindingModal onClose={() => setModal(null)} />}
    </div>
  );
}

function FindingRow({ finding, selected, onToggle }: { finding: Finding; selected: boolean; onToggle: () => void }) {
  const severity = severityColors[finding.severity];
  const status = statusConfig[finding.status];

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="px-4 py-3">
        <input type="checkbox" checked={selected} onChange={onToggle} className="w-4 h-4 rounded border-gray-300" />
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-900">{finding.title}</p>
          <p className="text-xs text-gray-500">{finding.code}</p>
          {finding.aiSuggested && (
            <p className="text-xs text-brand-5 mt-0.5">AI remediation suggested</p>
          )}
          {finding.aiGenerated && (
            <p className="text-xs text-brand-5 mt-0.5">AI generated</p>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{finding.control}</td>
      <td className="px-4 py-3">
        <span className={clsx("px-2.5 py-1 rounded-full text-xs font-medium", severity.bg, severity.text)}>
          {finding.severity}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={clsx("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit", status.bg, status.text)}>
          {status.icon}
          {finding.status}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{finding.dueDate}</td>
      <td className="px-4 py-3">
        {finding.owner ? (
          <div className="flex items-center gap-2">
            {finding.ownerAvatar ? (
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${finding.ownerAvatar}`}
                alt={finding.owner}
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
            <span className="text-sm text-gray-700">{finding.owner}</span>
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
    </tr>
  );
}

function FilterButton({ label, hasFilterIcon }: { label: string; hasFilterIcon?: boolean }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
      {hasFilterIcon && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1.5 3H12.5M3.5 7H10.5M5.5 11H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
      {label}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
