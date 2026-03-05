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
  Vendor,
  mockVendors,
  VENDOR_STATS,
  CRITICALITY_STYLES,
  DATA_ACCESS_STYLES,
  DataAccessType,
} from "@/data/vendors";
import { StatCard } from "@/components/ui/StatCard";
import { Pagination } from "@/components/ui/Pagination";
import VendorDetailsModal from "./modals/VendorDetailsModal";

type ActiveModal =
  | { type: "vendor-details"; vendor: Vendor }
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
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400">
        <path d="M7 2L13 12H1L7 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <path d="M7 5.5v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="7" cy="10" r="0.5" fill="currentColor" />
      </svg>
      {label}
    </button>
  );
}

function SortIcon() {
  return (
    <Lineicons icon={ArrowBothDirectionVertical1Outlined} size={12} className="text-gray-400" aria-hidden />
  );
}

function CriticalityBadge({ criticality }: { criticality: string }) {
  const styles = CRITICALITY_STYLES[criticality as keyof typeof CRITICALITY_STYLES];
  if (!styles) return <span className="text-sm text-gray-400">{criticality}</span>;
  return (
    <span className={clsx("text-sm font-medium", styles.text)}>
      {criticality}
    </span>
  );
}

function DataAccessBadge({ type }: { type: DataAccessType }) {
  const styles = DATA_ACCESS_STYLES[type];
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 text-xs font-medium rounded", styles.bg, styles.text)}>
      {type}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md">
      {category}
    </span>
  );
}

export default function VendorsContent() {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return vendors;
    const q = searchQuery.toLowerCase();
    return vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.vendorId.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
    );
  }, [vendors, searchQuery]);

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
        <h1 className="text-2xl font-semibold text-gray-900">Vendors</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          New Vendors
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard value={String(VENDOR_STATS.totalVendors)} label="Total Vendors" />
        <StatCard value={String(VENDOR_STATS.critical)} label="Critical" variant="accent" accentColor="red" />
        <StatCard value={String(VENDOR_STATS.high)} label="High" variant="accent" accentColor="amber" />
        <StatCard value={String(VENDOR_STATS.medium)} label="Medium" variant="accent" accentColor="amber" />
        <StatCard value={String(VENDOR_STATS.low)} label="Low" variant="accent" accentColor="green" />
        <StatCard value={String(VENDOR_STATS.assessmentDue)} label="Assessment Due" variant="accent" accentColor="red" />
      </div>

      {/* AI Analysis Banner */}
      {!alertDismissed && (
        <AIBanner
          title="AI Risk Rating Analysis Complete"
          description="AssureGraph AI analyzed all vendors using qualitative and quantitative factors. 3 vendors require immediate attention due to upcoming assessments and high-risk profiles."
          confidence="91% Confident"
          primaryActionLabel="View Priority Vendors"
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
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors w-full sm:w-56 bg-white"
            />
          </div>
          <FilterDropdown label="Criticality" hasIcon />
          <FilterDropdown label="Category" />
          <FilterPill label="PII Access" />
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
                  { label: "Vendor", sort: true },
                  { label: "Category", sort: false },
                  { label: "Criticality", sort: true },
                  { label: "Risk Score", sort: true },
                  { label: "Data Access", sort: false },
                  { label: "Assessment\nDue", sort: true },
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
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <p className="text-sm text-gray-400">No vendors found</p>
                  </td>
                </tr>
              ) : (
                paginatedList.map((vendor) => (
                  <tr key={vendor.key} className="hover:bg-gray-50/50 transition-colors">
                    <td className="pl-5 pr-2 py-3.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(vendor.key)}
                        onChange={() => toggleSelect(vendor.key)}
                        className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                      />
                    </td>

                    {/* Vendor name + ID */}
                    <td className="px-3 py-3.5">
                      <div
                        className="cursor-pointer"
                        onClick={() => setActiveModal({ type: "vendor-details", vendor })}
                      >
                        <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                        <p className="text-xs text-gray-500">{vendor.vendorId}</p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-3 py-3.5">
                      <CategoryBadge category={vendor.category} />
                    </td>

                    {/* Criticality */}
                    <td className="px-3 py-3.5">
                      <CriticalityBadge criticality={vendor.criticality} />
                    </td>

                    {/* Risk Score */}
                    <td className="px-3 py-3.5">
                      <span className="text-sm text-gray-700">{vendor.riskScore}/{vendor.maxRiskScore}</span>
                    </td>

                    {/* Data Access */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {vendor.dataAccess.map((type) => (
                          <DataAccessBadge key={type} type={type} />
                        ))}
                      </div>
                    </td>

                    {/* Assessment Due */}
                    <td className="px-3 py-3.5">
                      <span className="text-sm text-gray-700">{vendor.assessmentDue}</span>
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

      {/* Modals */}
      {activeModal?.type === "vendor-details" && (
        <VendorDetailsModal
          vendor={activeModal.vendor}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
