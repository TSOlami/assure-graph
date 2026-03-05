"use client";

import { useState } from "react";
import { Personnel } from "@/data/personnel";

interface ResendInviteModalProps {
  personnel: Personnel;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResendInviteModal({ personnel, onClose, onConfirm }: ResendInviteModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setTimeout(() => {
        onConfirm();
      }, 1500);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={!isSending ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[420px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[15px] font-semibold text-slate-900">Resend Invitation</h2>
          <button
            onClick={onClose}
            disabled={isSending}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col items-center gap-4">
          {sent ? (
            <>
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M26.667 8L13.333 21.333L6.667 14.667" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900">Invitation Sent!</p>
                <p className="text-sm text-slate-500 mt-1.5">
                  A new invitation has been sent to <span className="font-medium text-slate-700">{personnel.email}</span>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Email icon */}
              <div className="w-14 h-14 rounded-full bg-brand-0-5 flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M4.333 5.417H21.667C22.633 5.417 23.417 6.2 23.417 7.167V18.833C23.417 19.8 22.633 20.583 21.667 20.583H4.333C3.367 20.583 2.583 19.8 2.583 18.833V7.167C2.583 6.2 3.367 5.417 4.333 5.417Z" stroke="#F05A35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23.417 7.167L13 13.875L2.583 7.167" stroke="#F05A35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900">Resend invitation to {personnel.name}?</p>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                  A new invitation email will be sent to the address below. The previous invite link will be invalidated.
                </p>
              </div>

              {/* Email display */}
              <div className="w-full flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400 flex-shrink-0">
                  <path d="M2.667 3.333H13.333C13.967 3.333 14.5 3.867 14.5 4.5V11.5C14.5 12.133 13.967 12.667 13.333 12.667H2.667C2.033 12.667 1.5 12.133 1.5 11.5V4.5C1.5 3.867 2.033 3.333 2.667 3.333Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5 4.5L8 8.583L1.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-slate-700">{personnel.email}</span>
              </div>

              <p className="text-xs text-slate-400 text-center">
                Invite expires in 7 days after sending.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        {!sent && (
          <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100">
            <button
              onClick={onClose}
              disabled={isSending}
              className="flex-1 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={isSending}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors disabled:opacity-60"
            >
              {isSending ? "Sending..." : "Resend Invite"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
