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
  Vulnerability,
  mockVulnerabilities,
  VULN_STATS,
  VULN_CRITICALITY_STYLES,
  VULN_STATUS_STYLES,
  VulnCriticality,
  VulnStatus,
} from "@/data/vulnerabilities";
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

function CriticalityBadge({ criticality }: { criticality: VulnCriticality }) {
  const styles = VULN_CRITICALITY_STYLES[criticality];
  return (
    <span className={clsx("text-sm font-medium", styles.text)}>
      {criticality}
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

function AffectedAssetBadge({ asset }: { asset: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded">
      {asset}
    </span>
  );
}

function StatusBadge({ status }: { status: VulnStatus }) {
  const styles = VULN_STATUS_STYLES[status];
  const iconMap: Record<VulnStatus, React.ReactElement> = {
    Resolved: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
        <path d="M4.5 7L6.2 8.7L9.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "In-progress": (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
        <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Open: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
        <circle cx="7" cy="7" r="2" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-xs font-medium", styles.text)}>
      {iconMap[status]}
      {status}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-current">
        <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function VulnerabilitiesContent() {
  const [vulnerabilities] = useState<Vulnerability[]>(mockVulnerabilities);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return vulnerabilities;
    const q = searchQuery.toLowerCase();
    return vulnerabilities.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        (v.cveId && v.cveId.toLowerCase().includes(q))
    );
  }, [vulnerabilities, searchQuery]);

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
      setSelectedIds(new Set(paginatedList.map((v) => v.key)));
    }
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Vulnerability Management</h1>
          <p className="text-sm text-gray-600">AI-powered vulnerability tracking and prioritization</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-500">
              <path d="M8 1L9.5 4.5L13 3.5L11 6.5L15 8L11 9.5L13 12.5L9.5 11.5L8 15L6.5 11.5L3 12.5L5 9.5L1 8L5 6.5L3 3.5L6.5 4.5L8 1Z" fill="currentColor" />
            </svg>
            AI Priorities
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
            Add Vulnerability
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard value={String(VULN_STATS.total)} label="Total" />
        <StatCard value={String(VULN_STATS.critical)} label="Critical" variant="accent" accentColor="red" />
        <StatCard value={String(VULN_STATS.high)} label="High" variant="accent" accentColor="amber" />
        <StatCard value={String(VULN_STATS.medium)} label="Medium" variant="accent" accentColor="amber" />
        <StatCard value={String(VULN_STATS.low)} label="Low" variant="accent" accentColor="green" />
        <StatCard value={String(VULN_STATS.resolved)} label="Resolved" variant="accent" accentColor="green" />
      </div>

      {/* AI Alert Banner */}
      {!alertDismissed && (
        <AIBanner
          variant="error"
          title="AI Critical Alert"
          description="3 critical vulnerabilities require immediate attention. AI analysis suggests prioritizing the SQL injection vulnerability due to potential data exposure risk."
          confidence="87% Confident"
          primaryActionLabel="View Critical Items"
          onDismiss={() => setAlertDismissed(true)}
        />
      )}

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
            placeholder="Search vulnerability..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors w-56 bg-white"
          />
        </div>
        <FilterDropdown label="Severity" hasIcon />
        <FilterDropdown label="Status" />
        <FilterDropdown label="Date Discovered" />
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
                  { label: "Vulnerability", sort: true },
                  { label: "Criticality", sort: true },
                  { label: "AI Risk Score", sort: true },
                  { label: "Affected Assets", sort: false },
                  { label: "CVE ID", sort: false },
                  { label: "Status", sort: true },
                  { label: "Est. Fix Time", sort: true },
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
                    <p className="text-sm text-gray-400">No vulnerabilities found</p>
                  </td>
                </tr>
              ) : (
                paginatedList.map((vuln) => (
                  <tr key={vuln.key} className="hover:bg-gray-50/50 transition-colors">
                    <td className="pl-5 pr-2 py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(vuln.key)}
                        onChange={() => toggleSelect(vuln.key)}
                        className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                      />
                    </td>

                    {/* Vulnerability name */}
                    <td className="px-3 py-3.5">
                      <span className="text-sm font-medium text-gray-900">{vuln.name}</span>
                    </td>

                    {/* Criticality */}
                    <td className="px-3 py-3.5">
                      <CriticalityBadge criticality={vuln.criticality} />
                    </td>

                    {/* AI Risk Score */}
                    <td className="px-3 py-3.5">
                      <RiskScoreBadge score={vuln.aiRiskScore} />
                    </td>

                    {/* Affected Assets */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {vuln.affectedAssets.map((asset) => (
                          <AffectedAssetBadge key={asset} asset={asset} />
                        ))}
                      </div>
                    </td>

                    {/* CVE ID */}
                    <td className="px-3 py-3.5">
                      <span className="text-sm text-gray-600">{vuln.cveId || "-"}</span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3.5">
                      <StatusBadge status={vuln.status} />
                    </td>

                    {/* Est. Fix Time */}
                    <td className="px-3 py-3.5">
                      <span className="text-sm text-gray-600">{vuln.estFixTime || "-"}</span>
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
