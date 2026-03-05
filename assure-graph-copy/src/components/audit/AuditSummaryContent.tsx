"use client";

import { useState } from "react";
import { AUDITS, Audit } from "@/data/audit";
import { StatCard } from "@/components/ui/StatCard";
import { AIBanner } from "@/components/ui/AIBanner";
import AuditCard from "./AuditCard";
import CreateAuditModal from "./modals/CreateAuditModal";
import AuditDetailsModal from "./modals/AuditDetailsModal";

type ModalState =
  | { type: "create-audit" }
  | { type: "audit-details"; audit: Audit }
  | null;

export default function AuditSummaryContent() {
  const [modal, setModal] = useState<ModalState>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [frameworkFilter, setFrameworkFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [auditorFilter, setAuditorFilter] = useState("");

  const activeAudits = 3;
  const completedAudits = 12;
  const upcomingAudits = 2;
  const totalFindings = 24;

  const filteredAudits = AUDITS.filter((audit) => {
    if (searchQuery && !audit.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (frameworkFilter && audit.framework !== frameworkFilter) return false;
    if (statusFilter && audit.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 pt-5 pb-5">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Audit Summary</h1>
          <button
            onClick={() => setModal({ type: "create-audit" })}
            className="flex items-center gap-2 px-4 py-2 bg-brand-5 text-white rounded-lg text-sm font-medium hover:bg-brand-6 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Create Audit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 bg-[#F5F5F7]">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard value={activeAudits} label="Active Audit" />
          <StatCard value={completedAudits} label="Completed" accentColor="green" variant="accent" />
          <StatCard value={upcomingAudits} label="Upcoming" accentColor="green" variant="accent" />
          <StatCard value={totalFindings} label="Total Findings" accentColor="red" variant="accent" />
        </div>

        {/* AI Banner */}
        <AIBanner
          title="AI Evidence Mapping Complete"
          confidence="91% Confident"
          description="AssureGraph AI has automatically mapped 437 evidence items to controls across your active audits based on control descriptions, not just titles."
          primaryActionLabel="Review Mappings"
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
              placeholder="Search audit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 bg-white"
            />
          </div>

          <FilterDropdown label="Framework" value={frameworkFilter} onChange={setFrameworkFilter} options={["SOC 2", "ISO 27001", "GDPR"]} hasFilterIcon />
          <FilterDropdown label="Status" value={statusFilter} onChange={setStatusFilter} options={["In-progress", "Planning", "Completed"]} />
          <FilterDropdown label="Auditor" value={auditorFilter} onChange={setAuditorFilter} options={["Internal", "External"]} />

          <div className="ml-auto">
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
              Export as
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Audit Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredAudits.map((audit) => (
            <AuditCard
              key={audit.id}
              audit={audit}
              onClick={(a) => setModal({ type: "audit-details", audit: a })}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {modal?.type === "create-audit" && (
        <CreateAuditModal onClose={() => setModal(null)} />
      )}
      {modal?.type === "audit-details" && (
        <AuditDetailsModal audit={modal.audit} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

function FilterDropdown({
  label,
  value,
  onChange,
  options,
  hasFilterIcon,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  hasFilterIcon?: boolean;
}) {
  return (
    <div className="relative inline-flex items-center">
      {hasFilterIcon && (
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 z-10" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1.5 2.5H12.5M3.5 6.5H10.5M5.5 10.5H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 cursor-pointer ${hasFilterIcon ? "pl-9" : "pl-3"}`}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
