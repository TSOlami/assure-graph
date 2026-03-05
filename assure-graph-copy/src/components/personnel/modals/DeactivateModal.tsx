"use client";

import { useState } from "react";
import { Personnel } from "@/data/personnel";

interface DeactivateModalProps {
  personnel: Personnel;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeactivateModal({ personnel, onClose, onConfirm }: DeactivateModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const isDeactivating = personnel.status === "active";

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={!isProcessing ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[440px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[15px] font-semibold text-slate-900">
            {isDeactivating ? "Deactivate Account" : "Activate Account"}
          </h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col items-center gap-4">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDeactivating ? "bg-amber-50" : "bg-green-50"}`}>
            {isDeactivating ? (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3.5C8.201 3.5 3.5 8.201 3.5 14C3.5 19.799 8.201 24.5 14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.201 19.799 3.5 14 3.5ZM14 8.75C14.483 8.75 14.875 9.142 14.875 9.625V14.875C14.875 15.358 14.483 15.75 14 15.75C13.517 15.75 13.125 15.358 13.125 14.875V9.625C13.125 9.142 13.517 8.75 14 8.75ZM14 19.25C13.358 19.25 12.833 18.725 12.833 18.083C12.833 17.441 13.358 16.917 14 16.917C14.642 16.917 15.167 17.441 15.167 18.083C15.167 18.725 14.642 19.25 14 19.25Z" fill="#D97706"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3.5C8.201 3.5 3.5 8.201 3.5 14C3.5 19.799 8.201 24.5 14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.201 19.799 3.5 14 3.5ZM19.193 11.361L12.943 17.611C12.771 17.783 12.542 17.875 12.306 17.875C12.069 17.875 11.84 17.783 11.668 17.611L8.793 14.736C8.434 14.377 8.434 13.796 8.793 13.437C9.152 13.078 9.733 13.078 10.092 13.437L12.306 15.651L17.894 10.063C18.253 9.704 18.834 9.704 19.193 10.063C19.552 10.422 19.552 11.002 19.193 11.361Z" fill="#16A34A"/>
              </svg>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">
              {isDeactivating
                ? `Deactivate ${personnel.name}'s account?`
                : `Activate ${personnel.name}'s account?`}
            </p>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-xs">
              {isDeactivating
                ? "This will revoke their access to ControlGraph AI. They won't be able to log in until reactivated."
                : "This will restore their access to ControlGraph AI based on their current role and permissions."}
            </p>
          </div>

          {/* Member pill */}
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 w-full">
            <img
              src={personnel.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${personnel.name}`}
              alt={personnel.name}
              className="w-8 h-8 rounded-full border border-slate-200 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{personnel.name}</p>
              <p className="text-xs text-slate-400 truncate">{personnel.email}</p>
            </div>
          </div>

          {isDeactivating && (
            <div className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2.5 items-start">
              <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm8-3.5a.5.5 0 01.5.5v3a.5.5 0 01-1 0V5a.5.5 0 01.5-.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>
              <p className="text-xs text-amber-700 leading-relaxed">
                All active sessions will be terminated and pending invitations will be cancelled.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className={`flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors disabled:opacity-60 ${
              isDeactivating
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isProcessing
              ? "Processing..."
              : isDeactivating
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
}
