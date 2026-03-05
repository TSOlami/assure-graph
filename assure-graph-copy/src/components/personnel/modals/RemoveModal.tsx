"use client";

import { useState } from "react";
import { Personnel } from "@/data/personnel";

interface RemoveModalProps {
  personnel: Personnel;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveModal({ personnel, onClose, onConfirm }: RemoveModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isRemoving, setIsRemoving] = useState(false);

  const isConfirmed = confirmText.trim().toLowerCase() === personnel.name.trim().toLowerCase();

  const handleRemove = () => {
    if (!isConfirmed) return;
    setIsRemoving(true);
    setTimeout(() => {
      onConfirm();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={!isRemoving ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[440px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[15px] font-semibold text-slate-900">Remove from Organization</h2>
          <button
            onClick={onClose}
            disabled={isRemoving}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-4">
          {/* Danger icon */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M11.083 4.667H16.917C17.4 4.667 17.792 5.059 17.792 5.542V6.417H10.208V5.542C10.208 5.059 10.6 4.667 11.083 4.667Z" fill="#DC2626"/>
                <path d="M5.25 7.292H22.75C23.233 7.292 23.625 7.684 23.625 8.167C23.625 8.65 23.233 9.042 22.75 9.042H21.875L21.021 21.767C20.954 22.758 20.133 23.333 19.25 23.333H8.75C7.867 23.333 7.046 22.758 6.979 21.767L6.125 9.042H5.25C4.767 9.042 4.375 8.65 4.375 8.167C4.375 7.684 4.767 7.292 5.25 7.292ZM11.083 12.25C11.083 11.767 10.691 11.375 10.208 11.375C9.725 11.375 9.333 11.767 9.333 12.25V19.833C9.333 20.316 9.725 20.708 10.208 20.708C10.691 20.708 11.083 20.316 11.083 19.833V12.25ZM18.667 12.25C18.667 11.767 18.275 11.375 17.792 11.375C17.309 11.375 16.917 11.767 16.917 12.25V19.833C16.917 20.316 17.309 20.708 17.792 20.708C18.275 20.708 18.667 20.316 18.667 19.833V12.25ZM14.875 12.25C14.875 11.767 14.483 11.375 14 11.375C13.517 11.375 13.125 11.767 13.125 12.25V19.833C13.125 20.316 13.517 20.708 14 20.708C14.483 20.708 14.875 20.316 14.875 19.833V12.25Z" fill="#DC2626"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">This action is permanent</p>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Removing <span className="font-medium text-slate-700">{personnel.name}</span> will permanently delete their account and all associated data from your organization.
              </p>
            </div>
          </div>

          {/* Consequences */}
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-red-700">The following will be permanently deleted:</p>
            <ul className="flex flex-col gap-1">
              {["Account access and credentials", "Assigned controls and evidence links", "Activity history and audit logs"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-red-600">
                  <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Confirmation input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">
              Type <span className="font-bold text-slate-900">{personnel.name}</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Enter full name to confirm"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={isRemoving}
            className="flex-1 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            disabled={!isConfirmed || isRemoving}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
