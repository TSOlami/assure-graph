"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  Personnel,
  PersonnelRole,
  ROLES,
  ROLE_LABELS,
  ROLE_DESCRIPTIONS,
  ROLE_COLORS,
} from "@/data/personnel";

interface ChangeRoleModalProps {
  personnel: Personnel;
  onClose: () => void;
  onConfirm: (role: PersonnelRole) => void;
}

export default function ChangeRoleModal({ personnel, onClose, onConfirm }: ChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<PersonnelRole>(personnel.role);
  const [isSaving, setIsSaving] = useState(false);

  const handleConfirm = () => {
    setIsSaving(true);
    setTimeout(() => {
      onConfirm(selectedRole);
    }, 500);
  };

  const availableRoles = ROLES.filter((r) => r !== "owner");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={!isSaving ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">Change Role</h2>
            <p className="text-xs text-slate-400 mt-0.5">Update access permissions for this member</p>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Member info */}
        <div className="px-6 pt-5 pb-1 flex items-center gap-3">
          <img
            src={personnel.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${personnel.name}`}
            alt={personnel.name}
            className="w-10 h-10 rounded-full border-2 border-slate-100 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">{personnel.name}</p>
            <p className="text-xs text-slate-400">{personnel.jobTitle ?? personnel.email}</p>
          </div>
        </div>

        {/* Role options */}
        <div className="px-6 py-4 flex flex-col gap-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Select Role</p>
          {availableRoles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={clsx(
                "w-full flex items-start gap-3 px-4 py-3 rounded-xl border transition-all text-left",
                selectedRole === role
                  ? "border-brand-5 bg-brand-0-5"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              )}
            >
              <div
                className={clsx(
                  "mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  selectedRole === role ? "border-brand-5" : "border-slate-300"
                )}
              >
                {selectedRole === role && (
                  <div className="w-2 h-2 rounded-full bg-brand-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{ROLE_LABELS[role]}</span>
                  {personnel.role === role && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {ROLE_DESCRIPTIONS[role]}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSaving || selectedRole === personnel.role}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Updating..." : "Change Role"}
          </button>
        </div>
      </div>
    </div>
  );
}
