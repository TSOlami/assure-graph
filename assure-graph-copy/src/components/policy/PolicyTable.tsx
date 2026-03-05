"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

type Classification = "Internal" | "Public" | "Restricted" | "Confidential";
type EvidenceFreshness = "Fresh" | "Expiring" | "Stale";
type PolicyStatus = "Approved" | "Pending";

interface Policy {
  id: string;
  name: string;
  classification: Classification;
  assignedOwner: string;
  ownerAvatar?: string;
  linkedControls: number;
  evidenceFreshness: EvidenceFreshness;
  status: PolicyStatus;
  version: string;
  aiGenerated?: boolean;
}

const MOCK_POLICIES: Policy[] = [
  {
    id: "1",
    name: "Statement of Applicability",
    classification: "Internal",
    assignedOwner: "Samuel A.",
    linkedControls: 8,
    evidenceFreshness: "Fresh",
    status: "Approved",
    version: "v2.1",
  },
  {
    id: "2",
    name: "ISMS Scope Document",
    classification: "Public",
    assignedOwner: "Grace O.",
    linkedControls: 5,
    evidenceFreshness: "Expiring",
    status: "Pending",
    version: "v1.0",
  },
  {
    id: "3",
    name: "Information Security Policy",
    classification: "Restricted",
    assignedOwner: "Timothy B.",
    linkedControls: 10,
    evidenceFreshness: "Stale",
    status: "Approved",
    version: "v1.2",
  },
  {
    id: "4",
    name: "Management Review Meeting",
    classification: "Confidential",
    assignedOwner: "Joseph W.",
    linkedControls: 12,
    evidenceFreshness: "Fresh",
    status: "Approved",
    version: "v3.1",
  },
  {
    id: "5",
    name: "Risk Assessment Report",
    classification: "Public",
    assignedOwner: "Martha O.",
    linkedControls: 20,
    evidenceFreshness: "Fresh",
    status: "Pending",
    version: "v1.1",
  },
  {
    id: "6",
    name: "Continuous Improvement Plan",
    classification: "Confidential",
    assignedOwner: "John A.",
    linkedControls: 9,
    evidenceFreshness: "Fresh",
    status: "Approved",
    version: "v2.1",
    aiGenerated: true,
  },
  {
    id: "7",
    name: "Device Compliance Policy",
    classification: "Internal",
    assignedOwner: "Mary R.",
    linkedControls: 4,
    evidenceFreshness: "Expiring",
    status: "Approved",
    version: "v2.1",
  },
  {
    id: "8",
    name: "Corrective Action Plan",
    classification: "Restricted",
    assignedOwner: "Sarah O.",
    linkedControls: 2,
    evidenceFreshness: "Stale",
    status: "Approved",
    version: "v2.1",
  },
  {
    id: "9",
    name: "Policy Document Name",
    classification: "Confidential",
    assignedOwner: "Philip L.",
    linkedControls: 3,
    evidenceFreshness: "Expiring",
    status: "Pending",
    version: "v2.1",
    aiGenerated: true,
  },
  {
    id: "10",
    name: "Access Control Policy",
    classification: "Internal",
    assignedOwner: "Anna K.",
    linkedControls: 7,
    evidenceFreshness: "Fresh",
    status: "Approved",
    version: "v1.3",
  },
  {
    id: "11",
    name: "Data Retention Policy",
    classification: "Public",
    assignedOwner: "James B.",
    linkedControls: 6,
    evidenceFreshness: "Fresh",
    status: "Approved",
    version: "v1.0",
    aiGenerated: true,
  },
  {
    id: "12",
    name: "Vendor Risk Management Policy",
    classification: "Restricted",
    assignedOwner: "Linda T.",
    linkedControls: 11,
    evidenceFreshness: "Stale",
    status: "Pending",
    version: "v2.0",
  },
];

const CLASS_STYLE: Record<Classification, string> = {
  Internal: "text-blue-600",
  Public: "text-green-600",
  Restricted: "text-red-600",
  Confidential: "text-orange-600",
};

function ClassBadge({ value }: { value: Classification }) {
  return (
    <span className={cn("text-xs font-semibold", CLASS_STYLE[value])}>
      {value}
    </span>
  );
}

function EvidenceBadge({ value }: { value: EvidenceFreshness }) {
  if (value === "Fresh")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-green-50 border-green-200 text-green-600">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <circle
            cx="5.5"
            cy="5.5"
            r="4.5"
            stroke="#22c55e"
            strokeWidth="1.2"
          />
          <path
            d="M3 5.5l1.5 1.5 3-3"
            stroke="#22c55e"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Fresh
      </span>
    );
  if (value === "Expiring")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-orange-50 border-orange-200 text-orange-600">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path
            d="M5.5 1.5L9.5 8.5H1.5L5.5 1.5Z"
            stroke="#f97316"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 4.5V6.5"
            stroke="#f97316"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="5.5" cy="7.5" r="0.5" fill="#f97316" />
        </svg>
        Expiring
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-red-50 border-red-200 text-red-600">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <rect
          x="1.5"
          y="2.5"
          width="8"
          height="7"
          rx="1"
          stroke="#ef4444"
          strokeWidth="1.2"
        />
        <path
          d="M3.5 2.5V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.5"
          stroke="#ef4444"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      Stale
    </span>
  );
}

function StatusBadge({ value }: { value: PolicyStatus }) {
  if (value === "Approved")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-green-50 border-green-200 text-green-600">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" stroke="#22c55e" strokeWidth="1.2" />
          <path
            d="M3 5l1.3 1.3 2.7-2.7"
            stroke="#22c55e"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Approved
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border bg-orange-50 border-orange-200 text-orange-600">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="4" stroke="#f97316" strokeWidth="1.2" />
        <path
          d="M5 3v2.5"
          stroke="#f97316"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="5" cy="7.2" r="0.4" fill="#f97316" />
      </svg>
      Pending
    </span>
  );
}

function FileDocIcon() {
  return (
    <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 2h6.5l3 3v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V2.5a.5.5 0 0 1 .5-.5z"
          stroke="#9ca3af"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M10 2v3h3"
          stroke="#9ca3af"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 8h5M5.5 10h3"
          stroke="#9ca3af"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isDefault = value === options[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1.5 text-xs font-medium border rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap",
          isDefault
            ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            : "bg-gray-900 border-gray-900 text-white",
        )}
      >
        {isDefault ? label : value}
        <i
          className="lni lni-chevron-down text-[10px]"
          style={{ color: isDefault ? "#9ca3af" : "#fff" }}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-30 min-w-37.5 overflow-hidden py-1">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors",
                  opt === value
                    ? "font-semibold text-gray-900 bg-gray-50"
                    : "text-gray-600",
                )}
              >
                {opt === options[0] ? `All ${label}s` : opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  return (
    <span className="inline-flex flex-col ml-0.5 gap-2">
      <svg
        width="6"
        height="4"
        viewBox="0 0 6 4"
        fill="none"
        style={{ opacity: active && dir === "asc" ? 1 : 0.3 }}
      >
        <path d="M3 0.5L5.5 3.5H0.5L3 0.5Z" fill="#374151" />
      </svg>
      <svg
        width="6"
        height="4"
        viewBox="0 0 6 4"
        fill="none"
        style={{ opacity: active && dir === "desc" ? 1 : 0.3 }}
      >
        <path d="M3 3.5L0.5 0.5H5.5L3 3.5Z" fill="#374151" />
      </svg>
    </span>
  );
}

const PAGE_SIZE = 9;

export function PolicyTable() {
  const [search, setSearch] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("Owner");
  const [classFilter, setClassFilter] = useState("Classification");
  const [statusFilter, setStatusFilter] = useState("Status");
  const [aiOnly, setAiOnly] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // ── Filter + sort ──
  const filtered = useMemo(() => {
    let rows = MOCK_POLICIES.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (classFilter !== "Classification" && p.classification !== classFilter)
        return false;
      if (statusFilter !== "Status" && p.status !== statusFilter) return false;
      if (aiOnly && !p.aiGenerated) return false;
      return true;
    });

    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = String((a as any)[sortKey] ?? "");
        const bv = String((b as any)[sortKey] ?? "");
        const cmp = av.localeCompare(bv, undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [search, classFilter, statusFilter, aiOnly, sortKey, sortDir]);

  function handleSort(key: string) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Selection ──
  const pageIds = paginated.map((p) => p.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const SORTABLE_COLS: { key: string; label: string }[] = [
    { key: "name", label: "Policy Name" },
    { key: "classification", label: "Classification" },
    { key: "evidenceFreshness", label: "Evidence Freshness" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <i
              className="lni lni-search absolute left-2.5 top-1/2 -translate-y-1/2 text-xs"
              style={{ color: "#9ca3af" }}
            />
            <input
              type="text"
              placeholder="Search policy..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white outline-none focus:border-gray-400 transition-colors w-40"
            />
          </div>

          <FilterDropdown
            label="Owner"
            value={ownerFilter}
            options={["Owner", "Assigned", "Unassigned"]}
            onChange={(v) => {
              setOwnerFilter(v);
              setPage(1);
            }}
          />
          <FilterDropdown
            label="Classification"
            value={classFilter}
            options={[
              "Classification",
              "Internal",
              "Public",
              "Restricted",
              "Confidential",
            ]}
            onChange={(v) => {
              setClassFilter(v);
              setPage(1);
            }}
          />
          <FilterDropdown
            label="Status"
            value={statusFilter}
            options={["Status", "Approved", "Pending"]}
            onChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          />

          {/* AI Generated pill */}
          <button
            onClick={() => {
              setAiOnly((v) => !v);
              setPage(1);
            }}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all",
              aiOnly
                ? "bg-gray-900 border-gray-900 text-white"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
            )}
          >
            AI Generated
          </button>
        </div>

        {/* Export */}
        <div className="relative">
          <button
            onClick={() => setExportOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#111827" }}
          >
            Export as
            <i
              className="lni lni-chevron-down text-[10px]"
              style={{ color: "#fff" }}
            />
          </button>
          {exportOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setExportOpen(false)}
              />
              <div className="absolute top-full right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-30 w-36 overflow-hidden py-1">
                {["CSV", "PDF", "XLSX"].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setExportOpen(false)}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Export as {fmt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/60">
                {/* Select all */}
                <th className="pl-4 pr-2 py-3 w-8">
                  <Checkbox
                    className="h-4 w-4 border-gray-300"
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                  />
                </th>

                {/* Policy Name */}
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  <button
                    onClick={() => handleSort("name")}
                    className="inline-flex items-center gap-0.5 hover:text-gray-800 transition-colors"
                  >
                    Policy Name{" "}
                    <SortIcon active={sortKey === "name"} dir={sortDir} />
                  </button>
                </th>

                {/* Classification */}
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  <button
                    onClick={() => handleSort("classification")}
                    className="inline-flex items-center gap-0.5 hover:text-gray-800 transition-colors"
                  >
                    Classification{" "}
                    <SortIcon
                      active={sortKey === "classification"}
                      dir={sortDir}
                    />
                  </button>
                </th>

                {/* Assigned Owner */}
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Assigned Owner
                </th>

                {/* Linked Controls */}
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Linked Controls
                </th>

                {/* Evidence Freshness */}
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  <button
                    onClick={() => handleSort("evidenceFreshness")}
                    className="inline-flex items-center gap-0.5 hover:text-gray-800 transition-colors"
                  >
                    Evidence Freshness{" "}
                    <SortIcon
                      active={sortKey === "evidenceFreshness"}
                      dir={sortDir}
                    />
                  </button>
                </th>

                {/* Status */}
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  <button
                    onClick={() => handleSort("status")}
                    className="inline-flex items-center gap-0.5 hover:text-gray-800 transition-colors"
                  >
                    Status{" "}
                    <SortIcon active={sortKey === "status"} dir={sortDir} />
                  </button>
                </th>

                {/* Version */}
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Version
                </th>

                {/* Actions */}
                <th className="px-3 py-3 w-8" />
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <rect
                          x="8"
                          y="6"
                          width="24"
                          height="28"
                          rx="3"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M14 14h12M14 19h12M14 24h8"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <p className="text-sm">No policies found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-b border-gray-100 last:border-0 transition-colors",
                      selected.has(row.id)
                        ? "bg-orange-50/30"
                        : "hover:bg-gray-50/60",
                    )}
                  >
                    {/* Checkbox */}
                    <td
                      className="pl-4 pr-2 py-3 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRow(row.id);
                      }}
                    >
                      <Checkbox
                        className="h-4 w-4 border-gray-300"
                        checked={selected.has(row.id)}
                        onCheckedChange={() => toggleRow(row.id)}
                      />
                    </td>

                    {/* Policy Name */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <FileDocIcon />
                        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                          {row.name}
                        </span>
                      </div>
                    </td>

                    {/* Classification */}
                    <td className="px-3 py-3">
                      <ClassBadge value={row.classification} />
                    </td>

                    {/* Assigned Owner */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 shrink-0">
                          <AvatarImage src={row.ownerAvatar} />
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-[10px] font-semibold">
                            {row.assignedOwner.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700 whitespace-nowrap">
                          {row.assignedOwner}
                        </span>
                      </div>
                    </td>

                    {/* Linked Controls */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <circle
                            cx="7"
                            cy="7"
                            r="5.5"
                            stroke="#9ca3af"
                            strokeWidth="1.2"
                          />
                          <circle
                            cx="7"
                            cy="7"
                            r="2"
                            stroke="#9ca3af"
                            strokeWidth="1.2"
                          />
                        </svg>
                        {row.linkedControls}
                      </div>
                    </td>

                    {/* Evidence Freshness */}
                    <td className="px-3 py-3">
                      <EvidenceBadge value={row.evidenceFreshness} />
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <StatusBadge value={row.status} />
                    </td>

                    {/* Version */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1z"
                            stroke="#9ca3af"
                            strokeWidth="1.1"
                          />
                          <path
                            d="M6 3.5v2.5l1.5 1"
                            stroke="#9ca3af"
                            strokeWidth="1.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {row.version}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3">
                      <button className="h-6 w-6 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                        <i
                          className="lni lni-more-vertical text-sm"
                          style={{ color: "#6b7280" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 text-sm font-medium border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <i className="lni lni-chevron-left text-xs" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-7 h-7 rounded-md text-xs font-medium transition-colors",
                  page === p
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-100",
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 text-sm font-medium border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <i className="lni lni-chevron-right text-xs" />
          </button>
        </div>
      )}
    </div>
  );
}
