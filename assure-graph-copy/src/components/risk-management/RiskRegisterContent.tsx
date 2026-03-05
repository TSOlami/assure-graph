"use client";

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
  Risk,
  mockRisks,
  RISK_STATS,
  SCORE_STYLES,
  STATUS_STYLES,
  RISK_DISTRIBUTION,
  RISK_CATEGORIES,
  AI_RECOMMENDATIONS,
} from "@/data/risks";
import { StatCard } from "@/components/ui/StatCard";
import { Pagination } from "@/components/ui/Pagination";
import RiskDetailsModal from "./modals/RiskDetailsModal";

type ActiveModal = { type: "risk-details"; risk: Risk } | null;

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

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const styles = SCORE_STYLES[label as keyof typeof SCORE_STYLES];
  if (!styles) return <span className="text-sm text-gray-600">{label} ({score})</span>;
  return (
    <span className={clsx("text-sm font-medium", styles.text)}>
      {label} ({score})
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = STATUS_STYLES[status as keyof typeof STATUS_STYLES];
  if (!styles) return <span className="text-sm text-gray-600">{status}</span>;

  const icons: Record<string, React.ReactElement> = {
    Mitigated: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
        <path d="M3.5 6L5.2 7.7L8.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Accepted: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
        <path d="M3.5 6L5.2 7.7L8.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Open: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
        <circle cx="6" cy="6" r="2" fill="currentColor" />
      </svg>
    ),
    Transferred: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return (
    <span className={clsx("inline-flex items-center gap-1 text-sm font-medium", styles.text)}>
      {icons[status]}
      {status}
    </span>
  );
}

function DonutChart() {
  const total = RISK_DISTRIBUTION.lowRisk + RISK_DISTRIBUTION.mediumRisk + RISK_DISTRIBUTION.highRisk + RISK_DISTRIBUTION.criticalRisk;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { value: RISK_DISTRIBUTION.lowRisk, color: "#22c55e" },
    { value: RISK_DISTRIBUTION.mediumRisk, color: "#3b82f6" },
    { value: RISK_DISTRIBUTION.highRisk, color: "#f59e0b" },
    { value: RISK_DISTRIBUTION.criticalRisk, color: "#ef4444" },
  ];

  let offset = 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          {segments.map((seg, i) => {
            const segLength = (seg.value / total) * circumference;
            const dashArray = `${segLength} ${circumference - segLength}`;
            const dashOffset = -offset;
            offset += segLength;
            return (
              <circle
                key={i}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="20"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{RISK_DISTRIBUTION.ncClosed}%</span>
          <span className="text-xs text-gray-500">NC closed</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-gray-600">{RISK_DISTRIBUTION.lowRisk} Low risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-gray-600">{RISK_DISTRIBUTION.mediumRisk} Medium risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-gray-600">{RISK_DISTRIBUTION.highRisk} High risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-gray-600">{RISK_DISTRIBUTION.criticalRisk} Critical risk</span>
        </div>
      </div>
    </div>
  );
}

function CategoryChart() {
  const maxValue = Math.max(...RISK_CATEGORIES.map((c) => c.value));
  return (
    <div className="flex flex-col gap-3">
      {RISK_CATEGORIES.map((cat) => (
        <div key={cat.name} className="flex items-center gap-3">
          <span className="text-xs text-gray-600 w-20 text-right shrink-0">{cat.name}</span>
          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(cat.value / maxValue) * 100}%`,
                backgroundColor: cat.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RiskRegisterContent() {
  const [risks] = useState<Risk[]>(mockRisks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return risks;
    const q = searchQuery.toLowerCase();
    return risks.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }, [risks, searchQuery]);

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
      setSelectedIds(new Set(paginatedList.map((r) => r.key)));
    }
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Risk Register</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
              <path d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Import Risk Register
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Risk
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard value={String(RISK_STATS.totalRisks)} label="Total Risks" />
        <StatCard
          value={String(RISK_STATS.critical)}
          label="Critical"
          variant="accent"
          accentColor="red"
        />
        <StatCard
          value={String(RISK_STATS.high)}
          label="High"
          variant="accent"
          accentColor="amber"
        />
        <StatCard
          value={String(RISK_STATS.medium)}
          label="Medium"
          variant="accent"
          accentColor="blue"
        />
        <StatCard value={String(RISK_STATS.low)} label="Low" />
        <StatCard
          value={String(RISK_STATS.mitigated)}
          label="Mitigated"
          variant="accent"
          accentColor="green"
        />
      </div>

      {/* AI Banner */}
      {!alertDismissed && (
        <AIBanner
          title="AI Risk Assessment Complete"
          description="AssureGraph AI has analyzed your risk register against industry benchmarks and identified 3 high-priority risks requiring immediate attention."
          confidence="91% Confident"
          primaryActionLabel="View Priority Risks"
          onDismiss={() => setAlertDismissed(true)}
        />
      )}

      {/* Main content: table + sidebar */}
      <div className="flex gap-5">
        {/* Left: search, filters, table */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Toolbar */}
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
                placeholder="Search risks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors w-56 bg-white"
              />
            </div>
            <FilterDropdown label="Category" hasIcon />
            <FilterDropdown label="Score" />
            <FilterDropdown label="Status" />
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
                      { label: "Risk", sort: false },
                      { label: "Category", sort: false },
                      { label: "Score", sort: false },
                      { label: "Status", sort: true },
                      { label: "Controls", sort: false },
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
                      <td colSpan={6} className="px-4 py-12 text-center">
                        <p className="text-sm text-gray-400">No risks found</p>
                      </td>
                    </tr>
                  ) : (
                    paginatedList.map((risk) => (
                      <tr key={risk.key} className="hover:bg-gray-50/50 transition-colors">
                        <td className="pl-5 pr-2 py-3.5">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(risk.key)}
                            onChange={() => toggleSelect(risk.key)}
                            className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                          />
                        </td>

                        <td className="px-3 py-3.5 max-w-[280px]">
                          <div
                            className="cursor-pointer"
                            onClick={() => setActiveModal({ type: "risk-details", risk })}
                          >
                            <p className="text-sm font-medium text-gray-900">{risk.id}</p>
                            <p className="text-xs text-gray-500 truncate">{risk.name}</p>
                          </div>
                        </td>

                        <td className="px-3 py-3.5">
                          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md">
                            {risk.category}
                          </span>
                        </td>

                        <td className="px-3 py-3.5">
                          <ScoreBadge score={risk.score} label={risk.scoreLabel} />
                        </td>

                        <td className="px-3 py-3.5">
                          <StatusBadge status={risk.status} />
                        </td>

                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400">
                              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            {risk.controlsCount}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Right sidebar: Charts + AI Recommendations */}
        <div className="w-72 shrink-0 flex flex-col gap-5">
          {/* Risk Distribution */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Risk Distribution</h3>
            <DonutChart />
          </div>

          {/* Category */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Category</h3>
            <CategoryChart />
          </div>

          {/* AI Recommendations */}
          <div className="bg-gray-900 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 1L10.5 5.5L15 4L12.5 8L17 9L12.5 10L15 14L10.5 12.5L9 17L7.5 12.5L3 14L5.5 10L1 9L5.5 8L3 4L7.5 5.5L9 1Z"
                  fill="url(#ai-rec-grad)"
                />
                <defs>
                  <linearGradient id="ai-rec-grad" x1="1" y1="1" x2="17" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F97316" />
                    <stop offset="1" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-semibold">AI Recommendations</span>
            </div>
            <div className="space-y-2.5">
              {AI_RECOMMENDATIONS.map((rec, i) => (
                <div
                  key={i}
                  className="bg-gray-800 rounded-lg px-3.5 py-2.5 text-sm text-gray-200 hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal?.type === "risk-details" && (
        <RiskDetailsModal
          risk={activeModal.risk}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
