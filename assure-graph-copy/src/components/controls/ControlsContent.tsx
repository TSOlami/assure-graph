"use client";

import type React from "react";
import { useState, useMemo } from "react";
import clsx from "clsx";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
  Search1Outlined,
  AlignTextLeftOutlined,
  ArrowDownwardOutlined,
  ArrowBothDirectionVertical1Outlined,
} from "@lineiconshq/free-icons";
import { AIBanner } from "@/components/ui/AIBanner";
import {
  Control,
  mockControls,
  CONTROL_STATS,
  RESULT_STYLES,
  EVIDENCE_STYLES,
} from "@/data/controls";
import { StatCard } from "@/components/ui/StatCard";
import { Pagination } from "@/components/ui/Pagination";
import ControlDetailsModal from "./modals/ControlDetailsModal";
import AIControlGeneratorModal from "./modals/AIControlGeneratorModal";

type ActiveModal =
  | { type: "control-details"; control: Control }
  | { type: "ai-generator" }
  | null;

const ITEMS_PER_PAGE = 10;

function FilterDropdown({ label, hasIcon }: { label: string; hasIcon?: boolean }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
      {hasIcon && (
        <Lineicons icon={AlignTextLeftOutlined} size={14} className="text-gray-500" aria-hidden />
      )}
      {label}
      <Lineicons icon={ArrowDownwardOutlined} size={12} className="text-gray-400" aria-hidden />
    </button>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
      {label}
    </button>
  );
}

function SortIcon() {
  return (
    <Lineicons icon={ArrowBothDirectionVertical1Outlined} size={12} className="text-gray-400" aria-hidden />
  );
}

function FrequencyBadge({ frequency }: { frequency: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-600">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
        <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {frequency}
    </span>
  );
}

function EvidenceBadge({ status }: { status: string }) {
  const styles = EVIDENCE_STYLES[status as keyof typeof EVIDENCE_STYLES];
  if (!styles) return <span className="text-xs text-gray-400">{status}</span>;
  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-xs font-medium", styles.text)}>
      <span className={clsx("w-1.5 h-1.5 rounded-full", styles.dot)} />
      {status}
    </span>
  );
}

function ResultBadge({ result }: { result: string }) {
  const styles = RESULT_STYLES[result as keyof typeof RESULT_STYLES];
  if (!styles) return <span className="text-xs text-gray-400">{result}</span>;

  const icons: Record<string, React.ReactElement> = {
    Passing: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
        <path d="M3.5 6L5.2 7.7L8.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Failing: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
        <path d="M4 4L8 8M8 4L4 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    "Needs attention": (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1L11 10.5H1L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <path d="M6 4.5V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="6" cy="8.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <span className={clsx("inline-flex items-center gap-1 text-xs font-medium", styles.text)}>
      {icons[result]}
      {result}
    </span>
  );
}

function ExceptionBadge() {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded">
      Exception
    </span>
  );
}

export default function ControlsContent() {
  const [controls] = useState<Control[]>(mockControls);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return controls;
    const q = searchQuery.toLowerCase();
    return controls.filter(
      (c) =>
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q)
    );
  }, [controls, searchQuery]);

  const paginatedList = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSelect = (key: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === paginatedList.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedList.map((c) => c.key)));
    }
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Controls</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
              <path d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Import controls
          </button>
          <button
            onClick={() => setActiveModal({ type: "ai-generator" })}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L9.2 4.8L13 3.5L11 6.5L15 8L11 9.5L13 12.5L9.2 11.2L8 15L6.8 11.2L3 12.5L5 9.5L1 8L5 6.5L3 3.5L6.8 4.8L8 1Z" fill="white" />
            </svg>
            AI Generate Controls
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          value={`${CONTROL_STATS.applicable.current}/${CONTROL_STATS.applicable.total}`}
          label="Applicable"
        />
        <StatCard
          value={String(CONTROL_STATS.unassigned).padStart(2, "0")}
          label="Unassigned"
        />
        <StatCard
          value={String(CONTROL_STATS.passing)}
          label="Passing"
          variant="accent"
          accentColor="green"
        />
        <StatCard
          value={String(CONTROL_STATS.needsAttention).padStart(2, "0")}
          label="Needs Attention"
          variant="accent"
          accentColor="amber"
        />
        <StatCard
          value={String(CONTROL_STATS.failing).padStart(2, "0")}
          label="Failing"
          variant="accent"
          accentColor="red"
        />
        <StatCard
          value={String(CONTROL_STATS.aiSuggested)}
          label="AI Suggested"
          variant="accent"
          accentColor="blue"
        />
      </div>

      {/* AI Analysis Banner */}
      {!alertDismissed && (
        <AIBanner
          title="Why Control SS-015 is Failing"
          description="AssureGraph AI analyzed this control failure and identified the root cause: 3 devices (DEV-123, DEV-124, DEV-125) are missing required antivirus software."
          confidence="98% Confident"
          primaryActionLabel="View Remediation Steps"
          onDismiss={() => setAlertDismissed(true)}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative">
          <Lineicons
            icon={Search1Outlined}
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden
          />
          <input
            type="text"
            placeholder="Search controls..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors w-full sm:w-56 bg-white"
          />
        </div>
        <FilterDropdown label="Domain" hasIcon />
        <FilterDropdown label="Result" />
        <FilterDropdown label="Applicability" />
        <FilterPill label="Imported Controls" />
        <FilterPill label="AI Generated" />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/60">
                <th className="pl-5 pr-2 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === paginatedList.length && paginatedList.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                  />
                </th>
                {[
                  { label: "Tests", sort: true },
                  { label: "Domain", sort: true },
                  { label: "Assigned Owner", sort: false },
                  { label: "Frequency", sort: false },
                  { label: "Links", sort: false },
                  { label: "Evidence", sort: false },
                  { label: "Results", sort: true },
                ].map((col) => (
                  <th
                    key={col.label}
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sort && <SortIcon />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <p className="text-sm text-gray-400">No controls found</p>
                  </td>
                </tr>
              ) : (
                paginatedList.map((control) => (
                  <tr key={control.key} className="hover:bg-gray-50/50 transition-colors">
                    {/* Checkbox */}
                    <td className="pl-5 pr-2 py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(control.key)}
                        onChange={() => toggleSelect(control.key)}
                        className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                      />
                    </td>

                    {/* Tests (ID + Name + AI info) */}
                    <td className="px-3 py-3.5 max-w-[280px]">
                      <div
                        className="cursor-pointer"
                        onClick={() => setActiveModal({ type: "control-details", control })}
                      >
                        <p className="text-sm font-medium text-gray-900">{control.id}</p>
                        <p className="text-xs text-gray-500 truncate">{control.name}</p>
                        {control.aiInfo && (
                          <p className="text-xs text-amber-600 mt-0.5 truncate italic">{control.aiInfo}</p>
                        )}
                      </div>
                    </td>

                    {/* Domain */}
                    <td className="px-3 py-3.5">
                      <span className="text-sm text-gray-600">{control.domain}</span>
                    </td>

                    {/* Assigned Owner */}
                    <td className="px-3 py-3.5">
                      {control.owner ? (
                        <div className="flex items-center gap-2">
                          {control.owner.avatar ? (
                            <img
                              src={control.owner.avatar}
                              alt={control.owner.name}
                              className="w-7 h-7 rounded-full border border-gray-200 object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                              <span className="text-[9px] font-semibold text-gray-500">
                                {control.owner.initials}
                              </span>
                            </div>
                          )}
                          <span className="text-sm text-gray-700">{control.owner.name}</span>
                        </div>
                      ) : (
                        <button className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-red-400">
                            <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1" />
                            <path d="M2 12.5c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                          Assign
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      )}
                    </td>

                    {/* Frequency */}
                    <td className="px-3 py-3.5">
                      <FrequencyBadge frequency={control.frequency} />
                    </td>

                    {/* Links (Risks + Policies) */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
                            <path d="M6 1L11 10.5H1L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                            <path d="M6 4.5V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            <circle cx="6" cy="8.5" r="0.4" fill="currentColor" />
                          </svg>
                          {control.risksCount}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
                            <rect x="2" y="1" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
                            <path d="M4 3.5h4M4 5.5h4M4 7.5h2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                          </svg>
                          {control.policiesCount}
                        </span>
                      </div>
                    </td>

                    {/* Evidence */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <EvidenceBadge status={control.evidenceStatus} />
                        {control.hasException && <ExceptionBadge />}
                      </div>
                    </td>

                    {/* Results */}
                    <td className="px-3 py-3.5">
                      <ResultBadge result={control.result} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals */}
      {activeModal?.type === "control-details" && (
        <ControlDetailsModal
          control={activeModal.control}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal?.type === "ai-generator" && (
        <AIControlGeneratorModal
          onClose={() => setActiveModal(null)}
          onGenerate={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
