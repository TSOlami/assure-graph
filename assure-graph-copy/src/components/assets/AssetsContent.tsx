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
  Asset,
  mockAssets,
  ASSET_STATS,
  ASSET_CRITICALITY_STYLES,
  ASSET_STATUS_STYLES,
  AssetStatus,
  AssetCriticality,
} from "@/data/assets";
import { StatCard } from "@/components/ui/StatCard";
import { Pagination } from "@/components/ui/Pagination";

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

function CriticalityBadge({ criticality }: { criticality: AssetCriticality }) {
  const styles = ASSET_CRITICALITY_STYLES[criticality];
  return (
    <span className={clsx("text-sm font-medium", styles.text)}>
      {criticality}
    </span>
  );
}

function StatusBadge({ status }: { status: AssetStatus }) {
  const styles = ASSET_STATUS_STYLES[status];
  const iconMap: Record<AssetStatus, React.ReactElement> = {
    Compliant: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
        <path d="M4.5 7L6.2 8.7L9.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "At-Risk": (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
        <path d="M7 4.5v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="7" cy="9.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    "Not Compliant": (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1" />
        <path d="M5 5L9 9M9 5L5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full", styles.bg, styles.text)}>
      {iconMap[status]}
      {status}
    </span>
  );
}

function RiskScoreBadge({ score }: { score: string }) {
  const numValue = parseInt(score);
  let colorClass = "text-green-600";
  if (numValue >= 50) colorClass = "text-red-600";
  else if (numValue >= 25) colorClass = "text-amber-600";

  return <span className={clsx("text-sm font-medium", colorClass)}>{score}</span>;
}

export default function AssetsContent() {
  const [assets] = useState<Asset[]>(mockAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return assets;
    const q = searchQuery.toLowerCase();
    return assets.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q)
    );
  }, [assets, searchQuery]);

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
      setSelectedIds(new Set(paginatedList.map((a) => a.key)));
    }
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Assets Management</h1>
          <p className="text-sm text-gray-600">Track and manage your IT assets with AI-powered insights</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-500">
              <path d="M8 1L9.5 4.5L13 3.5L11 6.5L15 8L11 9.5L13 12.5L9.5 11.5L8 15L6.5 11.5L3 12.5L5 9.5L1 8L5 6.5L3 3.5L6.5 4.5L8 1Z" fill="currentColor" />
            </svg>
            AI Insights
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
              <path d="M8 12V4M8 4L4.5 7.5M8 4L11.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Add Asset
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-5 gap-3">
        <StatCard value={String(ASSET_STATS.totalAssets)} label="Total Assets" />
        <StatCard value={String(ASSET_STATS.compliant)} label="Compliant" variant="accent" accentColor="green" />
        <StatCard value={String(ASSET_STATS.atRisk)} label="At-Risk" variant="accent" accentColor="amber" />
        <StatCard value={String(ASSET_STATS.notCompliant)} label="Not Compliant" variant="accent" accentColor="red" />
        <StatCard value={String(ASSET_STATS.criticalAssets)} label="Critical Assets" variant="accent" accentColor="red" />
      </div>

      {/* AI Analysis Banner */}
      {!alertDismissed && (
        <AIBanner
          title="AI Asset Analysis"
          description="AssureGraph AI has identified 8 assets with declining compliance scores. Review recommended actions to maintain audit readiness."
          confidence="91% Confident"
          primaryActionLabel="View At-Risk Assets"
          onDismiss={() => setAlertDismissed(true)}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors w-full sm:w-56 bg-white"
            />
          </div>
          <FilterDropdown label="Type" hasIcon />
          <FilterDropdown label="Criticality" />
          <FilterDropdown label="Status" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
          Export as
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
                  { label: "Asset Name", sort: true },
                  { label: "Type", sort: true },
                  { label: "Owner", sort: false },
                  { label: "Criticality", sort: true },
                  { label: "AI Risk Score", sort: true },
                  { label: "Controls", sort: false },
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
                    <p className="text-sm text-gray-400">No assets found</p>
                  </td>
                </tr>
              ) : (
                paginatedList.map((asset) => (
                  <tr key={asset.key} className="hover:bg-gray-50/50 transition-colors">
                    <td className="pl-5 pr-2 py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(asset.key)}
                        onChange={() => toggleSelect(asset.key)}
                        className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                      />
                    </td>

                    {/* Asset Name */}
                    <td className="px-3 py-3.5">
                      <span className="text-sm font-medium text-gray-900">{asset.name}</span>
                    </td>

                    {/* Type */}
                    <td className="px-3 py-3.5">
                      <span className="text-sm text-gray-600">{asset.type}</span>
                    </td>

                    {/* Owner */}
                    <td className="px-3 py-3.5">
                      {asset.owner ? (
                        <div className="flex items-center gap-2">
                          {asset.owner.avatar ? (
                            <img
                              src={asset.owner.avatar}
                              alt={asset.owner.name}
                              className="w-7 h-7 rounded-full border border-gray-200 object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                              <span className="text-[9px] font-semibold text-gray-500">
                                {asset.owner.initials}
                              </span>
                            </div>
                          )}
                          <span className="text-sm text-gray-700">{asset.owner.name}</span>
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

                    {/* Criticality */}
                    <td className="px-3 py-3.5">
                      <CriticalityBadge criticality={asset.criticality} />
                    </td>

                    {/* AI Risk Score */}
                    <td className="px-3 py-3.5">
                      <RiskScoreBadge score={asset.aiRiskScore} />
                    </td>

                    {/* Controls */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400">
                          <path d="M7 2L13 12H1L7 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                          <path d="M7 5.5v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          <circle cx="7" cy="10" r="0.4" fill="currentColor" />
                        </svg>
                        <span className="text-sm text-gray-600">{asset.controls}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3.5">
                      <StatusBadge status={asset.status} />
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
  );
}
