"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import {
  Personnel,
  PersonnelRole,
  PersonnelStatus,
  ROLE_LABELS,
  ROLE_COLORS,
  STATUS_COLORS,
  STATUS_DOT_COLORS,
  mockPersonnel,
} from "@/data/personnel";
import { Pagination } from "@/components/ui/Pagination";
import EditPersonnelModal from "./modals/EditPersonnelModal";
import ChangeRoleModal from "./modals/ChangeRoleModal";
import DeactivateModal from "./modals/DeactivateModal";
import RemoveModal from "./modals/RemoveModal";
import ResendInviteModal from "./modals/ResendInviteModal";

type TabFilter = "all" | "admins" | "managers" | "members" | "pending";

type ActiveModal =
  | { type: "edit"; personnel: Personnel }
  | { type: "changeRole"; personnel: Personnel }
  | { type: "deactivate"; personnel: Personnel }
  | { type: "remove"; personnel: Personnel }
  | { type: "resendInvite"; personnel: Personnel }
  | null;

const TABS: { key: TabFilter; label: string }[] = [
  { key: "all", label: "All Members" },
  { key: "admins", label: "Admins" },
  { key: "managers", label: "Managers" },
  { key: "members", label: "Members" },
  { key: "pending", label: "Pending" },
];

const TAB_ROLE_MAP: Partial<Record<TabFilter, PersonnelRole[]>> = {
  admins: ["owner", "admin"],
  managers: ["manager"],
  members: ["member", "viewer"],
};

const ITEMS_PER_PAGE = 10;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ActionsMenu({
  personnel,
  onAction,
}: {
  personnel: Personnel;
  onAction: (action: ActiveModal) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isOwner = personnel.role === "owner";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="3" r="1.25" fill="currentColor" />
          <circle cx="8" cy="8" r="1.25" fill="currentColor" />
          <circle cx="8" cy="13" r="1.25" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-20 bg-white border border-slate-200 rounded-xl shadow-lg w-48 py-1 overflow-hidden">
          <button
            onClick={() => { setOpen(false); onAction({ type: "edit", personnel }); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-400">
              <path d="M10.5 1.75L12.25 3.5L4.083 11.667H2.333V9.917L10.5 1.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Edit Details
          </button>
          {!isOwner && (
            <button
              onClick={() => { setOpen(false); onAction({ type: "changeRole", personnel }); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-400">
                <path d="M1.75 7H12.25M9.333 4.083L12.25 7L9.333 9.917" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Change Role
            </button>
          )}
          {personnel.status === "pending" ? (
            <button
              onClick={() => { setOpen(false); onAction({ type: "resendInvite", personnel }); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-400">
                <path d="M2.333 2.917H11.667C12.283 2.917 12.833 3.467 12.833 4.083V10.5C12.833 11.117 12.283 11.667 11.667 11.667H2.333C1.717 11.667 1.167 11.117 1.167 10.5V4.083C1.167 3.467 1.717 2.917 2.333 2.917Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.833 4.083L7 7.583L1.167 4.083" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Resend Invite
            </button>
          ) : !isOwner && (
            <button
              onClick={() => { setOpen(false); onAction({ type: "deactivate", personnel }); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-400">
                <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4.667 7H9.333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {personnel.status === "active" ? "Deactivate" : "Activate"}
            </button>
          )}
          {!isOwner && (
            <>
              <div className="h-px bg-slate-100 my-1" />
              <button
                onClick={() => { setOpen(false); onAction({ type: "remove", personnel }); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-red-400">
                  <path d="M2.917 4.083H11.083L10.5 11.083C10.45 11.617 10.017 12.25 9.333 12.25H4.667C3.983 12.25 3.55 11.617 3.5 11.083L2.917 4.083Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.167 4.083H12.833" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M5.25 4.083V2.333C5.25 1.967 5.55 1.75 5.833 1.75H8.167C8.45 1.75 8.75 1.967 8.75 2.333V4.083" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Remove
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function PersonnelContent() {
  const router = useRouter();
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = useMemo(() => ({
    total: personnel.length,
    active: personnel.filter((p) => p.status === "active").length,
    pending: personnel.filter((p) => p.status === "pending").length,
    inactive: personnel.filter((p) => p.status === "inactive").length,
  }), [personnel]);

  const tabCounts = useMemo(() => ({
    all: personnel.length,
    admins: personnel.filter((p) => ["owner", "admin"].includes(p.role)).length,
    managers: personnel.filter((p) => p.role === "manager").length,
    members: personnel.filter((p) => ["member", "viewer"].includes(p.role)).length,
    pending: personnel.filter((p) => p.status === "pending").length,
  }), [personnel]);

  const filtered = useMemo(() => {
    let list = personnel;

    if (activeTab !== "all") {
      if (activeTab === "pending") {
        list = list.filter((p) => p.status === "pending");
      } else {
        const roles = TAB_ROLE_MAP[activeTab];
        if (roles) list = list.filter((p) => roles.includes(p.role));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          (p.jobTitle?.toLowerCase().includes(q) ?? false)
      );
    }

    return list;
  }, [personnel, activeTab, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSaveEdit = (updated: Personnel) => {
    setPersonnel((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setActiveModal(null);
  };

  const handleChangeRole = (role: PersonnelRole) => {
    if (activeModal?.type !== "changeRole") return;
    setPersonnel((prev) =>
      prev.map((p) => (p.id === activeModal.personnel.id ? { ...p, role } : p))
    );
    setActiveModal(null);
  };

  const handleDeactivate = () => {
    if (activeModal?.type !== "deactivate") return;
    const { personnel: target } = activeModal;
    setPersonnel((prev) =>
      prev.map((p) =>
        p.id === target.id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" as PersonnelStatus }
          : p
      )
    );
    setActiveModal(null);
  };

  const handleRemove = () => {
    if (activeModal?.type !== "remove") return;
    setPersonnel((prev) => prev.filter((p) => p.id !== activeModal.personnel.id));
    setActiveModal(null);
  };

  const handleResendInvite = () => {
    setActiveModal(null);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Personnel</h1>
          <p className="text-sm text-gray-600">Manage your team members and their access permissions</p>
        </div>
        <button
          onClick={() => router.push("/personnel/invite")}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-5 text-white text-sm font-semibold rounded-xl hover:bg-brand-6 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3.333V12.667M3.333 8H12.667" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Invite People
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: stats.total, color: "text-slate-900", bg: "bg-white" },
          { label: "Active", value: stats.active, color: "text-green-700", bg: "bg-green-50" },
          { label: "Pending Invite", value: stats.pending, color: "text-amber-700", bg: "bg-amber-50" },
          { label: "Inactive", value: stats.inactive, color: "text-slate-500", bg: "bg-slate-50" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} border border-slate-200 rounded-xl px-5 py-4`}>
            <p className="text-xs text-slate-500 font-medium">{label}</p>
            <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap",
                  activeTab === key
                    ? "bg-brand-0-5 text-brand-5"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                )}
              >
                {label}
                <span
                  className={clsx(
                    "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold rounded",
                    activeTab === key ? "bg-brand-1 text-brand-5" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {tabCounts[key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            >
              <path
                d="M6.5 11.5C9.261 11.5 11.5 9.261 11.5 6.5C11.5 3.739 9.261 1.5 6.5 1.5C3.739 1.5 1.5 3.739 1.5 6.5C1.5 9.261 3.739 11.5 6.5 11.5Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M13.5 13.5L10.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors w-full sm:w-60"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Name", "Role", "Department", "Email", "Status", "Last Active", ""].map((col, i) => (
                  <th
                    key={i}
                    className={clsx(
                      "px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap",
                      i === 6 && "w-10"
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-slate-200">
                        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                        <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <p className="text-sm font-medium text-slate-400">No members found</p>
                      <p className="text-xs text-slate-300">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          {member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-9 h-9 rounded-full border-2 border-slate-100 object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-brand-0-5 border-2 border-brand-1 flex items-center justify-center">
                              <span className="text-xs font-semibold text-brand-5">{getInitials(member.name)}</span>
                            </div>
                          )}
                          <span
                            className={clsx(
                              "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white",
                              STATUS_DOT_COLORS[member.status]
                            )}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 leading-none">{member.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[180px]">
                            {member.jobTitle ?? "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-3.5">
                      <span className={clsx("inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-lg", ROLE_COLORS[member.role])}>
                        {ROLE_LABELS[member.role]}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-600">{member.department}</span>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-500">{member.email}</span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-lg capitalize", STATUS_COLORS[member.status])}>
                        <span className={clsx("w-1.5 h-1.5 rounded-full", STATUS_DOT_COLORS[member.status])} />
                        {member.status}
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-400">
                        {member.lastActive ?? "—"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <ActionsMenu personnel={member} onAction={setActiveModal} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Modals */}
      {activeModal?.type === "edit" && (
        <EditPersonnelModal
          personnel={activeModal.personnel}
          onClose={() => setActiveModal(null)}
          onSave={handleSaveEdit}
        />
      )}
      {activeModal?.type === "changeRole" && (
        <ChangeRoleModal
          personnel={activeModal.personnel}
          onClose={() => setActiveModal(null)}
          onConfirm={handleChangeRole}
        />
      )}
      {activeModal?.type === "deactivate" && (
        <DeactivateModal
          personnel={activeModal.personnel}
          onClose={() => setActiveModal(null)}
          onConfirm={handleDeactivate}
        />
      )}
      {activeModal?.type === "remove" && (
        <RemoveModal
          personnel={activeModal.personnel}
          onClose={() => setActiveModal(null)}
          onConfirm={handleRemove}
        />
      )}
      {activeModal?.type === "resendInvite" && (
        <ResendInviteModal
          personnel={activeModal.personnel}
          onClose={() => setActiveModal(null)}
          onConfirm={handleResendInvite}
        />
      )}
    </div>
  );
}
