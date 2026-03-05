"use client";

import { useState } from "react";
import {
  Personnel,
  PersonnelRole,
  PersonnelDepartment,
  ROLES,
  ROLE_LABELS,
  DEPARTMENTS,
} from "@/data/personnel";

interface EditPersonnelModalProps {
  personnel: Personnel;
  onClose: () => void;
  onSave: (updated: Personnel) => void;
}

export default function EditPersonnelModal({
  personnel,
  onClose,
  onSave,
}: EditPersonnelModalProps) {
  const [form, setForm] = useState({
    name: personnel.name,
    email: personnel.email,
    jobTitle: personnel.jobTitle ?? "",
    phone: personnel.phone ?? "",
    department: personnel.department as PersonnelDepartment,
    role: personnel.role as PersonnelRole,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave({ ...personnel, ...form });
    }, 500);
  };

  const inputClass =
    "w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={!isSaving ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[520px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">Edit Personnel</h2>
            <p className="text-xs text-slate-400 mt-0.5">Update member details and access</p>
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

        {/* Avatar row */}
        <div className="px-6 pt-5 pb-2 flex items-center gap-3">
          <img
            src={personnel.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${personnel.name}`}
            alt={personnel.name}
            className="w-12 h-12 rounded-full border-2 border-slate-100 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">{personnel.name}</p>
            <p className="text-xs text-slate-400">{personnel.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Full name"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">Job Title</label>
              <input
                type="text"
                value={form.jobTitle}
                onChange={(e) => setForm((p) => ({ ...p, jobTitle: e.target.value }))}
                placeholder="e.g. Security Engineer"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="email@company.com"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">Department</label>
              <select
                value={form.department}
                onChange={(e) =>
                  setForm((p) => ({ ...p, department: e.target.value as PersonnelDepartment }))
                }
                className={inputClass}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">Role</label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm((p) => ({ ...p, role: e.target.value as PersonnelRole }))
                }
                className={inputClass}
                disabled={personnel.role === "owner"}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+1 (555) 000-0000"
              className={inputClass}
            />
          </div>
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
            onClick={handleSave}
            disabled={isSaving || !form.name.trim()}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
