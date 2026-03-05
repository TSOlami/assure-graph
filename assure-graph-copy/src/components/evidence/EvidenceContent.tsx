"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
  Search1Outlined,
  AlignTextLeftOutlined,
  ArrowDownwardOutlined,
  ArrowBothDirectionVertical1Outlined,
  XmarkOutlined,
  PlusOutlined,
} from "@lineiconshq/free-icons";
import {
  EvidenceItem,
  mockEvidence,
  EVIDENCE_STATS,
  FRESHNESS_STYLES,
  CLASSIFICATION_STYLES,
  STATUS_STYLES,
} from "@/data/evidence";
import { StatCard } from "@/components/ui/StatCard";
import { Pagination } from "../ui/Pagination";
import EvidenceDetailsDrawer from "./modals/EvidenceDetailsDrawer";
import AIFreshnessDrawer from "./modals/AIFreshnessDrawer";
import AIEvidenceMappingDrawer from "./modals/AIEvidenceMappingDrawer";

type ActiveModal =
  | { type: "evidence-details"; evidence: EvidenceItem }
  | { type: "ai-freshness" }
  | { type: "ai-mapping" }
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

function SortIcon() {
  return (
    <Lineicons icon={ArrowBothDirectionVertical1Outlined} size={12} className="text-gray-400" aria-hidden />
  );
}

function DocIcon({ fileType }: { fileType: string }) {
  const bgColor = fileType === "pdf" ? "bg-red-50" : fileType === "docx" ? "bg-blue-50" : "bg-gray-50";
  const textColor = fileType === "pdf" ? "text-red-400" : fileType === "docx" ? "text-blue-400" : "text-gray-400";
  return (
    <div className={clsx("w-8 h-10 rounded flex items-center justify-center shrink-0 border", bgColor, fileType === "pdf" ? "border-red-100" : fileType === "docx" ? "border-blue-100" : "border-gray-100")}>
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className={textColor}>
        <path d="M0 2C0 0.9 0.9 0 2 0H10L16 6V18C16 19.1 15.1 20 14 20H2C0.9 20 0 19.1 0 18V2Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M10 0L16 6H12C10.9 6 10 5.1 10 4V0Z" fill="currentColor" fillOpacity="0.25" />
        <text x="2" y="15" fill="currentColor" fontSize="5" fontWeight="600" fontFamily="sans-serif">.{fileType.toUpperCase()}</text>
      </svg>
    </div>
  );
}

function QualityBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-red-500" : value >= 50 ? "bg-amber-500" : "bg-green-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={clsx("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-gray-600">{value}%</span>
    </div>
  );
}

export default function EvidenceContent() {
  const router = useRouter();
  const [evidence] = useState<EvidenceItem[]>(mockEvidence);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return evidence;
    const q = searchQuery.toLowerCase();
    return evidence.filter(
      (e) =>
        e.documentName.toLowerCase().includes(q) ||
        e.classification.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)
    );
  }, [evidence, searchQuery]);

  const paginatedList = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === paginatedList.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedList.map((e) => e.id)));
    }
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Evidence Hub</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Your audit scramble ends here.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModal({ type: "ai-freshness" })}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg transition-colors border-(--color-ai-freshness-border) text-(--color-ai-freshness-text) bg-transparent hover:bg-transparent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-(--color-ai-freshness-text)"
            >
              <path
                d="M8 1L9.5 5.5L14 4L11.5 8L14 12L9.5 10.5L8 15L6.5 10.5L2 12L4.5 8L2 4L6.5 5.5L8 1Z"
                fill="currentColor"
              />
            </svg>
            AI Freshness
          </button>
          <button
            onClick={() => setActiveModal({ type: "ai-mapping" })}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg transition-colors border-(--color-ai-mapping-border) text-(--color-ai-mapping-text) bg-transparent hover:bg-transparent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-(--color-ai-mapping-text)"
            >
              <path
                d="M8 1L9.5 5.5L14 4L11.5 8L14 12L9.5 10.5L8 15L6.5 10.5L2 12L4.5 8L2 4L6.5 5.5L8 1Z"
                fill="currentColor"
              />
            </svg>
            AI Mapping
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
              <path d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Import personnel
          </button>
          <button
            onClick={() => router.push("/evidence/add")}
            className="flex items-center gap-2 px-4 py-2 bg-brand-5 text-white text-sm font-medium rounded-lg hover:bg-brand-6 transition-colors"
          >
            <Lineicons icon={PlusOutlined} size={14} className="text-white" aria-hidden />
            Add new
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-6 gap-3">
        <StatCard
          value={String(EVIDENCE_STATS.total)}
          label="Evidence"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-500 shrink-0">
              <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M6 6h8M6 9h8M6 12h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          value={String(EVIDENCE_STATS.fresh)}
          label="Fresh"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-green-500 shrink-0">
              <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M6.5 10L9 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <StatCard
          value={String(EVIDENCE_STATS.expiring)}
          label="Expiring"
          variant="accent"
          accentColor="amber"
        />
        <StatCard
          value={String(EVIDENCE_STATS.stale)}
          label="Stale"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-red-500 shrink-0">
              <path d="M4 3H16V12L10 17L4 12V3Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
          }
        />
        <StatCard
          value={String(EVIDENCE_STATS.aiMapped)}
          label="AI Mapped"
          variant="accent"
          accentColor="green"
        />
        <StatCard
          value={String(EVIDENCE_STATS.autoCollected)}
          label="Auto Collected"
          variant="accent"
          accentColor="red"
        />
      </div>

      {/* AI Freshness Alert */}
      {!alertDismissed && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-orange-600">
              <path d="M8 1L15 13.5H1L8 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M8 6v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.6" fill="currentColor" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-900">AI Freshness Alerts</span>
              <span className="text-[10px] font-medium text-orange-700 bg-orange-100 border border-orange-300 rounded px-1.5 py-0.5">
                87% Confident
              </span>
            </div>
            <p className="text-sm text-gray-600">
              13 evidence items need attention. AI predicts 5 will expire within the next 7 days based on your audit schedule.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <button className="text-sm font-medium text-brand-5 hover:text-brand-6 transition-colors">
                View Freshness Report
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Show more
              </button>
            </div>
          </div>
          <button
            onClick={() => setAlertDismissed(true)}
            className="p-1 text-gray-400 hover:text-gray-600 shrink-0"
          >
            <Lineicons icon={XmarkOutlined} size={16} aria-hidden />
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Lineicons
              icon={Search1Outlined}
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              aria-hidden
            />
            <input
              type="text"
              placeholder="Search evidence..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors w-56 bg-white"
            />
          </div>
          <FilterDropdown label="Owner" hasIcon />
          <FilterDropdown label="Classification" />
          <FilterDropdown label="Status" />
          <FilterDropdown label="Expiration" />
          <FilterDropdown label="Framework" />
          <FilterDropdown label="Date" />
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
          Export as
          <Lineicons icon={ArrowDownwardOutlined} size={12} className="text-white" aria-hidden />
        </button>
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
                  { label: "Document Name", sort: true },
                  { label: "Classification", sort: false },
                  { label: "Assigned Owner", sort: false },
                  { label: "Freshness", sort: true },
                  { label: "AI Quality", sort: false },
                  { label: "Reuse", sort: false },
                  { label: "Status", sort: true },
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
                    <p className="text-sm text-gray-400">No evidence found</p>
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => {
                  const classStyle = CLASSIFICATION_STYLES[item.classification];
                  const freshnessStyle = FRESHNESS_STYLES[item.freshness];
                  const statusStyle = STATUS_STYLES[item.status];

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Checkbox */}
                      <td className="pl-5 pr-2 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                        />
                      </td>

                      {/* Document Name */}
                      <td className="px-3 py-3.5">
                        <div
                          className="flex items-center gap-2.5 cursor-pointer"
                          onClick={() => setActiveModal({ type: "evidence-details", evidence: item })}
                        >
                          <DocIcon fileType={item.fileType} />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 leading-tight">{item.documentName}</p>
                            <p className="text-xs text-gray-400">{item.collectionType}</p>
                          </div>
                        </div>
                      </td>

                      {/* Classification */}
                      <td className="px-3 py-3.5">
                        <span className={clsx("inline-flex items-center text-xs font-medium px-2 py-0.5 rounded", classStyle.bg, classStyle.text, classStyle.border, "border")}>
                          {item.classification}
                        </span>
                      </td>

                      {/* Assigned Owner */}
                      <td className="px-3 py-3.5">
                        {item.owner ? (
                          <div className="flex items-center gap-2">
                            {item.owner.avatar ? (
                              <img src={item.owner.avatar} alt={item.owner.name} className="w-7 h-7 rounded-full border border-gray-200 object-cover shrink-0" />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                                <span className="text-[9px] font-semibold text-gray-500">{item.owner.initials}</span>
                              </div>
                            )}
                            <span className="text-sm text-gray-700">{item.owner.name}</span>
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

                      {/* Freshness */}
                      <td className="px-3 py-3.5">
                        <span className={clsx("inline-flex items-center gap-1.5 text-xs font-medium", freshnessStyle.text)}>
                          {item.freshness === "Fresh" && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500">
                              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                              <path d="M3.5 6L5.2 7.7L8.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {item.freshness === "Expiring" && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-amber-500">
                              <path d="M6 1L11 10.5H1L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                            </svg>
                          )}
                          {item.freshness === "Stale" && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={clsx("text-red-500", freshnessStyle.bg, "rounded")}>
                              <rect x="1" y="1" width="10" height="10" rx="1" fill="currentColor" fillOpacity="0.15" />
                              <path d="M3.5 3.5L8.5 8.5M8.5 3.5L3.5 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                          )}
                          {item.freshness}
                        </span>
                      </td>

                      {/* AI Quality */}
                      <td className="px-3 py-3.5">
                        <QualityBar value={item.aiQuality} />
                      </td>

                      {/* Reuse */}
                      <td className="px-3 py-3.5">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
                            <path d="M2 3C2 3 4 6 6 6S10 3 10 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            <path d="M2 9C2 9 4 6 6 6S10 9 10 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                          {item.reuse} frameworks
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3.5">
                        <span className={clsx("inline-flex items-center gap-1.5 text-xs font-medium", statusStyle.text)}>
                          <span className={clsx("w-1.5 h-1.5 rounded-full", statusStyle.dot)} />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
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

      {/* Modals & Drawers */}
      {activeModal?.type === "evidence-details" && (
        <EvidenceDetailsDrawer
          evidence={activeModal.evidence}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal?.type === "ai-freshness" && (
        <AIFreshnessDrawer onClose={() => setActiveModal(null)} />
      )}
      {activeModal?.type === "ai-mapping" && (
        <AIEvidenceMappingDrawer onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
